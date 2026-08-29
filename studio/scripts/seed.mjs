import {createClient} from '@sanity/client'
import {getCliClient} from 'sanity/cli'
import {createReadStream} from 'node:fs'
import {dirname, resolve} from 'node:path'
import {fileURLToPath} from 'node:url'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID
const token = process.env.SANITY_API_WRITE_TOKEN
if (!projectId) throw new Error('Set SANITY_STUDIO_PROJECT_ID before seeding.')
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'
const client = token
  ? createClient({projectId, dataset, apiVersion: '2026-08-29', token, useCdn: false})
  : getCliClient({apiVersion: '2026-08-29', dataset})
const scriptDirectory = dirname(fileURLToPath(import.meta.url))
const logoAsset = await client.assets.upload('image', createReadStream(resolve(scriptDirectory, '../../public/brand/the-chnnl-banner.jpg')), {filename: 'the-chnnl-banner.jpg'})
const faviconAsset = await client.assets.upload('image', createReadStream(resolve(scriptDirectory, '../../public/favicon.jpg')), {filename: 'the-chnnl-favicon.jpg'})
const categories = [
  ['Commerce','commerce','TikTok Shop, affiliate marketing, LIVE shopping and the infrastructure turning content into transactions.'],
  ['Business','business','The economics of being a creator, including revenue models, agencies, companies, funding and entrepreneurship.'],
  ['Platforms','platforms','What changes at TikTok, YouTube, Instagram and other platforms mean for people building businesses on them.'],
  ['Brands','brands','How brands are working with creators, affiliates and social commerce.'],
  ['People','people','Profiles and conversations with the people building the creator economy.'],
]
const categoryIds = {}
for (let i=0;i<categories.length;i++) {const [title,slug,description]=categories[i]; const existing=await client.fetch('*[_type=="category" && slug.current==$slug][0]._id',{slug}); const doc=existing ? {_id:existing} : await client.create({_type:'category',title,slug:{_type:'slug',current:slug},description,order:i}); categoryIds[title]=doc._id}
let authorId = await client.fetch('*[_type=="author" && name==$name][0]._id',{name:'The Chnnl editorial team'})
if (!authorId) authorId=(await client.create({_type:'author',name:'The Chnnl editorial team',role:'Editorial team'}))._id
await client.createOrReplace({_id:'siteSettings',_type:'siteSettings',publicationName:'The Chnnl',tagline:'The business behind the creator economy.',description:'The Chnnl covers creators, platforms, social commerce, brands and the businesses being built around online influence.',contactEmail:'wearethechnnl@gmail.com',logo:{_type:'image',asset:{_type:'reference',_ref:logoAsset._id},alt:'The Chnnl'},favicon:{_type:'image',asset:{_type:'reference',_ref:faviconAsset._id},alt:'The Chnnl favicon'},navigation:['Latest','Commerce','Business','Platforms','Brands','People','Opportunities'].map((label,i)=>({_key:`nav-${i}`,_type:'object',label,href:`/${label.toLowerCase()}`})),newsletterEyebrow:'The briefing',newsletterHeadline:'Know where the creator economy is going.',newsletterDescription:'A concise editorial briefing. No invented hype.'})
const storyData = [
 ['Commerce','TikTok Shop is changing what it means to be a creator','Not just views and followers anymore. Creators can become genuine sales channels.','tiktok-shop-is-changing-what-it-means-to-be-a-creator','signal'],
 ['Brands','Why brands are starting to treat creators as sales channels','Follower counts still matter, but measurable sales are creating a different kind of creator value.','why-brands-treat-creators-as-sales-channels','checkout'],
 ['Commerce','The rise of the TikTok Shop agency','A new generation of agencies is emerging around creators, affiliates, brands and social commerce.','rise-of-the-tiktok-shop-agency','network'],
 ['Business','What does a TikTok Shop creator actually earn?','Commission, GMV, retainers, samples and LIVE shopping are creating several creator income models.','what-does-a-tiktok-shop-creator-earn','ledger'],
 ['Business','Creators are building businesses beyond sponsorships','Affiliate commerce, products, subscriptions and creator-led companies are expanding creator careers.','creators-building-beyond-sponsorships','stack'],
 ['Platforms','The platforms are competing for creator businesses, not just creator attention','TikTok, YouTube and Instagram increasingly need to provide ways for creators to make money.','platforms-competing-for-creator-businesses','orbit'],
 ['People','The next important creator might not have millions of followers','Commercial influence can look very different from traditional social media popularity.','next-important-creator','profile'],
]
const bodyText = ['The creator economy is moving into a more commercially accountable phase. Reach still matters, but the strongest signals increasingly come from what audiences do next: click, subscribe, buy or return.','For years, creators were treated mainly as a media channel. Social commerce changes that relationship. A creator can now sit across discovery, explanation, conversion and customer trust.']
let leadId
for (let i=0;i<storyData.length;i++) {
  const [category,headline,excerpt,slug,fallbackArt]=storyData[i]
  let id=await client.fetch('*[_type=="article" && slug.current==$slug][0]._id',{slug})
  if(!id){
    const body=bodyText.map((text,n)=>({_key:`p-${n}`,_type:'block',style:'normal',markDefs:[],children:[{_key:`s-${n}`,_type:'span',marks:[],text}]}))
    const doc=await client.create({_type:'article',headline,slug:{_type:'slug',current:slug},excerpt,standfirst:excerpt,category:{_type:'reference',_ref:categoryIds[category]},author:{_type:'reference',_ref:authorId},publishedAt:new Date(Date.UTC(2026,7,10-i)).toISOString(),featured:i===0,fallbackArt,tags:[category.toLowerCase(),'creator economy'],body})
    id=doc._id
  }
  if(i===0) leadId=id
}
await client.createOrReplace({_id:'homePage',_type:'homePage',eyebrow:'Independent creator economy intelligence',headline:'The business behind the creator economy.',supportingCopy:'The Chnnl follows the creators, companies, platforms and money shaping the new media economy.',primaryCtaLabel:'Explore the latest stories',primaryCtaHref:'#latest',featuredArticle:{_type:'reference',_ref:leadId},latestHeading:'Latest stories',numbersHeading:'The Numbers',numbersDescription:'The numbers behind the creator economy. A preview of a future data-led editorial product.',demonstrationNumbers:[['£72,450','GMV generated by a creator in one month.'],['1,842','Products sold during a LIVE shopping campaign.'],['4.2M','Views generated by a creator campaign.'],['£8.70','Average commission earned per order in an example campaign.']].map(([value,description],i)=>({_key:`number-${i}`,_type:'object',value,description})),opportunitiesHeadline:'There is more than one way into the creator economy.',opportunitiesCopy:'Find jobs, programmes, partnerships, affiliate opportunities and events.'})
console.log('The Chnnl content seeded successfully.')
