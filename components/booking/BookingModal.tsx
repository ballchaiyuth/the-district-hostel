"use client";

import dayjs from "dayjs";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { DateRange, DayPicker, getDefaultClassNames } from "react-day-picker";
import "react-day-picker/dist/style.css";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const GUEST_OPTIONS = ["1-2", "3-4", "5-6", "7+"];

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [range, setRange] = useState<DateRange | undefined>();
  const [guests, setGuests] = useState("1-2");
  const [month, setMonth] = useState<Date>(new Date());

  const defaultClassNames = getDefaultClassNames();

  // Block past dates based on current local time
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      // Month navigation via keyboard
      if (e.key === "ArrowRight")
        setMonth((prev) => dayjs(prev).add(1, "month").toDate());
      if (e.key === "ArrowLeft")
        setMonth((prev) => dayjs(prev).subtract(1, "month").toDate());
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleCheck = () => {
    if (range?.from && range?.to) {
      const start = dayjs(range.from).format("DD MMM YYYY");
      const end = dayjs(range.to).format("DD MMM YYYY");
      alert(`Booking for ${guests} people: ${start} - ${end}`);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[200] bg-black/40 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-0 left-0 right-0 z-[201] w-full bg-neutral-800 p-6 text-white lg:bottom-auto lg:left-1/2 lg:top-1/2 lg:max-w-[420px] lg:-translate-x-1/2 lg:-translate-y-1/2 lg:rounded-3xl shadow-2xl border border-neutral-700 outline-none"
            tabIndex={-1}
          >
            <button
              onClick={onClose}
              title="Close (Esc)"
              className="absolute right-6 top-6 text-xl text-neutral-500 hover:text-amber-500 transition-colors cursor-pointer"
            >
              ✕
            </button>

            <h2 className="mb-6 text-center text-[10px] font-bold uppercase tracking-[0.4em] text-neutral-500">
              Availability
            </h2>

            {/* Calendar Custom Styling */}
            <div className="mb-8 flex justify-center bg-neutral-900/40 p-4 rounded-2xl border border-neutral-700/50">
              <style>
                {`
                  .rdp-root {
                    --rdp-accent-color: #f59e0b;
                    --rdp-range_middle-background-color: rgba(245, 158, 11, 0.15);
                    --rdp-range_middle-color: #f59e0b;
                    --rdp-range_start-background: #f59e0b;
                    --rdp-range_end-background: #f59e0b;
                    --rdp-day-height: 38px;
                    --rdp-day-width: 38px;
                  }
                  .rdp-day { color: #a3a3a3; transition: all 0.2s; }
                  .rdp-day:hover:not([disabled]) { background-color: rgba(245, 158, 11, 0.1) !important; color: #f59e0b !important; }
                  .rdp-selected { color: white !important; }
                  .rdp-day_disabled { opacity: 0.2; cursor: not-allowed; }
                `}
              </style>
              <DayPicker
                mode="range"
                selected={range}
                onSelect={setRange}
                month={month}
                onMonthChange={setMonth}
                disabled={{ before: today }}
                classNames={{
                  ...defaultClassNames,
                  root: `${defaultClassNames.root} border-none font-sans`,
                  chevron: `${defaultClassNames.chevron} fill-amber-500 scale-125`,
                  today: `text-amber-500 font-bold underline underline-offset-4`,
                }}
              />
            </div>

            {/* Guest Selection UI */}
            <div className="mb-8">
              <label className="mb-3 block text-[10px] font-bold uppercase tracking-widest text-neutral-500">
                Number of Guests
              </label>
              <div className="grid grid-cols-2 gap-3">
                {GUEST_OPTIONS.map((option) => (
                  <button
                    key={option}
                    onClick={() => setGuests(option)}
                    className={`flex items-center justify-center gap-3 rounded-xl border py-4 transition-all duration-300 cursor-pointer ${
                      guests === option
                        ? "border-amber-500 bg-amber-500/10 text-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.1)]"
                        : "border-neutral-700 bg-neutral-900/30 text-neutral-400 hover:border-neutral-500"
                    }`}
                  >
                    <span className="text-sm font-bold">{option}</span>
                    <img
                      src="/icons/ui/users.svg"
                      className={`h-4 w-4 rounded-[2px] transition-all duration-300 ${
                        guests === option ? "bg-amber-500" : "bg-neutral-400"
                      }`}
                      alt="Users"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* CTA Actions */}
            <div className="space-y-3">
              <button
                disabled={!range?.from || !range?.to}
                onClick={handleCheck}
                className={`w-full py-5 text-[11px] font-black uppercase tracking-[0.3em] text-white shadow-lg transition-all active:scale-[0.98] rounded-2xl cursor-pointer ${
                  !range?.from || !range?.to
                    ? "bg-neutral-700 opacity-50 cursor-not-allowed"
                    : "bg-amber-500 shadow-amber-900/20 hover:bg-amber-600"
                }`}
              >
                {!range?.from || !range?.to
                  ? "Select Dates to Continue"
                  : "Confirm Booking"}
              </button>

              {range && (
                <button
                  onClick={() => setRange(undefined)}
                  className="w-full text-[10px] text-neutral-500 hover:text-white uppercase tracking-widest transition-colors cursor-pointer"
                >
                  Clear Selection
                </button>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
