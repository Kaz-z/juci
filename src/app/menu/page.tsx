'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Phone, Zap, Coffee, Cookie, Sparkles, Leaf } from 'lucide-react'
import { site } from '../../../site.config'
import Button from '@/components/Button'
import { formatPhoneForTel } from '@/lib/utils'

type MenuItem = {
  name: string
  description: string
  /** Omit for “in store” pricing (e.g. most juices). */
  price?: string
  emoji?: string
  badge?: string
  badgeColor?: string
  /** Span full row for long lists / notes */
  fullWidth?: boolean
}

type Category = {
  id: string
  name: string
  icon: typeof Cookie
  color: string
  /** e.g. size pricing for the whole section */
  subtitle?: string
  /** Extra paragraph under subtitle */
  note?: string
}

const categories: Category[] = [
  {
    id: 'acai-bowls',
    name: 'Açaí bowls',
    icon: Cookie,
    color: 'bg-highlight text-fg',
    subtitle: 'Regular: £7.95 · Large: £9.95',
  },
  {
    id: 'juices',
    name: 'Juices',
    icon: Zap,
    color: 'bg-cta text-white',
    subtitle:
      'Reg £4.95 · Lrg £5.95',
  },
  {
    id: 'smoothies',
    name: 'Smoothies',
    icon: Coffee,
    color: 'bg-accent text-white',
    subtitle: 'Regular: £5.95 · Large: £6.95',
  },
  {
    id: 'super-smoothies',
    name: 'Super smoothies',
    icon: Sparkles,
    color: 'bg-black text-white',
    subtitle: 'Regular: £7.95 · Large: £8.95',
  },
  {
    id: 'wellness-shots',
    name: 'Wellness shots',
    icon: Zap,
    color: 'bg-cta text-white',
  },
  {
    id: 'matchas',
    name: 'Matchas',
    icon: Coffee,
    color: 'bg-accent text-white',
    subtitle: 'Regular: £3.95 · Large: £4.95',
    note: 'Premium ceremonial grade matcha with choice of vanilla, blueberry, or rose, served over ice and blended with oat milk.',
  },
  {
    id: 'superfood-addons',
    name: 'Superfood add-ons',
    icon: Leaf,
    color: 'bg-alt-bg text-white',
    subtitle: '£1 each',
  },
]

