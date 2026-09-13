import { defineType, defineField } from 'sanity';

// A single-line string field with one value per supported language.
// Used anywhere short text (titles, labels, nav items) needs translation.
export default defineType({
  name: 'localeString',
  title: 'Localized string',
  type: 'object',
  fields: [
    defineField({ name: 'en', title: 'English', type: 'string' }),
    defineField({ name: 'am', title: 'Հայերեն', type: 'string' }),
    defineField({ name: 'ru', title: 'Русский', type: 'string' }),
  ],
});
