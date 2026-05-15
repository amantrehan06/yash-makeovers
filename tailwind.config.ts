import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ivory: {
          DEFAULT: 'var(--color-ivory)',
          2: 'var(--color-ivory-2)',
          3: 'var(--color-ivory-3)',
          4: 'var(--color-ivory-4)',
        },
        dark: {
          DEFAULT: 'var(--color-dark)',
          2: 'var(--color-dark-2)',
          3: 'var(--color-dark-3)',
        },
        gold: {
          DEFAULT: 'var(--color-gold)',
          light: 'var(--color-gold-light)',
          pale: 'var(--color-gold-pale)',
          dim: 'var(--color-gold-dim)',
        },
        muted: {
          DEFAULT: 'var(--color-muted)',
          2: 'var(--color-muted-2)',
        },
      },
      fontFamily: {
        serif: ['var(--font-serif)'],
        sans: ['var(--font-sans)'],
      },
      fontSize: {
        display: ['68px', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display-sm': ['44px', { lineHeight: '1.1', letterSpacing: '-0.015em' }],
        headline: ['36px', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseBeat: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.7', transform: 'scale(1.15)' },
        },
      },
      animation: {
        marquee: 'marquee 32s linear infinite',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'pulse-beat': 'pulseBeat 2.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

export default config
