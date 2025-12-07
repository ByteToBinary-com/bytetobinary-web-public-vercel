import React from 'react';
import { MdOutlineVerifiedUser, MdCode, MdTrendingUp } from 'react-icons/md';

export default function ServicesHero() {
  return (
    <section className="w-full bg-white">
      {/* Hero image + overlay */}
      <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden">
        <img
          src="/assets/services-image.jpg"
          alt="Team collaborating"
          className="w-full h-full object-cover relative z-0"
        />
        {/* overlay must sit above image but below hero text and below the feature cards */}
        <div className="absolute inset-0 bg-black/50 z-10" />
        {/* hero content above overlay */}
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-6 z-20">
          <h1 className="text-3xl md:text-5xl font-black leading-tight max-w-[900px]">
            Our Services
          </h1>
          <p className="mt-4 text-sm md:text-lg max-w-3xl text-white/90">
            We solve complex challenges in media, e-commerce, and transport with cutting-edge technology and deep industry expertise.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
            <a
              href="/services"
              className="inline-flex items-center justify-center rounded-lg px-5 py-3 bg-[var(--accent-blue)] text-white font-semibold text-sm shadow-sm hover:opacity-95 transition"
            >
              Explore Services
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-lg px-5 py-3 border border-white/20 text-white text-sm"
            >
              Schedule a Consultation
            </a>
          </div>
        </div>
      </div>

      {/* Feature quick-cards (under hero, overlapping the hero bottom) */}
      <div className="w-full mx-auto px-4 md:px-10 lg:px-20 xl:px-40 -mt-12 md:-mt-16 relative z-30">
        <div className="max-w-[960px] mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-md bg-[var(--accent-blue)/10] flex items-center justify-center text-[var(--accent-blue)]">
                <MdOutlineVerifiedUser className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-neutral-900">Expert-Led Development</h3>
                <p className="mt-1 text-sm text-neutral-500">Leverage decades of experience to build robust and efficient software.</p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-md bg-[var(--accent-blue)/10] flex items-center justify-center text-[var(--accent-blue)]">
                <MdCode className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-neutral-900">Modern Tech Stack</h3>
                <p className="mt-1 text-sm text-neutral-500">Utilizing Java, Cloud, and modern frameworks for future-proof applications.</p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-md bg-[var(--accent-blue)/10] flex items-center justify-center text-[var(--accent-blue)]">
                <MdTrendingUp className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-neutral-900">Scalable & Resilient</h3>
                <p className="mt-1 text-sm text-neutral-500">Architecting systems that grow with your business and withstand failure.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}