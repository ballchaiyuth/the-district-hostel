import { useTranslations } from "next-intl";

export default function StoryPage() {
  const t = useTranslations("StoryPage");

  return (
    <main className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-neutral-950">
      <div
        className="absolute inset-0 z-0 h-full w-full bg-cover bg-center bg-no-repeat scale-105 opacity-60 transition-opacity duration-1000"
        style={{ backgroundImage: "url('/images/story/story-cover.jpg')" }}
      />

      <div className="relative z-20 flex flex-col items-center text-center px-8 py-10 md:px-16 md:py-14 bg-black/50 backdrop-blur-lg border border-white/10 rounded-sm max-w-[92%] md:max-w-2xl shadow-2xl">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tighter text-white uppercase leading-none drop-shadow-2xl">
          {t("title")}
        </h1>

        <div className="my-6 h-[1px] w-20 bg-orange-500 shadow-[0_0_15px_rgba(249,115,22,1)]" />

        <div className="bg-white/5 px-6 py-2 border-x border-white/20 mb-6">
          <p className="text-lg md:text-xl font-light tracking-[0.4em] text-white uppercase italic">
            {t("status")}
          </p>
        </div>

        <p className="max-w-md text-[11px] md:text-[12px] font-light tracking-[0.3em] text-white/70 uppercase leading-relaxed whitespace-pre-line">
          {t("description")}
        </p>

        <div className="mt-8 text-[9px] tracking-[0.5em] text-orange-500 font-bold opacity-80">
          EST. 2025 — THE DISTRICT
        </div>
      </div>
    </main>
  );
}
