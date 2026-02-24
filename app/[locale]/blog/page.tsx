import SafeImage from "@/components/ui/SafeImage";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export default function BlogPage() {
  const t = useTranslations("BlogPage");
  const containerClass = "max-w-7xl mx-auto px-6 md:px-12 lg:px-16";

  const blogs = [
    {
      id: "001",
      title: "Legendary Flavors: Ekkamai's Iconic Local Eats",
      category: "NEIGHBOURHOOD",
      date: "FEB 24, 2026",
      image: "/images/blog/blog-001.jpg",
      description:
        "From the legendary beef broth of Wattana Panich to the soulful dishes at Chan Chao, explore the culinary heritage that defines our street.",
    },
    {
      id: "002",
      title: "The Ultimate Shopping Guide: From Ekkamai to EM District",
      category: "LIFESTYLE",
      date: "FEB 20, 2026",
      image: "/images/blog/blog-002.jpg",
      description:
        "Navigate through Bangkok's retail wonders, from the eclectic Donki Mall to the world-class luxury of EMSPHERE and EmQuartier.",
    },
    {
      id: "003",
      title: "Ekkamai After Dark: Where to Sip and Socialize",
      category: "NIGHTLIFE",
      date: "FEB 15, 2026",
      image: "/images/blog/blog-003.jpg",
      description:
        "Experience the vibrant energy of Thai nightlife at Thay Ekkamai or enjoy artisanal brews at Beer Belly and the hidden gems of Thonglor.",
    },
    {
      id: "004",
      title: "Urban Sanctuary: Parks, Skywalks, and Local Hangouts",
      category: "NEIGHBOURHOOD",
      date: "FEB 10, 2026",
      image: "/images/blog/blog-004.jpg",
      description:
        "Find the perfect balance of nature and city at Benjakitti Park's Skywalk, or mingle with the local crowd at The Commons Thonglor.",
    },
    {
      id: "005",
      title: "Michelin Gastronomy: Fine Dining at Your Doorstep",
      category: "DINE",
      date: "FEB 05, 2026",
      image: "/images/blog/blog-005.jpg",
      description:
        "Indulge in a sophisticated journey through Michelin-starred venues like Khao and Stage, showcasing the pinnacle of Bangkok's fine dining.",
    },
    {
      id: "006",
      title: "Coffee Culture: Ekkamai's Best Specialty Cafes",
      category: "LIFESTYLE",
      date: "FEB 01, 2026",
      image: "/images/blog/blog-006.jpg",
      description:
        "Wake up to the aroma of world-class beans. From the artisanal brews at PLYNN House to hidden roasteries, discover Ekkamai's ultimate caffeine fix.",
    },
  ];

  return (
    <main className="bg-neutral-950 text-white min-h-screen">
      <div className="py-24 text-center bg-black border-b border-white/5">
        <div className={containerClass}>
          <h1 className="text-5xl md:text-7xl font-light tracking-[0.3em] uppercase text-white">
            {t("header")}
          </h1>
          <div className="mx-auto mt-8 h-[1px] w-24 bg-orange-500"></div>
        </div>
      </div>

      {/* Blog Grid */}
      <section className="bg-neutral-900 py-20 border-b border-white/5">
        <div className={containerClass}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-20">
            {blogs.map((blog) => (
              <article key={blog.id} className="group flex flex-col space-y-6">
                {/* Visual Section */}
                <div className="w-full overflow-hidden shadow-2xl bg-neutral-900 rounded-sm">
                  <Link
                    href={`/blog/${blog.id}`}
                    className="block relative aspect-[16/9] cursor-pointer"
                  >
                    <SafeImage
                      src={blog.image}
                      alt={blog.title}
                      preload={blog.id === "001" || blog.id === "002"}
                      className="opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-[1s] ease-out"
                    />
                  </Link>
                </div>

                {/* Info Section */}
                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-[10px] font-bold tracking-[0.2em] text-orange-500 uppercase">
                    <span>{blog.category}</span>
                    <span className="w-8 h-[1px] bg-white/20"></span>
                    <span className="text-white/40">{blog.date}</span>
                  </div>

                  <Link href={`/blog/${blog.id}`}>
                    <h2 className="text-2xl font-light tracking-wide text-white uppercase leading-tight hover:text-orange-400 transition-colors min-h-[3.5rem]">
                      {blog.title}
                    </h2>
                  </Link>

                  <p className="text-white/50 font-light leading-relaxed tracking-wide text-sm line-clamp-3">
                    {blog.description}
                  </p>

                  <Link
                    href={`/blog/${blog.id}`}
                    className="group flex items-center gap-3 text-[10px] font-bold tracking-[0.3em] uppercase pt-2"
                  >
                    <span className="border-b border-white/20 pb-1 group-hover:border-orange-500 transition-colors">
                      {t("readMore")}
                    </span>
                    <span className="text-orange-500 group-hover:translate-x-2 transition-transform">
                      →
                    </span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Branding */}
      <div className="py-20 bg-neutral-950 border-t border-white/5">
        <div className={`${containerClass} text-center`}>
          <p className="text-[10px] font-bold tracking-[0.4em] uppercase text-white/30">
            {t("footerBranding")}
          </p>
        </div>
      </div>
    </main>
  );
}
