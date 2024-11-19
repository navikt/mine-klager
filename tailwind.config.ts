import navTailwind from '@navikt/ds-tailwind';
import type { Config } from 'tailwindcss';

export default {
  presets: [navTailwind],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
} satisfies Config;
