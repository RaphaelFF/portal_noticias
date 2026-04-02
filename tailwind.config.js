/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        // Paleta Brasil - Design System
        'brasil-green': '#228B22',
        'brasil-green-light': '#4CAF50',
        'brasil-yellow': '#FFD700',
        'brasil-yellow-dark': '#FFA500',
        'brasil-blue': '#001A4D',
        'brasil-blue-light': '#003D99',
        'neutral-light': '#F5F5F5',
        'neutral-dark': '#333333',
        
        // Legado
        primary: '#1f2937',
        secondary: '#3b82f6'
      },
      fontFamily: {
        'sans': ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'h1': ['32px', { lineHeight: '1.3', fontWeight: '700' }],
        'h2': ['24px', { lineHeight: '1.4', fontWeight: '700' }],
        'h3': ['20px', { lineHeight: '1.4', fontWeight: '600' }],
        'body-lg': ['16px', { lineHeight: '1.6', fontWeight: '400' }],
        'body': ['14px', { lineHeight: '1.6', fontWeight: '400' }],
        'small': ['12px', { lineHeight: '1.5', fontWeight: '400' }],
        'label': ['12px', { lineHeight: '1.4', fontWeight: '600' }],
      },
      boxShadow: {
        'xs': '0 1px 2px rgba(0, 26, 77, 0.05)',
        'sm': '0 2px 4px rgba(0, 26, 77, 0.08)',
        'md': '0 4px 12px rgba(0, 26, 77, 0.08)',
        'lg': '0 8px 24px rgba(0, 26, 77, 0.12)',
        'xl': '0 12px 32px rgba(0, 26, 77, 0.15)',
      },
      borderRadius: {
        'xs': '4px',
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
      },
      animation: {
        fadeIn: 'fadeIn 0.3s ease-in-out',
        slideInLeft: 'slideInLeft 0.3s ease-in-out',
        pulse: 'pulse 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
      }
    }
  },
  plugins: []
}
