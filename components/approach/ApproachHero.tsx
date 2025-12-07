import React from 'react';
import { MdOutlineTimeline, MdGroups, MdCloudQueue, MdSecurity } from 'react-icons/md';

export default function ApproachHero() {
  return (
    <section className="w-full bg-white">
      <div className="relative w-full h-[420px] md:h-[520px] overflow-hidden rounded-lg">
        <img
          // image updated to match UX design
          src="/assets/approach-image.jpg"
          alt="Approach hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6">
          <h1 className="text-white text-3xl md:text-5xl font-extrabold leading-tight">Our Approach &amp; Capabilities</h1>
          <p className="mt-3 text-white/90 max-w-2xl text-sm md:text-base">
            Engineering excellence, delivered. We combine pragmatic processes with cutting-edge tech to build resilient software.
          </p>
          <div className="mt-6 inline-flex items-center gap-3 bg-white/10 rounded-full px-4 py-2 text-white text-sm">
            <MdOutlineTimeline className="w-5 h-5" /> Iterative · Cloud-first · Secure-by-design
          </div>
        </div>
      </div>

      {/* feature cards overlapping hero */}
      <div className="w-full px-4 md:px-10 lg:px-20 xl:px-40 -mt-12 md:-mt-16 relative z-30">
        <div className="max-w-[980px] mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6">
          <article className="bg-white rounded-xl border border-gray-200 p-6 shadow-md">
            <div className="w-10 h-10 rounded-md bg-[var(--accent-blue)/10] flex items-center justify-center text-[var(--accent-blue)] mb-3">
              <MdGroups className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-semibold text-neutral-900">Agile &amp; Iterative</h3>
            <p className="mt-2 text-sm text-neutral-500">We embrace agile methodologies to deliver value quickly and adapt to change.</p>
          </article>

          <article className="bg-white rounded-xl border border-gray-200 p-6 shadow-md">
            <div className="w-10 h-10 rounded-md bg-[var(--accent-blue)/10] flex items-center justify-center text-[var(--accent-blue)] mb-3">
              <MdCloudQueue className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-semibold text-neutral-900">Cloud-Native First</h3>
            <p className="mt-2 text-sm text-neutral-500">Solutions built for scale, resilience and cost efficiency across AWS, Azure and GCP.</p>
          </article>

          <article className="bg-white rounded-xl border border-gray-200 p-6 shadow-md">
            <div className="w-10 h-10 rounded-md bg-[var(--accent-blue)/10] flex items-center justify-center text-[var(--accent-blue)] mb-3">
              <MdSecurity className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-semibold text-neutral-900">Security by Design</h3>
            <p className="mt-2 text-sm text-neutral-500">Security integrated from architecture through deployment to protect data and users.</p>
          </article>
        </div>
      </div>
    </section>
  );
}