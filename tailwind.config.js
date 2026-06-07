/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"PP Neue Montreal"', 'system-ui', 'sans-serif'],
        serif: ['"PP Mondwest"', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      colors: {
        primary: '#051A24',
        'primary-mid': '#0D212C',
        accent: '#00ffa3',
        'accent-blue': '#0af',
        'accent-orange': '#ffaa44',
        surface: '#F6FCFF',
      },
      animation: {
        'marquee': 'marquee 30s linear infinite',
        'marquee-fast': 'marquee 14s linear infinite',
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin-slow 12s linear infinite',
        'pulse-glow': 'pulseGlow 2.5s ease-in-out infinite',
        'orbit': 'orbit 8s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'spin-slow': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '1' },
        },
        orbit: {
          from: { transform: 'rotate(0deg) translateX(60px) rotate(0deg)' },
          to: { transform: 'rotate(360deg) translateX(60px) rotate(-360deg)' },
        },
      },
      backgroundImage: {
        'hero-radial': 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(0,255,163,0.07) 0%, transparent 70%)',
        'glow-conic': 'conic-gradient(from 0deg, #00ffa3, #0af, #051A24, #00ffa3)',
      },
      backdropBlur: { xl: '20px' },
      boxShadow: {
        'glow-green': '0 0 20px rgba(0,255,163,0.25), 0 0 60px rgba(0,255,163,0.08)',
        'glow-blue': '0 0 20px rgba(0,170,255,0.25), 0 0 60px rgba(0,170,255,0.08)',
        'card-hover': '0 30px 80px rgba(0,0,0,0.15), 0 8px 30px rgba(0,0,0,0.1)',
      },
    },
  },
  plugins: [],
}
