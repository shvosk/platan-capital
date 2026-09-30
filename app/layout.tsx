import type { ReactNode } from 'react';

// The only place <html> and <body> are rendered — required by Next.js.
// Locale-specific attributes (language, fonts) are applied by the nested
// [locale] layout via a wrapper element instead, since this layout is
// shared by both the site routes and the /studio route.
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
