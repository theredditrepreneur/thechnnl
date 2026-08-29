import {defineQuery} from 'next-sanity'

const articleCardFields = /* groq */ `
  "id": _id,
  "slug": slug.current,
  headline,
  excerpt,
  standfirst,
  "category": category->title,
  "author": author->name,
  publishedAt,
  "featuredImage": coalesce(featuredImage.asset->url, fallbackArt, "signal"),
  "featuredImageAlt": featuredImage.alt,
  featured,
  tags
`
export const ALL_ARTICLES_QUERY = defineQuery(`*[_type == "article" && defined(slug.current)] | order(publishedAt desc, _id){${articleCardFields}}`)
export const ARTICLE_QUERY = defineQuery(`*[_type == "article" && slug.current == $slug][0]{${articleCardFields}, body}`)
export const SETTINGS_QUERY = defineQuery(`*[_id == "siteSettings"][0]{publicationName, tagline, description, contactEmail, "logoUrl": logo.asset->url, logo{alt}, "faviconUrl": favicon.asset->url, navigation[]{label, href}, linkedinUrl, newsletterEyebrow, newsletterHeadline, newsletterDescription, seoTitle, seoDescription, "openGraphImageUrl": openGraphImage.asset->url}`)
export const HOME_QUERY = defineQuery(`*[_id == "homePage"][0]{eyebrow, headline, supportingCopy, primaryCtaLabel, primaryCtaHref, latestHeading, numbersHeading, numbersDescription, demonstrationNumbers[]{value, description, sourceUrl}, opportunitiesHeadline, opportunitiesCopy, "featuredArticle": featuredArticle->{${articleCardFields}}}`)
export const CATEGORIES_QUERY = defineQuery(`*[_type == "category" && defined(slug.current)] | order(order asc, title asc){title, "slug": slug.current, description}`)
export const OPPORTUNITIES_QUERY = defineQuery(`*[_type == "opportunity" && published == true] | order(closingDate asc){"id": _id, type, title, organisation, location, url, closingDate}`)
