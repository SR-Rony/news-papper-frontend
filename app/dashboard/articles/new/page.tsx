import { DashboardTopbar } from "@/components/dashboard/topbar";
import { ArticleEditorForm } from "@/components/dashboard/article-editor-form";

export default function NewArticlePage() {
  return (
    <>
      <DashboardTopbar title="New article" />
      <div className="p-4 lg:p-6">
        <ArticleEditorForm />
      </div>
    </>
  );
}
