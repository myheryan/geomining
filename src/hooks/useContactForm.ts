import { useState, useRef } from 'react';
import ReCAPTCHA from "react-google-recaptcha";

export const useContactForm = () => {
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [formData, setFormData] = useState({ name: '', email: '', service: '', message: '' });
  const [captchaValue, setCaptchaValue] = useState<string | null>(null);
  const [loader, setLoader] = useState(false);
  const [showThanks, setShowThanks] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!captchaValue || !formData.service) return;
    setLoader(true);

    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setShowThanks(true);
        setFormData({ name: '', email: '', service: '', message: '' });
        recaptchaRef.current?.reset();
        setCaptchaValue(null);
      } else {
        const result = await response.json();
        throw new Error(result.error || "Gagal mengirim.");
      }
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoader(false);
    }
  };

  return { formData, setFormData, captchaValue, setCaptchaValue, loader, showThanks, setShowThanks, handleSubmit, recaptchaRef };
};