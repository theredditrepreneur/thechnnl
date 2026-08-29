import {defineField, defineType} from 'sanity'
export const author = defineType({name: 'author', title: 'Author', type: 'document', fields: [
  defineField({name: 'name', type: 'string', validation: rule => rule.required()}),
  defineField({name: 'role', type: 'string'}),
  defineField({name: 'bio', type: 'text', rows: 4}),
  defineField({name: 'image', type: 'image', options: {hotspot: true}, fields: [defineField({name: 'alt', type: 'string', validation: rule => rule.required()})]}),
], preview: {select: {title: 'name', subtitle: 'role', media: 'image'}}})
