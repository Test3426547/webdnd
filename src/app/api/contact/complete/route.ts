import { NextResponse } from 'next/server'
import { google } from 'googleapis'
import { z } from 'zod'

// Form validation schema
const contactFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  mobileNumber: z.string().optional(),
  message: z.string().min(1, 'Message is required'),
})

export async function POST(request: Request) {
  try {
    // Parse and validate the request body
    const body = await request.json()
    const validatedData = contactFormSchema.parse(body)

    // You might want to add your email sending logic here
    // Example using your preferred email service
    // await sendEmail({
    //   to: 'your-email@example.com',
    //   subject: 'New Contact Form Submission',
    //   body: `
    //     Name: ${validatedData.name}
    //     Email: ${validatedData.email}
    //     Mobile: ${validatedData.mobileNumber || 'Not provided'}
    //     Message: ${validatedData.message}
    //   `
    // })

    // Initialize Google Calendar API client
    const auth = new google.auth.JWT(
      process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      undefined,
      // Replace escaped newlines in private key
      (process.env.GOOGLE_PRIVATE_KEY || '').replace(/\\n/gm, '\n'),
      ['https://www.googleapis.com/auth/calendar']
    )
    const calendar = google.calendar({ version: 'v3', auth })

    // Event details for the first reminder (2 hours after submission)
    const firstEvent = {
      summary: 'Check inbox for recent submission',
      description: `
        Please check your inbox for details of a recent submission made to https://spectrumwebco.com.au.
        
        Submission Details:
        Name: ${validatedData.name}
        Email: ${validatedData.email}
        Mobile: ${validatedData.mobileNumber || 'Not provided'}
        Message: ${validatedData.message}
        
        Outbound contact should be initiated within the first 8 hours to increase the likelihood of conversion.
      `,
      start: {
        dateTime: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(), // 2 hours from now
      },
      end: {
        dateTime: new Date(Date.now() + 2 * 60 * 60 * 1000 + 15 * 60 * 1000).toISOString(), // +15 minutes duration
      },
    }

    // Insert the first reminder event into Google Calendar
    await calendar.events.insert({
      calendarId: 'primary', // Replace with your calendar ID if different
      requestBody: firstEvent,
    })

    // Schedule second reminder for 6 hours later
    const secondEvent = {
      ...firstEvent,
      start: {
        dateTime: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString(), // 6 hours from now
      },
      end: {
        dateTime: new Date(Date.now() + 6 * 60 * 60 * 1000 + 15 * 60 * 1000).toISOString(),
      },
    }

    await calendar.events.insert({
      calendarId: 'primary',
      requestBody: secondEvent,
    })

    return NextResponse.json({ 
      success: true,
      message: 'Form submitted successfully'
    })

  } catch (error) {
    console.error('Error processing form submission:', error)
    return NextResponse.json(
      { 
        success: false,
        message: 'Failed to process form submission'
      },
      { status: 500 }
    )
  }
}
