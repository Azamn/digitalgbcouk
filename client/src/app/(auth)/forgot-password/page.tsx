"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock, Mail } from "lucide-react";

import FormField from "@/components/ui/form-field";
import { changePasswordSchema, ChangePasswordType } from "@/schema";
import { useChangePasswordMutation } from "@/server-api/auth-api";
import { useAppToasts } from "@/hooks/use-app-toast";
import Spinner from "@/components/ui/spinner";

const ChangePassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordType>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: { email: "", oldPassword: "", newPassword: "" },
  });

  const router = useRouter();
  const { ErrorToast, SuccessToast } = useAppToasts();
  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const onSubmit = async (data: ChangePasswordType) => {
    try {
      const resp = await changePassword(data).unwrap();

      if (resp.status === "success") {
        SuccessToast({ title: "Password changed successfully!" });
        router.push("/sign-in");
      } else {
        ErrorToast({ title: resp.message });
      }
    } catch (error) {
      ErrorToast({ title: "Password change failed" });
    }
  };

  return (
    <Card className="w-full max-w-md bg-secondary shadow-xl">
      <CardHeader className="space-y-1 pb-8">
        <CardTitle className="text-center text-3xl font-bold tracking-tight">
          Change Password
        </CardTitle>
        <p className="text-center text-gray-400">
          Ensure your account is secure
        </p>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <FormField label="Email" error={errors.email?.message}>
            <Mail className="absolute left-3 top-3 h-4 w-4 text-primary" />
            <Input
              {...register("email")}
              type="email"
              className="bg-white pl-9 focus:ring-2 focus:ring-black"
              placeholder="your@email.com"
            />
          </FormField>

          <FormField
            label="Current Password"
            error={errors.oldPassword?.message}
          >
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-primary" />
              <Input
                {...register("oldPassword")}
                type="password"
                className="bg-white pl-9 focus:ring-2 focus:ring-black"
                placeholder="••••••••"
              />
            </div>
          </FormField>

          <FormField label="New Password" error={errors.newPassword?.message}>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-primary" />
              <Input
                {...register("newPassword")}
                type="password"
                className="bg-white pl-9 focus:ring-2 focus:ring-black"
                placeholder="••••••••"
              />
            </div>
          </FormField>

          <Button type="submit" className="w-full text-secondary">
            {isLoading ? <Spinner /> : "Change Password"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ChangePassword;
