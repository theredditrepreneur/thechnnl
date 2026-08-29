import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleCard, StoryArt } from "../../components/ArticleCard";
import {categoryDescriptions} from "../../lib/articles";
import {getContentByCategory, getContentCategories} from "../../lib/content";

const valid = ["latest", "commerce", "business", "platforms", "brands", "people"];
export function generateStaticParams() { return valid.map(category => ({ category })); }
export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> { const { category } = await params; if (!valid.includes(category)) return {}; const info = (await getContentCategories()).find(item => item.slug === category); const title = info?.title || category[0].toUpperCase() + category.slice(1); return { title, description: info?.description || categoryDescriptions[category] }; }
export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params; if (!valid.includes(category)) notFound();
  const info = (await getContentCategories()).find(item => item.slug === category);
  const title = info?.title || category[0].toUpperCase() + category.slice(1);
  const items = await getContentByCategory(category);
  const [featured, ...rest] = items;
  return <div className="page-shell wrap"><header className="category-header"><span className="eyebrow">The Chnnl / Channel</span><h1>{title}</h1><p>{info?.description || categoryDescriptions[category]}</p></header>
    {featured && <section className="category-feature"><Link href={`/articles/${featured.slug}`}><StoryArt variant={featured.featuredImage} /></Link><div><span className="eyebrow">Featured story</span><h2><Link href={`/articles/${featured.slug}`}>{featured.headline}</Link></h2><p>{featured.excerpt}</p><Link className="text-link" href={`/articles/${featured.slug}`}>Read the story →</Link></div></section>}
    <section className="section"><div className="section-head"><h2>More from {title}</h2><span className="result-count">{rest.length} stories</span></div><div className="article-grid">{rest.map(a => <ArticleCard key={a.id} article={a} />)}</div><nav className="pagination" aria-label="Pagination"><span>Page 1 of 1</span><button disabled>Previous</button><button disabled>Next</button></nav></section>
  </div>;
}
