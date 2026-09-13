import { client } from '@/sanity/client';
import { siteSettingsQuery } from '@/sanity/lib/queries';
import { pick } from '@/sanity/lib/locale';
import type { Locale } from '@/i18n';

export const revalidate = 60;

export default async function LegalPage({ params: { locale } }: { params: { locale: Locale } }) {
  const settings = await client.fetch(siteSettingsQuery);
  const disclaimer = pick(settings?.legalDisclaimer, locale);

  return (
    <section className="mx-auto max-w-content px-6 py-20 lg:px-10">
      <h1 className="mb-10 font-display text-display font-medium text-ink">Legal &amp; Disclosures</h1>
      {/* Render disclaimer (Portable Text) once real regulatory copy is provided */}
    </section>
  );
}
