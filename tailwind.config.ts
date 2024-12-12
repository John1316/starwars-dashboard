import { nextui } from '@nextui-org/react'
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/layouts/**/*.{js,ts,jsx,tsx,mdx}',
    './src/ui/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
        colors: {
          'imperial-black': 'var(--imperial-black)',
          'space-gray': 'var(--space-gray)',
          'lightsaber-blue': 'var(--rebel-yellow)',
          'rebel-yellow': 'var(--rebel-yellow)',
          'sith-red': 'var(--sith-red)',
          'star-white': 'var(--star-white)',
          'hologram-blue': 'var(--hologram-blue)',
        }
    },
  },
  plugins: [
    nextui({
      themes: {
        light: {
          layout: {
            radius: {
              small: "2px", // rounded-small
              medium: "4px", // rounded-medium
              large: "8px", // rounded-large
            }
          },
          colors: {
            primary: {
              DEFAULT: '#fade4b',
            },
            // ... rest of the colors
          },
      }
      }
    })
  ],
}
export default config
