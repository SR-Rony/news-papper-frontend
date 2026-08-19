"use client";

import * as React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, CheckCircle2 } from "lucide-react";
import { resetPasswordSchema, type ResetPasswordInput } from "@/validations/auth.schema";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/auth/form-error";

export default function ResetPasswordPage() {
  const [done, setDone] = React.useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordInput>({ resolver: zodResolver(resetPasswordSchema) });

  const onSubmit = async (data: ResetPasswordInput) => {
    // Wired to POST /api/v1/auth/reset-password (with token from the URL) once connected.
    await new Promise((resolve) => setTimeout(resolve, 800));
    void data;
    setDone(true);
  };

  if (done) {
    return (
      <div className="text-center">
        <CheckCircle2 className="mx-auto mb-3 size-8 text-success" />
        <h1 className="mb-1 font-display text-2xl font-semibold">Password updated</h1>
        <p className="text-sm text-foreground-muted">You can now sign in with your new password.</p>
        <Link href="/auth/login" className="mt-6 inline-block">
          <Button>Sign in</Button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="mb-1 font-display text-2xl font-semibold">Set a new password</h1>
      <p className="mb-6 text-sm text-foreground-muted">Choose a strong password you haven&rsquo;t used before.</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <div>
          <Label htmlFor="password">New password</Label>
          <Input id="password" type="password" autoComplete="new-password" className="mt-1.5" {...register("password")} />
          <FormError message={errors.password?.message} />
        </div>
        <div>
          <Label htmlFor="confirmPassword">Confirm new password</Label>
          <Input id="confirmPassword" type="password" autoComplete="new-password" className="mt-1.5" {...register("confirmPassword")} />
          <FormError message={errors.confirmPassword?.message} />
        </div>
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="size-4 animate-spin" />}
          Reset password
        </Button>
      </form>
    </div>
  );
}
