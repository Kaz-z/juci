'use client'

import { useState } from 'react'
import { CheckCircle, AlertCircle } from 'lucide-react'
import { site } from '../../../site.config'
import Section from '@/components/Section'
import Button from '@/components/Button'
import { jobApplicationSchema, sanitizeFormData } from '@/lib/validators'
import { buildMailtoHref } from '@/lib/mailto'

const roles = [
  { value: 'barista', label: 'Juice Barista' },
  { value: 'manager', label: 'Shift Manager' },
  { value: 'cleaner', label: 'Cleaner' },
  { value: 'other', label: 'Other' }
]

export default function CareersPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    message: '',
    website: '' // honeypot field
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrors({})
    setSubmitStatus('idle')

    try {
      // Validate form data
      const sanitizedData = sanitizeFormData(formData)
      const validatedData = jobApplicationSchema.parse(sanitizedData)

      // Check honeypot
      if (formData.website) {
        setSubmitStatus('error')
        setIsSubmitting(false)
        return
      }

      const roleLabel =
        roles.find((r) => r.value === validatedData.role)?.label ??
        validatedData.role
      const subject = `Job application: ${roleLabel} — ${validatedData.name}`
      const body = [
        'IMPORTANT — Before you send this email:',
        'Please ATTACH your CV or resume (PDF or Word). We cannot review your application without it.',
        '',
        '—',
        '',
        'Job application',
        '',
        `Name:     ${validatedData.name}`,
        `Email:    ${validatedData.email}`,
        `Phone:    ${validatedData.phone}`,
        `Position: ${roleLabel}`,
        '',
        'Message:',
        '',
        validatedData.message,
        '',
      
      ].join('\n')

      window.location.href = buildMailtoHref(site.email, subject, body)

      setSubmitStatus('success')
      setFormData({
        name: '',
        email: '',
        phone: '',
        role: '',
        message: '',
        website: '',
      })
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
    <div>
      {/* Hero Section */}
      <Section title="Join Our Team">
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-xl text-gray-600 mb-8">
            Love healthy living? Want to be part of Birmingham&lsquo;s freshest juice bar? 
            We&lsquo;re always looking for passionate people to join the JUCI family.
          </p>
        </div>
      </Section>

      {/* Application Form */}
      <Section title="Apply Now" className="font-normal">
        <div className="max-w-2xl mx-auto">
          {submitStatus === 'success' && (
            <div className="mb-8 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center">
              <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
              <p className="text-green-800">
                Your email app should open with your application ready. Please attach your
                CV or resume before you send. If nothing opened, email {site.email} with
                your details and CV attached.
              </p>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center">
              <AlertCircle className="h-5 w-5 text-red-600 mr-3" />
              <p className="text-red-800">
                There was an error submitting your application. Please try again.
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

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-fg mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className={`w-full px-4 py-3 rounded-xl border ${
                    errors.phone ? 'border-red-300' : 'border-gray-300'
                  } focus:border-cta focus:ring-1 focus:ring-cta outline-none transition-colors`}
                />
                {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
              </div>

              <div>
                <label htmlFor="role" className="block text-sm font-medium text-fg mb-2">
                  Position of Interest *
                </label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  required
                  className={`w-full px-4 py-3 rounded-xl border ${
                    errors.role ? 'border-red-300' : 'border-gray-300'
                  } focus:border-cta focus:ring-1 focus:ring-cta outline-none transition-colors`}
                >
                  <option value="">Select a role</option>
                  {roles.map((role) => (
                    <option key={role.value} value={role.value}>
                      {role.label}
                    </option>
                  ))}
                </select>
                {errors.role && <p className="mt-1 text-sm text-red-600">{errors.role}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-fg mb-2">
                Tell us about yourself *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={6}
                placeholder="Why do you want to work at JUCI? What experience do you have? What makes you passionate about healthy living?"
                className={`w-full px-4 py-3 rounded-xl border ${
                  errors.message ? 'border-red-300' : 'border-gray-300'
                } focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors resize-vertical`}
              />
              {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full font-normal"
              size="lg"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Application'}
            </Button>
          </form>
        </div>
      </Section>
    </div>
  )
}
