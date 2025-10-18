import type { ReactNode } from "react";

interface MainLayoutProps {
  children: ReactNode;
}

/**
 * MainLayout wraps pages with navigation
 */
export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <main>{children}</main>
    </div>
  );
}
