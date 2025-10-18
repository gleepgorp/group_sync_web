import { Tabs, TabsTrigger, TabsList } from "../ui/tabs";

export type CalendarViewMode = "day" | "week" | "month";

interface DayWeekMonthFilterTabProps {
  value: CalendarViewMode;
  onValueChange: (mode: CalendarViewMode) => void;
}

export default function DayWeekMonthFilterTab({ value, onValueChange }: DayWeekMonthFilterTabProps) {
  return (
    <Tabs value={value} onValueChange={(v) => onValueChange(v as CalendarViewMode)}>
      <TabsList className="flex gap-2">
        <TabsTrigger value="day" className="flex items-center gap-2">
          Day
        </TabsTrigger>
        <TabsTrigger value="week" className="flex items-center gap-2">
          Week
        </TabsTrigger>
        <TabsTrigger value="month" className="flex items-center gap-2">
          Month
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
