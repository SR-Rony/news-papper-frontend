import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { DashboardGuard } from "@/components/dashboard/dashboard-guard";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardGuard>
      <div className="flex min-h-screen">
        <aside className="hidden w-64 shrink-0 lg:block">
          <div className="fixed h-screen w-64">
            <DashboardSidebar />
          </div>
        </aside>
        <div className="flex-1 bg-muted/40">{children}</div>
      </div>
    </DashboardGuard>
  );
}
