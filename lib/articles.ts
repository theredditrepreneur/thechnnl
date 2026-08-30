export type Category = "Commerce" | "Business" | "Platforms" | "Brands" | "People";
export type BodyBlock =
  | { type: "heading"; content: string }
  | { type: "paragraph"; content: string }
  | { type: "quote"; content: string }
  | { type: "list"; items: string[] };

export type Article = {
  id: string; slug: string; headline: string; excerpt: string; standfirst: string;
  category: Category; author: string; publishedAt: string; featuredImage: string;
  featured?: boolean; body: BodyBlock[] | Record<string, unknown>[]; tags: string[]; featuredImageAlt?: string;
};

const sharedBody: BodyBlock[] = [
  { type: "paragraph", content: "The creator economy is moving into a more commercially accountable phase. Reach still matters, but the strongest signals increasingly come from what audiences do next: click, subscribe, buy or return." },
  { type: "heading", content: "Attention is becoming infrastructure" },
  { type: "paragraph", content: "For years, creators were treated mainly as a media channel. Social commerce changes that relationship. A creator can now sit across discovery, explanation, conversion and customer trust — roles that once belonged to several different parts of a marketing organisation." },
  { type: "quote", content: "The most valuable creator may not be the one with the largest audience, but the one whose audience is ready to act." },
  { type: "paragraph", content: "That does not mean every creator should become a salesperson. It does mean the commercial toolkit is expanding, and with it the ways a sustainable creator business can be built." },
  { type: "heading", content: "A broader business model" },
  { type: "list", items: ["Affiliate commission tied to completed orders", "Paid partnerships that combine creative fees and performance", "LIVE shopping, product launches and recurring formats", "Owned products, communities and subscriptions"] },
  { type: "paragraph", content: "The important question is no longer simply how many people saw a post. It is how creators, platforms and brands share the value created around that attention — and whether the system can support durable businesses." },
];

const make = (id: string, category: Category, headline: string, excerpt: string, slug: string, art: string, featured = false): Article => ({
  id, category, headline, excerpt, slug, featured, featuredImage: art,
  standfirst: excerpt, author: "The Chnnl editorial team", publishedAt: `2026-08-${String(11 - Number(id)).padStart(2, "0")}`,
  body: sharedBody, tags: [category.toLowerCase(), "creator economy"],
});

export const articles: Article[] = [
  { ...make("1", "Commerce", "TikTok Shop is changing what it means to be a creator", "Creators are no longer just generating attention. They can now become genuine sales channels, changing how brands measure influence and how creators build businesses.", "tiktok-shop-is-changing-what-it-means-to-be-a-creator", "signal", true), standfirst: "Not just views and followers anymore. Creators can become genuine sales channels." },
  make("2", "Brands", "Why brands are starting to treat creators as sales channels", "Follower counts still matter, but the ability to generate measurable sales is creating a different kind of creator value.", "why-brands-treat-creators-as-sales-channels", "checkout"),
  make("3", "Commerce", "The rise of the TikTok Shop agency", "A new generation of agencies is emerging around creators, affiliates, brands and social commerce.", "rise-of-the-tiktok-shop-agency", "network"),
  make("4", "Business", "What does a TikTok Shop creator actually earn?", "Commission, GMV, retainers, samples and LIVE shopping are creating several different creator income models.", "what-does-a-tiktok-shop-creator-earn", "ledger"),
  make("5", "Business", "Creators are building businesses beyond sponsorships", "Affiliate commerce, products, subscriptions and creator led companies are expanding what a creator career can look like.", "creators-building-beyond-sponsorships", "stack"),
  make("6", "Platforms", "The platforms are competing for creator businesses, not just creator attention", "TikTok, YouTube and Instagram increasingly need to provide creators with ways to make money, not simply reach audiences.", "platforms-competing-for-creator-businesses", "orbit"),
  make("7", "People", "The next important creator might not have millions of followers", "Commercial influence can look very different from traditional social media popularity.", "next-important-creator", "profile"),
  make("8", "Brands", "The creator brief is becoming a commercial document", "The best briefs connect creative freedom with a clear view of audience, offer and outcome.", "creator-brief-commercial-document", "brief"),
  make("9", "Platforms", "YouTube is becoming a home for durable creator companies", "Long-form attention, memberships and commerce make the platform more than a distribution channel.", "youtube-durable-creator-companies", "archive"),
  make("10", "People", "Inside the new generation of creator operators", "The people behind the camera are building teams, systems and repeatable revenue.", "creator-operators", "studio"),
];

export const getAllArticles = () => [...articles].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
export const getLatestArticles = (limit = 6) => getAllArticles().slice(0, limit);
export const getArticlesByCategory = (category: string) => getAllArticles().filter(a => a.category.toLowerCase() === category.toLowerCase());
export const getArticleBySlug = (slug: string) => articles.find(a => a.slug === slug);
export const getRelatedArticles = (article: Article, limit = 3) => articles.filter(a => a.id !== article.id && (a.category === article.category || a.tags.some(t => article.tags.includes(t)))).slice(0, limit);
export const formatDate = (date: string) => {
  const parsed = new Date(date.includes("T") ? date : `${date}T12:00:00Z`);
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric" }).format(parsed);
};

export const categoryDescriptions: Record<string, string> = {
  latest: "The latest reporting and analysis from across the creator economy.",
  commerce: "TikTok Shop, affiliate marketing, LIVE shopping and the infrastructure turning content into transactions.",
  business: "The economics of being a creator, including revenue models, agencies, companies, funding and entrepreneurship.",
  platforms: "What changes at TikTok, YouTube, Instagram and other platforms mean for people building businesses on them.",
  brands: "How brands are working with creators, affiliates and social commerce.",
  people: "Profiles and conversations with the people building the creator economy.",
};
