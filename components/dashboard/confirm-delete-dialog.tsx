"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ConfirmDeleteDialog({
  trigger, title, description, onConfirm,
}: { trigger: React.ReactNode; title: string; description: string; onConfirm: () => void }) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/40" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[92%] max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-md bg-surface p-6 shadow-xl outline-none">
          <div className="mb-3 flex items-center gap-2 text-destructive">
            <AlertTriangle className="size-5" />
            <Dialog.Title className="font-display text-lg font-semibold text-foreground">{title}</Dialog.Title>
          </div>
          <Dialog.Description className="mb-5 text-sm text-foreground-muted">{description}</Dialog.Description>
          <div className="flex justify-end gap-2">
            <Dialog.Close asChild>
              <Button variant="outline" size="sm">Cancel</Button>
            </Dialog.Close>
            <Dialog.Close asChild>
              <Button variant="destructive" size="sm" onClick={onConfirm}>Delete</Button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
