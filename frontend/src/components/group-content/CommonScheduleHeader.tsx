import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

interface CommonScheduleHeaderProps {
  currentMonth: string;
  onPreviousMonth: () => void;
  onNextMonth: () => void;
}

export function CommonScheduleHeader({ currentMonth, onPreviousMonth, onNextMonth }: CommonScheduleHeaderProps) {
  return (
    <div className="flex items-center px-6 py-4">
      <div className="text-2xl font-bold tracking-tight min-w-52">{currentMonth}</div>
      <div className="flex items-center gap-2 ml-6">
        <Button variant="ghost" size="icon" aria-label="Previous month" onClick={onPreviousMonth}>
          <ChevronLeftIcon className="size-4" />
        </Button>
        <Button variant="ghost" size="icon" aria-label="Next month" onClick={onNextMonth}>
          <ChevronRightIcon className="size-4" />
        </Button>
      </div>
    </div>
  );
}

export default CommonScheduleHeader;
