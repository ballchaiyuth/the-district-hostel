"use client";

import { motion } from "framer-motion";

export default function ContactPage() {
  const containerClass = "max-w-7xl mx-auto px-6 md:px-12 lg:px-16";

  return (
    <main className="bg-neutral-950 text-white min-h-screen">
      {/* Hero Visual */}
      <section className="relative h-[65vh] w-full overflow-hidden">
        <img
          src="/images/contact/district-entrance.jpg"
          className="h-full w-full object-cover opacity-60"
          alt="The District Ekkamai Entrance"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-light tracking-widest uppercase"
          >
            Contact
          </motion.h1>
        </div>
      </section>

      {/* Info & Inquiry Form */}
      <section className="py-24 bg-neutral-900">
        <div
          className={`${containerClass} grid grid-cols-1 lg:grid-cols-2 gap-16`}
        >
          {/* Contact Details */}
          <div className="space-y-12">
            <div>
              <h3 className="text-amber-500 text-xs font-bold uppercase tracking-widest mb-4">
                Location
              </h3>
              <p className="font-light leading-relaxed text-neutral-300">
                The District Ekkamai
                <br />
                126/31 Floor 2, Park Avenue, Soi Sukhumvit 63,
                <br />
                Khlong Tan Nuea, Watthana District, Bangkok 10110
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-white/10">
              <div>
                <h3 className="text-amber-500 text-xs font-bold uppercase tracking-widest mb-4">
                  Reservations
                </h3>
                <p className="text-neutral-300 font-light">
                  +66 (0) 2 123 4567
                </p>
                <p className="text-neutral-300 font-light">
                  stay@thedistrict.com
                </p>
              </div>
              <div>
                <h3 className="text-amber-500 text-xs font-bold uppercase tracking-widest mb-4">
                  General Inquiries
                </h3>
                <p className="text-neutral-300 font-light">
                  hello@thedistrict.com
                </p>
              </div>
            </div>
          </div>

          {/* Right: Compact Inquiry Form */}
          <div className="bg-black/20 p-8 md:p-10 rounded-sm border border-white/5 self-start">
            <form className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="NAME"
                  className="w-full bg-transparent border-b border-white/20 py-3 text-sm tracking-widest focus:border-amber-500 outline-none transition-colors placeholder:text-[10px]"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="EMAIL"
                  className="w-full bg-transparent border-b border-white/20 py-3 text-sm tracking-widest focus:border-amber-500 outline-none transition-colors placeholder:text-[10px]"
                />
              </div>
              <div>
                <textarea
                  placeholder="MESSAGE"
                  rows={3}
                  className="w-full bg-transparent border-b border-white/20 py-3 text-sm tracking-widest focus:border-amber-500 outline-none transition-colors resize-none placeholder:text-[10px]"
                />
              </div>
              <button className="w-full mt-4 border border-white/20 py-4 text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all cursor-pointer">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Google Maps Section - Dark mode only on Desktop (Hover-enabled) */}
      <section
        className="h-[450px] w-full bg-neutral-800 
        lg:grayscale lg:invert lg:opacity-80 lg:hover:grayscale-0 lg:hover:invert-0 lg:hover:opacity-100 
        transition-all duration-1000"
      >
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.7876931510045!2d100.5847339750899!3d13.731299786658452!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e29f9264b0d963%3A0xc9228ff571ef2223!2sThe%20District%20Hostel%20Ekkamai!5e0!3m2!1sen!2sth!4v1771848992927!5m2!1sen!2sth"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>
    </main>
  );
}
