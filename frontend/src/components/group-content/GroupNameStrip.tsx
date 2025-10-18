interface GroupNameStripProps {
  groupName: string;
}

export function GroupNameStrip({ groupName }: GroupNameStripProps) {
  return (
    <div className="px-6 py-2 text-sm text-muted-foreground">{groupName}</div>
  );
}

export default GroupNameStrip;
