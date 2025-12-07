import ContactForm from '@/components/ContactForm';
import React from 'react';
import { MdEmail, MdPhone } from 'react-icons/md';

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[var(--bg-base)] text-[var(--text-base)]">
      <section className="py-12 bg-[var(--bg-surface)]">
        <div className="container mx-auto px-4 md:px-10 lg:px-20 xl:px-40">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 py-8">
            <div className="flex flex-col justify-center">
              <h1 className="text-4xl sm:text-5xl font-black leading-tight">Let's Build Something Great Together</h1>
              <p className="mt-4 text-gray-600 max-w-2xl">Reach out for a no-obligation consultation to discuss your technical challenges and project goals. Let our expertise in modern technologies work for you.</p>

              <div className="mt-8 flex flex-col gap-4">
                <div className="flex items-center gap-4 p-3 rounded-lg bg-gray-500/5">
                  <div className="text-gray-800 flex items-center justify-center rounded-lg bg-gray-500/10 shrink-0 w-10 h-10">
                    <MdEmail className="w-5 h-5" aria-hidden />
                  </div>
                  <a className="text-gray-800 text-base font-normal leading-normal truncate hover:text-[var(--accent-blue)]" href="mailto:contact@bytetobinary.com">contact@bytetobinary.com</a>
                </div>

                <div className="flex items-center gap-4 p-3 rounded-lg bg-gray-500/5">
                  <div className="text-gray-800 flex items-center justify-center rounded-lg bg-gray-500/10 shrink-0 w-10 h-10">
                    <MdPhone className="w-5 h-5" aria-hidden />
                  </div>
                  <a className="text-gray-800 text-base font-normal leading-normal truncate hover:text-[var(--accent-blue)]" href="tel:+15551234567">+1 (555) 123-4567</a>
                </div>
              </div>
            </div>

            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
