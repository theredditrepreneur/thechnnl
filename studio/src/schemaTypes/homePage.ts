import {defineArrayMember, defineField, defineType} from 'sanity'
export const homePage = defineType({name: 'homePage', title: 'Homepage', type: 'document', fields: [
  defineField({name: 'eyebrow', type: 'string', initialValue: 'Independent creator economy intelligence'}),
  defineField({name: 'headline', type: 'string', initialValue: 'The business behind the creator economy.', validation: rule => rule.required()}),
  defineField({name: 'supportingCopy', type: 'text', rows: 3, validation: rule => rule.required()}),
  defineField({name: 'primaryCtaLabel', type: 'string', initialValue: 'Explore the latest stories'}),
  defineField({name: 'primaryCtaHref', type: 'string', initialValue: '#latest'}),
  defineField({name: 'featuredArticle', type: 'reference', to: [{type: 'article'}]}),
  defineField({name: 'latestHeading', type: 'string', initialValue: 'Latest stories'}),
  defineField({name: 'numbersHeading', type: 'string', initialValue: 'The Numbers'}),
  defineField({name: 'numbersDescription', type: 'string', initialValue: 'The numbers behind the creator economy.'}),
  defineField({name: 'demonstrationNumbers', title: 'Demonstration numbers', description: 'These are always labelled illustrative on the website.', type: 'array', of: [defineArrayMember({type: 'object', fields: [defineField({name: 'value', type: 'string', validation: rule => rule.required()}), defineField({name: 'description', type: 'string', validation: rule => rule.required()}), defineField({name: 'sourceUrl', type: 'url'})], preview: {select: {title: 'value', subtitle: 'description'}}})]}),
  defineField({name: 'opportunitiesHeadline', type: 'string', initialValue: 'There is more than one way into the creator economy.'}),
  defineField({name: 'opportunitiesCopy', type: 'string'}),
]})
