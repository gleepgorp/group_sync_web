import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MoreVertical, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import CreateGroupDialog from "@/components/groups/CreateGroupDialog";
import { GroupsSidebarEmpty } from "@/components/group-content/EmptyStates";

export interface Group {
  id: string;
  name: string;
}

interface GroupsSidebarProps {
  groups: Group[];
  activeGroupId?: string;
  onGroupSelect: (groupId: string) => void;
  onCreateGroup: () => void;
}

interface GroupsSidebarHeaderProps {
  onCreateGroup: () => void;
}

interface GroupSearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

interface GroupListItemProps {
  group: Group;
  isActive?: boolean;
  onClick: () => void;
  onOptionsClick: () => void;
}

export function GroupsSidebar({
  groups,
  activeGroupId,
  onGroupSelect,
  onCreateGroup
}: GroupsSidebarProps) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {return groups;}
    return groups.filter(g => g.name.toLowerCase().includes(q));
  }, [groups, query]);

  return (
    <aside className="w-[340px] max-w-[380px] min-w-[320px] bg-sidebar/50 border-r flex-shrink-0 md:flex hidden flex-col">
      <GroupsSidebarHeader onCreateGroup={() => setOpen(true)} />
      <GroupSearchBar value={query} onChange={setQuery} placeholder="Search groups" />
      <div className="flex-1 overflow-y-auto px-2 py-1">
        {filtered.length === 0 ? (
          <div className="px-2"><GroupsSidebarEmpty onCreate={() => setOpen(true)} /></div>
        ) : (
          <div className="flex flex-col">
            {filtered.map(group => (
              <GroupListItem
                key={group.id}
                group={group}
                isActive={group.id === activeGroupId}
                onClick={() => onGroupSelect(group.id)}
                onOptionsClick={() => {}}
              />
            ))}
          </div>
        )}
      </div>
      <CreateGroupDialog
        open={open}
        onOpenChange={setOpen}
        onConfirm={() => {
          onCreateGroup();
          setOpen(false);
          // Placeholder: integrate persistence later
        }}
      />
    </aside>
  );
}

function GroupsSidebarHeader({ onCreateGroup }: GroupsSidebarHeaderProps) {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="text-base font-semibold tracking-tight">Groupsync</div>
      <Button size="sm" variant="secondary" onClick={onCreateGroup} className="rounded-lg">
        <Plus className="size-4" />
        Create group
      </Button>
    </div>
  );
}

function GroupSearchBar({ value, onChange, placeholder }: GroupSearchBarProps) {
  return (
    <div className="px-4 pb-2">
      <div className="relative">
        {/* inline icon using absolute positioning */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground"
          aria-hidden
        >
          <circle cx="11" cy="11" r="7" />
          <line x1="21" x2="16.65" y1="21" y2="16.65" />
        </svg>
        <Input
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          className="pl-9 bg-background border-input rounded-lg"
        />
      </div>
    </div>
  );
}

function GroupListItem({ group, isActive, onClick, onOptionsClick }: GroupListItemProps) {
  return (
    <div
      role="button"
      onClick={onClick}
      className={cn(
        "group flex items-center justify-between gap-2 py-3 px-3 rounded-md cursor-pointer",
        "hover:bg-accent/40 border-b border-border/70",
        isActive && "bg-accent/70"
      )}
      title={group.name}
    >
      <div className="min-w-0 text-sm font-medium text-foreground/90">
        <span className="block truncate">{group.name}</span>
      </div>
      <Button
        variant="ghost"
        size="icon-sm"
        aria-label="Group options"
        className="opacity-100 md:opacity-60 md:group-hover:opacity-100"
        onClick={e => {
          e.stopPropagation();
          onOptionsClick();
        }}
      >
        <MoreVertical className="size-4" />
      </Button>
    </div>
  );
}

export default GroupsSidebar;
