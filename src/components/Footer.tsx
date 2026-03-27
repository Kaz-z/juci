import Link from 'next/link'
import { Instagram } from 'lucide-react'
import { site } from '../../site.config'
import { formatPhoneForDisplay } from '@/lib/utils'

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  )
}

export default function Footer() {
  return (
    <footer className="border-t border-black/10" style={{ backgroundColor: site.brand.colors.accent }}>
      <div className="container-max section-padding py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand & Contact */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">{'Location'}</h3>
            <p className="text-white mb-4">{site.tagline}</p>
            <div className="space-y-2 text-sm text-white">
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
            <h4 className="font-semibold text-white mb-4">Opening Hours</h4>
            <p className="text-sm text-white">{site.hoursDisplay}</p>
          </div>

          {/* Social & Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Follow Us</h4>
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
                <TikTokIcon className="h-5 w-5" />
              </a>
            </div>
            
            <div className="space-y-2 text-sm">
              <Link href="/privacy" className="text-white hover:text-cta transition-colors block">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-white hover:text-cta transition-colors block">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 text-center text-sm text-white">
          <p>&copy; {new Date().getFullYear()} {site.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
