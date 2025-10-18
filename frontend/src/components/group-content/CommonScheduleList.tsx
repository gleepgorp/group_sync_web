import { useMemo } from "react";
import CommonScheduleHeader from "@/components/group-content/CommonScheduleHeader";
import ScheduleListItem from "@/components/group-content/ScheduleListItem";

export interface ScheduleItem {
  id: string;
  date: Date;
}

interface CommonScheduleListProps {
  schedules: ScheduleItem[];
}

export function CommonScheduleList({ schedules }: CommonScheduleListProps) {
  const monthLabel = useMemo(() => {
    if (schedules.length === 0) {return "";}
    const d = schedules[0].date;
    return d.toLocaleDateString(undefined, { month: "long", year: "numeric" });
  }, [schedules]);

  const onPrev = () => {};
  const onNext = () => {};

  return (
    <div className="flex flex-col">
      <CommonScheduleHeader currentMonth={monthLabel} onPreviousMonth={onPrev} onNextMonth={onNext} />
      <div className="divide-y">
        {schedules.map(s => (
          <ScheduleListItem key={s.id} date={s.date} />
        ))}
      </div>
    </div>
  );
}

export default CommonScheduleList;


