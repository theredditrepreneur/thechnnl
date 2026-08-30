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
    <section className="lead wrap"><a className="lead-art" href={`/articles/${lead.slug}`}><StoryArt variant={lead.featuredImage} priority /></a><article><div className="story-meta"><a href="/commerce">Commerce</a><span>Lead story</span></div><h2><a href={`/articles/${lead.slug}`}>{lead.headline}</a></h2><p>{lead.excerpt}</p><a href={`/articles/${lead.slug}`} className="text-link">Read the story →</a></article></section>
    <section id="latest" className="section wrap"><div className="section-head"><div><span className="eyebrow">Fresh intelligence</span><h2>{home.latestHeading}</h2></div><a href="/latest" className="text-link">View all latest →</a></div><div className="latest-grid">{latest.map((a, i) => <ArticleCard key={a.id} article={a} compact={i > 2} />)}</div></section>
    {sections.map((section, i) => <section className={`channel-section wrap ${i % 2 ? "reverse" : ""}`} key={section}><div className="channel-intro"><span className="index">0{i + 1}</span><span className="eyebrow">Editorial channel</span><h2>{section}</h2><p>{categoryDescriptions[section.toLowerCase()]}</p><a href={`/${section.toLowerCase()}`} className="text-link">Explore {section.toLowerCase()} →</a></div><div className="channel-stories">{byCategory(section).slice(0, 2).map(a => <ArticleCard key={a.id} article={a} compact />)}</div></section>)}
    <section className="opportunity-callout wrap"><span className="eyebrow light">Participation</span><h2>{home.opportunitiesHeadline}</h2><p>{home.opportunitiesCopy}</p><a href="/opportunities" className="button inverted">Explore opportunities</a></section>
  </>;
}
