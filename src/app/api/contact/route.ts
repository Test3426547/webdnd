export const runtime = 'nodejs'

import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseClient'
import { z } from 'zod'
import fs from 'fs'
import path from 'path'
import juice from 'juice'
import { google } from 'googleapis'
import postcss from 'postcss'
import tailwindcss from 'tailwindcss'

// Define your validation schema
const ContactSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  mobileNumber: z
    .string()
    .regex(
      /^(\+?\d{1,4}?[\s-]?)?((\(\d{1,4}\))|\d{1,4})[\s-]?\d{3,4}[\s-]?\d{3,4}$/,
      'Invalid mobile number'
    )
    .optional(),
  message: z.string().min(1).max(1000),
})

export async function POST(request: Request) {
  try {
    const jsonData = await request.json()
    const data = ContactSchema.parse(jsonData)

    // 1. Insert into database
    const { error: dbError } = await supabase
      .from('contact_submissions')
      .insert([data])

    if (dbError) {
      return NextResponse.json({ error: dbError.message }, { status: 500 })
    }

    // 2. Send emails
    await sendEmails(data)

    // 3. Create calendar events
    try {
      await createCalendarEvents(data)
    } catch (calendarError) {
      console.error('Failed to create calendar events:', calendarError)
      // Don't fail the whole request if calendar events fail
    }

    return NextResponse.json({ message: 'Submission successful' }, { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ errors: error.errors }, { status: 400 })
    }
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 })
  }
}

// Function to send emails using Gmail API
async function sendEmails(data: any) {
  // Decode the base64-encoded service account key
  const serviceAccountKey = JSON.parse(
    Buffer.from(process.env.SERVICE_ACCOUNT_KEY!, 'base64').toString('utf8')
  )

  // Create a JWT client
  const auth = new google.auth.JWT({
    email: serviceAccountKey.client_email,
    key: serviceAccountKey.private_key,
    scopes: ['https://www.googleapis.com/auth/gmail.send'],
    subject: process.env.DELEGATED_ACCOUNT,
  })

  const gmail = google.gmail({ version: 'v1', auth })

  // Render email templates
  const adminHtml = await renderTemplate('admin-notification.html', data)
  const clientHtml = await renderTemplate('client-confirmation.html', data)

  // Send email to admin
  await sendMessage(gmail, {
    to: process.env.ADMIN_EMAIL!,
    subject: 'New Contact Form Submission',
    html: adminHtml,
  })

  // Send email to client
  await sendMessage(gmail, {
    to: data.email,
    subject: 'Thank You for Contacting Spectrum',
    html: clientHtml,
  })
}

// Helper function to send an email using Gmail API
async function sendMessage(
  gmail: any,
  email: { to: string; subject: string; html: string }
) {
  const messageParts = [
    `To: ${email.to}`,
    `Subject: ${email.subject}`,
    'Content-Type: text/html; charset=utf-8',
    '',
    email.html,
  ]
  const message = messageParts.join('\n')

  const encodedMessage = Buffer.from(message)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '')

  await gmail.users.messages.send({
    userId: 'me',
    requestBody: {
      raw: encodedMessage,
    },
  })
}

// Helper function to render and inline email templates
async function renderTemplate(filename: string, data: any) {
  const templatePath = path.join(process.cwd(), 'emails/templates', filename)
  let html = fs.readFileSync(templatePath, 'utf-8')

  // Replace placeholders with actual data
  html = html.replace(/{{\s*(\w+)\s*}}/g, (_, key) => data[key] || '')

  // Process Tailwind CSS directly
  const inputCss = '@tailwind utilities;'
  const result = await postcss([
    tailwindcss('./emails/tailwind-email.config.js'),
  ]).process(inputCss, { from: undefined })

  // Insert the processed CSS into the template
  const styles = result.css
  html = html.replace('{{styles}}', styles)

  // Inline the CSS
  html = juice(html)

  return html
}

// Move the calendar event creation logic from complete/route.ts here
async function createCalendarEvents(data: any) {
  // Calendar event creation logic here...
}
