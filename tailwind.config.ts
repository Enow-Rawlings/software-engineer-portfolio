import type { Config } from 'tailwindcss';

const config = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Premium color palette
        primary: {
          50: '#f0f4ff',
          100: '#e0e9fe',
          200: '#c7d9fe',
          300: '#a4bffd',
          400: '#7c9efb',
          500: '#4f6ef7', // Royal Blue
          600: '#3756d3',
          700: '#2b43b0',
          800: '#263685',
          900: '#1e2a63',
          950: '#0f1629',
        },
        secondary: {
          50: '#f5f5f5',
          100: '#e7e7e7',
          200: '#d1d5db',
          300: '#b0b9c1',
          400: '#8b95a5',
          500: '#6b7280', // Dark Navy
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
        accent: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf', // Teal accent
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
        },
      },
      backgroundColor: {
        'glass': 'rgba(255, 255, 255, 0.1)',
        'glass-dark': 'rgba(20, 30, 60, 0.1)',
      },
      backdropBlur: {
        'glass': '12px',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        'glass-light': '0 8px 32px 0 rgba(255, 255, 255, 0.1)',
        'card': '0 10px 40px rgba(79, 110, 247, 0.1)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2s infinite',
        'slide-in': 'slideIn 0.5s ease-out',
        'fade-in': 'fadeIn 0.5s ease-out',
        'bounce-slow': 'bounce 2s infinite',
        'typing': 'typing 3.5s steps(40, end)',
        'blink': 'blink 0.75s step-end infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        slideIn: {
          'from': { opacity: '0', transform: 'translateY(10px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          'from': { opacity: '0' },
          'to': { opacity: '1' },
        },
        typing: {
          '0%': { width: '0' },
          '100%': { width: '100%' },
        },
        blink: {
          '0%, 100%': { borderColor: 'transparent' },
          '50%': { borderColor: 'currentColor' },
        },
      },
      transitionDuration: {
        '350': '350ms',
      },
    },
  },
  plugins: [require('tailwindcss/plugin')],
} satisfies Config;

export default config;
