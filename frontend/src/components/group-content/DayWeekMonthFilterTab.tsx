
import { Tabs, TabsTrigger, TabsList } from "../ui/tabs";

export default function DayWeekMonthFilterTab() {
  return (
    <Tabs>
      <TabsList className="flex gap-2">
        <TabsTrigger value="list" className="flex items-center gap-2">
          Day
        </TabsTrigger>
        <TabsTrigger value="calendar" className="flex items-center gap-2">
          Week
        </TabsTrigger>
        <TabsTrigger value="itineraries" className="flex items-center gap-2">
            Month
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
