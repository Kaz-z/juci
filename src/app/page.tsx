'use client'

import Link from 'next/link'
import { ArrowRight, Leaf, MapPin, Users, Phone } from 'lucide-react'
import { motion } from 'framer-motion'
import { site } from '../../site.config'
import Button from '@/components/Button'
import Section from '@/components/Section'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

export default function HomePage() {

  const popularProducts = [
    {
      id: 1,
      name: 'The Unbeetable',
      image: '/images/1.jpg',
      description: 'Beetroot, Apple, Pear, Pineapple, Ginger'
    },
    {
      id: 2,
      name: 'Kalefornia Sunshine',
      image: '/images/2.jpg',
      description: 'Pineapple, Mango, Banana, Kale, Apple, Lemon, Ginger, Avocado'
    },
    {
      id: 3,
      name: 'Mangonificent',
      image: '/images/3.jpg',
      description: 'Mango, Pinepple, Strawberries, Apple, Chia Seeds'
    }
  ]

  const tiles = [
    {
      title: 'Menu',
      description: 'Fresh juices, smoothies &amp; bowls made daily',
      href: '/menu',
      icon: Leaf,
      color: 'bg-green-50 border-green-200'
    },
    {
      title: 'About &amp; Location',
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
      {/* Hero Section with Image Background */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Image Background */}
        <div className="absolute inset-0 w-full h-full">
          <img
            src="/images/test-juice-image.jpg"
            alt="Fresh juices and acai bowls"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        {/* Overlays */}
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/30" />

        {/* Content */}
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <motion.h1
            className="text-5xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-8 leading-tight"
            style={{ fontFamily: 'Aftetir, sans-serif' }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 1.2, 
              ease: [0.25, 0.46, 0.45, 0.94],
              delay: 0.2
            }}
          >
            SIP HAPPENS<br />
            KEEP IT JUCI
          </motion.h1>

          <motion.p
            className="text-lg sm:text-lg lg:text-xl text-white/90 mb-12 max-w-3xl mx-auto font-light leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ 
              duration: 1.0, 
              ease: [0.25, 0.46, 0.45, 0.94],
              delay: 0.6
            }}
          >
            Fresh pressed juices, smoothie bowls & healthy bites crafted daily with love
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ 
              duration: 1.0, 
              ease: [0.25, 0.46, 0.45, 0.94],
              delay: 1.0
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 0.8, 
                ease: [0.25, 0.46, 0.45, 0.94],
                delay: 1.2
              }}
            >
              <Button 
                size="md" 
                className="bg-white text-black hover:bg-gray-100 rounded-full px-6 py-3 text-base font-bold uppercase tracking-wide min-w-[160px] shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                style={{ fontFamily: 'Aftetir, sans-serif', color: '#000000' }}
                asChild
              >
                <Link href="/menu" style={{ color: '#000000' }}>
                  SEE THE MENU
                </Link>
              </Button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 0.8, 
                ease: [0.25, 0.46, 0.45, 0.94],
                delay: 1.4
              }}
            >
              <Button 
                size="md" 
                className="bg-black text-white hover:bg-gray-800 rounded-full px-6 py-3 text-base font-bold uppercase tracking-wide min-w-[160px] shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                style={{ fontFamily: 'Aftetir, sans-serif' }}
                asChild
              >
                <Link href="/contact">
                  CONTACT US
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Intro Section */}
      <Section className="bg-bg relative overflow-hidden py-20">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-alt-bg/30 rounded-full blur-2xl" />

        <div className="relative max-w-7xl mx-auto px-4">
          {/* Most Popular Products Section */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-cta leading-tight mb-6">
              Most Popular Products
            </h2>
            <motion.p
              className="text-lg lg:text-xl text-gray-700 leading-relaxed max-w-2xl mx-auto mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Discover our customers favorite juices, smoothies & healthy bites
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={24}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                autoplay={{
                  delay: 6000,
                  disableOnInteraction: false,
                }}
                loop={true}
                breakpoints={{
                  768: {
                    slidesPerView: 3,
                    spaceBetween: 24,
                  },
                }}
                className="product-swiper"
              >
                {popularProducts.map((product) => (
                  <SwiperSlide key={product.id}>
                    <div className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 bg-white border border-gray-100 h-full">
                      {/* Image Container with Fixed Aspect Ratio */}
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        
                        {/* Hover overlay with description */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                          <p className="text-white text-center px-4 pb-4 text-sm font-medium leading-relaxed">
                            {product.description}
                          </p>
                        </div>
                      </div>
                      
                      {/* Content section with consistent height */}
                      <div className="p-6 flex flex-col justify-between h-32">
                        <div className="flex-grow flex items-center justify-center">
                          <h4 className="text-lg font-bold text-gray-900 text-center leading-tight">
                            {product.name}
                          </h4>
                        </div>
                        <Button
                          className="w-full bg-gradient-to-r from-gray-900 to-black text-white hover:from-black hover:to-gray-800 rounded-xl py-3 font-semibold uppercase tracking-wider transition-all duration-300 text-xs shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                          style={{ fontFamily: 'Aftetir, sans-serif' }}
                          asChild
                        >
                          <Link href="/menu">
                            SEE IN MENU
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </motion.div>

            {/* See Full Menu Button */}
            <motion.div
              className="flex justify-center mt-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <Button
                size="lg"
                className="bg-alt-bg text-white hover:bg-alt-bg/90 rounded-full px-8 py-4 font-bold uppercase tracking-wider transition-all duration-300 text-base shadow-lg hover:shadow-xl transform hover:scale-105"
                style={{ fontFamily: 'Aftetir, sans-serif' }}
                asChild
              >
                <Link href="/menu" className="flex items-center gap-2">
                  SEE THE FULL MENU
                  <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </Section>

    </>
  )
}