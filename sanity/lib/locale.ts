import type { Locale } from '@/i18n';

type LocaleValue<T> = Partial<Record<Locale, T>>;

// Resolves a { en, am, ru } object to the current locale, falling back
// to English if a translation is missing (e.g. content not yet translated).
export function pick<T>(value: LocaleValue<T> | undefined, locale: Locale): T | undefined {
  if (!value) return undefined;
  return value[locale] ?? value.en;
}
