"use client";

import { Mail, Lock, UserCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SheetFooter, SheetClose } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAppToasts } from "@/hooks/use-app-toast";
import Spinner from "@/components/ui/spinner";
import FormField from "@/components/ui/form-field";
import { createMemberSchema, CreateMemberType } from "./schema";
import { useCreateMemberMutation } from "@/backend/participant.api";
import { getRandomColor } from "@/helpers";
import PasswordViewToggle from "@/components/password-toggle";
import { useState } from "react";

export default function MemberCreateForm({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  const { SuccessToast, ErrorToast } = useAppToasts();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateMemberType>({
    resolver: zodResolver(createMemberSchema),
  });

  const [createParticipant, { isLoading }] = useCreateMemberMutation();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (payload: CreateMemberType) => {
    try {
      const resp = await createParticipant(payload).unwrap();
      if (resp.status === "success") {
        SuccessToast({ title: "Member created successfully" });
        onSuccess();
        reset();
      } else {
        ErrorToast({ title: resp.message });
      }
    } catch (error) {
      ErrorToast({ title: "Error creating member" });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-6 px-4 py-6"
    >
      {/* Username */}
      <FormField label="Username">
        <UserCircle className={`absolute left-3 top-2 h-5 w-5`} />
        <Input
          {...register("userName")}
          placeholder="Username"
          className="text-dark placeholder:text-dark/60 rounded-full border-2 border-primary/50 bg-white pl-12 focus:border-2 focus:border-primary"
        />
        {errors.userName && (
          <p className="mt-1 text-sm text-red-500">{errors.userName.message}</p>
        )}
      </FormField>

      {/* Email */}
      <FormField label="Email">
        <Mail className={`absolute left-3 top-2 h-5 w-5`} />
        <Input
          type="email"
          {...register("email")}
          placeholder="example@email.com"
          className="text-dark placeholder:text-dark/60 rounded-full border-2 border-primary/50 bg-white pl-12 focus:border-2 focus:border-primary"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
        )}
      </FormField>

      {/* Password */}
      <FormField label="Password">
        <Lock className={`absolute left-3 top-2 h-5 w-5`} />
        <Input
          {...register("password")}
          type={showPassword ? "text" : "password"}
          placeholder="••••••••"
          className="text-dark placeholder:text-dark/60 rounded-full border-2 border-primary/50 bg-white pl-12 focus:border-2 focus:border-primary"
        />
        <PasswordViewToggle
          setShowPassword={setShowPassword}
          showPassword={showPassword}
        />
        {errors.password && (
          <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
        )}
      </FormField>

      {/* Actions */}
      <SheetFooter className="flex justify-end gap-4 pt-6">
        <SheetClose asChild>
          <Button
            type="button"
            className="w-[140px] rounded-md border border-primary bg-transparent px-6 py-2 text-primary"
          >
            Cancel
          </Button>
        </SheetClose>
        <Button
          type="submit"
          className="w-[140px] rounded-md bg-primary px-6 py-2 text-white"
        >
          {isLoading ? <Spinner color="#FFF6E9" size={12} /> : "Create"}
        </Button>
      </SheetFooter>
    </form>
  );
}
