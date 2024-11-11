import 'dotenv/config';
import { Resend } from 'resend';

// Verify API key is loaded
if (!process.env.RESEND_API_KEY) {
  console.error('RESEND_API_KEY is not set in environment variables');
  process.exit(1);
}

const resend = new Resend(process.env.RESEND_API_KEY);

async function testEmail() {
  try {
    console.log('Attempting to send test email...');
    const data = await resend.emails.send({
      from: 'Spectrum Web Co <no-reply@spectrumwebco.com.au>',
      to: 'oveshen.govender@gmail.com',
      subject: 'Test Email',
      html: '<h1>Test Email</h1><p>This is a test email from Resend.</p>'
    });

    console.log('Test email sent successfully:', data);
  } catch (error) {
    console.error('Failed to send test email:', error);
  }
}

testEmail(); 