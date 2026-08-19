"use client";

import * as React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { loginSchema, type LoginInput } from "@/validations/auth.schema";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/auth/form-error";
import { GoogleButton } from "@/components/auth/google-button";
import { apiClient, ApiRequestError } from "@/lib/api-client";
import { setSession } from "@/lib/auth";
import type { User } from "@/types/user";

export default function LoginPage() {
  const router = useRouter();
  const [apiError, setApiError] = React.useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data: LoginInput) => {
    setApiError(null);
    try {
      const result = await apiClient.post<{ user: User; accessToken: string }>("/auth/login", {
        email: data.email,
        password: data.password,
      });
      setSession(result.accessToken, result.user);
      router.push("/");
      router.refresh();
    } catch (err) {
      setApiError(err instanceof ApiRequestError ? err.message : "We couldn't sign you in. Check your details and try again.");
    }
  };

  return (
    <div>
      <h1 className="mb-1 font-display text-2xl font-semibold">Welcome back</h1>
      <p className="mb-6 text-sm text-foreground-muted">Sign in to continue reading and manage your account.</p>

      <GoogleButton />
      <div className="my-5 flex items-center gap-3 text-xs text-foreground-muted">
        <span className="h-px flex-1 bg-border" /> or <span className="h-px flex-1 bg-border" />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" autoComplete="email" className="mt-1.5" {...register("email")} />
          <FormError message={errors.email?.message} />
        </div>
        <div>
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link href="/auth/forgot-password" className="text-xs font-semibold text-accent hover:underline">
              Forgot password?
            </Link>
          </div>
          <Input id="password" type="password" autoComplete="current-password" className="mt-1.5" {...register("password")} />
          <FormError message={errors.password?.message} />
        </div>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" className="size-4 rounded-sm border-border-strong" {...register("rememberMe")} />
          Remember me
        </label>

        <FormError message={apiError ?? undefined} />

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="size-4 animate-spin" />}
          Sign in
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-foreground-muted">
        Don&rsquo;t have an account?{" "}
        <Link href="/auth/register" className="font-semibold text-accent hover:underline">
          Create one
        </Link>
      </p>
    </div>
  );
}
