"use client";
import * as React from "react";
import { PlusCircle } from "lucide-react";

import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";

import { CreateEvent } from "./form";

export default function AddEventForm({ clientId }: { clientId: string }) {
  const [open, setOpen] = React.useState(false);

  const handleSuccess = () => {
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      {/* Trigger Button */}
      <SheetTrigger asChild>
        <span className="mt-1 inline-flex cursor-pointer items-center gap-x-2 rounded border border-primary bg-green-300 px-3 py-1 text-primary">
          <PlusCircle className="size-[14px]" /> Add Event
        </span>
      </SheetTrigger>

      {/* Sheet Content */}
      <SheetContent
        side="right"
        className="!w-[600px] !max-w-[600px] bg-secondary sm:!w-[800px]"
      >
        <SheetHeader>
          <SheetTitle className="text-primary">Create New Event</SheetTitle>
          <SheetDescription>Add a new event for this client.</SheetDescription>
        </SheetHeader>

        {/* Form Wrapper */}
        <div className="h-[90%] w-full overflow-y-auto pb-6">
          <CreateEvent clientId={clientId} onSuccess={handleSuccess} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
