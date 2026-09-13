import { defineType, defineField } from 'sanity';

// Generic page document. Kept intentionally loose (a "sections" array)
// until the final page designs are in — at that point, swap the single
// "section" block below for typed sections that match the real layout
// (hero, stats bar, strategy cards, etc.) instead of one catch-all.
export default defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'localeString' }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title.en' },
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO description',
      type: 'localeString',
    }),
    defineField({
      name: 'sections',
      title: 'Sections',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'section',
          fields: [
            defineField({
              name: 'key',
              title: 'Anchor key',
              type: 'string',
              description:
                'Stable, locale-independent id for linking directly to this section (e.g. "about", "reports"). Used for anchors like #reports.',
            }),
            defineField({ name: 'heading', title: 'Heading', type: 'localeString' }),
            defineField({ name: 'body', title: 'Body', type: 'localeText' }),
          ],
        },
      ],
    }),
  ],
});
