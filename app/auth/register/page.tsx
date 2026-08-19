"use client";

import * as React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { registerSchema, type RegisterInput } from "@/validations/auth.schema";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/auth/form-error";
import { GoogleButton } from "@/components/auth/google-button";
import { apiClient, ApiRequestError } from "@/lib/api-client";
import { setSession } from "@/lib/auth";
import type { User } from "@/types/user";

export default function RegisterPage() {
  const router = useRouter();
  const [apiError, setApiError] = React.useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterInput>({ resolver: zodResolver(registerSchema) });

  const onSubmit = async (data: RegisterInput) => {
    setApiError(null);
    try {
      const result = await apiClient.post<{ user: User; accessToken: string }>("/auth/register", {
        name: data.name,
        email: data.email,
        password: data.password,
      });
      setSession(result.accessToken, result.user);
      router.push("/");
      router.refresh();
    } catch (err) {
      setApiError(err instanceof ApiRequestError ? err.message : "We couldn't create your account. Please try again.");
    }
  };

  return (
    <div>
      <h1 className="mb-1 font-display text-2xl font-semibold">Create your account</h1>
      <p className="mb-6 text-sm text-foreground-muted">Join to bookmark stories, comment, and get personalized alerts.</p>

      <GoogleButton />
      <div className="my-5 flex items-center gap-3 text-xs text-foreground-muted">
        <span className="h-px flex-1 bg-border" /> or <span className="h-px flex-1 bg-border" />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <div>
          <Label htmlFor="name">Full name</Label>
          <Input id="name" autoComplete="name" className="mt-1.5" {...register("name")} />
          <FormError message={errors.name?.message} />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" autoComplete="email" className="mt-1.5" {...register("email")} />
          <FormError message={errors.email?.message} />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" autoComplete="new-password" className="mt-1.5" {...register("password")} />
          <FormError message={errors.password?.message} />
        </div>
        <div>
          <Label htmlFor="confirmPassword">Confirm password</Label>
          <Input id="confirmPassword" type="password" autoComplete="new-password" className="mt-1.5" {...register("confirmPassword")} />
          <FormError message={errors.confirmPassword?.message} />
        </div>

        <FormError message={apiError ?? undefined} />

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="size-4 animate-spin" />}
          Create account
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-foreground-muted">
        Already have an account?{" "}
        <Link href="/auth/login" className="font-semibold text-accent hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
