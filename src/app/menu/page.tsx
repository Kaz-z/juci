'use client'

import type { Metadata } from 'next'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Download, Phone, Sparkles, Coffee, Sandwich, Cookie, Zap } from 'lucide-react'
import { site } from '../../../site.config'
import Button from '@/components/Button'
import { formatPhoneForTel } from '@/lib/utils'

const categories = [
  { 
    id: 'hot-picks', 
    name: 'Hot Picks', 
    icon: Sparkles,
    color: 'bg-black text-white'
  },
  { 
    id: 'fresh-juices', 
    name: 'Fresh Juices', 
    icon: Zap,
    color: 'bg-cta text-white'
  },
  { 
    id: 'smoothies', 
    name: 'Smoothies', 
    icon: Coffee,
    color: 'bg-accent text-white'
  },
  { 
    id: 'bowls', 
    name: 'Bowls', 
    icon: Cookie,
    color: 'bg-highlight text-fg'
  },
  { 
    id: 'snacks', 
    name: 'Snacks & Treats', 
    icon: Cookie,
    color: 'bg-gray-100 text-fg'
  },
  { 
    id: 'sandwiches', 
    name: 'Sandwiches', 
    icon: Sandwich,
    color: 'bg-gray-100 text-fg'
  }
]

const menuItems = {
  'hot-picks': [
    {
      name: 'Green Goddess Supreme',
      description: 'Spinach, kale, apple, cucumber, lemon, ginger, spirulina',
      price: '£6.50',
      emoji: '🌿',
      badge: 'PREMIUM',
      badgeColor: 'bg-black text-white'
    },
    {
      name: 'Immunity Warrior',
      description: 'Orange, carrot, turmeric, ginger, lemon, cayenne',
      price: '£5.90',
      emoji: '🔥',
      badge: 'NEW',
      badgeColor: 'bg-accent text-white'
    },
    {
      name: 'Tropical Paradise Bowl',
      description: 'Açaí, mango, pineapple, coconut, granola, fresh berries',
      price: '£9.50',
      emoji: '🏝️',
      badge: 'NEW',
      badgeColor: 'bg-accent text-white'
    }
  ],
  'fresh-juices': [
    {
      name: 'Green Machine',
      description: 'Spinach, kale, apple, cucumber, lemon, ginger',
      price: '£5.50',
      emoji: '🥬'
    },
    {
      name: 'Immunity Boost',
      description: 'Orange, carrot, turmeric, ginger, lemon',
      price: '£5.00',
      emoji: '🥕'
    },
    {
      name: 'Beet the Day',
      description: 'Beetroot, apple, carrot, lemon, mint',
      price: '£5.50',
      emoji: '🍎'
    },
    {
      name: 'Citrus Burst',
      description: 'Orange, grapefruit, lemon, lime, mint',
      price: '£4.80',
      emoji: '🍊'
    },
    {
      name: 'Detox Delight',
      description: 'Celery, cucumber, green apple, lemon, parsley',
      price: '£5.20',
      emoji: '🥒'
    },
    {
      name: 'Ginger Shot',
      description: 'Fresh ginger, lemon, cayenne pepper',
      price: '£2.50',
      emoji: '⚡'
    }
  ],
  'smoothies': [
    {
      name: 'Berry Bliss',
      description: 'Mixed berries, banana, almond milk, honey',
      price: '£6.00',
      emoji: '🫐'
    },
    {
      name: 'Tropical Escape',
      description: 'Mango, pineapple, coconut milk, lime',
      price: '£6.50',
      emoji: '🥭'
    },
    {
      name: 'Protein Power',
      description: 'Banana, peanut butter, oat milk, protein powder',
      price: '£7.00',
      emoji: '💪'
    },
    {
      name: 'Chocolate Dream',
      description: 'Banana, cacao, almond milk, dates, vanilla',
      price: '£6.80',
      emoji: '🍫'
    },
    {
      name: 'Green Smoothie',
      description: 'Spinach, banana, apple, coconut water, lime',
      price: '£5.80',
      emoji: '🍃'
    }
  ],
  'bowls': [
    {
      name: 'Açaí Classic',
      description: 'Açaí, banana, granola, fresh berries, coconut',
      price: '£8.50',
      emoji: '🍇'
    },
    {
      name: 'Green Power Bowl',
      description: 'Spinach smoothie base, granola, kiwi, chia seeds',
      price: '£8.00',
      emoji: '🥝'
    },
    {
      name: 'Chocolate Bliss Bowl',
      description: 'Cacao smoothie base, banana, nuts, dark chocolate',
      price: '£8.50',
      emoji: '🍌'
    },
    {
      name: 'Tropical Bowl',
      description: 'Mango smoothie base, coconut, pineapple, granola',
      price: '£8.80',
      emoji: '🥥'
    }
  ],
  'snacks': [
    {
      name: 'Energy Balls',
      description: 'Dates, nuts, coconut, cacao',
      price: '£3.50',
      emoji: '⚡'
    },
    {
      name: 'Chia Pudding',
      description: 'Chia seeds, almond milk, vanilla, berries',
      price: '£4.50',
      emoji: '🍮'
    },
    {
      name: 'Granola Bar',
      description: 'Oats, honey, nuts, dried fruit',
      price: '£3.00',
      emoji: '🥜'
    }
  ],
  'sandwiches': [
    {
      name: 'Avocado Toast',
      description: 'Sourdough, avocado, tomato, hemp seeds',
      price: '£6.50',
      emoji: '🥑'
    },
    {
      name: 'Hummus Wrap',
      description: 'Spinach wrap, hummus, vegetables, sprouts',
      price: '£7.00',
      emoji: '🌯'
    }
  ]
}

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState('hot-picks')
  const [isSticky, setIsSticky] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = 300 // Approximate hero section height
      setIsSticky(window.scrollY > heroHeight)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToCategory = (categoryId: string) => {
    setActiveCategory(categoryId)
    const element = document.getElementById(categoryId)
    if (element) {
      const offset = 120 // Account for sticky header
      const elementPosition = element.offsetTop - offset
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      })
    }
  }

  return (
    <div className="min-h-screen bg-bg">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-cta/10 to-accent/5 py-16">
        <div className="container-max section-padding">
          <div className="text-center max-w-3xl mx-auto">
            <motion.h1 
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-fg mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              Our menu
            </motion.h1>
            <motion.p 
              className="text-lg text-gray-600 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Every juice, smoothie, and bowl is crafted fresh with premium ingredients
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Button variant="secondary" size="md" className="whitespace-nowrap w-40 h-12" asChild>
                <a 
                  href={`tel:${formatPhoneForTel(site.phone)}`}
                  aria-label="Call to place order"
                  className="flex items-center justify-center gap-1.5"
                >
                  <Phone className="h-4 w-4 flex-shrink-0" />
                  <span>Call to Order</span>
                </a>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Sticky Category Navigation */}
      <div className={`sticky top-0 z-40 bg-bg/95 backdrop-blur-sm border-b border-gray-200 transition-all duration-300 ${
        isSticky ? 'shadow-lg' : ''
      }`}>
        <div className="container-max section-padding py-4">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {categories.map((category) => {
              const Icon = category.icon
              const isActive = activeCategory === category.id
              
              return (
                <motion.button
                  key={category.id}
                  onClick={() => scrollToCategory(category.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap font-medium transition-all duration-300 ${
                    isActive 
                      ? category.color
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm">{category.name}</span>
                </motion.button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Menu Sections */}
      <div className="container-max section-padding py-8">
        {categories.map((category) => (
          <motion.section
            key={category.id}
            id={category.id}
            className="mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className={`p-2 rounded-lg ${category.color}`}>
                <category.icon className="w-6 h-6" />
              </div>
              <h2 className="text-3xl font-bold text-fg">{category.name}</h2>
            </div>
            
            <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {menuItems[category.id as keyof typeof menuItems]?.map((item, index) => (
                <motion.div
                  key={item.name}
                  className="bg-white rounded-xl p-6 border border-gray-200 hover:border-cta/50 hover:shadow-lg transition-all duration-300"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="flex items-start gap-4">
                    {/* Emoji/Icon */}
                    <div className="text-4xl flex-shrink-0">
                      {item.emoji}
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-semibold text-fg">{item.name}</h3>
                        <span className="text-xl font-bold text-cta">{item.price}</span>
                      </div>
                      <p className="text-gray-600 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        ))}
      </div>

    </div>
  )
}