import './globals.css'
import { ReactNode } from 'react'
import { Metadata } from 'next'
import { twMerge } from 'tailwind-merge'
import { fontHeading, fontSans } from '@/utils/fonts'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { Search } from '@/components/search'

export const metadata: Metadata = {
  title: 'Italian Verbs Conjugation',
  description: 'Search and conjugate Italian verbs',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        className={twMerge(
          'bg-primary-50 font-sans text-lg text-primary-800 antialiased selection:bg-accent-200',
          fontSans.variable,
          fontHeading.variable
        )}
      >
        <div
          className={
            'mx-auto flex min-h-screen max-w-[840px] flex-col px-16 py-7'
          }
        >
          <Header />
          <Search />
          <main className={'my-8 grow'}>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
