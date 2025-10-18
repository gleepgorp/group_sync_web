import { useMemo } from "react";
import { cn } from "@/lib/utils";

export interface DayCalendarViewProps {
  date: Date;
}

export default function DayCalendarView({ date }: DayCalendarViewProps) {
  const hours = useMemo(() => Array.from({ length: 24 }, (_, h) => h), []);

  const labelForHour = (h: number) => {
    const ampm = h < 12 ? "AM" : "PM";
    const hour12 = h % 12 === 0 ? 12 : h % 12;
    return `${hour12} ${ampm}`;
  };

  return (
    <div className="grid grid-cols-[64px,1fr] sm:grid-cols-[80px,1fr] border rounded-lg overflow-hidden">
      <div className="flex flex-col">
        {hours.map((h) => (
          <div key={h} className="h-12 border-b px-2 text-[10px] sm:text-xs text-muted-foreground flex items-start">
            <span className={cn(h % 3 === 0 ? "block" : "hidden", "sm:block")}>{labelForHour(h)}</span>
          </div>
        ))}
      </div>
      <div className="relative">
        {hours.map((h) => (
          <div key={h} className="h-12 border-b relative" />
        ))}
        {/* current time indicator (basic) */}
        {date.toDateString() === new Date().toDateString() && (
          <div className="absolute left-0 right-0" style={{ top: `${(new Date().getHours() * 60 + new Date().getMinutes()) / (24 * 60) * 24 * 3}rem` }}>
            <div className="h-px bg-red-500" />
          </div>
        )}
      </div>
    </div>
  );
}


