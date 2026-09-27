import { useTranslations } from 'next-intl';
import { client } from '@/sanity/client';
import { pageBySlugQuery } from '@/sanity/lib/queries';
import { pick } from '@/sanity/lib/locale';
import type { Locale } from '@/i18n';



export default async function RegulatoryPage({ params: { locale } }: { params: { locale: Locale } }) {
  const t = useTranslations('regulatory');
  const page = await client.fetch(pageBySlugQuery, { slug: 'regulatory' });

  const requiredSections = t.raw('sections') as { key: string; title: string }[];
  const sanitySections: { key?: string; heading?: any; body?: any }[] = page?.sections ?? [];

  const lastUpdated = page?._updatedAt
    ? new Intl.DateTimeFormat(locale, { year: 'numeric', month: 'long', day: 'numeric' }).format(
        new Date(page._updatedAt)
      )
    : null;

  return (
    <section className="mx-auto max-w-content px-6 py-20 lg:px-10">
      <p className="label mb-4 text-muted">{t('navLabel')}</p>
      <h1 className="mb-6 font-display text-display font-medium text-ink">{t('heading')}</h1>
      <p className="max-w-2xl font-sans text-body text-ink/80">{t('intro')}</p>

      {lastUpdated && (
        <p className="label mt-4 text-muted">
          {t('lastUpdated')}: {lastUpdated}
        </p>
      )}

      <nav className="mt-10 flex flex-wrap gap-x-6 gap-y-2 border-y border-line py-4 font-sans text-label uppercase tracking-[0.14em] text-muted">
        {requiredSections.map((s) => (
          <a key={s.key} href={`#${s.key}`} className="hover:text-ink">
            {s.title}
          </a>
        ))}
      </nav>

      <div className="mt-4 divide-y divide-line">
        {requiredSections.map((required) => {
          const match = sanitySections.find((s) => s.key === required.key);
          const heading: string = (match ? pick(match.heading, locale) : required.title) ?? required.title;
          const hasBody = match?.body?.[locale] || match?.body?.en;

          return (
            <div key={required.key} id={required.key} className="scroll-mt-24 py-10">
              <h2 className="mb-3 font-display text-heading font-medium text-ink">{heading}</h2>
              {hasBody ? (
                <div className="max-w-2xl font-sans text-body text-ink/80">
                  {/* Render match.body (Portable Text) once real content exists */}
                </div>
              ) : (
                <p className="max-w-2xl font-sans text-body italic text-muted">{t('pendingNote')}</p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
