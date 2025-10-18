import { Button } from "@/components/ui/button";

interface EmptyBaseProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

function EmptyBase({ title, description, actionLabel, onAction }: EmptyBaseProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
      <div className="size-12 rounded-full bg-accent flex items-center justify-center text-muted-foreground">★</div>
      <div className="text-base font-medium">{title}</div>
      <div className="text-sm text-muted-foreground max-w-sm">{description}</div>
      {actionLabel ? (
        <Button className="mt-2" onClick={onAction}>{actionLabel}</Button>
      ) : null}
    </div>
  );
}

export interface ListEmptyProps {
  onCreate?: () => void;
}
export function ListEmpty({ onCreate }: ListEmptyProps) {
  return (
    <EmptyBase title="No schedules yet" description="Create a schedule to get started and collaborate with your group." actionLabel="Create one" onAction={onCreate} />
  );
}

export function CalendarEmpty() {
  return (
    <EmptyBase title="No events on this month" description="Once you add events, they'll appear on your calendar here." />
  );
}

export interface ItinerariesEmptyProps {
  onCreate?: () => void;
}
export function ItinerariesEmpty({ onCreate }: ItinerariesEmptyProps) {
  return (
    <EmptyBase title="No itineraries" description="Plan your trip by creating your first itinerary." actionLabel="Create one" onAction={onCreate} />
  );
}

export interface GroupsSidebarEmptyProps {
  onCreate?: () => void;
}
export function GroupsSidebarEmpty({ onCreate }: GroupsSidebarEmptyProps) {
  return (
    <EmptyBase title="No groups yet" description="Create a group to start scheduling with friends." actionLabel="Create group" onAction={onCreate} />
  );
}


