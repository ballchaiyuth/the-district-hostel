"use client";
import Link from "next/link";

export default function BlogPage() {
  const blogs = [
    {
      id: "001",
      title: "Exploring the Hidden Gems of Ekkamai",
      category: "NEIGHBOURHOOD",
      date: "FEB 15, 2026",
      image: "/images/blog/blog-001.jpg",
      description:
        "From secret cafes to vintage boutiques, discover why Ekkamai remains Bangkok's most charming district.",
    },
    {
      id: "002",
      title: "The Art of Slow Living in a Fast City",
      category: "LIFESTYLE",
      date: "JAN 28, 2026",
      image: "/images/blog/blog-002.jpg",
      description:
        "How our sanctuary in the heart of the city helps you find peace amidst the Bangkok hustle.",
    },
    {
      id: "003",
      title: "Genuine Hospitality: More Than Just a Service",
      category: "STORY",
      date: "JAN 10, 2026",
      image: "/images/blog/blog-003.jpg",
      description:
        "A look behind the scenes at how we craft every experience for our guests at The District.",
    },
  ];

  const containerClass = "max-w-7xl mx-auto px-6 md:px-12 lg:px-16";

  return (
    <main className="bg-neutral-950 text-white min-h-screen">
      {/* Header Section */}
      <div className="py-24 text-center bg-black border-b border-white/5">
        <div className={containerClass}>
          <h1 className="text-5xl md:text-7xl font-light tracking-[0.3em] uppercase text-white">
            Blog
          </h1>
          <div className="mx-auto mt-8 h-[1px] w-24 bg-orange-500"></div>
        </div>
      </div>

      {/* Blog List Section */}
      <section className="bg-neutral-900 py-20 border-b border-white/5">
        <div className={containerClass}>
          <div className="flex flex-col space-y-24">
            {blogs.map((blog, index) => (
              <article
                key={blog.id}
                className={`flex flex-col md:flex-row gap-12 items-center group ${
                  index % 2 !== 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Image Cover */}
                <div className="w-full md:w-3/5 overflow-hidden shadow-2xl bg-neutral-900 rounded-sm">
                  <Link
                    href={`/blog/${blog.id}`}
                    className="block relative aspect-[16/9] cursor-pointer"
                  >
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="object-cover w-full h-full opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-[1.5s] ease-out"
                    />
                  </Link>
                </div>

                {/* Blog Meta & Content */}
                <div className="w-full md:w-2/5 space-y-6">
                  <div className="flex items-center gap-4 text-[10px] font-bold tracking-[0.3em] text-orange-500">
                    <span>{blog.category}</span>
                    <span className="w-8 h-[1px] bg-white/20"></span>
                    <span className="text-white/40">{blog.date}</span>
                  </div>

                  <Link href={`/blog/${blog.id}`}>
                    <h2 className="text-2xl md:text-3xl font-light tracking-wide text-white uppercase leading-tight hover:text-orange-500 transition-colors cursor-pointer">
                      {blog.title}
                    </h2>
                  </Link>

                  <p className="text-white/50 font-light leading-relaxed tracking-wide text-sm md:text-base">
                    {blog.description}
                  </p>

                  <Link
                    href={`/blog/${blog.id}`}
                    className="group flex items-center gap-3 text-[10px] font-bold tracking-[0.3em] uppercase cursor-pointer"
                  >
                    <span className="border-b border-white/20 pb-1 group-hover:border-orange-500 transition-colors">
                      Read Article
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
        <div className={`${containerClass} text-center space-y-4`}>
          <p className="text-[10px] font-bold tracking-[0.4em] uppercase text-white/30">
            Stay Updated with the District
          </p>
        </div>
      </div>
    </main>
  );
}
