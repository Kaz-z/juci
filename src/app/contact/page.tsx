'use client'

import { useState } from 'react'
import { Phone, Mail, CheckCircle, AlertCircle, MapPin, Clock } from 'lucide-react'
import { site } from '../../../site.config'
import Section from '@/components/Section'
import Button from '@/components/Button'
import { contactFormSchema, sanitizeFormData, type ContactFormData } from '@/lib/validators'
import { formatPhoneForDisplay, formatPhoneForTel } from '@/lib/utils'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    website: '' // honeypot field
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrors({})
    setSubmitStatus('idle')

    try {
      // Validate form data
      const sanitizedData = sanitizeFormData(formData)
      const validatedData = contactFormSchema.parse(sanitizedData)

      // Check honeypot
      if (formData.website) {
        setSubmitStatus('error')
        setIsSubmitting(false)
        return
      }

      // Submit to API
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(validatedData)
      })

      if (response.ok) {
        setSubmitStatus('success')
        // Reset form
        setFormData({
          name: '',
          email: '',
          message: '',
          website: ''
        })
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      if (error instanceof Error && 'issues' in error) {
        // Zod validation errors
        const zodError = error as any
        const newErrors: Record<string, string> = {}
        zodError.issues.forEach((issue: any) => {
          const field = issue.path[0]
          newErrors[field] = issue.message
        })
        setErrors(newErrors)
      } else {
        setSubmitStatus('error')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="pt-24">
      {/* Hero Section */}
      <Section title="Get in Touch">
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-xl text-gray-600 mb-8">
            Have a question, want to partner with us, or just say hello? 
            We'd love to hear from you!
          </p>
        </div>
      </Section>

      <div className="container-max section-padding">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-bold text-fg mb-6">Contact Information</h2>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-cta rounded-xl flex items-center justify-center flex-shrink-0">
                  <Phone className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-fg mb-1">Phone</h3>
                  <a 
                    href={`tel:${formatPhoneForTel(site.phone)}`}
                    className="text-gray-600 hover:text-cta transition-colors"
                    aria-label="Call us"
                  >
                    {formatPhoneForDisplay(site.phone)}
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-cta rounded-xl flex items-center justify-center flex-shrink-0">
                  <Mail className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-fg mb-1">Email</h3>
                  <a 
                    href={`mailto:${site.email}`}
                    className="text-gray-600 hover:text-cta transition-colors"
                    aria-label="Email us"
                  >
                    {site.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-cta rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-fg mb-1">Address</h3>
                  <address className="text-gray-600 not-italic">
                    {site.address}
                  </address>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-cta rounded-xl flex items-center justify-center flex-shrink-0">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-fg mb-1">Hours</h3>
                  <div className="text-gray-600 space-y-1 text-sm">
                    {site.hours.map((hour, index) => (
                      <div key={index}>
                        <span className="font-medium">{hour.day}:</span>{' '}
                        {hour.open === 'Closed' ? 'Closed' : `${hour.open} - ${hour.close}`}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 p-6 bg-cta/10 rounded-xl border border-cta/20">
              <h3 className="font-semibold text-fg mb-3">Quick Contact</h3>
              <div className="space-y-3">
                <Button variant="secondary" size="sm" className="w-full whitespace-nowrap" asChild>
                  <a 
                    href={`tel:${formatPhoneForTel(site.phone)}`}
                    aria-label="Call us now"
                    className="flex items-center justify-center gap-1.5"
                  >
                    <Phone className="h-4 w-4 flex-shrink-0" />
                    <span>Call Now</span>
                  </a>
                </Button>
                <Button variant="secondary" size="sm" className="w-full whitespace-nowrap" asChild>
                  <a 
                    href={`mailto:${site.email}`}
                    aria-label="Email us now"
                    className="flex items-center justify-center gap-1.5"
                  >
                    <Mail className="h-4 w-4 flex-shrink-0" />
                    <span>Send Email</span>
                  </a>
                </Button>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-fg mb-6">Send us a Message</h2>

            {submitStatus === 'success' && (
              <div className="mb-8 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center">
                <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                <p className="text-green-800">
                  Thank you for your message! We'll get back to you within 24 hours.
                </p>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center">
                <AlertCircle className="h-5 w-5 text-red-600 mr-3" />
                <p className="text-red-800">
                  There was an error sending your message. Please try again or call us directly.
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Honeypot field - hidden from users */}
              <input
                type="text"
                name="website"
                value={formData.website}
                onChange={handleInputChange}
                style={{ display: 'none' }}
                tabIndex={-1}
                autoComplete="off"
              />

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-fg mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-3 rounded-xl border ${
                      errors.name ? 'border-red-300' : 'border-gray-300'
                    } focus:border-cta focus:ring-1 focus:ring-cta outline-none transition-colors`}
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-fg mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-3 rounded-xl border ${
                      errors.email ? 'border-red-300' : 'border-gray-300'
                    } focus:border-cta focus:ring-1 focus:ring-cta outline-none transition-colors`}
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-fg mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  placeholder="Tell us about your business enquiry, partnership opportunity, or any questions you have..."
                  className={`w-full px-4 py-3 rounded-xl border ${
                    errors.message ? 'border-red-300' : 'border-gray-300'
                  } focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors resize-vertical`}
                />
                {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full"
                size="lg"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
