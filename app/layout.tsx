import type { ReactNode } from 'react';

// Root layout is intentionally minimal — locale-specific chrome
// (fonts, <html lang>, nav, footer) lives in app/[locale]/layout.tsx.
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
