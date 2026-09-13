import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n';

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always', // /en, /am, /ru
});

export const config = {
  // Skip Sanity Studio, API routes, static files, and Next internals
  matcher: ['/((?!api|studio|_next|_vercel|.*\\..*).*)'],
};
