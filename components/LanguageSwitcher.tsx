'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { locales } from '@/i18n';

const labels: Record<string, string> = {
  en: 'EN',
  am: 'ՀԱՅ',
  ru: 'РУ',
};

// Plain-text switcher, tracked caps to match the label type style —
// no boxes or pills, in keeping with the brand's restraint.
export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  function switchTo(nextLocale: string) {
    const segments = pathname.split('/');
    segments[1] = nextLocale;
    router.push(segments.join('/'));
  }

  return (
    <div className="flex items-center gap-3 font-sans text-label uppercase tracking-[0.14em]">
      {locales.map((l, i) => (
        <span key={l} className="flex items-center gap-3">
          {i > 0 && <span className="text-line">/</span>}
          <button
            onClick={() => switchTo(l)}
            aria-current={l === locale}
            className={l === locale ? 'text-ink' : 'text-muted hover:text-ink'}
          >
            {labels[l]}
          </button>
        </span>
      ))}
    </div>
  );
}
