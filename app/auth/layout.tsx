import Link from "next/link";
import { siteConfig } from "@/config/site";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-muted">
      <header className="border-b border-border bg-background px-6 py-4">
        <Link href="/" className="font-display text-2xl font-semibold">
          {siteConfig.name}
        </Link>
      </header>
      <main className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-md rounded-md border border-border bg-surface p-8 shadow-sm">{children}</div>
      </main>
    </div>
  );
}
