import { MainLayout } from "@/layouts/MainLayout";
import NavigationSidebar from "@/components/NavigationSidebar";
import GroupsSidebar, { type Group } from "@/components/GroupsSidebar";
import GroupContent, { type ScheduleItem } from "@/components/GroupContent";
import { useMemo, useState } from "react";

/**
 * Index page component showing user groups
 */
export default function Index() {
  const [activeGroupId, setActiveGroupId] = useState<string>("g1");
  const [activeTab, setActiveTab] = useState<"list" | "calendar" | "itineraries">("list");

  const groups: Group[] = useMemo(
    () => [
      { id: "g1", name: "Japan trip" },
      { id: "g2", name: "ASDASDASDASDASDASDA" },
      { id: "g3", name: "The quick brown fox, fox kpk jumps over the lazy kkokqq..." }
    ],
    []
  );

  const selectedGroup = useMemo(() => groups.find(g => g.id === activeGroupId) ?? groups[0], [groups, activeGroupId]);

  const schedules: ScheduleItem[] = useMemo(
    () => [1, 4, 5, 6, 7, 13, 18, 19].map((d, i) => ({ id: `s${i}`, date: new Date(2025, 9, d) })),
    []
  );

  const handleFindCommonSchedule = () => {
    // Placeholder: integrate with backend later
    // eslint-disable-next-line no-alert
    alert("Finding common schedule...");
  };

  return (
    <MainLayout>
      <div className="flex h-screen overflow-hidden">
        <NavigationSidebar />

        <GroupsSidebar
          groups={groups}
          activeGroupId={activeGroupId}
          onGroupSelect={setActiveGroupId}
          onCreateGroup={() => {}}
        />

        <GroupContent
          groupId={selectedGroup.id}
          groupName={selectedGroup.name}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onFindCommonSchedule={handleFindCommonSchedule}
          schedules={schedules}
        />
      </div>
    </MainLayout>
  );
}
