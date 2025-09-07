'use client'

import { motion } from 'framer-motion'

interface InstagramWidgetProps {
  username?: string
  limit?: number
}

export default function InstagramWidget({ username = 'juci.co', limit = 8 }: InstagramWidgetProps) {
  return (
    <div className="max-w-4xl mx-auto">
      <motion.div 
        className="text-center mb-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h3 className="text-2xl lg:text-3xl font-bold text-fg mb-4">
          Follow us @{username}
        </h3>
        <p className="text-gray-600">
          See what our community is loving right now
        </p>
      </motion.div>

      {/* Method 1: LightWidget (Free) */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <iframe
          src={`https://cdn.lightwidget.com/widgets/lightwidget.html?hash=6a7b8c9d0e1f2g3h`}
          scrolling="no"
          allowTransparency={true}
          className="lightwidget-widget w-full h-96 border-0 rounded-2xl shadow-lg"
          style={{ 
            width: '100%', 
            border: 0, 
            overflow: 'hidden',
            background: 'transparent'
          }}
        />
        <p className="text-xs text-gray-500 mt-2 text-center">
          Powered by LightWidget - Replace hash with your widget ID
        </p>
      </motion.div>

      {/* Method 2: SnapWidget Alternative */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <div className="bg-gray-100 rounded-2xl p-8 text-center">
          <h4 className="text-lg font-semibold mb-4">Alternative: SnapWidget</h4>
          <p className="text-gray-600 mb-4">
            Visit <a href="https://snapwidget.com" target="_blank" className="text-cta underline">snapwidget.com</a> to generate your free widget
          </p>
          <div className="bg-white rounded-lg p-4 text-sm text-gray-500">
            Replace this div with your SnapWidget embed code
          </div>
        </div>
      </motion.div>

      {/* Method 3: Manual Embed Posts */}
      <motion.div
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        {/* You can manually embed specific Instagram posts */}
        <div className="aspect-square rounded-2xl overflow-hidden shadow-lg">
          <blockquote 
            className="instagram-media w-full h-full" 
            data-instgrm-permalink="https://www.instagram.com/p/EXAMPLE_POST_ID/?utm_source=ig_embed&amp;utm_campaign=loading"
            data-instgrm-version="14"
          >
            <div className="bg-gradient-to-br from-pink-100 to-accent/20 w-full h-full flex items-center justify-center">
              <p className="text-gray-600 text-center p-4">
                Replace with Instagram embed code
              </p>
            </div>
          </blockquote>
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
          href={`https://instagram.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:from-pink-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
          <span>Follow @{username}</span>
        </a>
      </motion.div>
    </div>
  )
}
