"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as Tabs from "@radix-ui/react-tabs";
import { Loader2 } from "lucide-react";
import { profileSchema, type ProfileInput, changePasswordSchema, type ChangePasswordInput } from "@/validations/profile.schema";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { FormError } from "@/components/auth/form-error";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";

const tabTriggerClass = "px-4 py-2 text-sm font-semibold text-foreground-muted data-[state=active]:text-foreground data-[state=active]:border-b-2 data-[state=active]:border-signal -mb-px";

function PersonalInfoTab() {
  const { user } = useAuth();
  const { register, handleSubmit, formState: { errors, isSubmitting, isSubmitSuccessful } } = useForm<ProfileInput>({
    resolver: zodResolver(profileSchema),
    values: { name: user?.name ?? "", email: user?.email ?? "", bio: "" },
  });

  return (
    <form onSubmit={handleSubmit(async () => new Promise((r) => setTimeout(r, 600)))} className="space-y-5" noValidate>
      <div className="flex items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src={user?.avatarUrl} alt="Your avatar" />
          <AvatarFallback>{user?.name?.slice(0, 2) ?? "??"}</AvatarFallback>
        </Avatar>
        <Button type="button" variant="outline" size="sm">Change avatar</Button>
      </div>
      <div>
        <Label htmlFor="name">Full name</Label>
        <Input id="name" className="mt-1.5" {...register("name")} />
        <FormError message={errors.name?.message} />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" className="mt-1.5" {...register("email")} />
        <FormError message={errors.email?.message} />
      </div>
      <div>
        <Label htmlFor="bio">Bio</Label>
        <Textarea id="bio" className="mt-1.5" rows={3} {...register("bio")} />
        <FormError message={errors.bio?.message} />
      </div>
      <div className="flex items-center gap-3">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="size-4 animate-spin" />}
          Save changes
        </Button>
        {isSubmitSuccessful && <span className="text-sm text-success">Saved</span>}
      </div>
    </form>
  );
}

function SecurityTab() {
  const { register, handleSubmit, formState: { errors, isSubmitting, isSubmitSuccessful } } = useForm<ChangePasswordInput>({
    resolver: zodResolver(changePasswordSchema),
  });

  return (
    <form onSubmit={handleSubmit(async () => new Promise((r) => setTimeout(r, 600)))} className="space-y-5" noValidate>
      <div>
        <Label htmlFor="currentPassword">Current password</Label>
        <Input id="currentPassword" type="password" className="mt-1.5" {...register("currentPassword")} />
        <FormError message={errors.currentPassword?.message} />
      </div>
      <div>
        <Label htmlFor="newPassword">New password</Label>
        <Input id="newPassword" type="password" className="mt-1.5" {...register("newPassword")} />
        <FormError message={errors.newPassword?.message} />
      </div>
      <div>
        <Label htmlFor="confirmPassword">Confirm new password</Label>
        <Input id="confirmPassword" type="password" className="mt-1.5" {...register("confirmPassword")} />
        <FormError message={errors.confirmPassword?.message} />
      </div>
      <div className="flex items-center gap-3">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="size-4 animate-spin" />}
          Update password
        </Button>
        {isSubmitSuccessful && <span className="text-sm text-success">Updated</span>}
      </div>
    </form>
  );
}

function PreferencesTab() {
  const [prefs, setPrefs] = React.useState({ emailDigest: true, breakingAlerts: true, commentReplies: false });
  const toggle = (key: keyof typeof prefs) => setPrefs((p) => ({ ...p, [key]: !p[key] }));

  const rows: { key: keyof typeof prefs; label: string; desc: string }[] = [
    { key: "emailDigest", label: "Daily email digest", desc: "A summary of top stories each morning." },
    { key: "breakingAlerts", label: "Breaking news alerts", desc: "Get notified the moment major news breaks." },
    { key: "commentReplies", label: "Comment reply notifications", desc: "Know when someone replies to your comment." },
  ];

  return (
    <div className="divide-y divide-border">
      {rows.map((row) => (
        <div key={row.key} className="flex items-center justify-between py-4">
          <div>
            <p className="text-sm font-semibold">{row.label}</p>
            <p className="text-xs text-foreground-muted">{row.desc}</p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={prefs[row.key]}
            onClick={() => toggle(row.key)}
            className={cn("h-6 w-11 rounded-full transition-colors", prefs[row.key] ? "bg-signal" : "bg-border-strong")}
          >
            <span className={cn("block size-5 translate-x-0.5 rounded-full bg-white transition-transform", prefs[row.key] && "translate-x-[22px]")} />
          </button>
        </div>
      ))}
    </div>
  );
}

export default function ProfilePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:py-10">
      <h1 className="mb-6 font-display text-3xl font-semibold">Account settings</h1>

      <Tabs.Root defaultValue="personal">
        <Tabs.List className="mb-8 flex border-b border-border">
          <Tabs.Trigger value="personal" className={tabTriggerClass}>Personal info</Tabs.Trigger>
          <Tabs.Trigger value="security" className={tabTriggerClass}>Security</Tabs.Trigger>
          <Tabs.Trigger value="preferences" className={tabTriggerClass}>Notifications</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="personal"><PersonalInfoTab /></Tabs.Content>
        <Tabs.Content value="security"><SecurityTab /></Tabs.Content>
        <Tabs.Content value="preferences"><PreferencesTab /></Tabs.Content>
      </Tabs.Root>
    </div>
  );
}
