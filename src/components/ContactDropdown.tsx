import { useState, useEffect, useRef, forwardRef } from "react";
import "./ContactDropdown.css";

interface Props {
  onClose: () => void;
  shakeSignal: number;
  top: number;
  right: number;
}

const ContactDropdown = forwardRef<HTMLDivElement, Props>(function ContactDropdown(
  { onClose, shakeSignal, top, right }, ref
) {
  const [showToast, setShowToast] = useState(false);
  const [toastFading, setToastFading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const toastFadeRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (status !== "sent") return;
    const t = setTimeout(() => onClose(), 2800);
    return () => clearTimeout(t);
  }, [status, onClose]);

  useEffect(() => {
    if (shakeSignal === 0) return;
    const el = dropdownRef.current;
    if (!el) return;

    el.classList.remove("shake");
    void el.offsetWidth;
    el.classList.add("shake");

    setShowToast(true);
    setToastFading(false);
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    if (toastFadeRef.current) clearTimeout(toastFadeRef.current);
    toastTimerRef.current = setTimeout(() => {
      setToastFading(true);
      toastFadeRef.current = setTimeout(() => {
        setShowToast(false);
        setToastFading(false);
      }, 500);
    }, 2000);
  }, [shakeSignal]);

  const validate = (fields: typeof form) => {
    const e: Record<string, string> = {};
    if (!fields.name.trim()) e.name = "Name is required.";
    else if (fields.name.length > 60) e.name = "Max 60 characters.";

    if (!fields.email.trim()) e.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) e.email = "Invalid email address.";
    else if (fields.email.length > 100) e.email = "Max 100 characters.";

    if (fields.phone && !/^[+\d\s\-()]{0,20}$/.test(fields.phone)) e.phone = "Invalid phone number.";

    if (!fields.message.trim()) e.message = "Message is required.";
    else if (fields.message.length > 500) e.message = "Max 500 characters.";

    return e;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const updated = { ...form, [e.target.name]: e.target.value };
    setForm(updated);
    if (errors[e.target.name]) {
      setErrors(prev => ({ ...prev, [e.target.name]: "" }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTouched(t => ({ ...t, [e.target.name]: true }));
    setErrors(validate({ ...form, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const allTouched = { name: true, email: true, phone: true, message: true };
    setTouched(allTouched);
    const errs = validate(form);
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setStatus("sending");
    try {
      const res = await fetch("https://formspree.io/f/maqvarow", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("sent");
        setForm({ name: "", email: "", phone: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="contact-dropdown" ref={(el) => { dropdownRef.current = el; if (typeof ref === 'function') ref(el); else if (ref) ref.current = el; }} style={{ top, right }}>
      {(showToast) && (
        <div className="contact-dropdown-header">
          <div className={`contact-toast${toastFading ? " fading" : ""}`}>
            Use <span>Close</span> to exit
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="contact-form">
          <div className="contact-field">
            <label htmlFor="cf-name">Name</label>
            <input
              id="cf-name" name="name" type="text"
              value={form.name} onChange={handleChange} onBlur={handleBlur}
              placeholder="Your name" maxLength={60}
              className={errors.name && touched.name ? "input-error" : ""}
            />
            {errors.name && touched.name && <span className="field-error">{errors.name}</span>}
          </div>
          <div className="contact-field">
            <label htmlFor="cf-email">Email</label>
            <input
              id="cf-email" name="email" type="email"
              value={form.email} onChange={handleChange} onBlur={handleBlur}
              placeholder="you@example.com" maxLength={100}
              className={errors.email && touched.email ? "input-error" : ""}
            />
            {errors.email && touched.email && <span className="field-error">{errors.email}</span>}
          </div>
          <div className="contact-field">
            <label htmlFor="cf-phone">Phone</label>
            <input
              id="cf-phone" name="phone" type="tel"
              value={form.phone} onChange={handleChange} onBlur={handleBlur}
              placeholder="(+358) 50 000 0000" maxLength={20}
              className={errors.phone && touched.phone ? "input-error" : ""}
            />
            {errors.phone && touched.phone && <span className="field-error">{errors.phone}</span>}
          </div>
          <div className="contact-field">
            <label htmlFor="cf-message">Message</label>
            <textarea
              id="cf-message" name="message"
              value={form.message} onChange={handleChange} onBlur={handleBlur}
              placeholder="What's on your mind?" maxLength={500} rows={4}
              className={errors.message && touched.message ? "input-error" : ""}
            />
            {errors.message && touched.message && <span className="field-error">{errors.message}</span>}
          </div>
          <button type="submit" className="contact-submit" disabled={status === "sending"}>
            {status === "sending" ? "Sending…" : status === "error" ? "Try again" : "Send message"}
            {status !== "sending" && (
              <svg viewBox="0 0 12 12" aria-hidden="true">
                <polyline points="9,3 9,7 2,7" />
                <polyline points="4,5 2,7 4,9" />
              </svg>
            )}
          </button>
          {status === "error" && (
            <p className="contact-error">Something went wrong. Please try again.</p>
          )}
        </form>

      {status === "sent" && (
        <div className="contact-success-overlay">
          <svg className="contact-success-icon" viewBox="0 0 52 52" aria-hidden="true">
            <circle cx="26" cy="26" r="24" />
            <path d="M14 27l8 8 16-16" />
          </svg>
        </div>
      )}

    </div>
  );
});

export default ContactDropdown;
