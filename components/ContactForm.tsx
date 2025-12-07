"use client";
import React, { useState } from 'react';

export default function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);

    // TODO: wire up to API
    setName('');
    setCompany('');
    setEmail('');
    setPhone('');
    setMessage('');
  }

  return (
    <div className="bg-white p-6 sm:p-8 rounded-xl border border-gray-200/80">
      <h2 className="text-gray-900 text-[22px] font-bold leading-tight tracking-[-0.015em] mb-6">Send us a message</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="full-name">Full Name</label>
            <input id="full-name" name="full-name" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} className="block w-full rounded-md border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:border-[var(--accent-blue)] focus:ring-[var(--accent-blue)]" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="company-name">Company Name</label>
            <input id="company-name" name="company-name" placeholder="Acme Inc." value={company} onChange={(e) => setCompany(e.target.value)} className="block w-full rounded-md border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:border-[var(--accent-blue)] focus:ring-[var(--accent-blue)]" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">Work Email</label>
          <input id="email" name="email" type="email" placeholder="you@company.com" value={email} onChange={(e) => setEmail(e.target.value)} className="block w-full rounded-md border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:border-[var(--accent-blue)] focus:ring-[var(--accent-blue)]" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="phone">Phone Number</label>
          <input id="phone" name="phone" placeholder="+1 (555) 987-6543" value={phone} onChange={(e) => setPhone(e.target.value)} className="block w-full rounded-md border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:border-[var(--accent-blue)] focus:ring-[var(--accent-blue)]" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="message">Tell us about your project</label>
          <textarea id="message" name="message" rows={4} placeholder="How can we help?" value={message} onChange={(e) => setMessage(e.target.value)} className="block w-full rounded-md border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:border-[var(--accent-blue)] focus:ring-[var(--accent-blue)]" />
        </div>

        <div>
          <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-[var(--accent-blue)] hover:bg-[var(--accent-blue)/90] transition-colors" disabled={isSubmitted}>
            {isSubmitted ? 'Message Sent' : 'Send Message'}
          </button>
        </div>

        {isSubmitted && (
          <p role="status" aria-live="polite" className="mt-2 text-center text-gray-600 font-medium">Thank you — we'll be in touch soon.</p>
        )}
      </form>
    </div>
  );
}
