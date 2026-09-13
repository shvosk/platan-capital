import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Nocturne Navy & Platinum — from the Platan brand book
        page: '#EFECE6',      // Bone — paper, light ground
        surface: '#F6F4EE',   // Surface tint, slightly lighter than page
        ink: '#101D34',       // Nocturne Navy — primary ground, text
        chrome: '#1B2B47',    // Ink Slate — secondary ground (footer, hero panel)
        accent: '#8C8A86',    // Platinum — accent, the rule, primary buttons
        muted: '#5A6473',     // Muted supporting tint
        line: '#D7D2C6',      // Hairline rule on light grounds
      },
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        sans: ['var(--font-sans)', 'sans-serif'],
      },
      fontSize: {
        display: ['3.5rem', { lineHeight: '1.08', letterSpacing: '-0.01em' }],
        heading: ['1.875rem', { lineHeight: '1.3' }],
        body: ['1.0625rem', { lineHeight: '1.65' }],
        label: ['0.6875rem', { lineHeight: '1.4', letterSpacing: '0.16em' }],
      },
      letterSpacing: {
        wordmark: '0.03em',
        descriptor: '0.32em',
      },
      maxWidth: {
        content: '1280px',
      },
    },
  },
  plugins: [],
};

export default config;
