"use client";

import * as React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, MailCheck } from "lucide-react";
import { forgotPasswordSchema, type ForgotPasswordInput } from "@/validations/auth.schema";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/auth/form-error";

export default function ForgotPasswordPage() {
  const [sent, setSent] = React.useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordInput>({ resolver: zodResolver(forgotPasswordSchema) });

  const onSubmit = async (data: ForgotPasswordInput) => {
    // Wired to POST /api/v1/auth/forgot-password once the NestJS backend is connected.
    await new Promise((resolve) => setTimeout(resolve, 800));
    void data;
    setSent(true);
  };

  if (sent) {
    return (
      <div className="text-center">
        <MailCheck className="mx-auto mb-3 size-8 text-success" />
        <h1 className="mb-1 font-display text-2xl font-semibold">Check your email</h1>
        <p className="text-sm text-foreground-muted">
          If an account exists for that address, we&rsquo;ve sent a link to reset your password.
        </p>
        <Link href="/auth/login" className="mt-6 inline-block text-sm font-semibold text-accent hover:underline">
          Back to sign in
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="mb-1 font-display text-2xl font-semibold">Forgot your password?</h1>
      <p className="mb-6 text-sm text-foreground-muted">Enter your email and we&rsquo;ll send you a reset link.</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" autoComplete="email" className="mt-1.5" {...register("email")} />
          <FormError message={errors.email?.message} />
        </div>
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="size-4 animate-spin" />}
          Send reset link
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-foreground-muted">
        <Link href="/auth/login" className="font-semibold text-accent hover:underline">
          Back to sign in
        </Link>
      </p>
    </div>
  );
}
