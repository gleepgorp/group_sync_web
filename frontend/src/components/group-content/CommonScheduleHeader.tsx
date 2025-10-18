import { Button } from "@/components/ui/button";

interface CommonScheduleHeaderProps {
  currentMonth: string;
  onPreviousMonth: () => void;
  onNextMonth: () => void;
}

export function CommonScheduleHeader({ currentMonth, onPreviousMonth, onNextMonth }: CommonScheduleHeaderProps) {
  return (
    <div className="flex items-center justify-between px-6 py-4">
      <div className="text-2xl font-bold tracking-tight">{currentMonth}</div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" aria-label="Previous month" onClick={onPreviousMonth}>
          <span className="sr-only">Previous</span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-5"><path d="m15 18-6-6 6-6"/></svg>
        </Button>
        <Button variant="ghost" size="icon" aria-label="Next month" onClick={onNextMonth}>
          <span className="sr-only">Next</span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-5"><path d="m9 18 6-6-6-6"/></svg>
        </Button>
      </div>
    </div>
  );
}

export default CommonScheduleHeader;
