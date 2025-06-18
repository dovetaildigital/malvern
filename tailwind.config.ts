// tailwind.config.ts
import type { Config } from 'tailwindcss'

export default {
  content: [
    './src/**/*.{astro,html,js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
            boxShadow: {
              'subtle': '2px 2px 8px rgba(0, 0, 0, 0.2)',
              'hover': '1px 1px 1px rgba(0, 0, 0, 0.2)',
              'inset-soft': 'inset 0 4px 8px rgba(0, 0, 0, 0.05), inset 0 -1px 2px rgba(255, 255, 255, 0.4)',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(65deg, #DCF94D 0%, #FF4FA1 50%, #543DC6 100%)',
        'gradient-background': 'linear-gradient(to bottom, #FFFFFF 0%, #FAFAFA 100%)',
      },
      colors: {
        foreground: '#1D1D1D',
        background: '#F9F9F9',
        lightgrey: '#FCFCFC',
        midgrey: '#717171',
        fadedgrey: '#CCCCCC',
        primary: '#DCF94D',
        secondary: '#FF6A3D',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        'inter-display': ['"Inter Display"', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
      },
      spacing: {
        18: '4.5rem',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
} satisfies Config