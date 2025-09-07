import { NextRequest, NextResponse } from 'next/server'
import { jobApplicationSchema, validateFile, sanitizeFormData } from '@/lib/validators'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    
    // Extract form fields
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const phone = formData.get('phone') as string
    const role = formData.get('role') as string
    const message = formData.get('message') as string
    const website = formData.get('website') as string
    const cvFile = formData.get('cv') as File | null
    
    // Prepare data for validation
    const bodyData = {
      name,
      email,
      phone,
      role,
      message,
      website: website || ''
    }
    
    // Sanitize and validate the form data
    const sanitizedData = sanitizeFormData(bodyData)
    const validatedData = jobApplicationSchema.parse(sanitizedData)
    
    // Check honeypot field
    if (validatedData.website && validatedData.website.length > 0) {
      return NextResponse.json(
        { error: 'Invalid submission' },
        { status: 400 }
      )
    }
    
    // Validate CV file
    const fileErrors = validateFile(cvFile)
    if (fileErrors.length > 0) {
      return NextResponse.json(
        { 
          error: 'File validation failed',
          details: fileErrors
        },
        { status: 400 }
      )
    }
    
    // In a real application, you would:
    // 1. Save to database
    // 2. Upload CV to secure storage (S3, etc.)
    // 3. Send email notification to HR
    // 4. Send confirmation email to applicant
    // 5. Log the submission
    
    // Mock implementation - just log the data
    console.log('Job application submission:', {
      name: validatedData.name,
      email: validatedData.email,
      phone: validatedData.phone,
      role: validatedData.role,
      message: validatedData.message.substring(0, 100) + '...',
      cvFileName: cvFile?.name,
      cvFileSize: cvFile?.size,
      cvFileType: cvFile?.type,
      timestamp: new Date().toISOString(),
      ip: request.ip || 'unknown'
    })
    
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    return NextResponse.json(
      { 
        success: true, 
        message: 'Thank you for your application! We\'ll review it and get back to you soon.' 
      },
      { status: 200 }
    )
    
  } catch (error) {
    console.error('Job application error:', error)
    
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
