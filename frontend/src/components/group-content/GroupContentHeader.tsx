// adjustment: converted to shadcn Tabs
import { CalendarDays, List, Map, UserPlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface GroupContentHeaderProps {
  activeTab: "list" | "calendar" | "itineraries";
  onTabChange: (value: "list" | "calendar" | "itineraries") => void;
  onFindCommonSchedule: () => void;
  setIsOpenInviteDialog: (open: boolean) => void;
}

export function GroupContentHeader({
  activeTab,
  onTabChange,
  onFindCommonSchedule,
  setIsOpenInviteDialog
}: GroupContentHeaderProps) {
  return (
    <div className="flex items-center justify-between px-6 py-4 border-b">
      <Tabs value={activeTab} onValueChange={onTabChange as (value: string) => void}>
        <TabsList className="flex gap-2">
          <TabsTrigger value="list" className="flex items-center gap-2">
            <List className="size-4" /> List
          </TabsTrigger>
          <TabsTrigger value="calendar" className="flex items-center gap-2">
            <CalendarDays className="size-4" /> Calendar
          </TabsTrigger>
          <TabsTrigger value="itineraries" className="flex items-center gap-2">
            <Map className="size-4" /> Itineraries
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="flex items-center gap-2">
        <Button
          icon={<UserPlusIcon className="size-4" />}
          variant="outline"
          className="rounded-lg"
          onClick={() => setIsOpenInviteDialog(true)}
        >
          Invite
        </Button>
        <Button className="rounded-lg" onClick={onFindCommonSchedule}>
          Find common schedule
        </Button>
      </div>
    </div>
  );
}

export default GroupContentHeader;
