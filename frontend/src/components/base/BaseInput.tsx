import type { InputHTMLAttributes } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export interface BaseInputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Optional label text shown above the input */
  label?: string;
  /** Visually hide the label but keep it accessible */
  visuallyHiddenLabel?: boolean;
  /** Custom class for the outer wrapper */
  wrapperClassName?: string;
}

/**
 * BaseInput wraps shadcn Input with an optional label for consistent forms
 */
export function BaseInput({
  id,
  label,
  visuallyHiddenLabel,
  wrapperClassName,
  className,
  ...props
}: BaseInputProps) {
  const inputId = id ?? props.name ?? undefined;

  return (
    <div className={cn("flex flex-col gap-1.5", wrapperClassName)}>
      {label ? (
        <Label htmlFor={inputId} className={cn("text-sm", visuallyHiddenLabel && "sr-only")}>{label}</Label>
      ) : null}
      <Input id={inputId} className={className} {...props} />
    </div>
  );
}

export default BaseInput;


