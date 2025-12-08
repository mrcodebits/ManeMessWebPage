/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fff8e1',  // Saffron tints
          100: '#ffecb3',
          200: '#ffe082',
          300: '#ffd54f',
          400: '#ffca28',
          500: '#ffb300', // Golden Saffron (Base)
          600: '#fb8c00', // Deep Saffron (Text/Buttons)
          700: '#e65100', // Royal Orange
          800: '#ef6c00',
          900: '#e65100',
        },
        secondary: {
          50: '#fbe9e7',  // Maroon tints
          100: '#ffccbc',
          200: '#ffab91',
          300: '#ff8a65',
          400: '#ff7043',
          500: '#d84315',
          600: '#bf360c',
          700: '#a31515', // Royal Maroon (Base)
          800: '#800000', // Deep Maroon
          900: '#5d0000',
        },
        dark: {
          900: '#1a1a1a',
          800: '#2a2a2a',
          700: '#3a3a3a',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'serif'], // For headings to give premium feel
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
