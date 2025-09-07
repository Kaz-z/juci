import { NextRequest, NextResponse } from 'next/server'
import { contactFormSchema, sanitizeFormData } from '@/lib/validators'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Sanitize and validate the form data
    const sanitizedData = sanitizeFormData(body)
    const validatedData = contactFormSchema.parse(sanitizedData)
    
    // Check honeypot field
    if (validatedData.website && validatedData.website.length > 0) {
      return NextResponse.json(
        { error: 'Invalid submission' },
        { status: 400 }
      )
    }
    
    // In a real application, you would:
    // 1. Save to database
    // 2. Send email notification
    // 3. Log the submission
    
    // Mock implementation - just log the data
    console.log('Contact form submission:', {
      name: validatedData.name,
      email: validatedData.email,
      message: validatedData.message,
      timestamp: new Date().toISOString(),
      ip: request.ip || 'unknown'
    })
    
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 500))
    
    return NextResponse.json(
      { 
        success: true, 
        message: 'Thank you for your message! We\'ll get back to you within 24 hours.' 
      },
      { status: 200 }
    )
    
  } catch (error) {
    console.error('Contact form error:', error)
    
    if (error instanceof Error && 'issues' in error) {
      // Zod validation error
      return NextResponse.json(
        { 
          error: 'Validation failed',
          details: (error as any).issues.map((issue: any) => ({
            field: issue.path[0],
            message: issue.message
          }))
        },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Handle OPTIONS for CORS
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}
