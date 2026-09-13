import { redirect } from 'next/navigation';
import { defaultLocale } from '@/i18n';

// The middleware normally redirects "/" to "/en" (etc.) before this
// ever renders. This is just a safety net.
export default function RootPage() {
  redirect(`/${defaultLocale}`);
}
