import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({ name: 'firmName', title: 'Firm name', type: 'string' }),
    defineField({ name: 'tagline', title: 'Tagline', type: 'localeString' }),
    defineField({ name: 'email', title: 'Contact email', type: 'string' }),
    defineField({ name: 'officeAddress', title: 'Office address', type: 'localeString' }),
    defineField({
      name: 'legalDisclaimer',
      title: 'Legal disclaimer',
      type: 'localeText',
      description: 'Regulatory footer disclaimer, shown site-wide.',
    }),
  ],
});
