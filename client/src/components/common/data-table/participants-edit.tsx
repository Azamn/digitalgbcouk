import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserPlus, Mail, Lock, Loader2 } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import FormField from "@/components/ui/form-field";
import { useAppToasts } from "@/hooks/use-app-toast";
import Spinner from "@/components/ui/spinner";
import { useEditParticipantMutation } from "@/backend/participant.api";

export interface EditParticipantFormData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: "CLIENT" | "MEMBER";
}
interface ParticipantEditSheetProps {
  participant: EditParticipantFormData;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: EditParticipantFormData) => Promise<void>;
  inviteStatus: "ACCEPTED" | "PENDING";
}

export function ParticipantEditSheet({
  participant,
  isOpen,
  onClose,
  onSubmit,
  inviteStatus,
}: ParticipantEditSheetProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditParticipantFormData>({
    defaultValues: participant,
  });
  const { SuccessToast, ErrorToast, WarningToast } = useAppToasts();
  const [EditParticipant, { isLoading }] = useEditParticipantMutation();

  const handleFormSubmit = async (data: EditParticipantFormData) => {
    if (inviteStatus === "ACCEPTED") {
      WarningToast({
        title: "You can not edit this ",
        description: "Participant has already accepted the invitation.",
      });
      return;
    }
    try {
      const resp = await EditParticipant(data).unwrap();
      if (resp.status === "success") {
        SuccessToast({
          title: resp.message,
        });
        onClose();
      } else {
        ErrorToast({
          title: resp.message,
        });
      }
    } catch (error) {
      ErrorToast({
        title: "Failed to edit participant",
      });
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="rounded-l-3xl border-l-secondary bg-white sm:max-w-[500px]">
        <SheetHeader>
          <SheetTitle className="bg-clip-text text-2xl font-bold text-primary">
            Edit Participant
          </SheetTitle>
        </SheetHeader>

        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="mt-8 space-y-6"
        >
          <div className="flex gap-4">
            <FormField label="First Name" className="flex-1">
              <UserPlus className="absolute left-3 top-3 h-5 w-5 text-primary" />
              <Input
                {...register("firstName")}
                className="border-primary bg-secondary pl-10 text-primary focus:border-primary focus:ring-primary"
              />
              {errors.firstName && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.firstName.message}
                </p>
              )}
            </FormField>

            <FormField label="Last Name" className="flex-1">
              <UserPlus className="absolute left-3 top-3 h-5 w-5 text-primary" />
              <Input
                {...register("lastName")}
                className="border-primary bg-secondary pl-10 text-primary focus:border-primary focus:ring-primary"
              />
              {errors.lastName && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.lastName.message}
                </p>
              )}
            </FormField>
          </div>

          <FormField label="Email">
            <Mail className="absolute left-3 top-3 h-5 w-5 text-primary" />
            <Input
              {...register("email")}
              type="email"
              className="border-primary bg-secondary pl-10 text-primary focus:border-primary focus:ring-primary"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </FormField>

          <FormField label="Password">
            <Lock className="absolute left-3 top-3 h-5 w-5 text-primary" />
            <Input
              {...register("password")}
              type="password"
              className="border-primary bg-secondary pl-10 text-primary focus:border-primary focus:ring-primary"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </FormField>

          <SheetFooter className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 border-primary text-primary hover:bg-red-300"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-primary text-secondary hover:bg-opacity-80"
            >
              {isLoading ? <Spinner /> : "Save Changes"}
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
