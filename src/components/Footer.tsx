import Link from 'next/link'
import { Instagram, Music } from 'lucide-react'
import { site } from '../../site.config'
import { formatPhoneForDisplay } from '@/lib/utils'

export default function Footer() {
  const currentHours = site.hours.find(h => h.day.includes(new Date().toLocaleDateString('en', { weekday: 'short' })))
  
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container-max section-padding py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand & Contact */}
          <div>
            <h3 className="text-xl font-bold text-fg mb-4">{'Location'}</h3>
            <p className="text-gray-600 mb-4">{site.tagline}</p>
            <div className="space-y-2 text-sm text-gray-600">
              <p>{site.address}</p>
              <p>
                <a 
                  href={`tel:${site.phone.replace(/\s/g, '')}`}
                  className="hover:text-cta transition-colors"
                  aria-label="Call us"
                >
                  {formatPhoneForDisplay(site.phone)}
                </a>
              </p>
              <p>
                <a 
                  href={`mailto:${site.email}`}
                  className="hover:text-cta transition-colors"
                  aria-label="Email us"
                >
                  {site.email}
                </a>
              </p>
            </div>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-semibold text-fg mb-4">Opening Hours</h4>
            <div className="space-y-2 text-sm text-gray-600">
              {site.hours.map((hour, index) => (
                <div key={index} className="flex justify-between">
                  <span>{hour.day}</span>
                  <span>
                    {hour.open === 'Closed' ? 'Closed' : `${hour.open} - ${hour.close}`}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Social & Links */}
          <div>
            <h4 className="font-semibold text-fg mb-4">Follow Us</h4>
            <div className="flex space-x-4 mb-6">
              <a
                href={site.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-cta text-white hover:opacity-80 transition-opacity"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href={site.socials.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-cta text-white hover:opacity-80 transition-opacity"
                aria-label="Follow us on TikTok"
              >
                <Music className="h-5 w-5" />
              </a>
            </div>
            
            <div className="space-y-2 text-sm">
              <Link href="/privacy" className="text-gray-600 hover:text-cta transition-colors block">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-600 hover:text-cta transition-colors block">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} {site.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
