'use client'

import Link from 'next/link'
import { ArrowRight, Leaf, MapPin, Users, Phone } from 'lucide-react'
import { motion } from 'framer-motion'
import { site } from '../../site.config'
import Button from '@/components/Button'
import Section from '@/components/Section'
import { useInstagram } from '@/hooks/useInstagram'
import { InstagramEmbed } from 'react-social-media-embed';

export default function HomePage() {
  const { posts, loading, error } = useInstagram()
  
  const tiles = [
    {
      title: 'Menu',
      description: 'Fresh juices, smoothies & bowls made daily',
      href: '/menu',
      icon: Leaf,
      color: 'bg-green-50 border-green-200'
    },
    {
      title: 'About & Location',
      description: 'Our story and Birmingham location',
      href: '/about',
      icon: MapPin,
      color: 'bg-blue-50 border-blue-200'
    },
    {
      title: 'Careers',
      description: 'Join our healthy lifestyle team',
      href: '/careers',
      icon: Users,
      color: 'bg-purple-50 border-purple-200'
    },
    {
      title: 'Contact',
      description: 'Get in touch for business enquiries',
      href: '/contact',
      icon: Phone,
      color: 'bg-pink-50 border-pink-200'
    }
  ]

  return (
    <>
      {/* Hero Section with Video Background */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 w-full h-full">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            poster="/images/hero-poster.jpg"
          >
            <source src="/videos/test-video.mp4" type="video/mp4" />
            {/* <source src="/videos/hero-juice-4k.webm" type="video/webm" /> */}
            {/* Fallback for browsers that don't support video */}
            Your browser does not support the video tag.
          </video>
        </div>
        
        {/* Overlays */}
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-br from-accent/30 via-transparent to-alt-bg/40" />

        {/* Content */}
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <motion.h1 
            className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-bold text-white mb-6 leading-tight"
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {site.tagline}
          </motion.h1>
          
          <motion.p 
            className="text-2xl sm:text-3xl lg:text-5xl xl:text-5xl text-white/90 mb-12 max-w-3xl mx-auto font-light leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
          </motion.div>
        </div>
      </section>

      {/* Intro Section */}
      <Section className="bg-bg relative overflow-hidden py-20">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-alt-bg/30 rounded-full blur-2xl" />
        
        <div className="relative max-w-6xl mx-auto">
          {/* Bold Tagline */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-cta leading-tight mb-6">
                Fresh. Healthy. Local.<br />
            </h2>
            <motion.p 
              className="text-lg lg:text-xl text-gray-700 leading-relaxed max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Supercharge your day the juicy way with Juci's fresh fruit 
              smoothies and juices.
            </motion.p>
          </motion.div>

          {/* Instagram Feature Wall - Free Version */}
          <div className="w-full">
            {/* Option 3: Manual Instagram Embeds (If you get permission) */}
            <motion.div
              className="mb-12 px-4 sm:px-6 lg:px-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <h4 className="text-lg font-semibold mb-8 text-center">Featured Instagram Posts</h4>
              {/* Three Manual Embeds - Responsive Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                
                {/* Post 1 - Replace placeholder with actual Instagram embed */}
                <div className="w-full flex justify-center">
                  <div className="w-full max-w-sm sm:max-w-xs md:max-w-sm">
                    <InstagramEmbed 
                      url='https://www.instagram.com/reel/DLVoY5Los9U/?utm_source=ig_embed&utm_campaign=loading'
                      captioned={false}
                    />
                  </div>
                </div>

                {/* Post 2 - Replace placeholder with actual Instagram embed */}
                <div className="w-full flex justify-center">
                  <div className="w-full max-w-sm sm:max-w-xs md:max-w-sm">
                    <InstagramEmbed 
                      url='https://www.instagram.com/reel/DNn94boowUt/?utm_source=ig_embed&utm_campaign=loading'
                    />
                  </div>
                </div>

                {/* Post 3 - Replace placeholder with actual Instagram embed */}
                <div className="w-full flex justify-center">
                  <div className="w-full max-w-sm sm:max-w-xs md:max-w-sm">
                    <InstagramEmbed 
                      url='https://www.instagram.com/reel/DLVoFqwo7LQ/?utm_source=ig_embed&utm_campaign=loading'
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Call to Action */}
            <motion.div 
              className="text-center mt-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <a
                href="https://instagram.com/juci.co"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-cta text-white px-8 py-4 rounded-full font-semibold hover:bg-cta/90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.40s-.644-1.44-1.439-1.44z"/>
                </svg>
                <span>Follow @juci.co</span>
              </a>
            </motion.div>
          </div>
        </div>
      </Section>
    </>
  )
}
