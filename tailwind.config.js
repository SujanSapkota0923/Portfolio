/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: { ink: 'rgb(var(--ink) / <alpha-value>)', paper: 'rgb(var(--paper) / <alpha-value>)', accent: 'rgb(var(--accent) / <alpha-value>)', muted: 'rgb(var(--muted) / <alpha-value>)', line: 'rgb(var(--line) / <alpha-value>)' },
      fontFamily: { sans: ['Manrope', 'ui-sans-serif', 'system-ui'], display: ['Space Grotesk', 'ui-sans-serif'], mono: ['IBM Plex Mono', 'monospace'] },
      boxShadow: { editorial: '8px 8px 0 rgb(var(--line) / 1)' },
    },
  },
  plugins: [],
}
