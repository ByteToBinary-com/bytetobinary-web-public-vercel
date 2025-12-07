import type { Config } from 'tailwindcss';
import containerQueries from '@tailwindcss/container-queries'; // added import

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Keep a static accent so Tailwind generates utilities
        accent: '#06b6d4',

        // Semantic colors mapped to CSS variables for dynamic themes
        primary: 'var(--accent-primary)',
        secondary: 'var(--accent-secondary)',
        bg: {
          base: 'var(--bg-base)',
          surface: 'var(--bg-surface)',
          panel: 'var(--bg-surface-light)',
        },
        text: {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          tertiary: 'var(--text-tertiary)',
        },
        border: 'var(--border-color)',

        // Keep a static dark palette available if you need explicit shades
        dark: {
          50: '#f8f8f9',
          100: '#f1f1f3',
          200: '#e3e3e8',
          300: '#d4d4dd',
          400: '#a1a1b3',
          500: '#6b6b7d',
          600: '#505060',
          700: '#383840',
          800: '#1f1f26',
          900: '#0f0f13',
          950: '#0a0a0d',
        },
      },
      fontFamily: {
        display: ['Space Grotesk', 'sans-serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [containerQueries], // changed from require(...)
};

export default config;
