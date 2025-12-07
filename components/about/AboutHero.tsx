import Image from 'next/image';
import React from 'react';

export default function AboutHero() {
  return (
    <section className="relative flex h-[60vh] min-h-[500px] w-full items-center justify-center overflow-hidden bg-gray-900">
      <div className="absolute inset-0 z-0 bg-cover bg-center">
        <Image
          src="/assets/about-image.jpg"
          alt="About hero"
          fill
          className="object-cover"
          sizes="100vw"
        />
      </div>

      <div className="absolute inset-0 z-0 bg-black/50" />

      <div className="relative z-10 flex flex-col items-center gap-4 px-4 text-center">
        <h1 className="animate-text-glow text-4xl font-black leading-tight tracking-[-0.033em] text-white drop-shadow-lg sm:text-5xl md:text-6xl">About Us - ByteToBinary</h1>
        <p className="max-w-3xl text-base font-normal leading-normal text-gray-200 drop-shadow-sm sm:text-lg">
          Welcome to ByteToBinary, where decades of software engineering expertise are leveraged to build innovative, scalable, and future-proof solutions for your business.
        </p>
      </div>
    </section>
  );
}
