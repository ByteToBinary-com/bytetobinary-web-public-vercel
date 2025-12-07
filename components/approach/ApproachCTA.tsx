import React from 'react';

export default function ApproachCTA() {
  return (
    <section className="w-full py-12">
      <div className="max-w-7xl mx-auto px-4 md:px-10 lg:px-20 xl:px-40">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-3xl font-extrabold leading-tight mb-4">
            Ready to take the next step?
          </h2>
          <p className="text-lg text-gray-700 mb-8">
            Join us in our mission to make a difference. Let's work together to
            achieve your goals and create a lasting impact.
          </p>
          <a
            href="#"
            className="inline-block bg-[var(--accent-blue)] text-white text-lg font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 transition-all duration-200"
          >
            Let's Build Together
          </a>
        </div>
      </div>
    </section>
  );
}