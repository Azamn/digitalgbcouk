"use client";

import {
  Plus,
  UserPlus,
  Mail,
  Lock,
  Shield,
  X,
  Instagram,
  UserCircle,
  Key,
  User,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { SheetFooter, SheetClose } from "@/components/ui/sheet";

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
import { useCreateClientMutation } from "@/backend/participant.api";
import { createClientSchema, CreateClientType } from "./schema";
import { useState } from "react";
import { getRandomColor } from "@/helpers";

export default function ClientCreateForm({
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
  } = useForm<CreateClientType>({
    resolver: zodResolver(createClientSchema),
  });

  const [createParticipant, { isLoading }] = useCreateClientMutation();

  const [SelectedMemberIds, setSelectedMemberIds] = useState<string[]>([]);

  const onSubmit = async (payload: CreateClientType) => {
    try {
      const resp = await createParticipant(payload).unwrap();
      if (resp.status === "success") {
        SuccessToast({
          title: resp.message,
        });
        onSuccess();
        reset();
      } else {
        ErrorToast({ title: resp.message });
      }
    } catch (error) {
      ErrorToast({ title: "Error creating participant" });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex h-full flex-1 flex-col gap-6 px-4"
    >
      {/* Username */}
      <FormField label="Username">
        <UserCircle  className={`absolute left-3 top-2 h-5 w-5 ${getRandomColor()}`} />
        <Input
          {...register("userName")}
          placeholder="Username"
          className="rounded-lg border-2 border-dark bg-white pl-12 text-dark placeholder:text-dark/60 focus:ring-dark"
        />
        {errors.userName && (
          <p className="mt-1 text-sm text-red-500">{errors.userName.message}</p>
        )}
      </FormField>
      <FormField label="Username">
        <UserCircle  className={`absolute left-3 top-2 h-5 w-5 ${getRandomColor()}`} />
        <Input
          {...register("userName")}
          placeholder="Username"
          className="rounded-lg border-2 border-dark bg-white pl-12 text-dark placeholder:text-dark/60 focus:ring-dark"
        />
        {errors.userName && (
          <p className="mt-1 text-sm text-red-500">{errors.userName.message}</p>
        )}
      </FormField>

      <div className="flex flex-1 gap-x-2">
        {/* Instagram ID */}
        <FormField className="flex-1" label="Instagram ID">
          <Instagram  className={`absolute left-3 top-2 h-5 w-5 ${getRandomColor()}`} />
          <Input
            {...register("instagramId")}
            placeholder="@john_instagram"
            className="rounded-lg border-2 border-dark bg-white pl-12 text-dark placeholder:text-dark/60 focus:ring-dark"
          />
          {errors.instagramId && (
            <p className="mt-1 text-sm text-red-500">
              {errors.instagramId.message}
            </p>
          )}
        </FormField>

        {/* Instagram Password */}
        <FormField className="flex-1" label="Instagram Password">
          <Key
            className={`absolute left-3 top-2 h-5 w-5 ${getRandomColor()}`}
          />
          <Input
            type="password"
            {...register("instagramPassword")}
            placeholder="••••••"
            className="rounded-lg border-2 border-dark bg-white pl-12 text-dark placeholder:text-dark/60 focus:ring-dark"
          />
          {errors.instagramPassword && (
            <p className="mt-1 text-sm text-red-500">
              {errors.instagramPassword.message}
            </p>
          )}
        </FormField>
      </div>

      {/* Email */}
      <FormField label="Email">
        <Mail  className={`absolute left-3 top-2 h-5 w-5 ${getRandomColor()}`} />
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
        <Lock  className={`absolute left-3 top-2 h-5 w-5 ${getRandomColor()}`} />
        <Input
          type="password"
          {...register("password")}
          placeholder="••••••"
          className="rounded-lg border-2 border-dark bg-white pl-12 text-dark placeholder:text-dark/60 focus:ring-dark"
        />
        {errors.password && (
          <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
        )}
      </FormField>

      {/* Role */}
      <FormField label="Members">
        <User  className={`absolute left-3 top-2 h-5 w-5 ${getRandomColor()}`} />
        <Select
          onValueChange={(value) =>
            setValue("memberId", value as CreateClientType["memberId"])
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
        {errors.memberId && (
          <p className="mt-1 text-sm text-red-500">{errors.memberId.message}</p>
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
