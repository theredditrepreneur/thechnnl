import {defineArrayMember, defineField} from 'sanity'
export const seoFields = [
  defineField({name: 'seoTitle', title: 'SEO title', type: 'string', validation: rule => rule.max(60).warning('Aim for 60 characters or fewer')}),
  defineField({name: 'seoDescription', title: 'SEO description', type: 'text', rows: 3, validation: rule => rule.max(160).warning('Aim for 160 characters or fewer')}),
  defineField({name: 'openGraphImage', title: 'Social sharing image', type: 'image', options: {hotspot: true}, fields: [defineField({name: 'alt', title: 'Alternative text', type: 'string', validation: rule => rule.required()})]}),
]
export const portableText = defineField({name: 'body', title: 'Article body', type: 'array', of: [
  defineArrayMember({type: 'block', styles: [{title: 'Normal', value: 'normal'}, {title: 'Heading 2', value: 'h2'}, {title: 'Heading 3', value: 'h3'}, {title: 'Pull quote', value: 'blockquote'}], marks: {annotations: [defineArrayMember({name: 'link', title: 'Link', type: 'object', fields: [defineField({name: 'href', type: 'url', validation: rule => rule.uri({scheme: ['http', 'https', 'mailto']}).required()}), defineField({name: 'openInNewTab', type: 'boolean', initialValue: false})]})]}}),
  defineArrayMember({name: 'editorialImage', title: 'Editorial image', type: 'image', options: {hotspot: true}, fields: [defineField({name: 'alt', title: 'Alternative text', type: 'string', validation: rule => rule.required()}), defineField({name: 'caption', type: 'string'})]}),
], validation: rule => rule.required()})
