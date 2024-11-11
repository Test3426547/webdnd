import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM_EMAIL = 'Spectrum Web Co <no-reply@spectrumwebco.com.au>';
const ADMIN_EMAIL = 'ove@3three.com.au';

// Contact Form Emails
export async function sendContactFormEmails({
  name,
  email,
  message,
  mobileNumber,
}: {
  name: string;
  email: string;
  message: string;
  mobileNumber?: string;
}) {
  try {
    // Send notification to admin
    await resend.emails.send({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${mobileNumber ? `<p><strong>Mobile:</strong> ${mobileNumber}</p>` : ''}
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    });

    // Send confirmation to user
    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: 'We received your message - Spectrum Web Co',
      html: `
        <h2>Thank you for contacting Spectrum Web Co</h2>
        <p>Hi ${name},</p>
        <p>We've received your message and will get back to you shortly.</p>
        <p>Best regards,<br>Spectrum Web Co Team</p>
      `
    });

    return { success: true };
  } catch (error) {
    console.error('Error sending contact form emails:', error);
    throw error;
  }
}

// Work Inquiry Emails
export async function sendWorkInquiryEmails({
  name,
  email,
  company,
  phone,
  message,
  budget,
}: {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  message: string;
  budget?: string;
}) {
  try {
    // Send notification to admin
    await resend.emails.send({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      subject: `New Work Inquiry from ${company || name}`,
      html: `
        <h2>New Work Inquiry</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Company:</strong> ${company}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Budget Range:</strong> ${budget}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    });

    // Send confirmation to user
    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: 'Work Inquiry Received - Spectrum Web Co',
      html: `
        <h2>Thank you for your work inquiry</h2>
        <p>Hi ${name},</p>
        <p>We've received your work inquiry and are excited about the possibility of working together.</p>
        <p>Our team will review your requirements and get back to you within 1-2 business days.</p>
        <p>Best regards,<br>Spectrum Web Co Team</p>
      `
    });

    return { success: true };
  } catch (error) {
    console.error('Error sending work inquiry emails:', error);
    throw error;
  }
}

// Newsletter Subscription Emails
export async function sendNewsletterEmails({
  email
}: {
  email: string;
}) {
  try {
    // Send notification to admin
    await resend.emails.send({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      subject: 'New Newsletter Subscription',
      html: `
        <h2>New Newsletter Subscription</h2>
        <p><strong>Email:</strong> ${email}</p>
      `
    });

    // Send confirmation to subscriber
    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: 'Welcome to Spectrum Web Co Newsletter',
      html: `
        <h2>Welcome to Our Newsletter!</h2>
        <p>Thank you for subscribing to the Spectrum Web Co newsletter.</p>
        <p>You'll now receive our latest updates, articles, and insights about web development and design.</p>
        <p>Best regards,<br>Spectrum Web Co Team</p>
      `
    });

    return { success: true };
  } catch (error) {
    console.error('Error sending newsletter emails:', error);
    throw error;
  }
}