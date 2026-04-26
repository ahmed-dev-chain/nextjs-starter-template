"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Input from "@/components/ui/Input";
import { useAuthStore } from "@/store/auth.store";

import { useLogin } from "@/hooks/use-auth";

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

type LoginFormValues = yup.InferType<typeof loginSchema>;

const LoginForm = () => {
  const { mutateAsync: login, isPending: isLoggingIn, error: apiError } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const response = await login([data.email, data.password]);

      if (!response.success) {
        // Handle API level error (e.g. 401 Invalid Credentials)
        console.error("Login failed:", response.error);
      }
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  return (
    <div className="w-full max-w-md p-8 rounded-2xl border border-foreground/5 bg-background shadow-xl shadow-foreground/5">
      <div className="flex flex-col gap-2 mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Welcome back</h1>
        <p className="text-sm text-foreground/60">
          Enter your credentials to access your account
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Input
          label="Email address"
          placeholder="name@example.com"
          type="email"
          error={errors.email?.message}
          {...register("email")}
        />

        <Input
          label="Password"
          placeholder="••••••••"
          type="password"
          error={errors.password?.message}
          {...register("password")}
        />

        <button
          type="submit"
          disabled={isLoggingIn}
          className="relative w-full h-11 flex items-center justify-center rounded-lg bg-foreground text-background font-medium transition-all hover:bg-foreground/90 disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden"
        >
          {isLoggingIn ? (
            <div className="h-5 w-5 border-2 border-background/30 border-t-background rounded-full animate-spin" />
          ) : (
            "Sign In"
          )}
        </button>
      </form>

      <div className="mt-8 pt-8 border-t border-foreground/5 text-center text-sm text-foreground/40">
        Don't have an account?{" "}
        <a href="#" className="font-semibold text-foreground hover:underline underline-offset-4">
          Create one
        </a>
      </div>
    </div>
  );
};

export default LoginForm;
