"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, User, Lock } from "lucide-react";
import FormField from "@/components/ui/form-field";
import { useSignUpMutation } from "@/backend/auth-api";
import { useAppToasts } from "@/hooks/use-app-toast";
import Spinner from "@/components/ui/spinner";
import { useRouter } from "next/navigation";
import { signUpSchema, SignUpType } from "../schema";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignUpType>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      userName: "",
      email: "",
      password: "",
    },
  });

  const router = useRouter();
  const { ErrorToast, SuccessToast } = useAppToasts();

  const [signUp, { isLoading }] = useSignUpMutation();

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    try {
      const resp = await signUp(data).unwrap();

      if (resp.status === "success") {
        SuccessToast({
          title: "Account created successfully",
        });

        reset();
        router.push("/sign-in");
      } else {
        ErrorToast({
          title: resp.message,
        });
      }
    } catch (error: any) {
      ErrorToast({
        title: "Sign up failed",
      });
    }
  };

  return (
    <Card className="w-full max-w-md bg-success shadow-xl">
      <CardHeader className="space-y-1 pb-8">
        <CardTitle className="text-center text-3xl font-bold tracking-tight">
          Create your account
        </CardTitle>
        <p className="text-muted-foreground text-center">
          Get started with your free account today
        </p>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <FormField label="Username" error={errors.userName?.message}>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-primary" />
              <Input
                {...register("userName")}
                className="bg-white pl-9 focus:ring-1 focus:ring-dark focus:transition-all"
                placeholder="John"
              />
            </div>
          </FormField>

          <FormField label="Email Address" error={errors.email?.message}>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-primary" />
              <Input
                {...register("email")}
                className="bg-white pl-9 focus:ring-1 focus:ring-dark focus:transition-all"
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
                className="bg-white pl-9 focus:ring-1 focus:ring-dark focus:transition-all"
                placeholder="••••••••"
              />
            </div>
          </FormField>

          <Button type="submit" className="w-full bg-warning text-primary">
            {isLoading ? <Spinner /> : "RESGISTER"}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm">
          Already have an account?{" "}
          <a
            href="/sign-in"
            className="text-blue-600 underline-offset-4 transition-colors hover:underline"
          >
            Sign in
          </a>
        </div>
      </CardContent>
    </Card>
  );
};

export default SignUp;
