import { useTranslations } from 'next-intl';
import Link from 'next/link';
import type { Locale } from '@/i18n';

// Homepage. Copy here is the brand book's own fixed marketing language
// (messages/*.json) rather than Sanity content — it's brand-locked, not
// something meant to be edited casually. Sanity remains the source for
// Team, Strategy detail, and Insights articles.
export default function HomePage({ params: { locale } }: { params: { locale: Locale } }) {
  const t = useTranslations('home');
  const principles = t.raw('principles') as { title: string; body: string }[];

  return (
    <>
      <section className="grid lg:grid-cols-2">
        {/* Left: copy */}
        <div className="flex flex-col justify-center gap-8 px-6 py-20 lg:px-16 lg:py-28">
          <p className="label text-muted">{t('eyebrow')}</p>

          <h1 className="font-display text-display font-medium text-ink">
            {t('headlineLead')} <em className="italic text-muted">{t('headlineEmphasis')}</em>.
          </h1>

          <p className="max-w-md font-sans text-body text-ink/80">{t('body')}</p>

          <div className="flex flex-wrap gap-4 pt-2">
            <Link href={`/${locale}/contact`} className="btn-primary">
              {t('ctaPrimary')}
            </Link>
            <Link href={`/${locale}/approach`} className="btn-secondary">
              {t('ctaSecondary')}
            </Link>
          </div>
        </div>

        {/* Right: navy image panel — architectural photography slot */}
        <div className="relative flex min-h-[320px] items-center justify-center bg-chrome lg:min-h-0">
          <span className="label text-page/50">Architectural photography</span>
        </div>
      </section>

      {/* Principles — three columns, hairline dividers */}
      <section className="border-t border-line">
        <div className="mx-auto grid max-w-content divide-y divide-line border-b border-line md:grid-cols-3 md:divide-x md:divide-y-0">
          {principles.map((p) => (
            <div key={p.title} className="px-6 py-12 lg:px-10 lg:py-16">
              <h2 className="mb-3 font-display text-heading font-medium text-ink">{p.title}</h2>
              <p className="max-w-xs font-sans text-body text-ink/70">{p.body}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
