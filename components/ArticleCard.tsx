import Image from "next/image";
import { Article, formatDate } from "../lib/articles";

export function StoryArt({ variant, priority = false }: { variant: string; priority?: boolean }) {
  if (variant.startsWith("http")) return <div className="story-art story-photo"><Image src={variant} alt="Editorial artwork" fill sizes="(max-width: 700px) 100vw, 50vw" priority={priority} /></div>;
  return <div className={`story-art art-${variant}`} role="img" aria-label="Abstract editorial artwork" data-priority={priority}><span className="art-label">THE CHNNL / FIELD NOTE</span><b>{variant === "signal" ? "BUY / WATCH / BUILD" : variant.toUpperCase()}</b><i /></div>;
}
export function ArticleCard({ article, compact = false }: { article: Article; compact?: boolean }) {
  return <article className={`story-card ${compact ? "compact" : ""}`}>
    {!compact && <a href={`/articles/${article.slug}`} aria-label={article.headline}><StoryArt variant={article.featuredImage} /></a>}
    <div className="story-meta"><a href={`/${article.category.toLowerCase()}`}>{article.category}</a><time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time></div>
    <h3><a href={`/articles/${article.slug}`}>{article.headline}</a></h3>
    <p>{article.excerpt}</p>
  </article>;
}
