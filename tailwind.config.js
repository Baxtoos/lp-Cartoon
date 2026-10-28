/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: '#F7F2EA',
          deep: '#EFE7DB',
          light: '#FCF9F4',
        },
        ink: {
          DEFAULT: '#1B2A4A',
          soft: '#44516E',
          dark: '#101B33',
        },
        coral: {
          DEFAULT: '#D9462F',
          deep: '#B42E18',
          tint: '#F9E6E2',
        },
        ok: {
          DEFAULT: '#047857',
          tint: '#D1FAE5',
        },
        stop: {
          DEFAULT: '#B91C1C',
          tint: '#FEE2E2',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Bricolage Grotesque', 'Plus Jakarta Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'ink-sm': '3px 3px 0px 0px #1B2A4A',
        'ink': '5px 5px 0px 0px #1B2A4A',
        'ink-lg': '10px 10px 0px 0px #1B2A4A',
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'bounce-soft': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      keyframes: {
        carIdle: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-3px)' },
        },
        dashPulse: {
          '0%, 100%': { opacity: '0.35', transform: 'translateX(0px)' },
          '50%': { opacity: '1', transform: 'translateX(-4px)' },
        },
        dialogIn: {
          '0%': { opacity: '0', transform: 'scale(0.96) translateY(10px)' },
          '100%': { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
      },
      animation: {
        'car-idle': 'carIdle 3.2s ease-in-out infinite',
        'dash-pulse': 'dashPulse 2.4s ease-in-out infinite',
        'dialog-in': 'dialogIn 0.32s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
    },
  },
  plugins: [],
};
