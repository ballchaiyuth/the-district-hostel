"use client";

import SafeImage from "@/components/ui/SafeImage";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function ContactPage() {
  const t = useTranslations("ContactPage");
  const common = useTranslations("Common");
  const containerClass = "max-w-7xl mx-auto px-6 md:px-12 lg:px-16";

  return (
    <main className="bg-neutral-950 text-white min-h-screen">
      {/* Hero Visual */}
      <section className="relative h-[65vh] w-full overflow-hidden">
        <SafeImage
          src="/images/contact/district-entrance.jpg"
          alt="The District Ekkamai Entrance"
          className="opacity-60"
          preload={true}
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-light tracking-widest uppercase"
          >
            {t("header")}
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
              <h3 className="text-brand text-xs font-bold uppercase tracking-widest mb-4">
                {common("locationLabel")}
              </h3>
              <p className="font-light leading-relaxed text-neutral-300">
                <span className="font-medium text-white">
                  {common("brandName")}
                </span>
                <br />
                {common("address")}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-white/10">
              <div>
                <h3 className="text-brand text-xs font-bold uppercase tracking-widest mb-4">
                  {common("reservations")}
                </h3>
                <p className="text-neutral-300 font-light">099-999-9999</p>
                <p className="text-neutral-300 font-light underline decoration-white/10">
                  stay@thedistrict.com
                </p>
              </div>
              <div>
                <h3 className="text-brand text-xs font-bold uppercase tracking-widest mb-4">
                  {common("inquiries")}
                </h3>
                <p className="text-neutral-300 font-light">
                  hello@thedistrict.com
                </p>
              </div>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="bg-black/20 p-8 md:p-10 rounded-sm border border-white/5 self-start shadow-2xl">
            <form className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder={t("form.name")}
                  className="w-full bg-transparent border-b border-white/20 py-3 text-sm tracking-widest focus:border-brand outline-none transition-colors placeholder:text-[10px] uppercase"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder={t("form.email")}
                  className="w-full bg-transparent border-b border-white/20 py-3 text-sm tracking-widest focus:border-brand outline-none transition-colors placeholder:text-[10px] uppercase"
                />
              </div>
              <div>
                <textarea
                  placeholder={t("form.message")}
                  rows={3}
                  className="w-full bg-transparent border-b border-white/20 py-3 text-sm tracking-widest focus:border-brand outline-none transition-colors resize-none placeholder:text-[10px] uppercase"
                />
              </div>
              <button className="w-full mt-4 border border-white/20 py-4 text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all cursor-pointer">
                {t("form.submit")}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Google Maps Section */}
      <section className="h-[450px] w-full bg-neutral-800 lg:grayscale lg:invert lg:opacity-80 lg:hover:grayscale-0 lg:hover:invert-0 lg:hover:opacity-100 transition-all duration-1000">
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
