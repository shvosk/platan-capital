import Link from 'next/link';
import type { Locale } from '@/i18n';

type LogoProps = {
  locale: Locale;
  variant?: 'dark' | 'light'; // dark text (on bone) vs light text (on navy)
  size?: 'default' | 'small';
};

// Wordmark and descriptor are localized per the brand book's Armenian
// edition — the full name always appears together, in the language of
// the current locale.
const wordmark: Record<Locale, string> = {
  en: 'Platan',
  am: 'Պլատան',
  ru: 'Платан',
};

const descriptor: Record<Locale, [string, string]> = {
  en: ['Capital', 'Management'],
  am: ['Կապիտալ', 'Մենեջմենթ'],
  ru: ['Капитал', 'Менеджмент'],
};

// The primary horizontal lockup: name in the display serif, a fine
// vertical rule, then the descriptor in tracked caps. Name and
// descriptor are always locked together — never split.
export default function Logo({ locale, variant = 'dark', size = 'default' }: LogoProps) {
  const textColor = variant === 'dark' ? 'text-ink' : 'text-page';
  const ruleColor = variant === 'dark' ? 'border-ink' : 'border-page';
  const nameSize = size === 'small' ? 'text-2xl' : 'text-3xl';
  const [line1, line2] = descriptor[locale];

  return (
    <Link href={`/${locale}`} className={`inline-flex items-center gap-3 ${textColor}`}>
      <span className={`font-display font-medium ${nameSize}`}>{wordmark[locale]}</span>
      <span className={`h-8 border-l ${ruleColor}`} aria-hidden="true" />
      <span className="font-sans text-[0.6rem] uppercase leading-tight tracking-[0.32em]">
        {line1}
        <br />
        {line2}
      </span>
    </Link>
  );
}
