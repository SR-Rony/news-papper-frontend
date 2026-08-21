"use client";

import { useLocale } from "@/providers/locale-provider";

import * as React from "react";
import { useParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { DashboardTopbar } from "@/components/dashboard/topbar";
import { ArticleEditorForm } from "@/components/dashboard/article-editor-form";
import { apiClient } from "@/lib/api-client";
import type { Article } from "@/types/article";

export default function EditArticlePage() {
  const { t } = useLocale();
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = React.useState<Article | null>(null);
  const [notFound, setNotFound] = React.useState(false);

  React.useEffect(() => {
    apiClient
      .get<Article>(`/articles/by-id/${id}`)
      .then(setArticle)
      .catch(() => setNotFound(true));
  }, [id]);

  return (
    <>
      <DashboardTopbar title={t.dashboard.editArticle} />
      <div className="p-4 lg:p-6">
        {notFound ? (
          <p className="text-foreground-muted">Article not found.</p>
        ) : !article ? (
          <div className="flex justify-center py-16">
            <Loader2 className="size-6 animate-spin text-foreground-muted" />
          </div>
        ) : (
          <ArticleEditorForm initialArticle={article} />
        )}
      </div>
    </>
  );
}
