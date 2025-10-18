
import type { ReactNode } from "react";

interface BaseCardProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  hoverable?: boolean;
}

/**
 * BaseCard component for consistent card styling across the application
 */
export function BaseCard({
  children,
  onClick,
  className = "",
  hoverable = false
}: BaseCardProps) {
  const hoverClass = hoverable ? "hover:shadow-md transition-shadow cursor-pointer" : "";
  const clickableClass = onClick ? "cursor-pointer" : "";

  return (
    <div
      onClick={onClick}
      className={`bg-card rounded-xl border border-border shadow-sm ${hoverClass} ${clickableClass} ${className}`.trim()}
    >
      {children}
    </div>
  );
}
