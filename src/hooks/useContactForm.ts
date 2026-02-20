import { useState, useRef, FormEvent } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

interface FormData {
  name: string;
  email: string;
  message: string;
  service: string;
}

export const useContactForm = () => {
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', message: '', service: '' });
  const [loader, setLoader] = useState(false);
  const [showThanks, setShowThanks] = useState(false);
  const [captchaValue, setCaptchaValue] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!captchaValue) return;

    setLoader(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, captchaValue }),
      });

      if (res.ok) {
        setShowThanks(true);
        setFormData({ name: '', email: '', message: '', service: '' });
        recaptchaRef.current?.reset();
      } else {
        const errorData = await res.json();
        alert(errorData.error || 'Terjadi kesalahan');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoader(false);
    }
  };

  return { formData, setFormData, loader, handleSubmit, captchaValue, setCaptchaValue, recaptchaRef, showThanks, setShowThanks };
};