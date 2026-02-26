import SafeImage from "@/components/ui/SafeImage";
import { Link } from "@/i18n/routing";
import { getAllPosts } from "@/lib/markdown";
import { getTranslations } from "next-intl/server";

interface BlogPageProps {
  params: Promise<{ locale: string }>;
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { locale } = await params;
  const t = await getTranslations("BlogPage");
  const containerClass = "max-w-7xl mx-auto px-6 md:px-12 lg:px-16";

  const blogs = await getAllPosts(locale);

  return (
    <main className="bg-neutral-950 text-white min-h-screen flex flex-col">
      {/* Page Header */}
      <div className="pt-24 pb-8 text-center bg-black border-b border-white/5">
        <div className={containerClass}>
          <h1 className="text-5xl md:text-7xl font-light tracking-[0.3em] uppercase text-white leading-tight">
            {t("header")}
          </h1>
          <div className="mx-auto mt-8 h-[1px] w-24 bg-brand"></div>
        </div>
      </div>

      {/* Blog Grid - flex-grow handles empty space if post count is low */}
      <section className="bg-neutral-900 py-12 border-b border-white/5 flex-grow">
        <div className={containerClass}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-20">
            {blogs.map((blog, index) => {
              const { title, date, category, excerpt, coverImage } =
                blog.frontmatter;

              return (
                <article
                  key={blog.slug}
                  className="group flex flex-col space-y-6"
                >
                  {/* Visual Container */}
                  <div className="w-full overflow-hidden shadow-2xl bg-neutral-900 rounded-sm">
                    <Link
                      href={`/blog/${blog.slug}`}
                      className="block relative aspect-[16/9] cursor-pointer"
                    >
                      <SafeImage
                        src={
                          (coverImage as string) || "/images/branding/cover.jpg"
                        }
                        alt={(title as string) || "Blog cover"}
                        preload={index < 2}
                        className="opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-[1s] ease-out"
                      />
                    </Link>
                  </div>

                  {/* Content Container */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 text-[10px] font-bold tracking-[0.2em] text-brand uppercase">
                      <span>{(category as string) || "JOURNAL"}</span>
                      <span className="w-8 h-[1px] bg-white/20"></span>
                      <span className="text-white/40">{date as string}</span>
                    </div>

                    <Link href={`/blog/${blog.slug}`}>
                      <h2 className="text-2xl font-light tracking-wide text-white uppercase leading-tight hover:text-brand-light transition-colors min-h-[3.5rem]">
                        {title as string}
                      </h2>
                    </Link>

                    <p className="text-white/50 font-light leading-relaxed tracking-wide text-sm line-clamp-3">
                      {(excerpt as string) || ""}
                    </p>

                    <Link
                      href={`/blog/${blog.slug}`}
                      className="group flex items-center gap-3 text-[10px] font-bold tracking-[0.3em] uppercase pt-2"
                    >
                      <span className="border-b border-white/20 pb-1 group-hover:border-brand transition-colors">
                        {t("readMore")}
                      </span>
                      <span className="text-brand group-hover:translate-x-2 transition-transform">
                        →
                      </span>
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer Branding - Always pushed to the bottom */}
      <div className="py-12 bg-neutral-950 border-t border-white/5">
        <div className={`${containerClass} text-center`}>
          <p className="text-[10px] font-bold tracking-[0.4em] uppercase text-white/30">
            {t("footerBranding")}
          </p>
        </div>
      </div>
    </main>
  );
}
