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
    console.log("Tombol diklik, memulai proses..."); // Debug log

    if (loader) return;

    if (!captchaValue || !formData.service) {
      alert("Silakan isi semua field dan centang Captcha");
      return;
    }

    setLoader(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, captchaValue }),
      });

      const result = await response.json();

      if (response.ok) {
        console.log("Berhasil terkirim:", result);
        setShowThanks(true); // Ini yang akan memicu tampilan "Terima Kasih"
        // Reset Form
        setFormData({ name: '', email: '', service: '', message: '' });
        setCaptchaValue(null);
        recaptchaRef.current?.reset();
      } else {
        console.error("Error dari API:", result.error);
        alert(result.error || "Gagal mengirim pesan.");
      }
    } catch (error) {
      console.error("Koneksi Error:", error);
      alert("Terjadi kesalahan koneksi ke server.");
    } finally {
      setLoader(false); // Pastikan loader mati baik sukses maupun gagal
    }
  };

  return { 
    formData, setFormData, 
    captchaValue, setCaptchaValue, 
    loader, 
    showThanks, setShowThanks, 
    handleSubmit, 
    recaptchaRef 
  };
};