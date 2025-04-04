"use client";
import { Edit, MoreHorizontal, Trash2, FileText } from "lucide-react";
import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useAppToasts } from "@/hooks/use-app-toast";
import Spinner from "@/components/ui/spinner";
import { EventEditSheet } from "./event-edit-sheet";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/use-auth";
import { useDeleteEventMutation } from "@/backend/events-api";

interface EventData {
  id: string;
  title: string;
  startTime: Date;
  endTime: Date;
  instagramPassword: string;
  instagramId: string;
  members: {
    name: string;
    email: string;
  }[];
  description: string;
  additional: string;
}

interface ActionsDropdownProps {
  eventData: EventData;
}

export function EventActionsDropdown({ eventData }: ActionsDropdownProps) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const { ErrorToast, SuccessToast } = useAppToasts();
  const [DeleteEvent, { isLoading: isDeleting }] = useDeleteEventMutation();
  const router = useRouter();
  const user = useAuth();
  const handlePostView = () => {
    router.push(`/admin/${user?.id}/events-list/${eventData.id}`);
  };
  const handleDelete = useCallback(async () => {
    try {
      const resp = await DeleteEvent({ eventId: eventData.id }).unwrap();
      if (resp.status === "success") {
        SuccessToast({ title: "Event deleted successfully" });
      } else {
        ErrorToast({ title: resp.message });
      }
      setIsDeleteOpen(false);
    } catch (error) {
      ErrorToast({ title: "Failed to delete event" });
    }
  }, [DeleteEvent, eventData.id, SuccessToast, ErrorToast]);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="h-8 w-8 p-0 hover:bg-violet-50"
            disabled={isDeleting}
          >
            <span className="sr-only">Open menu</span>
            {isDeleting ? (
              <Spinner color="#7c3aed" size={15} />
            ) : (
              <MoreHorizontal className="h-4 w-4 text-violet-600" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="border border-gray-200 bg-secondary shadow-md"
          align="end"
        >
          <DropdownMenuItem
            onClick={() => setIsEditOpen(true)}
            className="my-1 flex items-center gap-2 rounded-sm bg-primary text-secondary"
            disabled={isDeleting}
          >
            <Edit className="h-4 w-4" /> Edit Event
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={handlePostView}
            className="my-1 flex items-center gap-2 rounded-sm bg-primary text-secondary"
          >
            <FileText className="h-4 w-4" /> View Posts
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-gray-200" />
          <DropdownMenuItem
            onClick={() => setIsDeleteOpen(true)}
                  className="flex items-center gap-2 bg-red-400 text-secondary rounded-sm my-1"
            disabled={isDeleting}
          >
            <Trash2 className="h-4 w-4" /> Delete Event
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <EventEditSheet
        event={eventData}
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
      />

      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Delete</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this event? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="w-[100px] bg-red-600"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? <Spinner /> : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
