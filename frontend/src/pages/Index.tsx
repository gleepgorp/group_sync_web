import { MainLayout } from "@/layouts/MainLayout";
import NavigationSidebar, { type NavigationKey } from "@/components/NavigationSidebar";
import GroupsSidebar, { type Group } from "@/components/GroupsSidebar";
import GroupContent from "@/components/GroupContent";
import type { ScheduleItem } from "@/components/group-content/CommonScheduleList";
import ProfileContent from "@/pages/ProfileContent.tsx";
import { useMemo, useState } from "react";

/**
 * Index page component showing user groups
 */
export default function Index() {
  const [activeGroupId, setActiveGroupId] = useState<string>("g1");
  const [activeTab, setActiveTab] = useState<"list" | "calendar" | "itineraries">("list");
  const [activeNav, setActiveNav] = useState<NavigationKey>("home");

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
     
    alert("Finding common schedule...");
  };

  return (
    <MainLayout>
      <div className="flex h-screen overflow-hidden">
        <NavigationSidebar active={activeNav} onNavigate={setActiveNav} />

        <GroupsSidebar
          groups={groups}
          activeGroupId={activeGroupId}
          onGroupSelect={setActiveGroupId}
          onCreateGroup={() => {}}
        />

        {activeNav === "home" && (
          <GroupContent
            groupId={selectedGroup.id}
            groupName={selectedGroup.name}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            onFindCommonSchedule={handleFindCommonSchedule}
            schedules={schedules}
          />
        )}

        {activeNav === "profile" && (
          <div className="flex-1 flex flex-col">
            <ProfileContent />
          </div>
        )}

        {activeNav === "settings" && (
          <div className="flex-1 flex items-center justify-center text-muted-foreground">
            Settings coming soon
          </div>
        )}
      </div>
    </MainLayout>
  );
}
