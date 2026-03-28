import { z } from 'zod'

// Contact form validation
export const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name must be less than 100 characters'),
  email: z.string().email('Please enter a valid email address'),
  topic: z.enum(['business', 'general', 'hiring'], {
    required_error: 'Please select a topic',
  }),
  message: z.string().min(10, 'Message must be at least 10 characters').max(1000, 'Message must be less than 1000 characters'),
  // Honeypot field - should be empty
  website: z.string().max(0, 'Invalid submission').optional()
})

export type ContactFormData = z.infer<typeof contactFormSchema>

// Job application form validation
export const jobApplicationSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name must be less than 100 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number').max(20, 'Phone number is too long'),
  role: z.enum(['barista', 'manager', 'cleaner', 'other'], {
    required_error: 'Please select a role'
  }),
  message: z.string().min(20, 'Please tell us more about yourself (minimum 20 characters)').max(1000, 'Message must be less than 1000 characters'),
  // Honeypot field - should be empty
  website: z.string().max(0, 'Invalid submission').optional()
})

export type JobApplicationData = z.infer<typeof jobApplicationSchema>

// Helper function to sanitize form data
export const sanitizeFormData = (data: Record<string, any>): Record<string, any> => {
  const sanitized: Record<string, any> = {}
  
  for (const [key, value] of Object.entries(data)) {
    if (typeof value === 'string') {
      // Basic sanitization - remove potential HTML/script tags
      sanitized[key] = value.replace(/<[^>]*>/g, '').trim()
    } else {
      sanitized[key] = value
    }
  }
  
  return sanitized
}
