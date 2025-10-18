import { CalendarDays, List, Map } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface GroupContentHeaderProps {
  activeTab: "list" | "calendar" | "itineraries";
  onTabChange: (tab: "list" | "calendar" | "itineraries") => void;
  onFindCommonSchedule: () => void;
}

export function GroupContentHeader({ activeTab, onTabChange, onFindCommonSchedule }: GroupContentHeaderProps) {
  const tabButtonClass = (isActive: boolean) =>
    buttonVariants({
      variant: "ghost",
      size: "sm",
      className: cn("rounded-lg", isActive && "data-[active=true]:")
    });

  return (
    <div className="flex items-center justify-between px-6 py-4 border-b">
      <div className="flex items-center gap-6">
        <button
          className={tabButtonClass(activeTab === "list")}
          data-active={activeTab === "list"}
          onClick={() => onTabChange("list")}
        >
          <List className="mr-2 size-4" /> List
        </button>
        <button
          className={tabButtonClass(activeTab === "calendar")}
          data-active={activeTab === "calendar"}
          onClick={() => onTabChange("calendar")}
        >
          <CalendarDays className="mr-2 size-4" /> Calendar
        </button>
        <button
          className={tabButtonClass(activeTab === "itineraries")}
          data-active={activeTab === "itineraries"}
          onClick={() => onTabChange("itineraries")}
        >
          <Map className="mr-2 size-4" /> Itineraries
        </button>
      </div>
      <Button className="rounded-lg" onClick={onFindCommonSchedule}>Find common schedule</Button>
    </div>
  );
}

export default GroupContentHeader;
