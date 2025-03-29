"use client";
import { Edit, MoreHorizontal, Trash2, UserPlus } from "lucide-react";
import { useState } from "react";
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
import {
  useDeleteParticipantMutation,
  useSendInviteToParticipantsMutation,
} from "@/server-api/participant.api";
import { useAppToasts } from "@/hooks/use-app-toast";
import { ParticipantEditSheet } from "./participants-edit";
import Spinner from "@/components/ui/spinner";

interface ActionsDropdownProps {
  inviteStatus: "ACCEPTED" | "PENDING";
  participantdata: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: "CLIENT" | "MEMBER";
  };
  onEdit: (data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) => Promise<void>;
  onDelete: () => Promise<void>;
}

export function ActionsDropdown({
  participantdata,
  onEdit,
  onDelete,
  inviteStatus,
}: ActionsDropdownProps) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isInviteOpen, setInviteOpen] = useState(false);
  const { ErrorToast, SuccessToast } = useAppToasts();

  const [DeleteParticipant, { isLoading: isDeleting }] = useDeleteParticipantMutation();
  const [SendInvite, { isLoading: isInviting }] = useSendInviteToParticipantsMutation();

  const isLoading = isDeleting || isInviting; // Combine loading states

  const handleDelete = async () => {
    try {
      const resp = await DeleteParticipant({
        participantId: participantdata.id,
        role: participantdata.role,
      }).unwrap();
      if (resp.status === "success") {
        SuccessToast({ title: "Participant deleted successfully" });
      } else {
        ErrorToast({ title: resp.message });
      }
      setIsDeleteOpen(false);
    } catch (error) {
      ErrorToast({ title: "Failed to delete participant" });
    }
  };

  const handleSendInvite = async () => {
    try {
      const resp = await SendInvite({
        email: participantdata.email,
        id: participantdata.id,
        password: participantdata.password,
        role: participantdata.role,
      }).unwrap();
      if (resp.status === "success") {
        SuccessToast({ title: resp.message });
      } else {
        ErrorToast({ title: resp.message });
      }
    } catch (error) {
      ErrorToast({ title: "Failed to send invite code" });
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="h-8 w-8 p-0 hover:bg-violet-50"
            disabled={isLoading}
          >
            <span className="sr-only">Open menu</span>
            {isLoading ? <Spinner color="#7c3aed" size={15} /> : <MoreHorizontal className="h-4 w-4 text-violet-600" />}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="border border-gray-200 bg-secondary shadow-md" align="end">
          <DropdownMenuLabel className="font-medium text-primary">Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => setInviteOpen(true)}
            className="flex items-center gap-2 text-blue-600 hover:bg-blue-100"
            disabled={isLoading}
          >
            <UserPlus className="h-4 w-4" />
            Invite
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-gray-200" />
          <DropdownMenuItem
            onClick={() => setIsEditOpen(true)}
            className="flex items-center gap-2 text-primary hover:bg-gray-100"
            disabled={isLoading}
          >
            <Edit className="h-4 w-4" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setIsDeleteOpen(true)}
            className="flex items-center gap-2 text-red-600 hover:bg-red-100"
            disabled={isLoading}
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ParticipantEditSheet
        participant={participantdata}
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        onSubmit={onEdit}
        inviteStatus={inviteStatus}
      />

      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Participant</AlertDialogTitle>
            <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className="w-[100px] bg-red-600" onClick={handleDelete} disabled={isDeleting}>
              {isDeleting ? <Spinner /> : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={isInviteOpen} onOpenChange={setInviteOpen}>
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Invite Participant</AlertDialogTitle>
            <AlertDialogDescription>You are sharing email and password!</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleSendInvite} className="bg-primary text-secondary" disabled={isInviting}>
              {isInviting ? <Spinner /> : "Send"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
