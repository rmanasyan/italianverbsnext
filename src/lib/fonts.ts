import {
  Sigmar_One as FontHeading,
  Open_Sans as FontSans,
} from 'next/font/google'

export const fontSans = FontSans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
})

export const fontHeading = FontHeading({
  subsets: ['latin'],
  display: 'swap',
  weight: '400',
  variable: '--font-heading',
})
