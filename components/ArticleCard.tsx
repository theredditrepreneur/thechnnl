import Link from "next/link";
import { Article, formatDate } from "../lib/articles";

export function StoryArt({ variant, priority = false }: { variant: string; priority?: boolean }) {
  return <div className={`story-art art-${variant}`} role="img" aria-label="Abstract editorial artwork" data-priority={priority}><span className="art-label">THE CHNNL / FIELD NOTE</span><b>{variant === "signal" ? "BUY / WATCH / BUILD" : variant.toUpperCase()}</b><i /></div>;
}
export function ArticleCard({ article, compact = false }: { article: Article; compact?: boolean }) {
  return <article className={`story-card ${compact ? "compact" : ""}`}>
    {!compact && <Link href={`/articles/${article.slug}`} aria-label={article.headline}><StoryArt variant={article.featuredImage} /></Link>}
    <div className="story-meta"><Link href={`/${article.category.toLowerCase()}`}>{article.category}</Link><time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time></div>
    <h3><Link href={`/articles/${article.slug}`}>{article.headline}</Link></h3>
    <p>{article.excerpt}</p>
  </article>;
}
