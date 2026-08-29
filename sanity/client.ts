import {createClient} from 'next-sanity'

export const sanityConfigured = Boolean(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID)
export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'placeholder',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2026-08-29',
  useCdn: true,
})
