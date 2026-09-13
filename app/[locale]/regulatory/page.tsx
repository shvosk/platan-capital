import { useTranslations } from 'next-intl';
import { client } from '@/sanity/client';
import { pageBySlugQuery } from '@/sanity/lib/queries';
import { pick } from '@/sanity/lib/locale';
import type { Locale } from '@/i18n';

export const revalidate = 60;

// Hub page for disclosures potentially required under CBA Regulation 8/03
// (Chapter 4, point 16) — About, Reports, Services, Shareholders &
// Investors, Regulation, Feedback, Customer Rights, Financial Mediator.
//
// Whether this regulation applies to Platan depends on its licensing
// status and whether it offers services to individuals via public offer
// (see Reg. 8/03 point 5.1) — confirm with counsel before treating this
// page as satisfying the requirement. Content pulls from a Sanity `page`
// document (slug: "regulatory") keyed by section `key`; any of the eight
// required sections without matching Sanity content falls back to a
// placeholder so the page structure is complete even before real content
// is filled in.
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

      {/* In-page table of contents — direct anchor links, not a dropdown,
          per Reg. 8/03 point 16's "not via a collapsing menu" requirement. */}
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
          const heading = match ? pick(match.heading, locale) : required.title;
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
