import { useTranslations } from 'next-intl';
import Link from 'next/link';
import type { Locale } from '@/i18n';
import Logo from './Logo';
import LanguageSwitcher from './LanguageSwitcher';

// Header: logo lockup, primary nav, and the single Investor Access CTA —
// per the brand book's one-accent-per-view rule, this is the one boxed
// action in the header.
export default function Header({ locale }: { locale: Locale }) {
  const t = useTranslations('nav');

  return (
    <header className="border-b border-line bg-page">
      <div className="mx-auto flex max-w-content items-center justify-between gap-8 px-6 py-5 lg:px-10">
        <Logo locale={locale} />

        <nav className="hidden items-center gap-8 font-sans text-label uppercase tracking-[0.14em] text-ink md:flex">
          <Link href={`/${locale}/approach`} className="hover:text-muted">
            {t('approach')}
          </Link>
          <Link href={`/${locale}/strategy`} className="hover:text-muted">
            {t('strategy')}
          </Link>
          <Link href={`/${locale}/insights`} className="hover:text-muted">
            {t('insights')}
          </Link>
          <Link href={`/${locale}/contact`} className="hover:text-muted">
            {t('contact')}
          </Link>
        </nav>

        <div className="hidden items-center gap-6 md:flex">
          <LanguageSwitcher />
          <Link
            href={`/${locale}/contact`}
            className="border border-ink px-4 py-2.5 text-label uppercase tracking-[0.14em] hover:bg-ink hover:text-page transition-colors"
          >
            {t('investorAccess')}
          </Link>
        </div>
      </div>
    </header>
  );
}
