import { Metadata } from 'next'
import { site } from '../../site.config'

interface SEOProps {
  title?: string
  description?: string
  path?: string
  image?: string
  noIndex?: boolean
}

export function generateSEO({
  title,
  description = site.seo.description,
  path = '',
  image,
  noIndex = false
}: SEOProps = {}): Metadata {
  const fullTitle = title ? `${title} | ${site.name}` : site.seo.title
  const url = `${site.seo.url}${path}`
  const ogImage = image || `${site.seo.url}/og-image.jpg`

  return {
    title: fullTitle,
    description,
    keywords: site.seo.keywords,
    robots: {
      index: !noIndex,
      follow: !noIndex,
    },
    canonical: url,
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: site.name,
      locale: 'en_GB',
      type: 'website',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title || site.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [ogImage],
    },
    alternates: {
      canonical: url,
    },
  }
}

export function generateLocalBusinessStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: site.name,
    description: site.seo.description,
    url: site.seo.url,
    telephone: site.phone,
    email: site.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.split(',')[0],
      addressLocality: 'Birmingham',
      addressCountry: 'GB',
    },
    openingHours: site.hours
      .filter(h => h.open !== 'Closed')
      .map(h => {
        const days = h.day.includes('–') 
          ? h.day.split('–').map(d => d.trim())
          : [h.day]
        
        return days.map(day => {
          const dayMapping: Record<string, string> = {
            'Mon': 'Monday',
            'Tue': 'Tuesday', 
            'Wed': 'Wednesday',
            'Thu': 'Thursday',
            'Fri': 'Friday',
            'Sat': 'Saturday',
            'Sun': 'Sunday'
          }
          
          const fullDay = dayMapping[day] || day
          return `${fullDay} ${h.open}-${h.close}`
        })
      })
      .flat(),
    servesCuisine: 'Healthy Food',
    priceRange: '£5-£10',
    image: `${site.seo.url}/og-image.jpg`,
    sameAs: [
      site.socials.instagram,
      site.socials.tiktok,
    ],
  }
}
