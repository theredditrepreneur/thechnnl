import Link from "next/link";
import { ArticleCard, StoryArt } from "../components/ArticleCard";
import {categoryDescriptions} from "../lib/articles";
import {getAllContentArticles, getHomeContent} from "../lib/content";

const sections = ["Commerce", "Business", "Platforms", "Brands", "People"];
export default async function Home() {
  const [home, articles] = await Promise.all([getHomeContent(), getAllContentArticles()]);
  const lead = home.featuredArticle || articles[0];
  const latest = articles.slice(0, 6);
  const byCategory = (category: string) => articles.filter(article => article.category.toLowerCase() === category.toLowerCase());
  const headlineParts = home.headline.match(/^(.*?)(creator economy\.?$)/i);
  return <>
    <section className="intro wrap"><span className="eyebrow">{home.eyebrow}</span><h1>{headlineParts ? <>{headlineParts[1]}<em>{headlineParts[2]}</em></> : home.headline}</h1><div className="intro-bottom"><p>{home.supportingCopy}</p><a href={home.primaryCtaHref} className="text-link">{home.primaryCtaLabel} <span>↓</span></a></div></section>
    <section className="lead wrap"><Link className="lead-art" href={`/articles/${lead.slug}`}><StoryArt variant={lead.featuredImage} priority /></Link><article><div className="story-meta"><Link href="/commerce">Commerce</Link><span>Lead story</span></div><h2><Link href={`/articles/${lead.slug}`}>{lead.headline}</Link></h2><p>{lead.excerpt}</p><Link href={`/articles/${lead.slug}`} className="text-link">Read the story →</Link></article></section>
    <section id="latest" className="section wrap"><div className="section-head"><div><span className="eyebrow">Fresh intelligence</span><h2>{home.latestHeading}</h2></div><Link href="/latest" className="text-link">View all latest →</Link></div><div className="latest-grid">{latest.map((a, i) => <ArticleCard key={a.id} article={a} compact={i > 2} />)}</div></section>
    <section className="numbers"><div className="wrap"><div className="numbers-head"><div><span className="eyebrow light">Demo data · not verified statistics</span><h2>{home.numbersHeading}</h2></div><p>{home.numbersDescription}</p></div><div className="number-grid">{home.demonstrationNumbers.map((item, i) => <article key={`${item.value}-${i}`}><span>0{i + 1}</span><strong>{item.value}</strong><p>{item.description}</p><small>Illustrative example</small></article>)}</div></div></section>
    {sections.map((section, i) => <section className={`channel-section wrap ${i % 2 ? "reverse" : ""}`} key={section}><div className="channel-intro"><span className="index">0{i + 1}</span><span className="eyebrow">Editorial channel</span><h2>{section}</h2><p>{categoryDescriptions[section.toLowerCase()]}</p><Link href={`/${section.toLowerCase()}`} className="text-link">Explore {section.toLowerCase()} →</Link></div><div className="channel-stories">{byCategory(section).slice(0, 2).map(a => <ArticleCard key={a.id} article={a} compact />)}</div></section>)}
    <section className="opportunity-callout wrap"><span className="eyebrow light">Participation</span><h2>{home.opportunitiesHeadline}</h2><p>{home.opportunitiesCopy}</p><Link href="/opportunities" className="button inverted">Explore opportunities</Link></section>
  </>;
}
