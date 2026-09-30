import { useTranslations } from 'next-intl';
import Link from 'next/link';
import type { Locale } from '@/i18n';
import Logo from './Logo';
import LanguageSwitcher from './LanguageSwitcher';

type NavItem = { label: string; slug: string };

// Header: logo lockup, two dropdown nav groups (Who We Are / Our Services),
// and the single Investor Access CTA. Dropdowns are CSS-only (group-hover),
// no client-side state needed.
export default function Header({ locale }: { locale: Locale }) {
  const t = useTranslations('nav');
  const whoWeAreItems = t.raw('whoWeAreItems') as NavItem[];
  const ourServicesItems = t.raw('ourServicesItems') as NavItem[];

  return (
    <header className="border-b border-line bg-page">
      <div className="mx-auto flex max-w-content items-center justify-between gap-8 px-6 py-5 lg:px-10">
        <Logo locale={locale} />

        <nav className="hidden items-center gap-8 font-sans text-label uppercase tracking-[0.14em] text-ink md:flex">
          <div className="group relative">
            <button className="hover:text-muted">{t('whoWeAre')}</button>
            <div className="invisible absolute left-0 top-full z-10 min-w-[240px] border border-line bg-page py-2 opacity-0 shadow-lg transition-opacity group-hover:visible group-hover:opacity-100">
              {whoWeAreItems.map((item) => (
                <Link
                  key={item.slug}
                  href={`/${locale}/who-we-are/${item.slug}`}
                  className="block px-4 py-2.5 normal-case tracking-normal text-body hover:bg-surface"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="group relative">
            <button className="hover:text-muted">{t('ourServices')}</button>
            <div className="invisible absolute left-0 top-full z-10 min-w-[280px] border border-line bg-page py-2 opacity-0 shadow-lg transition-opacity group-hover:visible group-hover:opacity-100">
              {ourServicesItems.map((item) => (
                <Link
                  key={item.slug}
                  href={`/${locale}/our-services/${item.slug}`}
                  className="block px-4 py-2.5 normal-case tracking-normal text-body hover:bg-surface"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
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
