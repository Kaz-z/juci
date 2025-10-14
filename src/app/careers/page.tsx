'use client'

import { useState } from 'react'
import { Upload, CheckCircle, AlertCircle } from 'lucide-react'
import { site } from '../../../site.config'
import Section from '@/components/Section'
import Button from '@/components/Button'
import { jobApplicationSchema, validateFile, sanitizeFormData, type JobApplicationData } from '@/lib/validators'

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
  const [cvFile, setCvFile] = useState<File | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [fileErrors, setFileErrors] = useState<string[]>([])
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setCvFile(file)
    
    if (file) {
      const fileValidationErrors = validateFile(file)
      setFileErrors(fileValidationErrors)
    } else {
      setFileErrors([])
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
      const validatedData = jobApplicationSchema.parse(sanitizedData)
      
      // Validate file
      const fileValidationErrors = validateFile(cvFile)
      if (fileValidationErrors.length > 0) {
        setFileErrors(fileValidationErrors)
        setIsSubmitting(false)
        return
      }

      // Check honeypot
      if (formData.website) {
        setSubmitStatus('error')
        setIsSubmitting(false)
        return
      }

      // Prepare form data for submission
      const submitData = new FormData()
      Object.entries(validatedData).forEach(([key, value]) => {
        if (key !== 'website') {
          submitData.append(key, value.toString())
        }
      })
      
      if (cvFile) {
        submitData.append('cv', cvFile)
      }

      // Submit to API
      const response = await fetch('/api/apply', {
        method: 'POST',
        body: submitData
      })

      if (response.ok) {
        setSubmitStatus('success')
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          role: '',
          message: '',
          website: ''
        })
        setCvFile(null)
        setFileErrors([])
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
    <div>
      {/* Hero Section */}
      <Section title="Join Our Team">
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-xl text-gray-600 mb-8">
            Love healthy living? Want to be part of Birmingham&lsquo;s freshest juice bar? 
            We&lsquo;re always looking for passionate people to join the Juci family.
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
                Thank you for your application! We&lsquo;ll review it and get back to you soon.
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
              <label htmlFor="cv" className="block text-sm font-medium text-fg mb-2">
                CV/Resume *
              </label>
              <div className="relative">
                <input
                  type="file"
                  id="cv"
                  name="cv"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx"
                  required
                  className="sr-only"
                />
                <label
                  htmlFor="cv"
                  className={`flex items-center justify-center w-full px-4 py-8 rounded-xl border-2 border-dashed cursor-pointer transition-colors ${
                    fileErrors.length > 0 
                      ? 'border-red-300 bg-red-50' 
                      : cvFile 
                        ? 'border-green-300 bg-green-50' 
                        : 'border-gray-300 hover:border-cta hover:bg-cta/5'
                  }`}
                >
                  <div className="text-center">
                    <Upload className={`h-8 w-8 mx-auto mb-2 ${
                      fileErrors.length > 0 ? 'text-red-500' : cvFile ? 'text-green-500' : 'text-gray-400'
                    }`} />
                    <p className="text-sm font-medium text-fg">
                      {cvFile ? cvFile.name : 'Upload your CV'}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      PDF, DOC, or DOCX (max 5MB)
                    </p>
                  </div>
                </label>
              </div>
              {fileErrors.map((error, index) => (
                <p key={index} className="mt-1 text-sm text-red-600">{error}</p>
              ))}
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
                placeholder="Why do you want to work at Juci? What experience do you have? What makes you passionate about healthy living?"
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
