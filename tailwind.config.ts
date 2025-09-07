import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: 'var(--color-bg)',
        'alt-bg': 'var(--color-alt-bg)',
        fg: 'var(--color-fg)',
        accent: 'var(--color-accent)',
        highlight: 'var(--color-highlight)',
        cta: 'var(--color-cta)',
      },
      borderRadius: {
        xl: 'var(--radius)',
      },
      fontFamily: {
        sans: ['Aftetir', 'system-ui', 'sans-serif'],
      },
      gridTemplateColumns: {
        '4': 'repeat(4, minmax(0, 1fr))',
        '6': 'repeat(6, minmax(0, 1fr))',
        '12': 'repeat(12, minmax(0, 1fr))',
      }
    },
  },
  plugins: [],
}
export default config
