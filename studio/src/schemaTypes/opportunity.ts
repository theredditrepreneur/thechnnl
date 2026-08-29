import {defineField, defineType} from 'sanity'
export const opportunity = defineType({name: 'opportunity', title: 'Opportunity', type: 'document', fields: [
  defineField({name: 'title', type: 'string', validation: rule => rule.required()}),
  defineField({name: 'type', type: 'string', options: {list: ['Jobs', 'Creator programmes', 'Brand opportunities', 'Affiliate programmes', 'Events']}, validation: rule => rule.required()}),
  defineField({name: 'organisation', type: 'string', validation: rule => rule.required()}),
  defineField({name: 'location', type: 'string'}),
  defineField({name: 'url', type: 'url', validation: rule => rule.uri({scheme: ['http', 'https']})}),
  defineField({name: 'closingDate', type: 'date'}),
  defineField({name: 'published', type: 'boolean', initialValue: false}),
], preview: {select: {title: 'title', subtitle: 'organisation'}}})
