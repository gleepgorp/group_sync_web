interface ScheduleListItemProps {
  date: Date;
}

export function ScheduleListItem({ date }: ScheduleListItemProps) {
  const dayNumber = date.getDate();
  const weekday = date.toLocaleDateString(undefined, { weekday: "short" }).toUpperCase();
  const month = date.toLocaleDateString(undefined, { month: "short" }).toUpperCase();
  return (
    <div className="w-full px-6 py-4 hover:bg-accent/40 transition-colors">
      <div className="flex items-center gap-4">
        <div className="text-2xl font-medium w-10 text-left">{dayNumber}</div>
        <div className="text-muted-foreground">{`${month}, ${weekday}`}</div>
      </div>
    </div>
  );
}

export default ScheduleListItem;
