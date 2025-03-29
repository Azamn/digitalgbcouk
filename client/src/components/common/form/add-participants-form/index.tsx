"use client";

import * as React from "react";
import { PlusCircle } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import ParticipantCreate from "./form";

export default function AddParticipantForm() {
  const [open, setOpen] = React.useState(false);

  const handleSuccess = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* Trigger Button */}
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center gap-x-2 bg-dark text-sm text-secondary"
        >
          <PlusCircle className="size-[14px]" /> Add new
        </Button>
      </DialogTrigger>

      {/* Modal Content */}
      <DialogContent className="max-w-lg rounded-lg border-2 border-dark bg-white bg-gradient-to-b">
        <DialogHeader>
          <DialogTitle className="text-primary">
            Create New Participant
          </DialogTitle>
          <DialogDescription>Add a new participant.</DialogDescription>
        </DialogHeader>

        <div className="h-auto overflow-y-auto pb-4">
          <ParticipantCreate onSuccess={handleSuccess} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
