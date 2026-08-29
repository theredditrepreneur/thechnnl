import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './src/schemaTypes'
import {structure} from './src/structure'
export default defineConfig({name: 'theChnnl', title: 'The Chnnl', projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'replace-me', dataset: process.env.SANITY_STUDIO_DATASET || 'production', plugins: [structureTool({structure}), visionTool()], schema: {types: schemaTypes}})
