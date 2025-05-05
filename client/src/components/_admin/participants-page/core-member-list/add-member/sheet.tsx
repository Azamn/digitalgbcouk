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
import MemberCreateForm from "./form";

export default function AddCoreMember() {
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
          className="flex items-center gap-x-2 bg-primary text-secondary"
        >
          <PlusCircle className="size-[14px]" /> Add Core Member
        </Button>
      </DialogTrigger>

      {/* Modal Content */}
      <DialogContent className="to max-w-lg rounded border-2 border-primary bg-white ">
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
