import {defineArrayMember, defineField, defineType} from 'sanity'
import {seoFields} from './shared'
export const siteSettings = defineType({name: 'siteSettings', title: 'Site settings', type: 'document', groups: [{name: 'identity', title: 'Identity', default: true}, {name: 'navigation', title: 'Navigation'}, {name: 'newsletter', title: 'Newsletter'}, {name: 'seo', title: 'SEO'}], fields: [
  defineField({name: 'publicationName', type: 'string', group: 'identity', initialValue: 'The Chnnl', validation: rule => rule.required()}),
  defineField({name: 'tagline', type: 'string', group: 'identity', initialValue: 'The business behind the creator economy.', validation: rule => rule.required()}),
  defineField({name: 'description', type: 'text', rows: 4, group: 'identity', validation: rule => rule.required()}),
  defineField({name: 'contactEmail', type: 'string', group: 'identity', initialValue: 'wearethechnnl@gmail.com', validation: rule => rule.email().required()}),
  defineField({name: 'logo', type: 'image', group: 'identity', options: {hotspot: true}, fields: [defineField({name: 'alt', type: 'string', initialValue: 'The Chnnl'})]}),
  defineField({name: 'favicon', type: 'image', group: 'identity', fields: [defineField({name: 'alt', type: 'string', initialValue: 'The Chnnl icon'})]}),
  defineField({name: 'navigation', type: 'array', group: 'navigation', of: [defineArrayMember({type: 'object', fields: [defineField({name: 'label', type: 'string', validation: rule => rule.required()}), defineField({name: 'href', type: 'string', validation: rule => rule.required()})], preview: {select: {title: 'label', subtitle: 'href'}}})], validation: rule => rule.max(10)}),
  defineField({name: 'linkedinUrl', type: 'url', group: 'navigation', validation: rule => rule.uri({scheme: ['http', 'https']})}),
  defineField({name: 'newsletterEyebrow', type: 'string', group: 'newsletter', initialValue: 'The briefing'}),
  defineField({name: 'newsletterHeadline', type: 'string', group: 'newsletter', initialValue: 'Know where the creator economy is going.'}),
  defineField({name: 'newsletterDescription', type: 'string', group: 'newsletter', initialValue: 'A concise editorial briefing. No invented hype.'}),
  ...seoFields.map(field => ({...field, group: 'seo'})),
]})
