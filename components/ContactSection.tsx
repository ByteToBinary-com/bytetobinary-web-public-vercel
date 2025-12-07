'use client';

import React, { useState } from 'react';

export default function ContactSection() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);

    // Here you would normally send the form to a server
    setName('');
    setEmail('');
    setMessage('');
  }

  return (
    <section className="pt-10" id="contact">
      {/* center container to align with other sections */}
      <div className="max-w-[980px] mx-auto px-4 md:px-10 lg:px-20 xl:px-40">
        {/* Accent header box (not full-bleed) */}
        <div className="bg-[var(--accent-blue)] rounded-xl p-8 md:p-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white">Ready to build something great?</h2>
          <p className="mt-4 text-white/90">We partner with product teams to design and ship resilient software — let&apos;s talk about your roadmap and next steps.</p>
        </div>

        {/* boxed form aligned with the section (same centered width as other boxes) */}
        <form onSubmit={handleSubmit} className="mt-10">
          <div className="bg-[var(--accent-blue)] p-6 rounded-xl shadow-md max-w-[720px] mx-auto space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-white mb-1" htmlFor="name">Name</label>
                <input
                  id="name"
                  name="name"
                  required
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                  value={name}
                  className="mt-1 block w-full rounded-md border border-transparent bg-white px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent sm:text-sm text-black"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-1" htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                  value={email}
                  className="mt-1 block w-full rounded-md border border-transparent bg-white px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent sm:text-sm text-black"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-1" htmlFor="message">How can we help?</label>
              <textarea
                id="message"
                name="message"
                required
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setMessage(e.target.value)}
                value={message}
                rows={6}
                className="mt-1 block w-full min-h-[140px] rounded-md border border-transparent bg-white px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent sm:text-sm text-black resize-none"
              />
            </div>

            <div className="flex flex-col md:flex-row md:items-center md:justify-end gap-3">
              <button
                type="submit"
                className="w-full md:w-auto inline-flex justify-center rounded-lg border border-white bg-white px-6 py-3 text-base font-medium text-[var(--accent-blue)] shadow-sm hover:bg-white/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                disabled={isSubmitted}
              >
                {isSubmitted ? 'Message Sent' : 'Send Message'}
              </button>
            </div>

            {isSubmitted && (
              <p role="status" aria-live="polite" className="mt-2 text-center text-white font-medium">
                Thank you — we&apos;ll be in touch soon.
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
