"use client";
import { Edit, MoreHorizontal, FileText } from "lucide-react";
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
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";
import { ClientInstagramEditDialog } from "./cleint-edit-sheet";
import useAuth from "@/hooks/use-auth";

export interface ClientData {
  id: string;
  instagramId: string;
  instagramPassword: string;
}

interface ClientActionsProps {
  clientData: {
    id: string;
    instagramId: string;
    instagramPassword: string;
  };
}

export function ClientActionsDropdown({ clientData }: ClientActionsProps) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const router = useRouter();
  const user = useAuth()
  const handleViewPost = () => {
    router.push(`/client/${user?.id}/events-list/${clientData.id}`);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-gray-50">
            <MoreHorizontal className="h-4 w-4 text-gray-600" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="border border-gray-200 bg-secondary shadow-md"
          align="end"
        >
          <DropdownMenuLabel className="font-medium text-primary">
            Actions
          </DropdownMenuLabel>

          {/* Edit Instagram Credentials */}
          <DropdownMenuItem
            onClick={() => setIsEditOpen(true)}
            className="flex items-center gap-2 text-primary hover:bg-gray-100"
          >
            <Edit className="h-4 w-4" /> Edit Instagram Credentials
          </DropdownMenuItem>

          {/* View/Edit Post */}
          <DropdownMenuItem
            onClick={handleViewPost}
            className="flex items-center gap-2 text-blue-600 hover:bg-blue-100"
          >
            <FileText className="h-4 w-4" /> View Post
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Instagram Edit Sheet */}
      <ClientInstagramEditDialog
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        instagramId={clientData.instagramId}
        instagramPassword={clientData.instagramPassword}
      />
    </>
  );
}