const menuItems: Record<string, MenuItem[]> = {
  'acai-bowls': [
    {
      name: 'The Classic',
      description:
        'Açaí, granola, peanut butter, banana, cacao nibs, coconut',
      price: '',
      emoji: '🍌',
    },
    {
      name: 'Cheat Day',
      description:
        'Açaí, granola, milk chocolate sauce, Biscoff, chocolate chips, strawberry',
      price: '',
      emoji: '🍓',
    },
    {
      name: '5 A Day',
      description:
        'Açaí, granola, strawberry, honey, blueberry, banana, coconut',
      price: '',
      emoji: '🫐',
    },
    {
      name: 'Weight Loss',
      description:
        'Açaí, granola, strawberry, blueberry, chia pudding, cacao nibs',
      price: '',
      emoji: '💚',
    },
    {
      name: 'Build Your Own (Regular)',
      description: 'Up to 4 toppings. Extra toppings 50p each.',
      price: '£7.95',
      emoji: '🎯',
    },
    {
      name: 'Build Your Own (Large)',
      description: 'Unlimited toppings. Extra toppings 50p each.',
      price: '£9.95',
      emoji: '🎯',
    },
    {
      name: 'Available toppings',
      description:
        'Pistachio sauce, milk chocolate sauce, white chocolate sauce, peanut butter, mango pulp, agave, honey, strawberry, blueberry, banana, kiwi, dates, chia pudding, matcha pudding, cacao nibs, mixed nuts, hemp seeds, pistachio crumble, choco chips, Biscoff, Oreo, coconut.',
      emoji: '✨',
      fullWidth: true,
    },
  ],
  juices: [
    {
      name: 'The Unbeetable',
      description: 'Beetroot, apple, pear, pineapple, ginger',
      emoji: '🍎',
    },
    {
      name: '24 Carrot',
      description: 'Carrot, apple, ginger',
      emoji: '🥕',
    },
    {
      name: 'Kiwi To My Heart',
      description: 'Kiwi, apple, pear, lime, cucumber, kale, pineapple',
      emoji: '🥝',
    },
    {
      name: 'It’s Mint To Be',
      description: 'Mint, pineapple, apple, lemon',
      emoji: '🍃',
    },
    {
      name: 'One In A Melon',
      description: 'Watermelon, lime, mint',
      emoji: '🍉',
    },
    {
      name: 'Orange You Thirsty',
      description: '100% freshly squeezed oranges',
      emoji: '🍊',
    },
    {
      name: 'Pome Alone',
      description: '100% freshly squeezed pomegranate',
      price: 'Regular: £5.95 · Large: £6.95',
      emoji: '🫐',
    },
    {
      name: 'Citrus Got Real',
      description: '100% freshly squeezed orange and pomegranate',
      emoji: '🍊',
    },
  ],
  smoothies: [
    {
      name: 'Berry Good',
      description:
        'Strawberries, blueberries, banana, chia seeds, apple, dates',
      price: '',
      emoji: '🫐',
    },
    {
      name: 'Mango-nificent',
      description: 'Mango, pineapple, strawberries, apple, chia seeds',
      price: '',
      emoji: '🥭',
    },
    {
      name: 'Kalefornia Sunshine',
      description:
        'Pineapple, mango, banana, kale, apple, lemon, ginger, avocado',
      price: '',
      emoji: '🌞',
    },
    {
      name: 'Cacao Me Crazy',
      description: 'Cacao, banana, avocado, oat milk, chia seeds, agave',
      price: '',
      emoji: '🍫',
    },
  ],
  'super-smoothies': [
    {
      name: 'Pinka Colada',
      description:
        'Pineapple, dragonfruit, coconut milk, chia seeds, collagen',
      price: '',
      emoji: '🌺',
    },
    {
      name: 'Sapphire Bliss',
      description:
        'Mango, pineapple, spirulina, maple syrup, oat milk, sea moss',
      price: '',
      emoji: '💙',
    },
    {
      name: 'Maca Me Strong',
      description:
        'Banana, peanut butter, chia seeds, oat milk, shilajit, maca root, dates',
      price: '',
      emoji: '💪',
    },
    {
      name: 'Beauty Booster',
      description:
        'Strawberries, blueberries, açaí berry, apple, hemp seeds, chia seeds, collagen',
      price: '',
      emoji: '✨',
    },
  ],
  'wellness-shots': [
    {
      name: 'Skin Tonic',
      description: 'Wellness shot for healthy, glowing skin',
      price: '£1.95',
      emoji: '✨',
    },
    {
      name: 'Immunity Boost',
      description: 'Wellness shot to support your immune system',
      price: '£1.95',
      emoji: '🛡️',
    },
    {
      name: 'Energy Elixir',
      description: 'Wellness shot for a natural energy lift',
      price: '£1.95',
      emoji: '⚡',
    },
  ],
  matchas: [
    {
      name: 'Rose Matcha',
      description: 'Rose flavour — iced, blended with oat milk',
      price: '',
      emoji: '🌹',
    },
    {
      name: 'Vanilla Matcha',
      description: 'Vanilla flavour — iced, blended with oat milk',
      price: '',
      emoji: '🍦',
    },
    {
      name: 'Blueberry Matcha',
      description: 'Blueberry flavour — iced, blended with oat milk',
      price: '',
      emoji: '🫐',
    },
  ],
  'superfood-addons': [
    {
      name: 'Add to any drink',
      description:
        'Açaí berry, collagen, sea moss, maca root, spirulina, shilajit, hemp seeds, chia seeds, protein.',
      emoji: '➕',
      fullWidth: true,
    },
  ],
}

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState('acai-bowls')
  const [isSticky, setIsSticky] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = 300
      setIsSticky(window.scrollY > heroHeight)

      const sections = categories
        .map((category) => {
          const element = document.getElementById(category.id)
          if (element) {
            const rect = element.getBoundingClientRect()
            const offset = 150
            return {
              id: category.id,
              top: rect.top,
              bottom: rect.bottom,
              isVisible: rect.top <= offset && rect.bottom > offset,
            }
          }
          return null
        })
        .filter(Boolean)

      const visibleSection = sections.find((section) => section?.isVisible)
      if (visibleSection) {
        setActiveCategory(visibleSection.id)
      } else {
        const closestSection = sections.reduce(
          (closest, current) => {
            if (!current || !closest) return current || closest
            const currentDistance = Math.abs(current.top - 150)
            const closestDistance = Math.abs(closest.top - 150)
            return currentDistance < closestDistance ? current : closest
          },
          null as (typeof sections)[0]
        )

        if (closestSection) {
          setActiveCategory(closestSection.id)
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToCategory = (categoryId: string) => {
    setActiveCategory(categoryId)
    const element = document.getElementById(categoryId)
    if (element) {
      const offset = 120
      const elementPosition = element.offsetTop - offset
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth',
      })
    }
  }

  return (
    <div className="min-h-screen bg-bg">
      <div className="bg-gradient-to-br from-cta/10 to-accent/5 py-16">
        <div className="container-max section-padding">
          <div className="text-center max-w-3xl mx-auto">
            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl text-fg mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              Our Menu
            </motion.h1>
            <motion.p
              className="text-lg text-gray-600 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Every juice, smoothie, and bowl is crafted fresh with premium
              ingredients
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <a
                href={`tel:${formatPhoneForTel(site.phone)}`}
                aria-label="Call to place order"
              >
                <Button
                  size="md"
                  className="whitespace-nowrap w-40 h-12 bg-alt-bg text-white hover:bg-alt-bg/90 flex items-center justify-center gap-1.5"
                >
                  <Phone className="h-4 w-4 flex-shrink-0" />
                  <span>Call to Order</span>
                </Button>
              </a>
            </motion.div>
          </div>
        </div>
      </div>

      <div
        className={`sticky top-0 z-40 bg-bg/95 backdrop-blur-sm border-b border-gray-200 transition-all duration-300 ${
          isSticky ? 'shadow-lg' : ''
        }`}
      >
        <div className="container-max section-padding py-4">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {categories.map((category) => {
              const Icon = category.icon
              const isActive = activeCategory === category.id

              return (
                <motion.button
                  key={category.id}
                  type="button"
                  onClick={() => scrollToCategory(category.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap font-medium transition-all duration-300 ${
                    isActive
                      ? 'bg-black text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="text-sm">{category.name}</span>
                </motion.button>
              )
            })}
          </div>
        </div>
      </div>

      <div className="container-max section-padding py-8 pb-24">
        {categories.map((category) => (
          <motion.section
            key={category.id}
            id={category.id}
            className="mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-6">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <div className={`p-2 rounded-lg ${category.color}`}>
                  <category.icon className="w-6 h-6" />
                </div>
                <h2 className="text-3xl font-normal text-fg">{category.name}</h2>
              </div>
              {category.subtitle && (
                <p className="text-fg/80 text-base max-w-3xl pl-0 sm:pl-14">
                  {category.subtitle}
                </p>
              )}
              {category.note && (
                <p className="text-gray-600 text-sm max-w-3xl mt-2 sm:pl-14 leading-relaxed">
                  {category.note}
                </p>
              )}
            </div>

            <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {menuItems[category.id]?.map((item, index) => (
                <motion.div
                  key={item.name}
                  data-menu-item
                  className={`bg-white rounded-xl p-6 border border-gray-200 hover:border-cta/50 hover:shadow-lg transition-all duration-300 ${
                    item.fullWidth ? 'md:col-span-2 lg:col-span-3' : ''
                  }`}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                >
                  <div className="flex items-start gap-4">
                    {item.emoji && (
                      <div className="text-4xl flex-shrink-0">{item.emoji}</div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <h3 className="text-lg font-normal text-fg">
                          {item.name}
                        </h3>
                        {item.price ? (
                          <span className="text-lg font-normal text-cta whitespace-nowrap shrink-0">
                            {item.price}
                          </span>
                        ) : (
                          <span className="text-sm text-gray-500 whitespace-nowrap shrink-0">
                            
                          </span>
                        )}
                      </div>
                      {item.badge && (
                        <span
                          className={`inline-block text-xs font-medium px-2 py-0.5 rounded mb-2 ${item.badgeColor ?? 'bg-gray-100'}`}
                        >
                          {item.badge}
                        </span>
                      )}
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
