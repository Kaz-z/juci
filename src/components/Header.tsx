'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { site } from '../../site.config'
import Button from './Button'

const navigation = [
  { name: 'MENU', href: '/menu' },
  { name: 'CAREERS', href: '/careers' },
  { name: 'CONTACT', href: '/contact' },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()
  const isHomePage = pathname === '/'

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      setIsScrolled(scrollTop > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [mobileMenuOpen])

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-cta backdrop-blur-sm shadow-lg' 
          : 'bg-transparent'
      }`}>
        <nav className="container-max section-padding">
          <div className="flex justify-between items-center h-24 py-8">
            {/* Logo */}
                      <Link 
            href="/" 
            className={`text-4xl font-bold transition-colors ${
              isScrolled
                ? 'text-white hover:text-white'
                : isHomePage
                  ? 'text-white hover:text-highlight'
                  : 'text-fg hover:text-cta'
            }`}
            aria-label="Juci home"
          >
              {site.name}
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
                          {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`relative px-2 py-1 font-medium text-lg transition-all duration-300 ease-in-out overflow-hidden group ${
                  isScrolled
                    ? 'text-white/90 hover:text-cta'
                    : isHomePage
                      ? 'text-white/90 hover:text-cta'
                      : 'text-fg/80 hover:text-cta'
                }`}
              >
                <span className="relative z-10">{item.name}</span>
                <div className="absolute inset-0 bg-white transform scale-y-0 origin-bottom transition-transform duration-300 ease-in-out group-hover:scale-y-100"></div>
              </Link>
            ))}
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button
                type="button"
                className={`p-2 rounded-md transition-colors ${
                  isScrolled
                    ? 'text-white hover:text-white/70'
                    : isHomePage
                      ? 'text-white hover:text-highlight'
                      : 'text-fg hover:text-cta'
                }`}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle mobile menu"
              >
                {mobileMenuOpen ? (
                  <X className="h-8 w-8" />
                ) : (
                  <Menu className="h-8 w-8" />
                )}
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Navigation - Portal to Body */}
      {mounted && createPortal(
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className="lg:hidden fixed inset-0 z-[9999] bg-cta"
            style={{ 
              position: 'fixed', 
              top: 0, 
              left: 0, 
              right: 0, 
              bottom: 0,
              width: '100vw',
              height: '100vh',
              zIndex: 9999
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
          {/* Close button */}
          <motion.div 
            className="absolute top-6 right-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
          >
            <button
              type="button"
              className="p-2 rounded-md text-white hover:text-white/70 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close mobile menu"
            >
              <X className="h-8 w-8" />
            </button>
          </motion.div>

          {/* Menu Content */}
          <div className="flex flex-col items-center justify-center h-full px-8">
            <div className="flex flex-col items-center space-y-12 text-center">
              {navigation.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ 
                    duration: 0.3, 
                    delay: mobileMenuOpen ? 0.1 + (index * 0.1) : (navigation.length - index - 1) * 0.05,
                    ease: "easeOut" 
                  }}
                >
                  <Link
                    href={item.href}
                    className="text-white font-bold text-4xl sm:text-4xl md:text-4xl lg:text-6xl hover:text-white/80 transition-colors uppercase tracking-wide"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
              
              {/* Social Media Icons */}
              <motion.div 
                className="flex items-center space-x-8 pt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ 
                  duration: 0.3, 
                  delay: mobileMenuOpen ? 0.6 : 0,
                  ease: "easeOut" 
                }}
              >
                <a 
                  href={site.socials.instagram} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white hover:text-white/80 transition-colors"
                  aria-label="Instagram"
                >
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.004 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323c-.875.807-2.026 1.297-3.323 1.297zm7.718-6.541c-.807 0-1.297-.49-1.297-1.297s.49-1.297 1.297-1.297 1.297.49 1.297 1.297-.49 1.297-1.297 1.297z"/>
                  </svg>
                </a>
                <a 
                  href={site.socials.tiktok} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white hover:text-white/80 transition-colors"
                  aria-label="TikTok"
                >
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                  </svg>
                </a>
              </motion.div>
            </div>
          </div>
        </motion.div>
        )}
      </AnimatePresence>,
      document.body
    )}
    </>
  )
}
