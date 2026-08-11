import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleCard, StoryArt } from "../../../components/ArticleCard";
import { articles, formatDate, getArticleBySlug, getRelatedArticles } from "../../../lib/articles";

export function generateStaticParams() { return articles.map(a => ({ slug: a.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const article = getArticleBySlug((await params).slug); if (!article) return {}; return { title: article.headline, description: article.standfirst, openGraph: { type: "article", title: article.headline, description: article.standfirst, publishedTime: article.publishedAt, authors: [article.author] }, twitter: { card: "summary_large_image", title: article.headline, description: article.standfirst }, alternates: { canonical: `/articles/${article.slug}` } }; }
export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) { const article = getArticleBySlug((await params).slug); if (!article) notFound(); const related = getRelatedArticles(article); return <article className="article-page">
  <header className="article-header wrap"><div className="article-kicker"><Link href={`/${article.category.toLowerCase()}`}>{article.category}</Link><span>Analysis</span></div><h1>{article.headline}</h1><p className="standfirst">{article.standfirst}</p><div className="byline"><span>By <strong>{article.author}</strong></span><time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time><span>6 min read</span></div></header>
  <div className="article-hero wrap"><StoryArt variant={article.featuredImage} /></div>
  <div className="article-layout wrap"><aside className="share" aria-label="Share article"><span>Share</span><a href={`https://www.linkedin.com/sharing/share-offsite/?url=https://thechnnl.com/articles/${article.slug}`}>LinkedIn</a><a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.headline)}`}>X / Twitter</a></aside><div className="prose">{article.body.map((block, i) => block.type === "heading" ? <h2 key={i}>{block.content}</h2> : block.type === "paragraph" ? <p key={i}>{block.content}</p> : block.type === "quote" ? <blockquote key={i}>{block.content}</blockquote> : <ul key={i}>{block.items.map(x => <li key={x}>{x}</li>)}</ul>)}</div></div>
  <section className="related wrap"><div className="section-head"><div><span className="eyebrow">Keep reading</span><h2>Related stories</h2></div></div><div className="article-grid">{related.map(a => <ArticleCard key={a.id} article={a} />)}</div></section>
  </article> }
