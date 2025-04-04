"use client";

import { Plus, UserPlus, Mail, Lock, Shield, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useAppToasts } from "@/hooks/use-app-toast";
import Spinner from "@/components/ui/spinner";
import FormField from "@/components/ui/form-field";
import { createMemberSchema, CreateMemberType } from "@/schema";
import { useCreateParticipantsMutation } from "@/backend/participant.api";

export default function ParticipantCreate({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  const { SuccessToast, ErrorToast } = useAppToasts();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<CreateMemberType>({
    resolver: zodResolver(createMemberSchema),
  });

  const [createParticipant, { isLoading }] = useCreateParticipantsMutation();

  const onSubmit = async (payload: CreateMemberType) => {
    try {
      const resp = await createParticipant(payload).unwrap();
      if (resp.status === "success") {
        SuccessToast({
          title: `${payload.role.toLowerCase()} created Successfully `,
        });
        onSuccess();
        reset();
      } else {
        ErrorToast({ title: resp.message });
      }
    } catch (error) {
      ErrorToast({ title: "Error Creating Participant" });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-6 px-4 py-6"
    >
      {/* First Name */}
      <div className="flex w-full gap-x-2">
        <FormField label="First Name">
          <UserPlus className="absolute left-3 top-3 h-5 w-5 text-dark" />
          <Input
            {...register("firstName")}
            placeholder="John"
            className="rounded-lg border-2 border-dark bg-white pl-12 text-dark placeholder:text-dark/60 focus:ring-dark"
          />
          {errors.firstName && (
            <p className="mt-1 text-sm text-red-500">
              {errors.firstName.message}
            </p>
          )}
        </FormField>

        {/* Last Name */}
        <FormField label="Last Name">
          <UserPlus className="absolute left-3 top-3 h-5 w-5 text-dark" />
          <Input
            {...register("lastName")}
            placeholder="Doe"
            className="rounded-lg border-2 border-dark bg-white pl-12 text-dark placeholder:text-dark/60 focus:ring-dark"
          />
          {errors.lastName && (
            <p className="mt-1 text-sm text-red-500">
              {errors.lastName.message}
            </p>
          )}
        </FormField>
      </div>
      {/* Email */}
      <FormField label="Email">
        <Mail className="absolute left-3 top-3 h-5 w-5 text-dark" />
        <Input
          type="email"
          {...register("email")}
          placeholder="john@example.com"
          className="rounded-lg border-2 border-dark bg-white pl-12 text-dark placeholder:text-dark/60 focus:ring-dark"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
        )}
      </FormField>

      {/* Password */}
      <FormField label="Password">
        <Lock className="absolute left-3 top-3 h-5 w-5 text-dark" />
        <Input
          type="password"
          {...register("password")}
          placeholder="••••••••"
          className="rounded-lg border-2 border-dark bg-white pl-12 text-dark placeholder:text-dark/60 focus:ring-dark"
        />
        {errors.password && (
          <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
        )}
      </FormField>

      {/* Role */}
      <FormField label="Role">
        <Shield className="absolute left-3 top-3 h-5 w-5 text-dark" />
        <Select
          onValueChange={(value) =>
            setValue("role", value as CreateMemberType["role"])
          }
        >
          <SelectTrigger className="rounded-lg border-2 border-dark bg-white pl-12 text-dark focus:ring-dark">
            <SelectValue placeholder="Select Role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="CLIENT">CLIENT</SelectItem>
            <SelectItem value="MEMBER">MEMBER</SelectItem>
          </SelectContent>
        </Select>
        {errors.role && (
          <p className="mt-1 text-sm text-red-500">{errors.role.message}</p>
        )}
      </FormField>

      {/* Actions */}
      <SheetFooter className="flex justify-end gap-4 pt-6">
        <SheetClose asChild>
          <Button className="w-[140px] rounded-md border border-primary bg-transparent px-6 py-2 text-primary">
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
