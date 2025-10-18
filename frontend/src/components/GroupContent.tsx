import GroupContentHeader from "@/components/group-content/GroupContentHeader";
import GroupNameStrip from "@/components/group-content/GroupNameStrip";
import CommonScheduleList, { type ScheduleItem } from "@/components/group-content/CommonScheduleList";
import CalendarTab from "@/components/group-content/CalendarTab";
import ItinerariesTab from "@/components/group-content/ItinerariesTab";

interface GroupContentProps {
  groupId: string;
  groupName: string;
  activeTab: "list" | "calendar" | "itineraries";
  onTabChange: (tab: "list" | "calendar" | "itineraries") => void;
  onFindCommonSchedule: () => void;
  schedules?: ScheduleItem[];
}

export function GroupContent({
  groupId,
  groupName,
  activeTab,
  onTabChange,
  onFindCommonSchedule,
  schedules = []
}: GroupContentProps) {
  // Keep reference usage of groupId for future logic
  void groupId;

  return (
    <main className="flex-1 flex flex-col bg-background">
      <GroupContentHeader activeTab={activeTab} onTabChange={onTabChange} onFindCommonSchedule={onFindCommonSchedule} />
      <GroupNameStrip groupName={groupName} />
      <div className="flex-1 overflow-y-auto">
        {activeTab === "list" && <CommonScheduleList schedules={schedules} />}
        {activeTab === "calendar" && <CalendarTab />}
        {activeTab === "itineraries" && <ItinerariesTab />}
      </div>
    </main>
  );
}
export default GroupContent;
