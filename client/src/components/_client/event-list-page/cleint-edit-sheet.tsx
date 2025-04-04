"use client";

import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAppToasts } from "@/hooks/use-app-toast";
import Spinner from "@/components/ui/spinner";
import { Instagram } from "lucide-react";
import { useUpdateClientInstagramMutation } from "@/backend/events-api";

interface InstagramEditFormData {
  instagramId: string;
  instagramPassword: string;
}

interface InstagramEditDialogProps {
  isOpen: boolean;
  onClose: () => void;
  instagramId: string;
  instagramPassword: string;
}

export function ClientInstagramEditDialog({
  isOpen,
  onClose,
  instagramId,
  instagramPassword,
}: InstagramEditDialogProps) {
  const { register, handleSubmit, reset } = useForm<InstagramEditFormData>({
    defaultValues: {
      instagramId: instagramId || "",
      instagramPassword: instagramPassword || "",
    },
  });

  const { SuccessToast, ErrorToast } = useAppToasts();
  const [updateClientInstagram, { isLoading }] =
    useUpdateClientInstagramMutation();

  const handleFormSubmit = async (data: InstagramEditFormData) => {
    try {
      const response = await updateClientInstagram(data).unwrap();

      if (response.status === "success") {
        SuccessToast({ title: response.message });
        reset();
        onClose();
      } else {
        ErrorToast({ title: response.message });
      }
    } catch (error) {
      ErrorToast({ title: "Failed to update Instagram credentials" });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-white p-6">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl font-bold text-primary">
            <Instagram className="h-6 w-6 text-blue-500" /> Edit Instagram
            Credentials
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          {/* Instagram ID */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Instagram ID
            </label>
            <Input
              {...register("instagramId")}
              className="mt-1 border-gray-300 bg-secondary px-3 py-2"
              placeholder="Enter Instagram ID"
            />
          </div>

          {/* Instagram Password */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Instagram Password
            </label>
            <Input
              {...register("instagramPassword")}
              type="password"
              className="mt-1 border-gray-300 bg-secondary px-3 py-2"
              placeholder="Enter Password"
            />
          </div>

          {/* Buttons */}
          <DialogFooter className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              className="flex-1 border-gray-300 text-gray-700 hover:bg-red-300"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-primary text-secondary hover:bg-opacity-80"
              disabled={isLoading}
            >
              {isLoading ? <Spinner /> : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
