"use client";

import * as React from "react";
import { Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/providers/locale-provider";

export function NewsletterSection() {
  const { t } = useLocale();
  const [submitted, setSubmitted] = React.useState(false);

  return (
    <section className="rounded-md border border-border-strong bg-muted px-6 py-10 text-center sm:px-12">
      <Mail className="mx-auto mb-3 size-6 text-signal" aria-hidden />
      <h2 className="mb-1.5 font-display text-2xl font-semibold">{t.common.newsletterTitle}</h2>
      <p className="mx-auto mb-5 max-w-md text-sm text-foreground-muted">{t.common.newsletterBody}</p>
      {submitted ? (
        <p className="font-semibold text-success">{t.common.newsletterSuccess}</p>
      ) : (
        <form
          className="mx-auto flex max-w-md flex-col gap-2 sm:flex-row"
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(true);
          }}
        >
          <Input
            type="email"
            required
            placeholder={t.common.emailPlaceholder}
            aria-label={t.common.emailPlaceholder}
            className="bg-surface"
          />
          <Button type="submit">{t.common.subscribeCta}</Button>
        </form>
      )}
    </section>
  );
}
