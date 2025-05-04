import { Mail, Lock, Instagram, Key } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SheetFooter, SheetClose } from "@/components/ui/sheet";
import FormField from "@/components/ui/form-field";
import { useAppToasts } from "@/hooks/use-app-toast";
import Spinner from "@/components/ui/spinner";
import { useEditClientMutation } from "@/backend/participant.api";
import { editClientSchema, EditClientType } from "./schema";

export default function EditClientForm({
  defaultValues,
  onSuccess,
}: {
  defaultValues: EditClientType;
  onSuccess: () => void;
}) {
  const { SuccessToast, ErrorToast } = useAppToasts();
  const [editClient, { isLoading }] = useEditClientMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EditClientType>({
    resolver: zodResolver(editClientSchema),
    defaultValues,
  });

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  const onSubmit = async (payload: EditClientType) => {
    try {
      const resp = await editClient(payload).unwrap();
      if (resp.status === "success") {
        SuccessToast({ title: resp.message });
        onSuccess();
      } else {
        ErrorToast({ title: resp.message });
      }
    } catch (error) {
      ErrorToast({ title: "Error updating client" });
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

      {/* Instagram ID */}
      <FormField label="Instagram ID">
        <Instagram className="absolute left-3 top-2 h-5 w-5 text-primary" />
        <Input
          {...register("instagramId")}
          placeholder="@john_instagram"
          className="rounded-full border-2 border-slate-300 bg-white pl-12 text-dark placeholder:text-dark/60 focus:border-2 focus:border-primary"
        />
        {errors.instagramId && (
          <p className="mt-1 text-sm text-red-500">
            {errors.instagramId.message}
          </p>
        )}
      </FormField>

      {/* Instagram Password */}
      <FormField label="Instagram Password">
        <Key className="absolute left-3 top-2 h-5 w-5 text-primary" />
        <Input
          type="password"
          {...register("instagramPassword")}
          placeholder="••••••"
          className="rounded-full border-2 border-slate-300 bg-white pl-12 text-dark placeholder:text-dark/60 focus:border-2 focus:border-primary"
        />
        {errors.instagramPassword && (
          <p className="mt-1 text-sm text-red-500">
            {errors.instagramPassword.message}
          </p>
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
