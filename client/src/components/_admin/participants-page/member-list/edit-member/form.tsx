import { Mail } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SheetFooter, SheetClose } from "@/components/ui/sheet";
import FormField from "@/components/ui/form-field";
import { useAppToasts } from "@/hooks/use-app-toast";
import Spinner from "@/components/ui/spinner";
import { useEditMemberMutation } from "@/backend/participant.api";
import { EditMemberType, editMemberSchema } from "./schema";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

export default function EditMemberForm({
  defaultValues,
  onSuccess,
}: {
  defaultValues: EditMemberType;
  onSuccess: () => void;
}) {
  const { SuccessToast, ErrorToast } = useAppToasts();
  const [editMember, { isLoading }] = useEditMemberMutation();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<EditMemberType>({
    resolver: zodResolver(editMemberSchema),
    defaultValues,
  });

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  const onSubmit = async (payload: EditMemberType) => {
    try {
      const resp = await editMember(payload).unwrap();
      if (resp.status === "success") {
        SuccessToast({ title: resp.message });
        onSuccess();
      } else {
        ErrorToast({ title: resp.message });
      }
    } catch (error) {
      ErrorToast({ title: "Error updating member" });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-6 px-4"
    >
      {/* Email */}
      <FormField label="Email">
        <Mail className="absolute left-3 top-2 h-5 w-5 text-primary" />
        <Input
          type="email"
          {...register("email")}
          placeholder="john@example.com"
          className="rounded-full border-2 border-slate-300 bg-white pl-12 text-dark placeholder:text-dark/60 focus:border-2 focus:border-primary"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
        )}
      </FormField>

      {/* Role */}
      <FormField label="Role">
        <Controller
          name="role"
          control={control}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger className="w-full rounded-full border-2 border-slate-300 bg-white text-dark focus:border-primary">
                <SelectValue placeholder="Select Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="MEMBER">MEMBER</SelectItem>
                <SelectItem value="COREMEMBER">CORE MEMBER</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        {errors.role && (
          <p className="mt-1 text-sm text-red-500">{errors.role.message}</p>
        )}
      </FormField>

      {/* Footer */}
      <SheetFooter className="flex justify-end gap-4 pt-6">
        <SheetClose asChild>
          <Button className="w-[140px] rounded-md border-2 border-primary bg-transparent text-primary">
            Cancel
          </Button>
        </SheetClose>
        <Button
          type="submit"
          className="w-[140px] rounded-md bg-primary text-white"
        >
          {isLoading ? <Spinner color="#FFF6E9" size={12} /> : "Update"}
        </Button>
      </SheetFooter>
    </form>
  );
}
