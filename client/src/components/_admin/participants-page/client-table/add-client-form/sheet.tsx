"use client";

import * as React from "react";
import { PlusCircle } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";
import ClientCreateForm from "./form";

export default function AddClientSheet() {
  const [open, setOpen] = React.useState(false);

  const handleSuccess = () => {
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      {/* Trigger Button */}
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size={"sm"}
          className="flex items-center gap-x-2 bg-warning text-dark"
        >
          <PlusCircle className="size-[14px]" /> Add Client
        </Button>
      </SheetTrigger>

      {/* Sheet Content */}
      <SheetContent
        side="right"
        className="h-full !w-[600px] !max-w-[600px] rounded-l-xl bg-purple sm:!w-[650px]"
      >
        <SheetHeader>
          <SheetTitle className="text-primary">Create New Client</SheetTitle>
          <SheetDescription>
            Add a new client to your dashboard.
          </SheetDescription>
        </SheetHeader>
        <div className="mt-6 max-h-[calc(100vh-160px)] overflow-y-auto p-5">
          <ClientCreateForm onSuccess={handleSuccess} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
