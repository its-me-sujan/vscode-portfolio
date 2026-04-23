/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts}'],
  theme: {
    extend: {
      colors: {
        bg: 'rgb(var(--bg) / <alpha-value>)',
        fg: 'rgb(var(--fg) / <alpha-value>)',
        muted: 'rgb(var(--muted) / <alpha-value>)',
        accent: 'rgb(var(--accent) / <alpha-value>)',
        accent2: 'rgb(var(--accent-2) / <alpha-value>)',
        border: 'rgb(var(--border) / <alpha-value>)',
        panel: 'rgb(var(--panel) / <alpha-value>)',
        sidebar: 'rgb(var(--sidebar) / <alpha-value>)',
        activitybar: 'rgb(var(--activitybar) / <alpha-value>)',
        tab: 'rgb(var(--tab) / <alpha-value>)',
        tabActive: 'rgb(var(--tab-active) / <alpha-value>)',
        statusbar: 'rgb(var(--statusbar) / <alpha-value>)',
        terminal: 'rgb(var(--terminal) / <alpha-value>)',
        selection: 'rgb(var(--selection) / <alpha-value>)',
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
        display: ['Syne', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        blink: {
          '0%, 50%': { opacity: '1' },
          '50.01%, 100%': { opacity: '0' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(4px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        typing: {
          '0%, 60%, 100%': { opacity: '0.2' },
          '30%': { opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
      animation: {
        blink: 'blink 1s step-end infinite',
        'fade-in': 'fadeIn 200ms ease-out both',
        typing: 'typing 1.2s ease-in-out infinite',
        'slide-in-right': 'slideInRight 220ms ease-out both',
      },
    },
  },
  plugins: [],
}
