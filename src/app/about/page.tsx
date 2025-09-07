import type { Metadata } from 'next'
import { MapPin, Clock, Car, Train } from 'lucide-react'
import { site } from '../../../site.config'
import Section from '@/components/Section'
import HoursTable from '@/components/HoursTable'

export const metadata: Metadata = {
  title: `About | ${site.name}`,
  description: `Learn about ${site.name}, Birmingham's premier juice and smoothie bar. Find our location, opening hours, and story.`,
  openGraph: {
    title: `About | ${site.name}`,
    description: `Learn about ${site.name}, Birmingham's premier juice and smoothie bar. Find our location, opening hours, and story.`,
    url: `${site.seo.url}/about`,
  },
}

export default function AboutPage() {
  return (
    <div className="pt-24">
      {/* Hero Section */}
      <Section title="About Juci" kicker="Our Story">
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-xl text-gray-600">
            Fresh. Local. Healthy. That&lsquo;s the Juci way.
          </p>
        </div>
      </Section>

      {/* Brand Story */}
      <Section className="bg-gray-50">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-fg mb-6">Our Mission</h2>
            <div className="space-y-6 text-lg text-gray-600">
              <p>
                At Juci, we believe that healthy living should be delicious, accessible, 
                and convenient. Founded in the heart of Birmingham, we&lsquo;re passionate about 
                creating nutritious drinks and bowls that fuel your body and delight your taste buds.
              </p>
              <p>
                Every ingredient is carefully selected for quality and freshness. We source 
                locally where possible, supporting our community while ensuring you get the 
                most nutritious and flavorful experience possible.
              </p>
              <p>
                Whether you&lsquo;re starting your day with an energizing green juice, refueling 
                after a workout with a protein smoothie, or treating yourself to an açaí bowl, 
                we&lsquo;re here to support your wellness journey.
              </p>
            </div>
          </div>
          
          <div className="relative">
            <div className="aspect-square bg-gradient-to-br from-cta/20 to-green-100 rounded-2xl flex items-center justify-center">
              <div className="text-center p-8">
                <div className="w-20 h-20 bg-cta rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-fg">J</span>
                </div>
                <h3 className="text-xl font-semibold text-fg mb-2">
                  {site.tagline}
                </h3>
                <p className="text-gray-600">
                  Birmingham&lsquo;s freshest juice bar
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Location Section */}
      <Section title="Find Us" kicker="Location">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Map */}
          <div>
            <div className="aspect-[4/3] bg-gray-200 rounded-xl border border-gray-300 flex items-center justify-center">
              <div className="text-center p-8">
                <MapPin className="h-12 w-12 text-cta mx-auto mb-4" />
                <p className="text-lg font-medium text-fg mb-2">Interactive Map</p>
                <p className="text-gray-600 text-sm">
                  Map integration would be embedded here<br />
                  (Google Maps, OpenStreetMap, etc.)
                </p>
              </div>
            </div>
          </div>

          {/* Location Details */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-fg mb-4 flex items-center">
                <MapPin className="h-6 w-6 text-cta mr-2" />
                Address
              </h3>
              <address className="text-lg text-gray-600 not-italic">
                <div className="p-4 bg-white rounded-xl border border-gray-200">
                  {site.address}
                </div>
              </address>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-fg mb-4 flex items-center">
                <Car className="h-6 w-6 text-cta mr-2" />
                Getting Here
              </h3>
              <div className="space-y-4">
                <div className="p-4 bg-white rounded-xl border border-gray-200">
                  <h4 className="font-semibold text-fg mb-2 flex items-center">
                    <Car className="h-4 w-4 text-cta mr-2" />
                    By Car
                  </h4>
                  <p className="text-gray-600">
                    Street parking available nearby. Several car parks within 2-minute walk.
                  </p>
                </div>
                
                <div className="p-4 bg-white rounded-xl border border-gray-200">
                  <h4 className="font-semibold text-fg mb-2 flex items-center">
                    <Train className="h-4 w-4 text-cta mr-2" />
                    Public Transport
                  </h4>
                  <p className="text-gray-600">
                    5-minute walk from Birmingham New Street Station. 
                    Multiple bus routes stop nearby.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Hours Section */}
      <Section title="Opening Hours" kicker="When to Visit" className="bg-gray-50">
        <div className="max-w-2xl mx-auto">
          <HoursTable />
          
          <div className="mt-8 p-6 bg-cta/10 rounded-xl border border-cta/20 text-center">
            <Clock className="h-8 w-8 text-cta mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-fg mb-2">Holiday Hours</h3>
            <p className="text-gray-600">
              We may have special hours during bank holidays and festive periods. 
              Follow us on social media or give us a call for updates.
            </p>
          </div>
        </div>
      </Section>
    </div>
  )
}
