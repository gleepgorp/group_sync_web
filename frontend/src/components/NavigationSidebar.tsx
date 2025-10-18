import { Home, Settings, User } from "lucide-react";
import type { MouseEvent } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type NavigationKey = "home" | "profile" | "settings";

interface NavigationSidebarProps {
  /** Currently active navigation key to style active state */
  active?: NavigationKey;
  /** Callback when a navigation icon is pressed */
  onNavigate?: (key: NavigationKey) => void;
}

/**
 * Narrow icon-only navigation sidebar (Discord-like)
 */
export function NavigationSidebar({ active = "home", onNavigate }: NavigationSidebarProps) {
  const handleClick = (key: NavigationKey) => (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (onNavigate) {onNavigate(key);}
  };

  const baseItemClass =
    "data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground";

  return (
    <aside
      className="hidden md:flex w-14 flex-col justify-center border-r bg-sidebar text-sidebar-foreground"
      aria-label="Navigation sidebar"
    >
      <div className="flex flex-col items-center gap-2 p-2">
        <Button
          variant="ghost"
          size="icon"
          aria-label="Home"
          data-active={active === "home"}
          className={cn(baseItemClass, "rounded-lg")}
          onClick={handleClick("home")}
        >
          <Home className="size-6" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Profile"
          data-active={active === "profile"}
          className={cn(baseItemClass, "rounded-lg")}
          onClick={handleClick("profile")}
        >
          <User className="size-6" />
        </Button>
      </div>

      <div className="flex flex-col items-center p-2">
        <Button
          variant="ghost"
          size="icon"
          aria-label="Settings"
          data-active={active === "settings"}
          className={cn(baseItemClass, "rounded-lg")}
          onClick={handleClick("settings")}
        >
          <Settings className="size-6" />
        </Button>
      </div>
    </aside>
  );
}

export default NavigationSidebar;
