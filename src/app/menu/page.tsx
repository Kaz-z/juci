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
    id: 'wellness-shots', 
    name: 'Wellness Shots', 
    icon: Zap,
    color: 'bg-cta text-white'
  },
  { 
    id: 'matchas', 
    name: 'Matchas', 
    icon: Coffee,
    color: 'bg-accent text-white'
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
      name: 'The Classic Bowl',
      description: 'Açaí • Granola • Peanut Butter • Banana • Cacao Nibs • Coconut',
      price: '£7.95',
      emoji: '🍌',
      badge: 'POPULAR',
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
      name: 'Cheat Day Bowl',
      description: 'Açaí • Granola • Milk Chocolate Sauce • Biscoff • Chocolate Chips • Strawberry',
      price: '£9.95',
      emoji: '🍓',
      badge: 'INDULGENT',
      badgeColor: 'bg-cta text-white'
    }
  ],
  'fresh-juices': [
    {
      name: 'The Unbeatable',
      description: 'Beetroot • Apple • Pear • Pineapple • Ginger',
      price: '£4.95',
      emoji: '🍎'
    },
    {
      name: 'One in a Melon',
      description: 'Watermelon • Lime • Mint',
      price: '£5.95',
      emoji: '🍉'
    },
    {
      name: '24 Carrot',
      description: 'Carrot • Apple • Ginger',
      price: '£4.95',
      emoji: '🥕'
    },
    {
      name: 'Orange You Thirsty',
      description: '100% freshly squeezed Oranges',
      price: '£5.95',
      emoji: '🍊'
    },
    {
      name: 'Kiwi to My Heart',
      description: 'Kiwi • Apple • Pear • Lime • Cucumber • Kale • Pineapple',
      price: '£4.95',
      emoji: '🥝'
    },
    {
      name: 'Pome Alone',
      description: '100% freshly squeezed Pomegranate',
      price: '£5.95',
      emoji: '🫐'
    },
    {
      name: "It's Mint to Be",
      description: 'Mint • Pineapple • Apple • Lemon',
      price: '£4.95',
      emoji: '🍃'
    },
    {
      name: 'Citrus Got Real',
      description: '100% freshly squeezed Orange and Pomegranate',
      price: '£5.95',
      emoji: '🍊'
    }
  ],
  'smoothies': [
    {
      name: 'Berry Good',
      description: 'Strawberries • Blueberries • Banana • Chia Seeds • Apple • Dates',
      price: '£5.95',
      emoji: '🫐'
    },
    {
      name: 'Mango-nificent',
      description: 'Mango • Pineapple • Strawberries • Apple • Chia Seeds',
      price: '£6.95',
      emoji: '🥭'
    },
    {
      name: 'Kalefornia Sunshine',
      description: 'Pineapple • Mango • Banana • Kale • Apple • Lemon • Ginger • Avocado',
      price: '£5.95',
      emoji: '🌞'
    },
    {
      name: 'Cacao Me Crazy',
      description: 'Cacao • Banana • Avocado • Oat milk • Chia Seeds • Agave',
      price: '£6.95',
      emoji: '🍫'
    },
    {
      name: 'Pinka Colada (Super)',
      description: 'Pineapple • Dragonfruit • Coconut Milk • Chia seeds • Collagen',
      price: '£7.95',
      emoji: '🌺'
    },
    {
      name: 'Sapphire Bliss (Super)',
      description: 'Mango • Pineapple • Spirulina • Maple Syrup • Oat milk • Sea Moss',
      price: '£8.95',
      emoji: '💙'
    },
    {
      name: 'Maca Me Strong (Super)',
      description: 'Banana • Peanut Butter • Chia seeds • Oat milk • Shilajit • Maca Root • Dates',
      price: '£7.95',
      emoji: '💪'
    },
    {
      name: 'Beauty Booster (Super)',
      description: 'Strawberries • Blueberries • Acai Berry • Apple • Hemp Seeds • Chia Seeds • Collagen',
      price: '£8.95',
      emoji: '✨'
    }
  ],
  'bowls': [
    {
      name: 'The Classic',
      description: 'Açaí • Granola • Peanut Butter • Banana • Cacao Nibs • Coconut',
      price: '£7.95',
      emoji: '🍌'
    },
    {
      name: 'Cheat Day',
      description: 'Açaí • Granola • Milk Chocolate Sauce • Biscoff • Chocolate Chips • Strawberry',
      price: '£9.95',
      emoji: '🍓'
    },
    {
      name: '5 A Day',
      description: 'Açaí • Granola • Strawberry • Honey • Blueberry • Banana • Coconut',
      price: '£7.95',
      emoji: '🫐'
    },
    {
      name: 'Weight Loss',
      description: 'Açaí • Granola • Strawberry • Blueberry • Chia Pudding • Cacao Nibs',
      price: '£9.95',
      emoji: '💚'
    },
    {
      name: 'Build Your Own (Regular)',
      description: 'Açaí base with up to 4 toppings of your choice',
      price: '£7.95',
      emoji: '🎯'
    },
    {
      name: 'Build Your Own (Large)',
      description: 'Açaí base with unlimited toppings',
      price: '£9.95',
      emoji: '🎯'
    }
  ],
  'wellness-shots': [
    {
      name: 'Skin Tonic',
      description: 'Wellness shot for healthy glowing skin',
      price: '£1.95',
      emoji: '✨'
    },
    {
      name: 'Immunity Boost',
      description: 'Wellness shot to boost your immune system',
      price: '£1.95',
      emoji: '🛡️'
    },
    {
      name: 'Energy Elixir',
      description: 'Wellness shot for natural energy boost',
      price: '£1.95',
      emoji: '⚡'
    }
  ],
  'matchas': [
    {
      name: 'Rose Matcha',
      description: 'Premium ceremonial grade matcha with rose served over ice and blended with oat milk',
      price: '£3.95',
      emoji: '🌹'
    },
    {
      name: 'Vanilla Matcha',
      description: 'Premium ceremonial grade matcha with vanilla served over ice and blended with oat milk',
      price: '£4.95',
      emoji: '🍦'
    },
    {
      name: 'Blueberry Matcha',
      description: 'Premium ceremonial grade matcha with blueberry served over ice and blended with oat milk',
      price: '£4.95',
      emoji: '🫐'
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
      
      // Find the currently visible section
      const sections = categories.map(category => {
        const element = document.getElementById(category.id)
        if (element) {
          const rect = element.getBoundingClientRect()
          const offset = 150 // Account for sticky header + some buffer
          return {
            id: category.id,
            top: rect.top,
            bottom: rect.bottom,
            isVisible: rect.top <= offset && rect.bottom > offset
          }
        }
        return null
      }).filter(Boolean)
      
      // Find the section that's currently in view
      const visibleSection = sections.find(section => section?.isVisible)
      if (visibleSection) {
        setActiveCategory(visibleSection.id)
      } else {
        // If no section is perfectly in view, find the closest one
        const closestSection = sections.reduce((closest, current) => {
          if (!current || !closest) return current || closest
          const currentDistance = Math.abs(current.top - 150)
          const closestDistance = Math.abs(closest.top - 150)
          return currentDistance < closestDistance ? current : closest
        }, null)
        
        if (closestSection) {
          setActiveCategory(closestSection.id)
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Call once to set initial state
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
              Our Menu
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
                      ? 'bg-black text-white'
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
              <h2 className="text-3xl font-normal text-fg">{category.name}</h2>
            </div>
            
            <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {menuItems[category.id as keyof typeof menuItems]?.map((item, index) => (
                <motion.div
                  key={item.name}
                  data-menu-item
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
                        <h3 className="text-lg font-normal text-fg">{item.name}</h3>
                        <span className="text-xl font-normal text-cta">{item.price}</span>
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