import type {StructureResolver} from 'sanity/structure'
export const structure: StructureResolver = S => S.list().title('The Chnnl').items([
  S.listItem().title('Site settings').child(S.document().schemaType('siteSettings').documentId('siteSettings')),
  S.listItem().title('Homepage').child(S.document().schemaType('homePage').documentId('homePage')),
  S.divider(),
  S.documentTypeListItem('article').title('Articles'),
  S.documentTypeListItem('category').title('Categories'),
  S.documentTypeListItem('author').title('Authors'),
  S.documentTypeListItem('opportunity').title('Opportunities'),
])
