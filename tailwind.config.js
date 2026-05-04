/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg:      'var(--color-bg)',
        surface: 'var(--color-surface)',
        text:    'var(--color-text)',
        muted:   'var(--color-muted)',
        accent:  'var(--color-accent)',
        border:  'var(--color-border)',
      },
      fontFamily: {
        display: ["'Syne'", 'sans-serif'],
        body:    ["'Plus Jakarta Sans'", 'sans-serif'],
        mono:    ["'Space Mono'", 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease forwards',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
