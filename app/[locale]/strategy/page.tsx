import { client } from '@/sanity/client';
import { pageBySlugQuery } from '@/sanity/lib/queries';
import { pick } from '@/sanity/lib/locale';
import type { Locale } from '@/i18n';

export const revalidate = 60;

export default async function StrategyPage({ params: { locale } }: { params: { locale: Locale } }) {
  const page = await client.fetch(pageBySlugQuery, { slug: 'strategy' });

  return (
    <section className="mx-auto max-w-content px-6 py-20 lg:px-10">
      <h1 className="mb-10 font-display text-display font-medium text-ink">
        {pick(page?.title, locale) ?? 'Strategy'}
      </h1>
      {page?.sections?.map((section: any, i: number) => (
        <div key={i} className="mb-10 max-w-2xl border-t border-line pt-8">
          <h2 className="mb-3 font-display text-heading font-medium text-ink">
            {pick(section.heading, locale)}
          </h2>
          {/* Render section.body (Portable Text) once real content exists */}
        </div>
      ))}
    </section>
  );
}
