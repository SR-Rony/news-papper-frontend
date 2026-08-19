"use client";

import * as React from "react";
import { Search, Loader2 } from "lucide-react";
import { DashboardTopbar } from "@/components/dashboard/topbar";
import { DataTableShell } from "@/components/dashboard/data-table-shell";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { DashboardPagination } from "@/components/dashboard/pagination";
import { apiClient } from "@/lib/api-client";
import { formatDate, cn } from "@/lib/utils";
import type { User, UserRole } from "@/types/user";
import type { PaginationMeta } from "@/types/api";

const roles: (UserRole | "ALL")[] = ["ALL", "SUPER_ADMIN", "ADMIN", "EDITOR", "REPORTER", "USER"];

export default function DashboardUsersPage() {
  const [users, setUsers] = React.useState<User[]>([]);
  const [meta, setMeta] = React.useState<PaginationMeta | null>(null);
  const [query, setQuery] = React.useState("");
  const [page, setPage] = React.useState(1);
  const [loading, setLoading] = React.useState(true);

  const load = React.useCallback(async () => {
    setLoading(true);
    try {
      const result = await apiClient.getPaginated<User>("/users", { page, limit: 10, search: query || undefined });
      setUsers(result.data);
      setMeta(result.meta);
    } finally {
      setLoading(false);
    }
  }, [page, query]);

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initial data fetch on mount
    load();
  }, [load]);

  const toggleActive = async (user: User) => {
    setUsers((prev) => prev.map((u) => (u.id === user.id ? { ...u, isActive: !u.isActive } : u)));
    try {
      await apiClient.patch(`/users/${user.id}`, { isActive: !user.isActive });
    } catch {
      load();
    }
  };

  const changeRole = async (user: User, role: UserRole) => {
    setUsers((prev) => prev.map((u) => (u.id === user.id ? { ...u, role } : u)));
    try {
      await apiClient.patch(`/users/${user.id}`, { role });
    } catch {
      load();
    }
  };

  return (
    <>
      <DashboardTopbar title="Users" />
      <div className="p-4 lg:p-6">
        <div className="mb-4 relative w-full sm:max-w-xs">
          <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-foreground-muted" />
          <Input placeholder="Search users…" className="pl-8" value={query} onChange={(e) => { setQuery(e.target.value); setPage(1); }} />
        </div>

        <DataTableShell>
          <thead className="bg-muted text-xs font-semibold uppercase tracking-wide text-foreground-muted">
            <tr>
              <th className="px-4 py-3">User</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Joined</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {loading ? (
              <tr><td colSpan={5} className="px-4 py-10 text-center"><Loader2 className="mx-auto size-5 animate-spin text-foreground-muted" /></td></tr>
            ) : (
              users.map((user) => (
                <tr key={user.id} className="bg-surface">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={user.avatarUrl} alt={user.name} />
                        <AvatarFallback>{user.name.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-xs text-foreground-muted">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={user.role}
                      onChange={(e) => changeRole(user, e.target.value as UserRole)}
                      className="rounded-sm border border-border-strong bg-surface px-2 py-1 text-xs"
                    >
                      {roles.slice(1).map((r) => (<option key={r} value={r}>{r}</option>))}
                    </select>
                  </td>
                  <td className="px-4 py-3 text-foreground-muted">{formatDate(user.createdAt)}</td>
                  <td className="px-4 py-3">
                    <Badge variant={user.isActive ? "success" : "outline"}>{user.isActive ? "Active" : "Inactive"}</Badge>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => toggleActive(user)}
                      className={cn("text-xs font-semibold hover:underline", user.isActive ? "text-destructive" : "text-success")}
                    >
                      {user.isActive ? "Deactivate" : "Activate"}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </DataTableShell>
        <div className="rounded-b-md border border-t-0 border-border bg-surface">
          <DashboardPagination page={meta?.page ?? 1} totalPages={meta?.totalPages ?? 1} onPageChange={setPage} />
        </div>
      </div>
    </>
  );
}
