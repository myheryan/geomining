import type { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface ContactBody {
  name: string;
  email: string;
  message: string;
  service: string;
  captchaValue: string; // Pastikan ini sesuai dengan yang dikirim frontend
}

// ... (import dan interface tetap sama)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, message, service, captchaValue } = req.body as ContactBody;

    if (!name || !email || !message || !service || !captchaValue) {
      return res.status(400).json({ error: 'Semua field harus diisi, termasuk Captcha.' });
    }

    // PERBAIKAN DI SINI: Gunakan RECAPTCHA_SECRET_KEY, bukan SITE_KEY
    const secretKey = process.env.RECAPTCHA_SECRET_KEY; 
    
    if (!secretKey) {
      console.error('Missing RECAPTCHA_SECRET_KEY in environment variables');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    const googleResponse = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        secret: secretKey, // Sekarang menggunakan kunci yang benar
        response: captchaValue,
      }).toString(),
    });

    const captchaResult = await googleResponse.json();

    if (!captchaResult.success) {
      console.error('reCAPTCHA Error Codes:', captchaResult['error-codes']);
      return res.status(400).json({ error: 'Verifikasi Captcha gagal. Silakan coba lagi.' });
    }

// ... (Bagian import dan validasi captcha tetap sama)

// 3. Kirim Email via Resend dengan Template HTML
const { data, error } = await resend.emails.send({
  from: 'Geomining Contact <onboarding@resend.dev>',
  to: process.env.CONTACT_EMAIL || 'heryanxd@gmail.com',
  replyTo: email,
  subject: `[${service.toUpperCase()}] Pesan Baru: ${name}`,
  // Ganti 'text' menjadi 'html'
  html: `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; background-color: #ffffff;">
      <div style="background: linear-gradient(to right, #2563eb, #06b6d4); padding: 30px; text-align: center;">
        <h1 style="color: #ffffff; margin: 0; font-size: 24px; letter-spacing: -0.5px;">Pesan Baru Diterima</h1>
        <p style="color: rgba(255,255,255,0.8); margin: 5px 0 0 0; font-size: 14px;">Melalui Website Anda</p>
      </div>
      
      <div style="padding: 30px; color: #1e293b; line-height: 1.6;">
        <div style="margin-bottom: 25px;">
          <label style="display: block; font-size: 11px; font-weight: bold; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 5px;">Informasi Pengirim</label>
          <p style="margin: 0; font-size: 16px;"><strong>Nama:</strong> ${name}</p>
          <p style="margin: 0; font-size: 16px;"><strong>Email:</strong> ${email}</p>
        </div>

        <div style="margin-bottom: 25px;">
          <label style="display: block; font-size: 11px; font-weight: bold; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 5px;">Kategori Layanan</label>
          <span style="background-color: #eff6ff; color: #2563eb; padding: 6px 14px; rounded: 20px; border-radius: 50px; font-size: 13px; font-weight: bold; border: 1px solid #dbeafe;">
            ${service}
          </span>
        </div>

        <div style="margin-bottom: 25px; padding: 20px; background-color: #f8fafc; border-radius: 12px; border-left: 4px solid #2563eb;">
          <label style="display: block; font-size: 11px; font-weight: bold; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 10px;">Isi Pesan</label>
          <p style="margin: 0; font-size: 15px; color: #334155; white-space: pre-line;">${message}</p>
        </div>
        
        <a href="mailto:${email}" style="display: inline-block; background-color: #2563eb; color: #ffffff; padding: 12px 25px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 14px; margin-top: 10px;">
          Balas Email Sekarang
        </a>
      </div>

      <div style="background-color: #f1f5f9; padding: 20px; text-align: center; color: #64748b; font-size: 12px;">
        <p style="margin: 0;">Email ini dikirim secara otomatis dari sistem Portfolio Anda.</p>
        <p style="margin: 5px 0 0 0;">&copy; ${new Date().getFullYear()} Geomining. All rights reserved.</p>
      </div>
    </div>
  `,
});

    if (error) return res.status(400).json({ error: error.message });
    return res.status(200).json({ success: true, id: data?.id });

  } catch {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}