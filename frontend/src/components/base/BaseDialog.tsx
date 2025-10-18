
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import type { ReactNode } from "react";

interface BaseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Optional trigger element; if provided, wraps with DialogTrigger */
  trigger?: ReactNode;
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl";
}

/**
 * BaseDialog component for consistent dialog styling across the application
 */
export function BaseDialog({
  open,
  onOpenChange,
  trigger,
  title,
  description,
  children,
  footer,
  maxWidth = "2xl"
}: BaseDialogProps) {
  const maxWidthClass = `max-w-${maxWidth}`;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger ? <DialogTrigger asChild>{trigger}</DialogTrigger> : null}
      <DialogContent className={`${maxWidthClass} rounded-2xl`}>
        <DialogHeader className="border-b border-border pb-4">
          <DialogTitle className="text-xl font-semibold">
            {title}
          </DialogTitle>
          {description}
        </DialogHeader>

        <div className="">
          {children}
        </div>

        {footer && (
          <DialogFooter className="border-t border-border pt-4 flex-row gap-3">
            {footer}
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
