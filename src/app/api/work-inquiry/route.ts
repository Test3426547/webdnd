import { NextResponse } from 'next/server';
import { sendWorkInquiryEmails } from '@/lib/email';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, company, phone, message, budget } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    await sendWorkInquiryEmails({
      name,
      email,
      company,
      phone,
      message,
      budget,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Work inquiry error:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
} 