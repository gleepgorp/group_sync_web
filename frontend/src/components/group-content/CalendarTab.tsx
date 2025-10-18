import { useMemo, useState } from "react";
import PrevNextButtons from "@/components/base/BasePrevNextButtons";
import { MONTHS } from "@/constants/months";
import DayWeekMonthFilterTab, { type CalendarViewMode } from "./DayWeekMonthFilterTab";
import DayCalendarView from "./DayCalendarView";
import WeekCalendarView from "./WeekCalendarView";
import { cn } from "@/utils/cn";

interface CalendarTabProps {
  onPrevious: () => void;
  onNext: () => void;
  previousAriaLabel: string;
  nextAriaLabel: string;
}

function getDaysInMonth(year: number, monthIndex: number) {
  return new Date(year, monthIndex + 1, 0).getDate();
}

function startOfWeek(d: Date): Date {
  const day = d.getDay();
  const start = new Date(d);
  start.setDate(d.getDate() - day);
  start.setHours(0, 0, 0, 0);
  return start;
}

function isSameWeek(d1: Date, d2: Date): boolean {
  const start1 = startOfWeek(d1);
  const start2 = startOfWeek(d2);
  return start1.getTime() === start2.getTime();
}

export function CalendarTab(_props: CalendarTabProps) {
  const now = new Date();
  const [viewDate, setViewDate] = useState<Date>(now);
  const [mode, setMode] = useState<CalendarViewMode>("month");
  const isDayMode = mode === "day";

  const viewYear = viewDate.getFullYear();
  const viewMonth = viewDate.getMonth();
  const firstDayOfMonth = useMemo(() => new Date(viewYear, viewMonth, 1).getDay(), [viewMonth, viewYear]);
  const numDays = useMemo(() => getDaysInMonth(viewYear, viewMonth), [viewMonth, viewYear]);
  const headerLabel = useMemo(() => {
    if (mode === "day") {
      return viewDate.toLocaleDateString(undefined, { 
        weekday: "long", 
        month: "long", 
        day: "numeric", 
        year: "numeric" 
      });
    }
    return `${MONTHS[viewMonth]} ${viewYear}`;
  }, [mode, viewDate, viewMonth, viewYear]);

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const prev = () => {
    if (mode === "day") {
      const currentDay = new Date(now);
      currentDay.setHours(0, 0, 0, 0);
      const prevDay = new Date(viewDate);
      prevDay.setDate(prevDay.getDate() - 1);
      prevDay.setHours(0, 0, 0, 0);
      
      // Don't go before current day
      if (prevDay >= currentDay) {
        setViewDate(prevDay);
      }
      return;
    }
    if (mode === "week") {
      const currentWeekStart = startOfWeek(now);
      const prevWeek = new Date(viewDate);
      prevWeek.setDate(prevWeek.getDate() - 7);
      
      // Don't go before current week
      if (!isSameWeek(prevWeek, now) && startOfWeek(prevWeek) >= currentWeekStart) {
        setViewDate(prevWeek);
      }
      return;
    }
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    if (viewYear > currentYear || (viewYear === currentYear && viewMonth > currentMonth)) {
      setViewDate(d => new Date(d.getFullYear(), d.getMonth() - 1, 1));
    }
  };
  
  const next = () => {
    if (mode === "day") {
      setViewDate(d => {
        const nd = new Date(d);
        nd.setDate(nd.getDate() + 1);
        return nd;
      });
      return;
    }
    if (mode === "week") {
      setViewDate(d => {
        const nd = new Date(d);
        nd.setDate(nd.getDate() + 7);
        return nd;
      });
      return;
    }
    setViewDate(d => new Date(d.getFullYear() + (d.getMonth() === 11 ? 1 : 0), (d.getMonth() + 1) % 12, 1));
  };

  const cells = useMemo(() => {
    const leading = firstDayOfMonth;
    const total = leading + numDays;
    const rows = Math.ceil(total / 7) * 7;
    const arr: Array<{ day?: number; isCurrentMonth: boolean }> = [];
    for (let i = 0; i < rows; i++) {
      const day = i - leading + 1;
      if (day >= 1 && day <= numDays) {
        arr.push({ day, isCurrentMonth: true });
      } else {
        arr.push({ isCurrentMonth: false });
      }
    }
    return arr;
  }, [firstDayOfMonth, numDays]);

  return (
    <div className="px-6 pb-6">
      <div className="flex items-center mb-3 py-4 justify-between">
        <div className="flex items-center">
          <div className={cn("text-2xl font-bold tracking-tight min-w-52", isDayMode ? "min-w-80" : "")}>{headerLabel}</div>
          <PrevNextButtons
            className="ml-6"
            onPrevious={prev}
            onNext={next}
            previousAriaLabel="Previous"
            nextAriaLabel="Next"
          />
        </div>
        <DayWeekMonthFilterTab value={mode} onValueChange={setMode} />
      </div>
      {mode === "month" && (
        <>
          <div className="grid grid-cols-7 gap-2 text-sm text-muted-foreground mb-2">
            {daysOfWeek.map(d => (
              <div key={d} className="p-2 text-center font-medium">{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7">
            {cells.map((c, i) => (
              <div key={i} className="aspect-square border flex items-start justify-start p-2 text-sm text-muted-foreground">
                {c.isCurrentMonth ? c.day : ""}
              </div>
            ))}
          </div>
        </>
      )}

      {mode === "day" && (
        <DayCalendarView date={viewDate} />
      )}

      {mode === "week" && (
        <WeekCalendarView weekDate={viewDate} />
      )}
    </div>
  );
}

export default CalendarTab;