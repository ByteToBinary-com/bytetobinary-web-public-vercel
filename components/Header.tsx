"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm backdrop-blur-md bg-opacity-95">
      <nav className="w-full px-4 md:px-10 lg:px-20 xl:px-40 h-16 flex items-center justify-between">
        {/* left: logo/company */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/assets/bytetobinary_icon.ico" alt="ByteToBinary" width={40} height={40} className="rounded-sm" />
            <span className="text-2xl md:text-3xl font-bold font-display text-gray-900">ByteToBinary</span>
          </Link>
        </div>

        {/* right: grouped menu + CTA + mobile button */}
        <div className="flex items-center space-x-4">
          {/* Navigation Links (tablet and up) */}
          <div className="hidden md:flex lg:flex items-center space-x-8">
            <Link href="/" className="text-gray-600 hover:text-[var(--accent-blue)] transition-colors duration-200 font-medium">Home</Link>
            <Link href="/services" className="text-gray-600 hover:text-[var(--accent-blue)] transition-colors duration-200 font-medium">Services</Link>
            <Link href="/approach" className="text-gray-600 hover:text-[var(--accent-blue)] transition-colors duration-200 font-medium">Our Approach</Link>
            <Link href="/about" className="text-gray-600 hover:text-[var(--accent-blue)] transition-colors duration-200 font-medium">About</Link>
            <Link href="/contact" className="text-gray-600 hover:text-[var(--accent-blue)] transition-colors duration-200 font-medium">Contact Us</Link>
          </div>

          {/* CTA (desktop/tablet) */}
          <div className="hidden md:block">
            <Link href="/contact" className="px-6 py-2 bg-[var(--accent-blue)] text-white rounded-lg font-medium hover:opacity-90 transition-all duration-200 shadow-lg hover:shadow-xl">
              Book a Consultation
            </Link>
          </div>

          {/* Mobile menu button (visible on small screens) */}
          <div className="md:hidden">
            <button
              onClick={() => setOpen(true)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Open menu"
              aria-expanded={open}
            >
              <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {open && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/30" onClick={() => setOpen(false)} />

          <div className="absolute top-0 right-0 mt-16 mr-4 w-[92%] max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="text-lg font-semibold">Menu</div>
              <button onClick={() => setOpen(false)} aria-label="Close menu" className="p-2 rounded hover:bg-gray-100">
                <svg className="w-5 h-5 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex flex-col gap-3">
              <Link href="/" className="block px-3 py-2 rounded text-gray-700 hover:bg-gray-50">Home</Link>
              <Link href="/services" className="block px-3 py-2 rounded text-gray-700 hover:bg-gray-50">Services</Link>
              <Link href="/approach" className="block px-3 py-2 rounded text-gray-700 hover:bg-gray-50">Our Approach</Link>
              <Link href="/about" className="block px-3 py-2 rounded text-gray-700 hover:bg-gray-50">About</Link>
              <Link href="/contact" className="block px-3 py-2 rounded text-gray-700 hover:bg-gray-50">Contact Us</Link>

              <div className="pt-3 border-t border-gray-100 mt-2">
                <Link href="/contact" className="block w-full text-center px-4 py-2 rounded-md bg-[var(--accent-blue)] text-white font-medium">Book a Consultation</Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
