import type { Metadata } from 'next'
import { Download, Phone, ExternalLink } from 'lucide-react'
import { site } from '../../../site.config'
import Button from '@/components/Button'
import Section from '@/components/Section'
import QR from '@/components/QR'
import { formatPhoneForTel } from '@/lib/utils'

export const metadata: Metadata = {
  title: `Menu | ${site.name}`,
  description: 'Fresh juices, smoothies, and healthy bowls. Download our full menu or order online for collection.',
  openGraph: {
    title: `Menu | ${site.name}`,
    description: 'Fresh juices, smoothies, and healthy bowls. Download our full menu or order online for collection.',
    url: `${site.seo.url}/menu`,
  },
}

const menuHighlights = [
  {
    category: 'Fresh Juices',
    items: [
      { name: 'Green Goddess', description: 'Spinach, kale, apple, cucumber, lemon, ginger', price: '£5.50' },
      { name: 'Immunity Boost', description: 'Orange, carrot, turmeric, ginger, lemon', price: '£5.00' },
      { name: 'Beet the Day', description: 'Beetroot, apple, carrot, lemon, mint', price: '£5.50' }
    ]
  },
  {
    category: 'Smoothies',
    items: [
      { name: 'Berry Bliss', description: 'Mixed berries, banana, almond milk, honey', price: '£6.00' },
      { name: 'Tropical Paradise', description: 'Mango, pineapple, coconut milk, lime', price: '£6.50' },
      { name: 'Protein Power', description: 'Banana, peanut butter, oat milk, protein powder', price: '£7.00' }
    ]
  },
  {
    category: 'Bowls',
    items: [
      { name: 'Açaí Bowl', description: 'Açaí, banana, granola, fresh berries, coconut', price: '£8.50' },
      { name: 'Green Bowl', description: 'Spinach smoothie base, granola, kiwi, chia seeds', price: '£8.00' },
      { name: 'Chocolate Bowl', description: 'Cacao smoothie base, banana, nuts, dark chocolate', price: '£8.50' }
    ]
  }
]

export default function MenuPage() {
  return (
    <div className="pt-24">
      {/* Hero Section */}
      <Section title="Our Menu" kicker="Fresh Daily">
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-lg text-gray-600 mb-8">
            Every juice, smoothie, and bowl is crafted fresh with premium ingredients. 
            Discover your new favorite healthy treat or download our complete menu.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button size="sm" className="whitespace-nowrap w-40 h-10" asChild>
              <a 
                href={site.pdfMenuUrl} 
                download
                aria-label="Download PDF menu"
                className="flex items-center justify-center gap-1.5"
              >
                <Download className="h-4 w-4 flex-shrink-0" />
                <span>Download Menu</span>
              </a>
            </Button>
            
            <Button variant="secondary" size="sm" className="whitespace-nowrap w-40 h-10" asChild>
              <a 
                href={`tel:${formatPhoneForTel(site.phone)}`}
                aria-label="Call to place order"
                className="flex items-center justify-center gap-1.5"
              >
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span>Call to Order</span>
              </a>
            </Button>
          </div>
        </div>
      </Section>

      {/* Menu Highlights */}
      <Section title="Menu Highlights" className="bg-gray-50">
        <div className="grid gap-8 lg:gap-12">
          {menuHighlights.map((category, index) => (
            <div key={category.category}>
              <h3 className="text-2xl font-bold text-fg mb-6 text-center lg:text-left">
                {category.category}
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.items.map((item) => (
                  <div 
                    key={item.name}
                    className="bg-white rounded-xl p-6 border border-gray-200 hover:border-cta transition-colors"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="text-lg font-semibold text-fg">{item.name}</h4>
                      <span className="text-lg font-bold text-cta">{item.price}</span>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Download Section */}
      <Section title="Download Menu" kicker="Get Fresh">
        <div className="text-center max-w-4xl mx-auto">
          <p className="text-lg text-gray-600 mb-8">
            Download our complete menu or give us a call to place your order.
          </p>
          
          <div className="flex justify-center mb-12">
            {/* Menu PDF QR */}
            <div className="text-center">
              <QR 
                value={`${site.seo.url}${site.pdfMenuUrl}`}
                size={140}
                caption="Scan to download full menu PDF"
              />
            </div>
          </div>

          <div className="mt-12 p-6 bg-cta/10 rounded-xl border border-cta/20">
            <h3 className="text-xl font-semibold text-fg mb-3">Need Help?</h3>
            <p className="text-gray-600 mb-4">
              Call us directly to place an order or ask questions about ingredients and allergies.
            </p>
            <Button variant="secondary" size="sm" className="whitespace-nowrap min-w-fit" asChild>
              <a 
                href={`tel:${formatPhoneForTel(site.phone)}`}
                aria-label="Call us for help"
                className="flex items-center gap-1.5"
              >
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span>{site.phone}</span>
              </a>
            </Button>
          </div>
        </div>
      </Section>
    </div>
  )
}
