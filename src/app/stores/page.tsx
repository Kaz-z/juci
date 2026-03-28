import type { Metadata } from 'next'
import StoresPageClient from '@/components/StoresPageClient'
import { site } from '../../../site.config'

export const metadata: Metadata = {
  title: `Stores | ${site.name}`,
  description: `Find ${site.name} at ${site.address}. Opening hours and map.`,
}

export default function StoresPage() {
  return <StoresPageClient />
}
