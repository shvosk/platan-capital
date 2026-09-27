import { useTranslations } from 'next-intl';
import { client } from '@/sanity/client';
import { siteSettingsQuery } from '@/sanity/lib/queries';
import { pick } from '@/sanity/lib/locale';
import type { Locale } from '@/i18n';

export const revalidate = 60;

export default async function ContactPage({ params: { locale } }: { params: { locale: Locale } }) {
  const t = useTranslations('contact');
  const fallback = useTranslations('footer');
  const settings = await client.fetch(siteSettingsQuery);

  const email: string = settings?.email ?? fallback('email');
  const address: string = pick(settings?.officeAddress, locale) ?? fallback('location');

  return (
    <section className="mx-auto max-w-content px-6 py-20 lg:px-10">
      <h1 className="mb-10 font-display text-display font-medium text-ink">{t('heading')}</h1>

      <dl className="max-w-sm space-y-6 font-display text-xl">
        <div>
          <dt className="label mb-1 text-muted">{t('emailLabel')}</dt>
          <dd>{email}</dd>
        </div>
        <div>
          <dt className="label mb-1 text-muted">{t('addressLabel')}</dt>
          <dd>{address}</dd>
        </div>
      </dl>

      {/* Contact form component goes here */}
    </section>
  );
}
