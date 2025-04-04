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
import ClientCreateForm from "./form";
import MemberCreateForm from "./form";

export default function AddMemberDialog() {
  const [open, setOpen] = React.useState(false);

  const handleSuccess = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* Trigger Button */}
      <DialogTrigger asChild>
        <Button
          size="sm"
          variant="outline"
          className="flex items-center gap-x-2 bg-warning  text-dark"
        >
          <PlusCircle className="size-[14px]" /> Add Member
        </Button>
      </DialogTrigger>

      {/* Modal Content */}
      <DialogContent className="max-w-lg rounded-lg border-2 border-dark bg-success bg-gradient-to-b">
        <DialogHeader>
          <DialogTitle className="text-primary">Create New Client</DialogTitle>
          <DialogDescription>Add a new Client.</DialogDescription>
        </DialogHeader>

        <div className="h-auto overflow-y-auto pb-4">
          <MemberCreateForm onSuccess={handleSuccess} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
