import {defineArrayMember, defineField, defineType} from 'sanity'
import {portableText, seoFields} from './shared'
export const article = defineType({name: 'article', title: 'Article', type: 'document', groups: [{name: 'content', title: 'Content', default: true}, {name: 'seo', title: 'SEO'}], fields: [
  defineField({name: 'headline', title: 'Headline', type: 'string', group: 'content', validation: rule => rule.required()}),
  defineField({name: 'slug', title: 'URL slug', type: 'slug', group: 'content', options: {source: 'headline', maxLength: 96}, validation: rule => rule.required()}),
  defineField({name: 'excerpt', title: 'Card excerpt', type: 'text', rows: 3, group: 'content', validation: rule => rule.required().max(220).warning('Keep cards concise')}),
  defineField({name: 'standfirst', title: 'Standfirst', type: 'text', rows: 3, group: 'content', validation: rule => rule.required()}),
  defineField({name: 'category', type: 'reference', to: [{type: 'category'}], group: 'content', validation: rule => rule.required()}),
  defineField({name: 'author', type: 'reference', to: [{type: 'author'}], group: 'content', validation: rule => rule.required()}),
  defineField({name: 'publishedAt', title: 'Publication date', type: 'datetime', group: 'content', initialValue: () => new Date().toISOString(), validation: rule => rule.required()}),
  defineField({name: 'featuredImage', title: 'Featured image', type: 'image', group: 'content', options: {hotspot: true}, fields: [defineField({name: 'alt', title: 'Alternative text', type: 'string', validation: rule => rule.required()}), defineField({name: 'caption', type: 'string'})]}),
  defineField({name: 'fallbackArt', title: 'Fallback artwork style', type: 'string', group: 'content', options: {list: ['signal', 'checkout', 'network', 'ledger', 'stack', 'orbit', 'profile', 'brief', 'archive', 'studio']}, initialValue: 'signal'}),
  defineField({name: 'featured', title: 'Feature this story', type: 'boolean', group: 'content', initialValue: false}),
  defineField({name: 'tags', type: 'array', group: 'content', of: [defineArrayMember({type: 'string'})], validation: rule => rule.unique().max(10)}),
  {...portableText, group: 'content'},
  ...seoFields.map(field => ({...field, group: 'seo'})),
], orderings: [{title: 'Publication date, newest', name: 'publishedAtDesc', by: [{field: 'publishedAt', direction: 'desc'}]}], preview: {select: {title: 'headline', subtitle: 'category.title', media: 'featuredImage'}}})
