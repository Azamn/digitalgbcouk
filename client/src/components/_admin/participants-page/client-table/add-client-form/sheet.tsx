"use client";

import * as React from "react";
import { PlusCircle } from "lucide-react";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import ClientCreateForm from "./form";

export default function AddClientModal() {
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
          size="sm"
          className="flex items-center gap-x-2 bg-warning text-dark"
        >
          <PlusCircle className="size-[14px]" />
          Add Client
        </Button>
      </DialogTrigger>

      {/* Modal Content */}
      <DialogContent className="max-w-[600px] sm:max-w-[650px] rounded-xl bg-white">
        <DialogHeader className="hidden">
          <DialogTitle className="text-primary">Create New Client</DialogTitle>
          <DialogDescription>
            Add a new client to your dashboard.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 max-h-[calc(100vh-100px)] overflow-y-auto p-2">
          <ClientCreateForm onSuccess={handleSuccess} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
