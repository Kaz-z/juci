import { NextRequest, NextResponse } from 'next/server'
import { contactFormSchema, sanitizeFormData } from '@/lib/validators'
import { site } from '../../../../site.config'

async function notifyInbox(data: {
  name: string
  email: string
  topic: string
  message: string
}) {
  const to = site.email
  const key = process.env.RESEND_API_KEY

  if (!key) {
    console.log(`Contact form submission (set RESEND_API_KEY to email ${to}):`, {
      ...data,
      timestamp: new Date().toISOString(),
    })
    return
  }

  const from =
    process.env.RESEND_FROM_EMAIL ?? 'JUCI Website <onboarding@resend.dev>'

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: data.email,
      subject: `[${data.topic}] Contact from ${data.name}`,
      text: `Topic: ${data.topic}\nFrom: ${data.name} <${data.email}>\n\n${data.message}`,
    }),
  })

  if (!res.ok) {
    const body = await res.text()
    throw new Error(`Resend failed: ${body}`)
  }
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

    await notifyInbox({
      name: validatedData.name,
      email: validatedData.email,
      topic: validatedData.topic,
      message: validatedData.message,
    })

    await new Promise(resolve => setTimeout(resolve, 500))

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

    if (error instanceof Error && 'issues' in error) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: (error as any).issues.map((issue: any) => ({
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
