'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import { ChevronRight, MapPin, Phone } from 'lucide-react'
import { site } from '../../site.config'
import { formatPhoneForDisplay, formatPhoneForTel } from '@/lib/utils'
import {
  isStoreOpenNow,
  storeHoursRangeLabel,
} from '@/lib/store-hours'

const StoreMap = dynamic(() => import('@/components/StoreMap'), {
  ssr: false,
  loading: () => (
    <div
      className="h-full min-h-[280px] w-full animate-pulse rounded-xl bg-gray-100 lg:rounded-none lg:rounded-r-xl"
      aria-hidden
    />
  ),
})

export default function StoresPageClient() {
  const open = isStoreOpenNow()
  const hoursRange = storeHoursRangeLabel()

  return (
    <div className="min-h-[calc(100dvh-4rem)] bg-[#fafafa]">
      <div className="mx-auto flex max-w-[1600px] flex-col lg:min-h-[calc(100dvh-4rem)] lg:flex-row">
        {/* Sidebar — store list (single location) */}
        <aside className="w-full shrink-0 border-b border-gray-200 bg-white p-6 lg:w-[min(100%,380px)] lg:border-b-0 lg:border-r lg:p-8">
          <h1 className="mb-2 text-2xl tracking-tight text-fg">
            Stores
          </h1>
          <article className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
            <div className="flex gap-3">
              <div className="min-w-0 flex-1">
                <h2 className="text-fg leading-snug">
                  {site.store.title}
                </h2>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                  {site.address}
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
                  <span
                    className={`inline-flex items-center gap-1.5 font-medium ${
                      open ? 'text-emerald-700' : 'text-gray-500'
                    }`}
                  >
                    <span
                      className={`h-2 w-2 rounded-full ${
                        open ? 'bg-emerald-500' : 'bg-gray-400'
                      }`}
                      aria-hidden
                    />
                    {open ? 'Open' : 'Closed'}
                  </span>
                  <span className="text-gray-400" aria-hidden>
                    ·
                  </span>
                  <span className="text-gray-600">
                    {hoursRange} ({site.hours[0]?.day ?? 'daily'})
                  </span>
                </div>
              </div>
              <div className="flex shrink-0 flex-col gap-2">
                <a
                  href={site.store.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-50 hover:text-cta"
                  aria-label="Directions in Google Maps"
                >
                  <ChevronRight className="h-5 w-5" />
                </a>
              </div>
            </div>

            <div className="mt-5 flex flex-col gap-2 border-t border-gray-100 pt-4">
              <a
                href={`tel:${formatPhoneForTel(site.phone)}`}
                className="inline-flex items-center gap-2 text-sm font-medium text-cta hover:underline"
              >
                <Phone className="h-4 w-4 shrink-0" />
                {formatPhoneForDisplay(site.phone)}
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-cta"
              >
                <MapPin className="h-4 w-4 shrink-0" />
                Contact &amp; enquiries
              </Link>
            </div>
          </article>
        </aside>

        {/* Map */}
        <div className="relative min-h-[320px] flex-1 p-4 lg:min-h-0 lg:p-0">
          <div className="h-[min(50vh,420px)] overflow-hidden rounded-xl border border-gray-200 shadow-sm lg:h-full lg:min-h-[calc(100dvh-4rem)] lg:rounded-none lg:border-0 lg:border-l lg:shadow-none">
            <StoreMap />
          </div>
        </div>
      </div>
    </div>
  )
}
