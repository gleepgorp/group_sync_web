import type { ReactNode } from "react";

interface BaseAvatarProps {
  children: ReactNode;
  size?: "sm" | "md" | "lg";
  className?: string;
}

/**
 * BaseAvatar component for displaying user initials
 */
export function BaseAvatar({
  children,
  size = "md",
  className = ""
}: BaseAvatarProps) {
  const sizeClasses = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-12 h-12 text-base"
  };

  return (
    <div
      className={`bg-muted rounded-full border-2 border-card flex items-center justify-center text-muted-foreground font-medium ${sizeClasses[size]} ${className}`.trim()}
    >
      {children}
    </div>
  );
}
