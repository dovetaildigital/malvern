// tailwind.config.ts
import type { Config } from 'tailwindcss'

export default {
  content: [
    './src/**/*.{astro,html,js,jsx,ts,tsx}',
  ],
  safelist: [
    'heading-1', 'heading-2', 'heading-3', 'heading-4', 'heading-5', 'heading-p',
    'container-lg',
    'sm:col-span-12',
    'sm:grid-cols-12',
    'grid-cols-12',
    'col-span-12',
    'col-span-9',
    'col-span-8',
    'col-span-6',
    'col-span-4',
    'col-span-3',
    'md:col-span-3',
    'md:col-span-4',
    'md:col-span-6',
    'md:col-span-8',
    'md:col-span-9',
    'md:col-span-12',
    'text-btn',
    'container-md',
    'container-lg',
    'container-xl',
    'container-tight',
    'w-1/2',
    'w-1/3',
    'w-2/3',
    'w-1/4',
    'w-3/4',
    'w-1/5',
    'w-2/5',
    'w-3/5',
    'w-4/5',
    'md:w-1/2',
    'md:w-1/3',
    'md:w-2/3',
    'md:w-1/4',
    'md:w-3/4',
    'blurb-title',
    'blurb-body',
    'scale-105',
    'scale-100',
    'opacity-70',
    'opacity-100',
    'transition-transform',
    'transition-opacity',
    {
      pattern: /::view-transition-.+/,
      variants: ['root']
    }
  ],
  theme: {
    extend: {
      boxShadow: {
              'subtle': '2px 2px 8px rgba(0, 0, 0, 0.2)',
              'hover': '1px 1px 1px rgba(0, 0, 0, 0.2)',
              'inset-soft': 'inset 0 4px 8px rgba(0, 0, 0, 0.05), inset 0 -1px 2px rgba(255, 255, 255, 0.4)',
      },
      backgroundImage: {
        'gradient-action': 'linear-gradient(65deg, #DCF94D 0%, #FF4FA1 50%, #543DC6 100%)',
        'gradient-primary': 'linear-gradient(to bottom, #FFFFFF 0%, #FAFAFA 100%)',
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
        sans: ['inter-variable', 'sans-serif'],
      },
      fontSize: {
        xs: '12px',
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