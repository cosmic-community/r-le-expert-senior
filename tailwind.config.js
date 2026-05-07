/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        anthracite: {
          DEFAULT: '#1A1A1A',
          50: '#2A2A2A',
          100: '#222222',
          200: '#1A1A1A',
          300: '#141414',
          400: '#0E0E0E',
        },
        gold: {
          DEFAULT: '#D4AF37',
          light: '#E5C158',
          dark: '#A8861F',
          muted: '#8B7228',
        },
        midnight: {
          DEFAULT: '#0F1828',
          light: '#1A2438',
          dark: '#0A1018',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #D4AF37 0%, #A8861F 100%)',
        'conic-gold': 'conic-gradient(from 180deg at 50% 50%, #D4AF37 0deg, transparent 90deg, transparent 270deg, #D4AF37 360deg)',
      },
      boxShadow: {
        'gold': '0 4px 24px -4px rgba(212, 175, 55, 0.25)',
        'gold-lg': '0 12px 48px -8px rgba(212, 175, 55, 0.35)',
        'depth': '0 24px 48px -12px rgba(0, 0, 0, 0.6)',
      },
      backdropBlur: {
        xl: '24px',
      },
    },
  },
  plugins: [],
};