import { useMemo } from "react";

export interface WeekCalendarViewProps {
  /** Any date within the week to render (Sunday-start) */
  weekDate: Date;
}

function startOfWeek(d: Date): Date {
  const day = d.getDay();
  const start = new Date(d);
  start.setDate(d.getDate() - day);
  start.setHours(0, 0, 0, 0);
  return start;
}

export default function WeekCalendarView({ weekDate }: WeekCalendarViewProps) {
  const weekStart = useMemo(() => startOfWeek(weekDate), [weekDate]);
  const days = useMemo(() => Array.from({ length: 7 }, (_, i) => new Date(weekStart.getFullYear(), weekStart.getMonth(), weekStart.getDate() + i)), [weekStart]);
  const hours = useMemo(() => Array.from({ length: 24 }, (_, h) => h), []);

  const labelForHour = (h: number) => {
    const ampm = h < 12 ? "AM" : "PM";
    const hour12 = h % 12 === 0 ? 12 : h % 12;
    return `${hour12} ${ampm}`;
  };

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="grid grid-cols-[48px,1fr] sm:grid-cols-[64px,1fr]">
        <div />
        <div className="grid grid-cols-7 text-xs text-muted-foreground">
          {days.map((d, i) => (
            <div key={i} className="p-2 text-center border-l first:border-l-0">
              {d.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" })}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-[48px,1fr] sm:grid-cols-[64px,1fr]">
        <div className="flex flex-col">
          {hours.map((h) => (
            <div key={h} className="h-12 border-t px-1 sm:px-2 text-[10px] sm:text-xs text-muted-foreground">
              {labelForHour(h)}
            </div>
          ))}
        </div>

        <div className="overflow-x-auto">
          <div className="grid grid-cols-7 min-w-[700px]">
            {days.map((_, dayIndex) => (
              <div key={dayIndex} className="border-l first:border-l-0">
                {hours.map((h) => (
                  <div key={h} className="h-12 border-t" />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


