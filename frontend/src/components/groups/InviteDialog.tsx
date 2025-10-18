import { useState } from "react";
import { BaseDialog } from "@/components/base/BaseDialog";
import BaseInput from "@/components/base/BaseInput";
import { Button } from "@/components/ui/button";

interface InviteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (name: string) => void;
}

export function InviteDialog({ open, onOpenChange, onConfirm }: InviteDialogProps) {
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
      title="Invite to Group"
      description="Invite someone to the group."
      footer={footer}
      maxWidth="md"
    >
      <BaseInput
        label="Email"
        placeholder="e.g., example@example.com"
        value={name}
        onChange={e => setName(e.target.value)}
      />
    </BaseDialog>
  );
}

export default InviteDialog;
