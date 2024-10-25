import { NextResponse } from 'next/server'
import { google } from 'googleapis'

export async function POST(request: Request) {
  // ... existing form handling logic ...

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
    description:
      'Please check your inbox for details of a recent submission made to https://spectrumwebco.com.au.\nOutbound contact should be initiated within the first 8 hours to increase the likelihood of conversion.',
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

  // Logic to conditionally schedule the second reminder
  // For demonstration, we schedule it unconditionally
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

  // ... existing code ...

  return NextResponse.json({ success: true })
}
