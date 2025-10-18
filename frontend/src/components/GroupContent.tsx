import GroupContentHeader from "@/components/group-content/GroupContentHeader";
import GroupNameStrip from "@/components/group-content/GroupNameStrip";
import CommonScheduleList, { type ScheduleItem } from "@/components/group-content/CommonScheduleList";
import { ListEmpty } from "@/components/group-content/EmptyStates";
import CalendarTab from "@/components/group-content/CalendarTab";
import ItinerariesTab from "@/components/group-content/ItinerariesTab";
import { useState } from "react";
import InviteDialog from "./groups/InviteDialog";

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
  const [isOpenInviteDialog, setIsOpenInviteDialog] = useState<boolean>(false);

  return (
    <main className="flex-1 flex flex-col bg-background">
      <GroupContentHeader setIsOpenInviteDialog={setIsOpenInviteDialog} activeTab={activeTab} onTabChange={onTabChange} onFindCommonSchedule={onFindCommonSchedule} />
      <GroupNameStrip groupName={groupName} />
      <div className="flex-1 overflow-y-auto">
        {activeTab === "list" && (schedules.length ? <CommonScheduleList schedules={schedules} /> : <ListEmpty />)}
        {activeTab === "calendar" && <CalendarTab />}
        {activeTab === "itineraries" && <ItinerariesTab />}
      </div>
      <InviteDialog open={isOpenInviteDialog} onOpenChange={setIsOpenInviteDialog} onConfirm={() => {}} />
    </main>
  );
}
export default GroupContent;
