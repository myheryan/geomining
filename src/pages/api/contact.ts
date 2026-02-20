import type { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface ContactBody {
  name: string;
  email: string;
  message: string;
  service: string;
  captchaValue: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { name, email, message, service, captchaValue } = req.body as ContactBody;

    // 1. Verifikasi Captcha (Format x-www-form-urlencoded)
    const googleResponse = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        secret: process.env.RECAPTCHA_SECRET_KEY || '',
        response: captchaValue,
      }).toString(),
    });

    const captchaResult = (await googleResponse.json()) as { success: boolean };

    if (!captchaResult.success) {
      return res.status(400).json({ error: 'Captcha verification failed' });
    }

    // 2. Kirim Email via Resend
    await resend.emails.send({
      from: 'Contact System <onboarding@resend.dev>',
      to: process.env.CONTACT_EMAIL || 'admin@heryan.info',
      replyTo: email,
      subject: `[${service.toUpperCase()}] New Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    // Komentar eslint-disable telah dihapus
    console.error('API Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}