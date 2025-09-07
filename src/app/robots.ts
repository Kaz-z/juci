import { MetadataRoute } from 'next'
import { site } from '../../site.config'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/'],
    },
    sitemap: `${site.seo.url}/sitemap.xml`,
  }
}
