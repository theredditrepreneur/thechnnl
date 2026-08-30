import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleCard, StoryArt } from "../../../components/ArticleCard";
import {ArticleBody} from "../../../components/ArticleBody";
import {formatDate} from "../../../lib/articles";
import {getAllContentArticles, getContentArticle, getRelatedContentArticles} from "../../../lib/content";

export async function generateStaticParams() { return (await getAllContentArticles()).map(a => ({ slug: a.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const article = await getContentArticle((await params).slug); if (!article) return {}; return { title: article.headline, description: article.standfirst, openGraph: { type: "article", title: article.headline, description: article.standfirst, publishedTime: article.publishedAt, authors: [article.author] }, twitter: { card: "summary_large_image", title: article.headline, description: article.standfirst }, alternates: { canonical: `/articles/${article.slug}` } }; }
export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) { const article = await getContentArticle((await params).slug); if (!article) notFound(); const related = await getRelatedContentArticles(article); return <article className="article-page">
  <header className="article-header wrap"><div className="article-kicker"><a href={`/${article.category.toLowerCase()}`}>{article.category}</a><span>Analysis</span></div><h1>{article.headline}</h1><p className="standfirst">{article.standfirst}</p><div className="byline"><span>By <strong>{article.author}</strong></span><time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time><span>6 min read</span></div></header>
  <div className="article-hero wrap"><StoryArt variant={article.featuredImage} /></div>
  <div className="article-layout wrap"><aside className="share" aria-label="Share article"><span>Share</span><a href={`https://www.linkedin.com/sharing/share-offsite/?url=https://thechnnl.com/articles/${article.slug}`}>LinkedIn</a><a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.headline)}`}>X / Twitter</a></aside><div className="prose"><ArticleBody body={article.body} /></div></div>
  <section className="related wrap"><div className="section-head"><div><span className="eyebrow">Keep reading</span><h2>Related stories</h2></div></div><div className="article-grid">{related.map(a => <ArticleCard key={a.id} article={a} />)}</div></section>
  </article> }
