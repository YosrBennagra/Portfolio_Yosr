import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resendClient = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const CONTACT_EMAIL = process.env.CONTACT_EMAIL || 'yosrbennagra@gmail.com';
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';

async function sendWithResend({
  name,
  email,
  sanitizedMessage
}: {
  name: string;
  email: string;
  sanitizedMessage: string;
}) {
  if (!resendClient) {
    throw new Error('Resend client not configured');
  }

  await resendClient.emails.send({
    from: FROM_EMAIL,
    to: [CONTACT_EMAIL],
    replyTo: email,
    subject: `Portfolio contact from ${name}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p>${sanitizedMessage.replace(/\n/g, '<br />')}</p>
    `
  });
}

async function sendWithFormSubmit({
  name,
  email,
  sanitizedMessage
}: {
  name: string;
  email: string;
  sanitizedMessage: string;
}) {
  const endpoint = `https://formsubmit.co/ajax/${encodeURIComponent(CONTACT_EMAIL)}`;
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      name,
      email,
      message: sanitizedMessage,
      _subject: `Portfolio contact from ${name}`,
      _template: 'table',
      _captcha: 'false'
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`FormSubmit error: ${errorText}`);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const sanitizedMessage = String(message)
      .trim()
      .replace(/\n{3,}/g, '\n\n');

    let delivered = false;

    if (resendClient) {
      try {
        await sendWithResend({ name, email, sanitizedMessage });
        delivered = true;
      } catch (resendError) {
        console.error('Resend delivery failed, attempting FormSubmit fallback', resendError);
      }
    }

    if (!delivered) {
      try {
        await sendWithFormSubmit({ name, email, sanitizedMessage });
        delivered = true;
      } catch (fallbackError) {
        console.error('FormSubmit delivery failed', fallbackError);
        throw fallbackError;
      }
    }

    return NextResponse.json({ success: true, message: 'Email sent successfully' }, { status: 200 });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json({ error: 'Failed to send email via available providers' }, { status: 502 });
  }
}
