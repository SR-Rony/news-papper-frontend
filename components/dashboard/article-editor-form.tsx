"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Save, Eye } from "lucide-react";
import { articleSchema, type ArticleInput } from "@/validations/article.schema";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/auth/form-error";
import { RichTextEditor } from "@/components/dashboard/rich-text-editor";
import { cn } from "@/lib/utils";
import { apiClient, ApiRequestError } from "@/lib/api-client";
import type { Article } from "@/types/article";
import type { Category } from "@/types/category";
import type { Author } from "@/types/author";
import type { Tag } from "@/types/tag";

function slugify(title: string) {
  return title.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export function ArticleEditorForm({ initialArticle }: { initialArticle?: Article }) {
  const router = useRouter();
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [authors, setAuthors] = React.useState<Author[]>([]);
  const [tags, setTags] = React.useState<Tag[]>([]);
  const [selectedTags, setSelectedTags] = React.useState<string[]>(
    initialArticle?.tags.map((t) => t.id) ?? []
  );
  const [apiError, setApiError] = React.useState<string | null>(null);

  React.useEffect(() => {
    Promise.all([
      apiClient.get<Category[]>("/categories"),
      apiClient.get<Author[]>("/authors"),
      apiClient.get<Tag[]>("/tags"),
    ]).then(([c, a, t]) => {
      setCategories(c);
      setAuthors(a);
      setTags(t);
    });
  }, []);

  const {
    register, control, handleSubmit, watch, setValue,
    formState: { errors, isSubmitting },
  } = useForm<ArticleInput>({
    resolver: zodResolver(articleSchema),
    defaultValues: initialArticle
      ? {
          title: initialArticle.title, slug: initialArticle.slug, excerpt: initialArticle.excerpt,
          content: initialArticle.content, coverImageUrl: initialArticle.coverImageUrl,
          categoryId: initialArticle.category.id, authorId: initialArticle.author.id,
          status: initialArticle.status, isFeatured: initialArticle.isFeatured, isBreaking: initialArticle.isBreaking,
        }
      : { status: "DRAFT", content: "", isFeatured: false, isBreaking: false },
  });

  const title = watch("title");
  React.useEffect(() => {
    if (!initialArticle && title) setValue("slug", slugify(title));
  }, [title, initialArticle, setValue]);

  const toggleTag = (id: string) =>
    setSelectedTags((prev) => (prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]));

  const onSubmit = async (data: ArticleInput) => {
    setApiError(null);
    const payload = {
      title: data.title,
      excerpt: data.excerpt,
      content: data.content,
      coverImageUrl: data.coverImageUrl,
      categoryId: data.categoryId,
      authorId: data.authorId,
      tagIds: selectedTags,
      status: data.status,
      isFeatured: data.isFeatured,
      isBreaking: data.isBreaking,
    };
    try {
      if (initialArticle) {
        await apiClient.patch(`/articles/${initialArticle.id}`, payload);
      } else {
        await apiClient.post("/articles", payload);
      }
      router.push("/dashboard/articles");
      router.refresh();
    } catch (err) {
      setApiError(err instanceof ApiRequestError ? err.message : "Couldn't save the article. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]" noValidate>
      <div className="space-y-5">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input id="title" className="mt-1.5 text-lg" {...register("title")} />
          <FormError message={errors.title?.message} />
        </div>
        <div>
          <Label htmlFor="slug">Slug</Label>
          <Input id="slug" className="mt-1.5 font-mono text-sm" disabled={!!initialArticle} {...register("slug")} />
          <FormError message={errors.slug?.message} />
        </div>
        <div>
          <Label htmlFor="excerpt">Excerpt</Label>
          <Textarea id="excerpt" rows={3} className="mt-1.5" {...register("excerpt")} />
          <FormError message={errors.excerpt?.message} />
        </div>
        <div>
          <Label htmlFor="coverImageUrl">Cover image URL</Label>
          <Input id="coverImageUrl" className="mt-1.5" {...register("coverImageUrl")} />
          <FormError message={errors.coverImageUrl?.message} />
        </div>
        <div>
          <Label>Content</Label>
          <div className="mt-1.5">
            <Controller
              control={control}
              name="content"
              render={({ field }) => <RichTextEditor content={field.value} onChange={field.onChange} />}
            />
          </div>
          <FormError message={errors.content?.message} />
        </div>
        <div>
          <Label>Tags</Label>
          <div className="mt-2 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <button
                key={tag.id}
                type="button"
                onClick={() => toggleTag(tag.id)}
                className={cn(
                  "rounded-sm border px-2.5 py-1 text-xs font-medium",
                  selectedTags.includes(tag.id) ? "border-accent bg-accent-soft text-accent" : "border-border-strong text-foreground-muted"
                )}
              >
                #{tag.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <aside className="space-y-5">
        <div className="rounded-md border border-border bg-surface p-4">
          <h3 className="mb-3 text-sm font-semibold">Publishing</h3>
          <div className="space-y-3">
            <div>
              <Label htmlFor="status">Status</Label>
              <select id="status" className="mt-1.5 w-full rounded-sm border border-border-strong bg-surface px-3 py-2 text-sm" {...register("status")}>
                <option value="DRAFT">Draft</option>
                <option value="PUBLISHED">Published</option>
                <option value="SCHEDULED">Scheduled</option>
                <option value="ARCHIVED">Archived</option>
              </select>
            </div>
            <div>
              <Label htmlFor="categoryId">Category</Label>
              <select id="categoryId" className="mt-1.5 w-full rounded-sm border border-border-strong bg-surface px-3 py-2 text-sm" {...register("categoryId")}>
                <option value="">Select category</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
              <FormError message={errors.categoryId?.message} />
            </div>
            <div>
              <Label htmlFor="authorId">Author</Label>
              <select id="authorId" className="mt-1.5 w-full rounded-sm border border-border-strong bg-surface px-3 py-2 text-sm" {...register("authorId")}>
                <option value="">Select author</option>
                {authors.map((a) => (
                  <option key={a.id} value={a.id}>{a.name}</option>
                ))}
              </select>
              <FormError message={errors.authorId?.message} />
            </div>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" className="size-4 rounded-sm border-border-strong" {...register("isFeatured")} /> Featured
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" className="size-4 rounded-sm border-border-strong" {...register("isBreaking")} /> Breaking news
            </label>
          </div>
        </div>

        <FormError message={apiError ?? undefined} />

        <div className="flex flex-col gap-2">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
            {initialArticle ? "Save changes" : "Create article"}
          </Button>
          <Button type="button" variant="outline" disabled={isSubmitting}>
            <Eye className="size-4" /> Preview
          </Button>
        </div>
      </aside>
    </form>
  );
}
