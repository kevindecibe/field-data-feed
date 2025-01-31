/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      container: {
        center: true,
        padding: '2rem',
        screens: {
          '2xl': '1400px',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        winter: {
          primary: '#011627',
          secondary: '#042F5A',
          tertiary: 'var(--bg-tertiary)',
          quaternary: 'var(--bg-quaternary)',
          shadow: '#1578A3',
          border: '#03BFF8',
          text: '#7799BB',
        },
      },
      boxShadow: {
        glow: '0 0 35px rgba(255,255,255,0.2)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
