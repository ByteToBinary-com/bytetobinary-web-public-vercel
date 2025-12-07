export default function Hero() {
  return (
    <section className="relative bg-cover bg-center bg-no-repeat pt-5 pb-16" style={{backgroundImage: "linear-gradient(rgba(0,0,0,0), rgba(10,10,20,0.7)), url('/assets/home-hero.jpg')"}}>
      <div className="w-full mx-auto px-4 md:px-10 lg:px-20 xl:px-40 flex flex-col min-h-[480px] justify-end pb-10">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-black leading-tight text-white tracking-[-0.033em]">Engineering Tomorrow&apos;s Software, Today.</h1>
          <p className="text-gray-200 mt-4 text-sm md:text-base">Leveraging 15+ years of elite experience in Media, E-commerce, and Transport to build robust, scalable, and intelligent solutions for your business.</p>
          <div className="mt-6">
            <button className="inline-flex min-w-[84px] items-center justify-center rounded-lg h-10 px-4 bg-[var(--accent-blue)] text-white text-sm font-bold hover:bg-[var(--accent-blue)/90] transition-colors">Book a Free Consultation</button>
          </div>
        </div>
      </div>
    </section>
  );
}
