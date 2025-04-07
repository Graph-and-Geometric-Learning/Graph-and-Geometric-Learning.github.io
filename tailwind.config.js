import {heroui} from "@heroui/theme"
import { DEFAULT_CIPHERS } from 'tls'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './mdx-components.tsx',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
      // typography: {
      //   DEFAULT: {
      //     css: {
      //       code: {
      //         color: '#86e1fc',
      //         '&::before': { content: `unset !important` },
      //         '&::after': { content: `unset !important` },
      //         fontWeight: 'normal',
      //       },
      //       'a code': {
      //         fontSize: '1em',
      //       },
      //       '[data-rehype-pretty-code-fragment]:nth-of-type(2) pre': {
      //         '[data-line]::before': {
      //           content: 'counter(line)',
      //           counterIncrement: 'line',
      //           display: 'inline-block',
      //           width: '1rem',
      //           marginRight: '1rem',
      //           textAlign: 'right',
      //           // color: colors.slate[600],
      //         },
      //         '[data-highlighted-line]::before': {
      //           // color: colors.slate[400],
      //         },
      //       },
      //     }
      //   }
      // }
    },
  },
  darkMode: "class",
  plugins: [heroui()],
}
