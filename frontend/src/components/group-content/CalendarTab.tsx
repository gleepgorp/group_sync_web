import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { MONTHS } from "@/constants/months";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

interface CalendarTabProps {}

function getDaysInMonth(year: number, monthIndex: number) {
  return new Date(year, monthIndex + 1, 0).getDate();
}

export function CalendarTab(_props: CalendarTabProps) {
  const now = new Date();
  const [viewYear, setViewYear] = useState(now.getFullYear());
  const [viewMonth, setViewMonth] = useState(now.getMonth());

  const firstDayOfMonth = useMemo(() => new Date(viewYear, viewMonth, 1).getDay(), [viewMonth, viewYear]);
  const numDays = useMemo(() => getDaysInMonth(viewYear, viewMonth), [viewMonth, viewYear]);
  const headerLabel = useMemo(() => `${MONTHS[viewMonth]} ${viewYear}`, [viewMonth, viewYear]);

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const prev = () => {
    setViewMonth((m) => {
      const now = new Date();
      const currentMonth = now.getMonth();
      const currentYear = now.getFullYear();
  
      // Only allow going back if viewYear > currentYear
      // or (same year but month > currentMonth)
      if (
        viewYear > currentYear ||
        (viewYear === currentYear && m > currentMonth)
      ) {
        if (m === 0) {
          setViewYear((y) => y - 1);
          return 11;
        }
        return m - 1;
      }
  
      return m;
    });
  };
  
  const next = () => {
    setViewMonth(m => {
      if (m === 11) { setViewYear(y => y + 1); return 0; }
      return m + 1;
    });
  };

  const cells = useMemo(() => {
    const leading = firstDayOfMonth; // number of blanks before day 1
    const total = leading + numDays;
    const rows = Math.ceil(total / 7) * 7; // 5 or 6 weeks
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
      <div className="flex items-center mb-3">
        <div className="text-2xl font-bold tracking-tight min-w-52">{headerLabel}</div>
        <div className="flex items-center gap-2 ml-6">
          <Button variant="ghost" size="icon" aria-label="Previous month" onClick={prev}>
            <ChevronLeftIcon className="size-4" />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Next month" onClick={next}>
            <ChevronRightIcon className="size-4" />
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-2 text-sm text-muted-foreground mb-2">
        {daysOfWeek.map(d => (
          <div key={d} className="p-2 text-center font-medium">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2">
        {cells.map((c, i) => (
          <div key={i} className="aspect-square border rounded-md flex items-start justify-start p-2 text-sm text-muted-foreground">
            {c.isCurrentMonth ? c.day : ""}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CalendarTab;
