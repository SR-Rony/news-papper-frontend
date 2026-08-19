"use client";

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
  return (
    <>
      <DashboardTopbar title="Settings" />
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
              Enabled locales: <strong>English (en)</strong> and <strong>বাংলা (bn)</strong>. Readers can switch
              language from the site header; new locales can be added in <code>lib/i18n/dictionary.ts</code>.
            </p>
          </Tabs.Content>
        </Tabs.Root>
      </div>
    </>
  );
}
