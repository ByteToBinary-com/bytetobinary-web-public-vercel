import React from 'react';

export default function ServicesCTA() {
  return (
    <section className="w-full py-12">
      <div className="w-full mx-auto px-4 md:px-10 lg:px-20 xl:px-40">
        <div className="max-w-7xl mx-auto">
          <div className="rounded-2xl bg-[var(--accent-blue)] text-white p-10 md:p-16 text-center">
            <h2 className="text-3xl md:text-4xl font-bold">Have a Project in Mind?</h2>
            <p className="mt-4 max-w-2xl mx-auto text-white/90">Let’s discuss how we can leverage our expertise to build a high-performance solution for your business. Schedule a free, no-obligation technical consultation today.</p>
            <a href="#contact" className="mt-8 inline-block bg-white text-[var(--accent-blue)] font-semibold px-6 py-3 rounded-lg shadow">Get in Touch</a>
          </div>
        </div>
      </div>
    </section>
  );
}