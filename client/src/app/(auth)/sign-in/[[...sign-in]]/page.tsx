"use client";

import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Lock } from "lucide-react";

import FormField from "@/components/ui/form-field";
import { loginSchema, LoginType } from "@/schema";
import { useSignInUserMutation } from "@/server-api/auth-api";
import { useAppToasts } from "@/hooks/use-app-toast";
import Spinner from "@/components/ui/spinner";
import DataLoader from "@/components/shared/loader/data-laoder";
import Link from "next/link";
import { useAppDispatch } from "@/store";
import { setIsAuthLoading } from "@/store/states";

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginType>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const router = useRouter();
  const { ErrorToast, SuccessToast } = useAppToasts();
  const [Signin, { isLoading }] = useSignInUserMutation();
  const dispatch = useAppDispatch();
  const onSubmit = async (data: LoginType) => {
    try {
      const resp = await Signin(data).unwrap();

      if (resp.status === "success") {
        SuccessToast({ title: "Login successful!" });
        dispatch(setIsAuthLoading());
        setTimeout(() => {
          const userRole = Cookies.get("UserRole");
          const userId = Cookies.get("UserId");

          if (userRole && userId) {
            router.push(`/${userRole.toLowerCase()}/${userId}`);
          } else {
            router.push("/");
          }
        }, 3000);
        dispatch(setIsAuthLoading());
      } else {
        ErrorToast({ title: resp.message });
      }
    } catch (error: any) {
      ErrorToast({ title: "Sign in failed" });
    }
  };
  return (
    <Card className="w-full max-w-md bg-secondary shadow-xl">
      <CardHeader className="space-y-1 pb-8">
        <CardTitle className="text-center text-3xl font-bold tracking-tight">
          Welcome back to DigiLab
        </CardTitle>
        <p className="text-muted-foreground text-center">
          Sign in to your account
        </p>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <FormField label="Email Address" error={errors.email?.message}>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-primary" />
              <Input
                {...register("email")}
                className="bg-white pl-9 focus:ring-2 focus:ring-black"
                type="email"
                placeholder="john@example.com"
              />
            </div>
          </FormField>

          <FormField label="Password" error={errors.password?.message}>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-primary" />
              <Input
                {...register("password")}
                type="password"
                className="bg-white pl-9 focus:ring-2 focus:ring-black"
                placeholder="••••••••"
              />
            </div>
            <div className="text-muted-foreground mt-6 text-right text-sm">
              <Link
                href="/forgot-password"
                className="text-blue-700 underline underline-offset-4 transition-colors hover:underline"
              >
                Change Password
              </Link>
            </div>
          </FormField>

          <Button type="submit" className="w-full text-secondary">
            {isLoading ? <Spinner /> : "Sign In"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default SignIn;
