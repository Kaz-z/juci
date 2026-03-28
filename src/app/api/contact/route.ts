import { NextRequest, NextResponse } from 'next/server'
import { ZodError } from 'zod'
import { contactFormSchema, sanitizeFormData } from '@/lib/validators'
import { site } from '../../../../site.config'

export const dynamic = 'force-dynamic'

function logContactSubmission(data: {
  name: string
  email: string
  topic: string
  message: string
}) {
  const to = site.email
  console.log(`Contact form (send to ${to}):`, {
    ...data,
    timestamp: new Date().toISOString(),
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const sanitizedData = sanitizeFormData(body)
    const validatedData = contactFormSchema.parse(sanitizedData)

    if (validatedData.website && validatedData.website.length > 0) {
      return NextResponse.json(
        { error: 'Invalid submission' },
        { status: 400 }
      )
    }

    logContactSubmission({
      name: validatedData.name,
      email: validatedData.email,
      topic: validatedData.topic,
      message: validatedData.message,
    })

    await new Promise((resolve) => setTimeout(resolve, 500))

    return NextResponse.json(
      {
        success: true,
        message:
          "Thank you for your message! We'll get back to you within 24 hours.",
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Contact form error:', error)

    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: error.issues.map((issue) => ({
            field: issue.path[0],
            message: issue.message,
          })),
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

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}
