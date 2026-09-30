import type { ReactNode } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { locales, type Locale } from '@/i18n';
import { cormorant, archivo, notoSerifArmenian, notoSansArmenian } from '../fonts';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import '../globals.css';



export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: ReactNode;
  params: { locale: Locale };
}) {
  const messages = await getMessages();

  const fontVars =
    locale === 'am'
      ? `${notoSerifArmenian.variable} ${notoSansArmenian.variable}`
      : `${cormorant.variable} ${archivo.variable}`;

  return (
    <div lang={locale} className={fontVars}>
      <NextIntlClientProvider locale={locale} messages={messages}>
        <Header locale={locale} />
        <main>{children}</main>
        <Footer locale={locale} />
      </NextIntlClientProvider>
    </div>
  );
}
