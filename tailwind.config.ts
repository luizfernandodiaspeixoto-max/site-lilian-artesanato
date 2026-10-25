import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#2E2420',
        foreground: '#FAF7F2',
        primary: { DEFAULT: '#FAF7F2', foreground: '#2C1810' },
        secondary: { DEFAULT: '#D4B896', foreground: '#2C1810' },
        accent: { DEFAULT: '#C4956A', foreground: '#2C1810' },
        muted: { DEFAULT: '#3D2E28', foreground: '#C4A882' },
        card: { DEFAULT: '#3A2A24', foreground: '#FAF7F2' },
        border: '#4A3530',
        brand: {
          background: '#2E2420',
          foreground: '#FAF7F2',
          primary: '#FAF7F2',
          'primary-foreground': '#2C1810',
          secondary: '#D4B896',
          'secondary-foreground': '#2C1810',
          accent: '#C4956A',
          'accent-foreground': '#2C1810',
          muted: '#3D2E28',
          'muted-foreground': '#C4A882',
          card: '#3A2A24',
          'card-foreground': '#FAF7F2',
          border: '#4A3530',
        },
      },
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        display: ['Fraunces', 'serif'],
        serif: ['Fraunces', 'serif'],
      },
    },
  },
  plugins: [],
}

export default config