"use client";

import SafeImage from "@/components/ui/SafeImage";

export default function OffersPage() {
  const containerClass = "max-w-7xl mx-auto px-6 md:px-12 lg:px-16";

  return (
    <main className="bg-neutral-950 text-white min-h-screen">
      {/* Page Header */}
      <div className="py-24 text-center bg-black border-b border-white/5">
        <div className={containerClass}>
          <h1 className="text-5xl md:text-7xl font-light tracking-[0.3em] uppercase text-white">
            Offers
          </h1>
          <div className="mx-auto mt-8 h-[1px] w-24 bg-orange-500"></div>
        </div>
      </div>

      {/* Offer Section 1: Stay */}
      <section className="bg-neutral-900 py-20 border-b border-white/5">
        <div
          className={`${containerClass} flex flex-col md:flex-row gap-16 items-center`}
        >
          <div className="w-full md:w-1/2">
            <div className="relative aspect-[4/3] w-full bg-neutral-900 overflow-hidden shadow-2xl cursor-pointer group">
              <SafeImage
                src="/images/offers/offer-1.jpg"
                alt="Stay"
                className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-[1.5s] opacity-70 group-hover:opacity-100"
              />
            </div>
          </div>
          <div className="w-full md:w-1/2 space-y-8">
            <span className="text-orange-500 text-xs font-bold tracking-[0.4em] uppercase">
              — STAY
            </span>
            <h2 className="text-3xl md:text-5xl font-light tracking-tight text-white uppercase leading-[1.1]">
              Flexible <br /> Urban Living
            </h2>
            <p className="text-white/50 leading-relaxed font-light tracking-wide text-lg max-w-md">
              Whether for a quick getaway or an extended residence, we provide
              the perfect sanctuary for you to explore the vibrant soul of
              Ekkamai.
            </p>
            <button className="group flex items-center gap-4 text-[10px] font-bold tracking-[0.3em] uppercase cursor-pointer">
              <span className="border-b border-white/20 pb-1 group-hover:border-orange-500 transition-colors">
                Discover More
              </span>
              <span className="text-orange-500 group-hover:translate-x-2 transition-transform">
                →
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Offer Section 2: Experience */}
      <section className="bg-black py-24 border-b border-white/5">
        <div
          className={`${containerClass} flex flex-col md:flex-row-reverse gap-16 items-center`}
        >
          <div className="w-full md:w-1/2">
            <div className="relative aspect-[4/3] w-full bg-neutral-900 overflow-hidden shadow-2xl cursor-pointer group">
              <SafeImage
                src="/images/offers/offer-2.jpg"
                alt="Experience"
                className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-[1.5s] opacity-70 group-hover:opacity-100"
              />
            </div>
          </div>
          <div className="w-full md:w-1/2 space-y-8">
            <span className="text-orange-500 text-xs font-bold tracking-[0.4em] uppercase">
              — EXPERIENCE
            </span>
            <h2 className="text-3xl md:text-5xl font-light tracking-tight text-white uppercase leading-[1.1]">
              The Heart <br /> of Bangkok
            </h2>
            <p className="text-white/50 leading-relaxed font-light tracking-wide text-lg max-w-md">
              Immerse yourself in a district where luxury malls meet hidden bars
              and legendary street food—all within reach of your peaceful
              retreat.
            </p>
            <button className="group flex items-center gap-4 text-[10px] font-bold tracking-[0.3em] uppercase cursor-pointer">
              <span className="border-b border-white/20 pb-1 group-hover:border-orange-500 transition-colors">
                Explore Now
              </span>
              <span className="text-orange-500 group-hover:translate-x-2 transition-transform">
                →
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Offer Section 3: Dining */}
      <section className="bg-neutral-900 py-24">
        <div
          className={`${containerClass} flex flex-col md:flex-row gap-16 items-center`}
        >
          <div className="w-full md:w-1/2">
            <div className="relative aspect-[4/3] w-full bg-neutral-900 overflow-hidden shadow-2xl cursor-pointer group">
              <SafeImage
                src="/images/offers/offer-3.jpg"
                alt="Dining"
                className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-[1.5s] opacity-70 group-hover:opacity-100"
              />
            </div>
          </div>
          <div className="w-full md:w-1/2 space-y-8">
            <span className="text-orange-500 text-xs font-bold tracking-[0.4em] uppercase">
              — DINE & UNWIND
            </span>
            <h2 className="text-3xl md:text-5xl font-light tracking-tight text-white uppercase leading-[1.1]">
              A Flavorful <br /> Heritage
            </h2>
            <p className="text-white/50 leading-relaxed font-light tracking-wide text-lg max-w-md">
              From Michelin-starred fine dining to generational street food
              stalls, discover why Ekkamai is Bangkok's most celebrated culinary
              destination.
            </p>
            <button className="group flex items-center gap-4 text-[10px] font-bold tracking-[0.3em] uppercase cursor-pointer">
              <span className="border-b border-white/20 pb-1 group-hover:border-orange-500 transition-colors">
                View Selection
              </span>
              <span className="text-orange-500 group-hover:translate-x-2 transition-transform">
                →
              </span>
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
