import {
  Cormorant_Garamond,
  Archivo,
  Noto_Serif_Armenian,
  Noto_Sans_Armenian,
} from 'next/font/google';

// Latin/Cyrillic pairing — used for EN and RU.
// Display: Cormorant Garamond (headlines, wordmark, numerals)
// Sans: Archivo (body, labels, UI)
export const cormorant = Cormorant_Garamond({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
});

export const archivo = Archivo({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

// Armenian pairing — used for AM. Bound to the same CSS variable names
// so components never need to branch on locale to pick a font.
export const notoSerifArmenian = Noto_Serif_Armenian({
  subsets: ['armenian'],
  weight: ['400', '500', '600'],
  variable: '--font-display',
  display: 'swap',
});

export const notoSansArmenian = Noto_Sans_Armenian({
  subsets: ['armenian'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});
