import './globals.css'
import { ReactNode } from 'react'
import { Metadata } from 'next'
// TODO: update after next 14.0.4
// @ts-ignore
import { GoogleTagManager } from '@next/third-parties/google'
import { twMerge } from 'tailwind-merge'
import { fontHeading, fontSans } from '@/utils/fonts'
import { siteConfig } from '@/utils/site-config'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { Search } from '@/components/search'
import { WebVitals } from '@/components/web-vitals'

export const metadata: Metadata = {
  title: 'Italian Verbs Conjugation',
  description:
    'Search and conjugate Italian verbs. Fast and easy to use, no ads. More than 12000 Italian verbs with forms',
  creator: 'Roman Manasyan',
  metadataBase: new URL(siteConfig.url),
  manifest: '/manifest.webmanifest',
  openGraph: {
    type: 'website',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: `${siteConfig.url}/og.png`,
        width: 1280,
        height: 720,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [`${siteConfig.url}/og.png`],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  const includeGoogleTag = process.env.INCLUDE_GOOGLE_TAG === 'true' || false

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
          className={'mx-auto flex min-h-screen max-w-screen-md flex-col p-8'}
        >
          <Header />
          <Search />
          <main className={'my-8 grow'}>{children}</main>
          <Footer />
        </div>
      </body>

      {includeGoogleTag && (
        <>
          <GoogleTagManager gtmId="G-X148B71F9D" />
          <WebVitals />
        </>
      )}
    </html>
  )
}
