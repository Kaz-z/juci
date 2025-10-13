'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { site } from '../../site.config'
import Button from './Button'

const navigation = [
  { name: 'HOME', href: '/' },
  { name: 'MENU', href: '/menu' },
  { name: 'CAREERS', href: '/careers' },
  { name: 'CONTACT', href: '/contact' },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const isHomePage = pathname === '/'

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      setIsScrolled(scrollTop > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Mobile Menu Button - Left Side (Mobile Only) */}
            <div className="lg:hidden">
              <button
                type="button"
                className="p-2 text-gray-900 hover:text-gray-600 transition-colors"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle mobile menu"
              >
                <div className="w-6 h-5 relative">
                  {/* Top line */}
                  <motion.span
                    className="absolute left-0 h-0.5 w-6 bg-current transform origin-center"
                    animate={{
                      rotate: mobileMenuOpen ? 45 : 0,
                      y: mobileMenuOpen ? 9 : 4,
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  />
                  {/* Bottom line */}
                  <motion.span
                    className="absolute left-0 h-0.5 w-6 bg-current transform origin-center"
                    animate={{
                      rotate: mobileMenuOpen ? -45 : 0,
                      y: mobileMenuOpen ? 9 : 16,
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  />
                </div>
              </button>
            </div>

            {/* Logo - Left on Desktop, Center on Mobile */}
            <div className="flex items-center lg:flex-1">
              <Link 
                href="/" 
                className="flex items-center hover:opacity-90 transition-opacity lg:justify-start justify-center w-full lg:w-auto"
                aria-label="Juci home"
              >
                <img 
                  src="/images/juci-logo-circle.png" 
                  alt="Juci Logo" 
                  className="h-10 w-10"
                />
              </Link>
            </div>

            {/* Desktop Navigation - Center */}
            <div className="hidden lg:flex items-center space-x-8 flex-1 justify-center">
              {navigation.map((item, index) => (
                <div key={item.name}>
                  <Link
                    href={item.href}
                    className="relative font-normal text-base uppercase tracking-wide text-gray-900 hover:text-gray-600 transition-colors group py-2"
                    style={{ fontFamily: 'Aftetir, sans-serif' }}
                  >
                    {item.name}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cta transition-all duration-300 ease-out group-hover:w-full"></span>
                  </Link>
                </div>
              ))}
            </div>

            {/* Right Side - Sign Up/Login (Desktop Only) + Mobile Spacer */}
            <div className="flex items-center space-x-4 lg:flex-1 lg:justify-end">
              {/* Sign Up/Login Button - Desktop Only */}
              <div className="hidden lg:flex items-center">
                <Button 
                  className="bg-black text-white hover:bg-gray-800 rounded-full px-6 py-2 text-sm font-normal uppercase tracking-wide"
                  style={{ fontFamily: 'Aftetir, sans-serif' }}
                  asChild
                >
                  <Link href="/follow">
                    FOLLOW US
                  </Link>
                </Button>
              </div>
              
              {/* Mobile Spacer to balance the hamburger menu */}
              <div className="lg:hidden w-10"></div>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Navigation Sidebar */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="lg:hidden fixed left-0 bottom-0 z-50 w-80 bg-white shadow-xl"
            style={{ top: '64px' }}
            initial={{ x: -320 }}
            animate={{ x: 0 }}
            exit={{ x: -320 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {/* Navigation Items */}
            <div className="h-full px-6 py-8 overflow-y-auto">
              <nav className="space-y-2">
                {navigation.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      className="flex items-center justify-between px-4 py-4 text-lg font-normal text-gray-900 hover:bg-gray-50 rounded-xl transition-colors"
                      style={{ fontFamily: 'Aftetir, sans-serif' }}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span>{item.name}</span>
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
