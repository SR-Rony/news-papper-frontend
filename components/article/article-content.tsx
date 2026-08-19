export function ArticleContent({ html }: { html: string }) {
  // Content originates from the editorial CMS (Tiptap output) and will be
  // sanitized server-side by the NestJS API before it ever reaches the client.
  return <div className="prose-article" dangerouslySetInnerHTML={{ __html: html }} />;
}
