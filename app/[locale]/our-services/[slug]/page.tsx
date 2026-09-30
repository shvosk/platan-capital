import { useTranslations } from 'next-intl';
import { client } from '@/sanity/client';
import { pageBySlugQuery } from '@/sanity/lib/queries';
import { pick } from '@/sanity/lib/locale';
import type { Locale } from '@/i18n';

export const revalidate = false;

export default async function OurServicesPage({
  params: { locale, slug },
}: {
  params: { locale: Locale; slug: string };
}) {
  const t = useTranslations('nav');
  const items = t.raw('ourServicesItems') as { label: string; slug: string }[];
  const fallbackTitle = items.find((i) => i.slug === slug)?.label ?? slug;

  const page = await client.fetch(pageBySlugQuery, { slug: `our-services/${slug}` });
  const title = page?.title ? pick(page.title, locale) : fallbackTitle;

  return (
    <section className="mx-auto max-w-content px-6 py-20 lg:px-10">
      <h1 className="mb-10 font-display text-display font-medium text-ink">{title}</h1>
      {page?.sections?.map((section: any, i: number) => (
        <div key={i} className="mb-10 max-w-2xl border-t border-line pt-8">
          <h2 className="mb-3 font-display text-heading font-medium text-ink">
            {pick(section.heading, locale)}
          </h2>
        </div>
      ))}
      {!page && (
        <p className="max-w-2xl font-sans text-body italic text-muted">
          Content pending — add a Page document in Sanity with slug "our-services/{slug}".
        </p>
      )}
    </section>
  );
}
