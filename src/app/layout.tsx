import type { Metadata } from 'next'
import './globals.css'
import { site } from '../../site.config'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import DownloadMenuButton from '@/components/DownloadMenuButton'

const metadataBase = new URL(
  (process.env.NEXT_PUBLIC_SITE_URL || site.seo.url).replace(/\/$/, '')
)

export const metadata: Metadata = {
  metadataBase,
  title: site.seo.title,
  description: site.seo.description,
  keywords: site.seo.keywords,
  openGraph: {
    title: site.seo.title,
    description: site.seo.description,
    url: site.seo.url,
    siteName: site.name,
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: site.seo.title,
    description: site.seo.description,
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <DownloadMenuButton />
      </body>
    </html>
  )
}
