interface CalendarTabProps {}

export function CalendarTab(_props: CalendarTabProps) {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const cells = Array.from({ length: 35 }, (_, i) => i + 1);
  return (
    <div className="px-6 pb-6">
      <div className="grid grid-cols-7 gap-2 text-sm text-muted-foreground mb-2">
        {daysOfWeek.map(d => (
          <div key={d} className="p-2 text-center font-medium">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2">
        {cells.map(n => (
          <div key={n} className="aspect-square border rounded-md flex items-start justify-start p-2 text-sm text-muted-foreground">
            {n}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CalendarTab;


