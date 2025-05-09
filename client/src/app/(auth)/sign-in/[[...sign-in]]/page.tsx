"use client";

import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock, User } from "lucide-react";
import FormField from "@/components/ui/form-field";
import { useSignInMutation } from "@/backend/auth-api";
import { useAppToasts } from "@/hooks/use-app-toast";
import Spinner from "@/components/ui/spinner";
import { useAppDispatch } from "@/store";
import { setIsAuthLoading } from "@/store/states";
import { loginSchema, LoginType } from "../schema";
import PasswordViewToggle from "@/components/password-toggle";

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginType>({
    resolver: zodResolver(loginSchema),
    defaultValues: { userName: "", password: "" },
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const router = useRouter();
  const { ErrorToast, SuccessToast } = useAppToasts();
  const [Signin, { isLoading }] = useSignInMutation();
  const dispatch = useAppDispatch();
  const onSubmit = async (data: LoginType) => {
    try {
      const resp = await Signin(data).unwrap();

      if (resp.status === "success") {
        SuccessToast({ title: resp.message });
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
    <Card className="w-full max-w-md bg-white py-8 shadow-none">
      <CardHeader className="space-y-1 pb-8">
        <CardTitle className="whitespace-nowrap bg-text-gradient-midnight bg-clip-text text-center text-3xl font-bold tracking-tight text-transparent">
          Welcome back to DigitalGb
        </CardTitle>
        <p className="text-muted-foreground text-center">
          Log in to your account
        </p>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <FormField label="Username" error={errors.userName?.message}>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-primary" />
              <Input
                {...register("userName")}
                className="rounded-full bg-white pl-9 focus:ring-1 focus:ring-primary focus:transition-all"
                type="email"
                placeholder="john@example"
              />
            </div>
          </FormField>

          <FormField label="Password" error={errors.password?.message}>
            <div className="relative">
              <Lock className="absolute left-3 top-2 h-4 w-4 text-primary" />
              <Input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                className="rounded-full bg-white pl-9 focus:ring-1 focus:ring-primary focus:transition-all"
                placeholder="••••••••"
              />
              <PasswordViewToggle
                setShowPassword={setShowPassword}
                showPassword={showPassword}
              />
            </div>
          </FormField>

          <Button type="submit" className="w-full bg-primary text-secondary">
            {isLoading ? <Spinner color="#FFE893" /> : "LOG-IN"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default SignIn;
