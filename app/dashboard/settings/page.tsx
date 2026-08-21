"use client";

import { useLocale } from "@/providers/locale-provider";

import * as React from "react";
import * as Tabs from "@radix-ui/react-tabs";
import { Save } from "lucide-react";
import { DashboardTopbar } from "@/components/dashboard/topbar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

const tabTriggerClass = "px-4 py-2 text-sm font-semibold text-foreground-muted data-[state=active]:text-foreground data-[state=active]:border-b-2 data-[state=active]:border-signal -mb-px";

export default function DashboardSettingsPage() {
  const { t, locale } = useLocale();
  return (
    <>
      <DashboardTopbar title={t.dashboard.settings} />
      <div className="p-4 lg:p-6">
        <Tabs.Root defaultValue="general">
          <Tabs.List className="mb-6 flex border-b border-border">
            <Tabs.Trigger value="general" className={tabTriggerClass}>General</Tabs.Trigger>
            <Tabs.Trigger value="seo" className={tabTriggerClass}>SEO</Tabs.Trigger>
            <Tabs.Trigger value="locales" className={tabTriggerClass}>Languages</Tabs.Trigger>
          </Tabs.List>

          <Tabs.Content value="general" className="max-w-lg space-y-4">
            <div>
              <Label htmlFor="site-name">Site name</Label>
              <Input id="site-name" defaultValue={siteConfig.name} className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="site-desc">Description</Label>
              <Textarea id="site-desc" defaultValue={siteConfig.description} rows={3} className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="site-url">Site URL</Label>
              <Input id="site-url" defaultValue={siteConfig.url} className="mt-1.5" />
            </div>
            <Button size="sm"><Save className="size-4" /> Save changes</Button>
          </Tabs.Content>

          <Tabs.Content value="seo" className="max-w-lg space-y-4">
            <div>
              <Label htmlFor="og-image">Default OpenGraph image URL</Label>
              <Input id="og-image" defaultValue={siteConfig.ogImage} className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="meta-title">Default meta title</Label>
              <Input id="meta-title" defaultValue={siteConfig.name} className="mt-1.5" />
            </div>
            <Button size="sm"><Save className="size-4" /> Save changes</Button>
          </Tabs.Content>

          <Tabs.Content value="locales" className="max-w-lg space-y-4">
            <p className="text-sm text-foreground-muted">
              {locale === "en"
                ? "Enabled locales: Bangla (bn) as default and English (en). Use the EN / বাং control in the header to switch. Add more locales in lib/i18n/dictionary.ts."
                : "সক্রিয় ভাষা: বাংলা (bn) ডিফল্ট এবং English (en)। হেডারের EN / বাং বাটন দিয়ে পরিবর্তন করুন। নতুন ভাষা যোগ করতে lib/i18n/dictionary.ts ব্যবহার করুন।"}
            </p>
            <div className="flex items-center gap-3 rounded-md border border-border p-4">
              <span className="text-sm font-medium">
                {locale === "en" ? "Current language" : "বর্তমান ভাষা"}:
              </span>
              <strong>{locale === "en" ? "English" : "বাংলা"}</strong>
            </div>
          </Tabs.Content>
        </Tabs.Root>
      </div>
    </>
  );
}
