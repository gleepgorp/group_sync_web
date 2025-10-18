import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PrevNextButtonsProps {
  onPrevious: () => void;
  onNext: () => void;
  className?: string;
  iconClassName?: string;
  previousDisabled?: boolean;
  nextDisabled?: boolean;
  previousAriaLabel?: string;
  nextAriaLabel?: string;
}

/**
 * Reusable pair of previous/next icon buttons (chevrons) used in schedulers.
 */
export function PrevNextButtons({
  onPrevious,
  onNext,
  className,
  iconClassName,
  previousDisabled = false,
  nextDisabled = false,
  previousAriaLabel = "Previous",
  nextAriaLabel = "Next"
}: PrevNextButtonsProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Button
        variant="ghost"
        size="icon"
        aria-label={previousAriaLabel}
        onClick={onPrevious}
        disabled={previousDisabled}
      >
        <ChevronLeftIcon className={cn("size-4", iconClassName)} />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        aria-label={nextAriaLabel}
        onClick={onNext}
        disabled={nextDisabled}
      >
        <ChevronRightIcon className={cn("size-4", iconClassName)} />
      </Button>
    </div>
  );
}

export default PrevNextButtons;


