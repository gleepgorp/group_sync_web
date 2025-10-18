import { useEffect, useMemo, useState } from "react";
import CommonScheduleHeader from "@/components/group-content/CommonScheduleHeader";
import ScheduleListItem from "@/components/group-content/ScheduleListItem";
import { MONTHS } from "@/constants/months";

export interface ScheduleItem {
  id: string;
  date: Date;
}

interface CommonScheduleListProps {
  schedules: ScheduleItem[];
}

export function CommonScheduleList({ schedules }: CommonScheduleListProps) {
  // Track view month/year for list header navigation
  const initial = schedules[0]?.date ?? new Date();
  const [viewYear, setViewYear] = useState(initial.getFullYear());
  const [viewMonth, setViewMonth] = useState(initial.getMonth()); // 0-11

  const monthLabel = useMemo(() => `${MONTHS[viewMonth]} ${viewYear}`, [viewMonth, viewYear]);

  const onPrev = () => {
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

      // Otherwise, do nothing
      return m;
    });
  };

  const onNext = () => {
    setViewMonth((m) => {
      if (m === 11) {
        setViewYear((y) => y + 1);
        return 0;
      }
      return m + 1;
    });
  };

  const filtered = useMemo(() => {
    return schedules.filter(s => s.date.getFullYear() === viewYear && s.date.getMonth() === viewMonth)
      .sort((a, b) => a.date.getTime() - b.date.getTime());
  }, [schedules, viewMonth, viewYear]);

  // set current month on first render to current month
  useEffect(() => {
    setViewMonth(new Date().getMonth());
    setViewYear(new Date().getFullYear());
  }, []);

  return (
    <div className="flex flex-col">
      <CommonScheduleHeader currentMonth={monthLabel} onPreviousMonth={onPrev} onNextMonth={onNext} />
      <div className="divide-y">
        {filtered.map(s => (
          <ScheduleListItem key={s.id} date={s.date} />
        ))}
      </div>
    </div>
  );
}

export default CommonScheduleList;
