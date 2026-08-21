"use client";

import { useLocale } from "@/providers/locale-provider";
import { DashboardTopbar } from "@/components/dashboard/topbar";
import { ArticleEditorForm } from "@/components/dashboard/article-editor-form";

export default function NewArticlePage() {
  const { t } = useLocale();
  return (
    <>
      <DashboardTopbar title={t.dashboard.newArticle} />
      <div className="p-4 lg:p-6">
        <ArticleEditorForm />
      </div>
    </>
  );
}
