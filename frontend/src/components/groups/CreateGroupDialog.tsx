import { useState } from "react";
import { BaseDialog } from "@/components/base/BaseDialog";
import BaseInput from "@/components/base/BaseInput";
import { Button } from "@/components/ui/button";

interface CreateGroupDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (name: string) => void;
}

export function CreateGroupDialog({ open, onOpenChange, onConfirm }: CreateGroupDialogProps) {
  const [name, setName] = useState("");

  const footer = (
    <div className="ml-auto flex gap-2">
      <Button variant="ghost" onClick={() => onOpenChange(false)}>Cancel</Button>
      <Button onClick={() => onConfirm(name)} disabled={name.trim().length === 0}>Confirm</Button>
    </div>
  );

  return (
    <BaseDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Create Group"
      description="Create a new group to plan schedules and itineraries."
      footer={footer}
      maxWidth="md"
    >
      <BaseInput
        label="Group Name"
        placeholder="e.g., Japan Trip"
        value={name}
        onChange={e => setName(e.target.value)}
      />
    </BaseDialog>
  );
}

export default CreateGroupDialog;
