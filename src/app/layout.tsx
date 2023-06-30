import { Metadata } from 'next'
import { fontHeading, fontSans } from '@/lib/fonts'
import { cn } from '@/lib/utils'
import './globals.css'

export const metadata: Metadata = {
  title: 'Italian Verbs Conjugation',
  description: 'Search and conjugate Italian verbs',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          'min-h-screen bg-primary-50 font-sans text-lg text-primary-800 antialiased selection:bg-accent-200',
          fontSans.variable,
          fontHeading.variable
        )}
      >
        {children}
      </body>
    </html>
  )
}
