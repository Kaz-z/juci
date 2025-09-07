import { MetadataRoute } from 'next'
import { site } from '../../site.config'

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
    '/menu',
    '/about',
    '/careers',
    '/contact',
  ]

  return routes.map(route => ({
    url: `${site.seo.url}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : 'weekly' as any,
    priority: route === '' ? 1 : 0.8,
  }))
}
