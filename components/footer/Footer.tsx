"use client";
import Link from "next/link";

const Footer = () => {
  const socialIcons = [
    {
      name: "youtube",
      icon: "/icons/social/youtube.svg",
      url: "https://www.youtube.com/",
    },
    {
      name: "tiktok",
      icon: "/icons/social/tiktok.svg",
      url: "https://www.tiktok.com/",
    },
    {
      name: "instagram",
      icon: "/icons/social/instagram.svg",
      url: "https://www.instagram.com/",
    },
    {
      name: "facebook",
      icon: "/icons/social/facebook.svg",
      url: "https://www.facebook.com/",
    },
    {
      name: "line",
      icon: "/icons/social/line.svg",
      url: "https://line.me/th/",
    },
  ];

  return (
    <footer className="relative bg-black text-white">
      {/* Background with Gradient Overlay */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: "url('/images/branding/cover.jpg')" }}
      />
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-black/80 to-transparent" />

      <div className="relative z-20 max-w-7xl mx-auto px-6 py-12 md:py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 items-start">
          {/* Section 1: Navigation & Socials */}
          <div className="flex flex-col items-center md:items-start space-y-6 text-center md:text-left">
            <nav className="flex flex-col space-y-3 text-[11px] font-bold tracking-[0.2em] uppercase">
              <Link
                href="/go-green"
                className="hover:text-orange-500 transition-colors"
              >
                Go Green
              </Link>
              <Link
                href="/privacy"
                className="hover:text-orange-500 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/contact"
                className="hover:text-orange-500 transition-colors"
              >
                Contact
              </Link>
            </nav>

            <div className="space-y-3">
              <p className="text-[10px] font-bold tracking-[0.2em] uppercase">
                Follow Us
              </p>
              <div className="flex gap-4">
                {socialIcons.map((item) => (
                  <a
                    key={item.name}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-pointer hover:scale-110 transition-transform hover:opacity-100 opacity-60"
                  >
                    <img
                      src={item.icon}
                      alt={item.name}
                      className="w-5 h-5 invert"
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Section 2: Branding */}
          <div className="flex flex-col items-center justify-center space-y-4">
            <img
              src="/images/branding/logo.jpg"
              alt="The District Logo"
              className="w-32 md:w-44 h-auto rounded-2xl shadow-lg border border-white/5"
            />
            <p className="text-[8px] tracking-[0.4em] uppercase font-light text-white/50 text-center">
              The District Ekkamai Hotel
            </p>
          </div>

          {/* Section 3: Contact Details */}
          <div className="flex flex-col items-center md:items-end space-y-8 text-[11px] font-light tracking-widest text-white/80 text-center md:text-right">
            <div className="space-y-2">
              <p className="font-bold text-white uppercase tracking-[0.2em]">
                Reservations
              </p>
              <p className="text-[10px]">099-999-9999</p>
              <p className="text-[10px]">reservation@thedistrict.com</p>
            </div>

            <div className="space-y-2">
              <p className="font-bold text-white uppercase tracking-[0.2em]">
                Other Inquiries
              </p>
              <p className="text-[10px]">099-999-9999</p>
              <p className="text-[10px]">info@thedistrict.com</p>
            </div>
          </div>
        </div>

        {/* Address & Copyright */}
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col items-center space-y-4">
          <p className="text-[9px] md:text-[10px] text-center text-white/40 tracking-[0.05em] font-light italic max-w-2xl">
            📍 126/31 Floor 2, Park Avenue, Soi Sukhumvit 63, Khlong Tan Nuea,
            Watthana District, Bangkok 10110
          </p>
          <p className="text-[8px] text-white/30 uppercase tracking-[0.2em]">
            Copyright © 2026 THE DISTRICT. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
