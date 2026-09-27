import type { ReactNode } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { locales, type Locale } from '@/i18n';
import { cormorant, archivo, notoSerifArmenian, notoSansArmenian } from '../fonts';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import '../globals.css';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const dynamic = 'force-dynamic';

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: ReactNode;
  params: { locale: Locale };
}) {
  const messages = await getMessages();

  // Armenian gets Noto Serif/Sans Armenian; EN and RU get Cormorant
  // Garamond + Archivo. Both pairings expose the same CSS variable
  // names, so nothing downstream needs to branch on locale for type.
  const fontVars =
    locale === 'am'
      ? `${notoSerifArmenian.variable} ${notoSansArmenian.variable}`
      : `${cormorant.variable} ${archivo.variable}`;

  return (
    <html lang={locale} className={fontVars}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Header locale={locale} />
          <main>{children}</main>
          <Footer locale={locale} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
