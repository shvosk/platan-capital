import { defineType, defineField } from 'sanity';

// Multi-line / rich text field with one value per supported language.
// Used for body copy, bios, disclosures — anything longer than a label.
export default defineType({
  name: 'localeText',
  title: 'Localized text',
  type: 'object',
  fields: [
    defineField({ name: 'en', title: 'English', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'am', title: 'Հայերեն', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'ru', title: 'Русский', type: 'array', of: [{ type: 'block' }] }),
  ],
});
