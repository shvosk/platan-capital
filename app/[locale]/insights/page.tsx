import { client } from '@/sanity/client';
import { pageBySlugQuery } from '@/sanity/lib/queries';
import { pick } from '@/sanity/lib/locale';
import type { Locale } from '@/i18n';

export const revalidate = 60;

export default async function InsightsPage({ params: { locale } }: { params: { locale: Locale } }) {
  const page = await client.fetch(pageBySlugQuery, { slug: 'insights' });

  return (
    <section className="mx-auto max-w-content px-6 py-20 lg:px-10">
      <h1 className="mb-10 font-display text-display font-medium text-ink">
        {pick(page?.title, locale) ?? 'Insights'}
      </h1>
      {/* Article list — schema for individual insight/commentary pieces
          not yet defined; add an `insight` document type in Sanity
          when this section's content shape is decided. */}
    </section>
  );
}
