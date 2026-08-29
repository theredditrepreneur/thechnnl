import {defineField, defineType} from 'sanity'
export const category = defineType({name: 'category', title: 'Category', type: 'document', fields: [
  defineField({name: 'title', type: 'string', validation: rule => rule.required()}),
  defineField({name: 'slug', type: 'slug', options: {source: 'title'}, validation: rule => rule.required()}),
  defineField({name: 'description', type: 'text', rows: 4, validation: rule => rule.required()}),
  defineField({name: 'order', title: 'Display order', type: 'number', validation: rule => rule.integer().min(0)}),
], preview: {select: {title: 'title', subtitle: 'description'}}})
