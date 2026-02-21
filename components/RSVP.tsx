"use client";

import { useState } from "react";

interface FormData {
  name: string;
  email: string;
  attending: "yes" | "no" | "";
  guests: string;
  dietary: string;
  message: string;
}

const INITIAL_FORM: FormData = {
  name: "",
  email: "",
  attending: "",
  guests: "1",
  dietary: "",
  message: "",
};

type Status = "idle" | "loading" | "success" | "error";

export default function RSVP() {
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong. Please try again.");
      }

      setStatus("success");
      setForm(INITIAL_FORM);
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Please try again.");
    }
  }

  const inputClass =
    "w-full bg-white/70 border border-gold/20 rounded-sm px-4 py-3 font-sans text-sm text-charcoal placeholder:text-charcoal/40 focus:border-gold focus:ring-2 focus:ring-gold/20 transition-colors outline-none";

  const labelClass = "block font-serif text-sm text-charcoal/70 mb-2 tracking-wide";

  if (status === "success") {
    return (
      <section id="rsvp" className="py-24 px-6 bg-gradient-to-b from-blush/10 to-ivory">
        <div className="max-w-xl mx-auto text-center">
          <div className="section-subtitle mb-3">Your Response</div>
          <h2 className="section-title mb-8">Thank You</h2>
          <div className="bg-white/80 border border-gold/20 rounded-sm p-10 shadow-sm">
            <div className="text-4xl mb-4">💌</div>
            <p className="font-script text-4xl text-gold mb-4">With Joy!</p>
            <p className="font-serif text-charcoal/70 leading-relaxed">
              Your RSVP has been received. We are so excited to celebrate with
              you! We will be in touch soon with more details.
            </p>
            <div className="ornament-divider my-6 max-w-xs mx-auto">
              <span className="text-gold text-sm">✦</span>
            </div>
            <p className="font-sans text-sm text-charcoal/50">
              — Karminder &amp; Simranjit
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="rsvp" className="py-24 px-6 bg-gradient-to-b from-blush/10 to-ivory">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-16">
          <p className="section-subtitle mb-3">Join Us</p>
          <h2 className="section-title mb-2">RSVP</h2>
          <div className="ornament-divider my-8 max-w-xs mx-auto">
            <span className="text-gold text-sm">✦</span>
          </div>
          <p className="font-serif text-charcoal/60">
            Kindly respond by{" "}
            <span className="text-gold font-medium">28th March 2026</span>
          </p>
        </div>

        <div className="bg-white/70 backdrop-blur-sm border border-gold/15 rounded-sm p-8 md:p-12 shadow-sm">
          {/* Corner decorations */}
          <div className="absolute -top-px -left-px w-6 h-6 border-t-2 border-l-2 border-gold/40 rounded-tl-sm" />
          <div className="absolute -top-px -right-px w-6 h-6 border-t-2 border-r-2 border-gold/40 rounded-tr-sm" />
          <div className="absolute -bottom-px -left-px w-6 h-6 border-b-2 border-l-2 border-gold/40 rounded-bl-sm" />
          <div className="absolute -bottom-px -right-px w-6 h-6 border-b-2 border-r-2 border-gold/40 rounded-br-sm" />

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label htmlFor="name" className={labelClass}>
                Full Name <span className="text-blush-dark">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={form.name}
                onChange={handleChange}
                placeholder="Your full name"
                className={inputClass}
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className={labelClass}>
                Email Address <span className="text-blush-dark">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="your@email.com"
                className={inputClass}
              />
            </div>

            {/* Attending */}
            <div>
              <p className={labelClass}>
                Will you be attending? <span className="text-blush-dark">*</span>
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: "yes", label: "Joyfully Accepts", icon: "✓" },
                  { value: "no", label: "Regretfully Declines", icon: "✕" },
                ].map((opt) => (
                  <label
                    key={opt.value}
                    className={`flex items-center gap-3 cursor-pointer border rounded-sm px-4 py-3 transition-all ${
                      form.attending === opt.value
                        ? "border-gold bg-gold/5 text-charcoal"
                        : "border-gold/20 bg-white/50 text-charcoal/60 hover:border-gold/40"
                    }`}
                  >
                    <input
                      type="radio"
                      name="attending"
                      value={opt.value}
                      required
                      checked={form.attending === opt.value}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <span
                      className={`font-serif text-sm ${
                        form.attending === opt.value ? "text-gold" : "text-charcoal/40"
                      }`}
                    >
                      {opt.icon}
                    </span>
                    <span className="font-serif text-sm">{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Guests — only show if attending */}
            {form.attending === "yes" && (
              <div>
                <label htmlFor="guests" className={labelClass}>
                  Number of Guests (including yourself)
                </label>
                <select
                  id="guests"
                  name="guests"
                  value={form.guests}
                  onChange={handleChange}
                  className={inputClass}
                >
                  {[1, 2, 3, 4, 5].map((n) => (
                    <option key={n} value={n}>
                      {n} {n === 1 ? "Guest" : "Guests"}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Dietary */}
            {form.attending === "yes" && (
              <div>
                <label htmlFor="dietary" className={labelClass}>
                  Dietary Requirements{" "}
                  <span className="text-charcoal/40 text-xs">(optional)</span>
                </label>
                <input
                  id="dietary"
                  name="dietary"
                  type="text"
                  value={form.dietary}
                  onChange={handleChange}
                  placeholder="e.g. vegetarian, vegan, gluten-free, allergies..."
                  className={inputClass}
                />
              </div>
            )}

            {/* Message */}
            <div>
              <label htmlFor="message" className={labelClass}>
                Message to the Couple{" "}
                <span className="text-charcoal/40 text-xs">(optional)</span>
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={form.message}
                onChange={handleChange}
                placeholder="Share your wishes, blessings, or a personal note..."
                className={`${inputClass} resize-none`}
              />
            </div>

            {/* Error */}
            {status === "error" && (
              <div className="bg-red-50 border border-red-200 rounded-sm px-4 py-3 text-sm text-red-600 font-sans">
                {errorMsg}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full py-4 bg-gold text-ivory font-serif tracking-widest uppercase text-sm hover:bg-gold-dark disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-300 rounded-sm flex items-center justify-center gap-3"
            >
              {status === "loading" ? (
                <>
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Sending...
                </>
              ) : (
                "Send My RSVP ✦"
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
