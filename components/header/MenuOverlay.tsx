"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

interface MenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const MenuOverlay = ({ isOpen, onClose }: MenuOverlayProps) => {
  const [animate, setAnimate] = useState(false);
  const [prevIsOpen, setPrevIsOpen] = useState(isOpen);

  // Sync state with props during render to handle visibility toggle
  if (isOpen !== prevIsOpen) {
    setPrevIsOpen(isOpen);
    if (!isOpen) setAnimate(false);
  }

  useEffect(() => {
    if (!isOpen) return;

    // Trigger entrance animation and lock scroll
    document.body.style.overflow = "hidden";
    const timer = setTimeout(() => setAnimate(true), 10);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      clearTimeout(timer);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const mainItems = [
    { label: "STORY", href: "/story" },
    { label: "OFFERS", href: "/offers" },
    { label: "GALLERY", href: "/gallery" },
    { label: "BLOG", href: "/blog" },
  ];

  const secondaryItems = [
    "STAY",
    "DINE",
    "NEIGHBOURHOOD",
    "FACILITIES",
    "CONTACT",
  ];
  const menuLinkStyle = `w-full py-3 text-center text-base font-light tracking-[0.25em] text-white/80 hover:text-orange-400 uppercase transition-[opacity,transform] duration-400`;

  return (
    <div
      onClick={onClose}
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-xl transition-opacity duration-400 ease-out overflow-y-auto ${
        animate ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative flex w-full flex-col bg-neutral-900/90 text-white shadow-2xl transition-all duration-400 ease-out
          h-full lg:h-auto lg:max-w-lg lg:border lg:border-white/5 lg:rounded-2xl
          ${animate ? "translate-y-0 scale-100 opacity-100" : "translate-y-4 scale-[0.98] opacity-0"}
        `}
      >
        <button
          onClick={onClose}
          className="fixed right-6 top-6 z-[120] text-3xl font-light text-white/40 transition-colors duration-0 hover:text-orange-400 hover:rotate-90 lg:absolute cursor-pointer"
        >
          ✕
        </button>

        <nav className="flex flex-col items-center px-8 py-24 lg:py-16">
          <div className="flex w-full flex-col items-center">
            {/* Primary Navigation (Mobile) */}
            <div className="flex w-full flex-col items-center lg:hidden">
              {mainItems.map((item, index) => (
                <div
                  key={item.label}
                  className="w-full flex flex-col items-center"
                >
                  <Link
                    href={item.href}
                    onClick={onClose}
                    style={{ transitionDelay: `${index * 30 + 50}ms` }}
                    className={`${menuLinkStyle} ${animate ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"} cursor-pointer`}
                  >
                    {item.label}
                  </Link>
                  <div className="w-12 h-[0.5px] bg-white/10 mx-auto" />
                </div>
              ))}
            </div>

            {/* Secondary Navigation Items */}
            {secondaryItems.map((item, index) => (
              <div key={item} className="w-full flex flex-col items-center">
                <button
                  onClick={() => {
                    console.log(`Clicked: ${item}`);
                    onClose();
                  }}
                  style={{ transitionDelay: `${(index + 4) * 30 + 50}ms` }}
                  className={`${menuLinkStyle} ${animate ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"} cursor-pointer`}
                >
                  {item}
                </button>
                {index !== secondaryItems.length - 1 && (
                  <div className="w-12 h-[0.5px] bg-white/10 mx-auto" />
                )}
              </div>
            ))}
          </div>

          {/* Action Button (Mobile Only) */}
          <div
            className={`mt-10 w-full flex justify-center lg:hidden transition-all duration-400 delay-300 ${
              animate ? "scale-100 opacity-100" : "scale-95 opacity-0"
            }`}
          >
            <button
              onClick={() => console.log("Check Availability")}
              className="w-full max-w-[240px] border border-white/20 px-6 py-4 text-[10px] font-bold uppercase tracking-[0.3em] text-white hover:bg-white hover:text-black transition-none cursor-pointer"
            >
              Check Availability
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default MenuOverlay;
