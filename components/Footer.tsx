import { useTranslations } from 'next-intl';
import Link from 'next/link';
import type { Locale } from '@/i18n';
import Logo from './Logo';

type NavItem = { label: string; slug: string };

// Footer: reversed lockup on Nocturne Navy, two link columns, and the
// regulatory line. Firm column links to the first item of each nav group.
export default function Footer({ locale }: { locale: Locale }) {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');
  const tReg = useTranslations('regulatory');
  const year = new Date().getFullYear();

  const whoWeAreItems = tNav.raw('whoWeAreItems') as NavItem[];
  const ourServicesItems = tNav.raw('ourServicesItems') as NavItem[];

  return (
    <footer className="bg-ink text-page">
      <div className="mx-auto max-w-content px-6 py-14 lg:px-10">
        <div className="flex flex-col justify-between gap-10 md:flex-row">
          <Logo locale={locale} variant="light" size="small" />

          <div className="flex gap-16">
            <div>
              <p className="label mb-3 text-accent">{t('firmColumn')}</p>
              <ul className="space-y-2 font-display text-lg">
                <li>
                  <Link href={`/${locale}/who-we-are/${whoWeAreItems[0]?.slug}`}>
                    {tNav('whoWeAre')}
                  </Link>
                </li>
                <li>
                  <Link href={`/${locale}/our-services/${ourServicesItems[0]?.slug}`}>
                    {tNav('ourServices')}
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="label mb-3 text-accent">{t('contactColumn')}</p>
              <ul className="space-y-2 font-display text-lg">
                <li>{t('email')}</li>
                <li>{t('location')}</li>
              </ul>
            </div>
            <div>
              <p className="label mb-3 text-accent">{t('regulatoryColumn')}</p>
              <ul className="space-y-2 font-display text-lg">
                <li>
                  <Link href={`/${locale}/regulatory`}>{tReg('navLabel')}</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/15 pt-6">
          <p className="label text-white/60">
            © {year === 2026 ? 'MMXXVI' : year} {t('copyrightName')} · {t('disclaimer')}
          </p>
        </div>
      </div>
    </footer>
  );
}
