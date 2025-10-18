import PrevNextButtons from "@/components/base/BasePrevNextButtons";

interface CommonScheduleHeaderProps {
  currentMonth: string;
  onPreviousMonth: () => void;
  onNextMonth: () => void;
}

export function CommonScheduleHeader({ currentMonth, onPreviousMonth, onNextMonth }: CommonScheduleHeaderProps) {
  return (
    <div className="flex items-center px-6 py-4">
      <div className="text-2xl font-bold tracking-tight min-w-52">{currentMonth}</div>
      <PrevNextButtons
        className="ml-6"
        onPrevious={onPreviousMonth}
        onNext={onNextMonth}
        previousAriaLabel="Previous month"
        nextAriaLabel="Next month"
      />
    </div>
  );
}

export default CommonScheduleHeader;
