
import { Button } from "@/components/ui/button";
import type { ReactNode } from "react";

interface BaseButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: "default" | "secondary" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  fullWidth?: boolean;
}

/**
 * BaseButton component for consistent button styling across the application
 */
export function BaseButton({
  children,
  onClick,
  variant = "default",
  size = "default",
  className = "",
  type = "button",
  disabled = false,
  fullWidth = false,
}: BaseButtonProps) {
  const widthClass = fullWidth ? "w-full" : "";
  
  return (
    <Button
      type={type}
      variant={variant}
      size={size}
      onClick={onClick}
      disabled={disabled}
      className={`${widthClass} ${className}`.trim()}
    >
      {children}
    </Button>
  );
}

