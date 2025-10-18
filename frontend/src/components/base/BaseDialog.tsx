
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import type { ReactNode } from "react";

interface BaseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
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
  title,
  description,
  children,
  footer,
  maxWidth = "2xl"
}: BaseDialogProps) {
  const maxWidthClass = `max-w-${maxWidth}`;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={`${maxWidthClass} rounded-2xl`}>
        <DialogHeader className="border-b border-border pb-4">
          <DialogTitle className="text-xl font-semibold">
            {title}
          </DialogTitle>
          {description && (
            <DialogDescription className="text-sm text-muted-foreground mt-1">
              {description}
            </DialogDescription>
          )}
        </DialogHeader>

        <div className="py-4">
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
