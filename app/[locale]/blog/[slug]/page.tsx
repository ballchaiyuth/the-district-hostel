import BlogGallery from "@/components/blog/BlogGallery";
import SafeImage from "@/components/ui/SafeImage";
import { getPostBySlug } from "@/lib/markdown";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import { ComponentPropsWithoutRef } from "react";
import remarkGfm from "remark-gfm";

interface PostPageProps {
  params: Promise<{
    slug: string;
    locale: string;
  }>;
}

/**
 * Custom MDX Components with proper type handling to avoid lint errors
 */
const mdxComponents = {
  ImageGallery: (props: { images?: string | string[] }) => (
    <div className="not-prose">
      <BlogGallery {...props} />
    </div>
  ),

  img: ({ src, alt }: ComponentPropsWithoutRef<"img">) => (
    <div className="not-prose my-12 overflow-hidden rounded-[2rem] shadow-xl border border-white/5">
      <div className="aspect-[16/9] relative">
        {src && (
          <SafeImage
            src={src}
            alt={alt || "Blog image"}
            className="object-cover"
          />
        )}
      </div>
      {alt && (
        <p className="mt-4 text-center text-[10px] tracking-[0.3em] text-white/20 uppercase font-medium">
          {alt}
        </p>
      )}
    </div>
  ),
};

export default async function PostPage({ params }: PostPageProps) {
  const { slug, locale } = await params;
  const post = await getPostBySlug(slug, locale);

  if (!post) notFound();

  const { frontmatter, content } = post;

  return (
    <article className="min-h-screen bg-neutral-900 text-white pb-24">
      {/* Hero Section */}
      <div className="relative h-[70vh] w-full">
        <SafeImage
          src={
            (frontmatter.coverImage as string) || "/images/branding/cover.jpg"
          }
          alt={(frontmatter.title as string) || "Blog Cover"}
          preload={true}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-20 max-w-7xl mx-auto">
          <div className="max-w-4xl">
            <p className="text-brand text-[10px] font-bold uppercase tracking-[0.5em] mb-6">
              {frontmatter.date as string}
            </p>
            <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9] text-white italic">
              {frontmatter.title as string}
            </h1>
          </div>
        </div>
      </div>

      {/* Blog Content with Tailwind Typography */}
      <div className="max-w-3xl mx-auto px-6 mt-20">
        <div
          className="
          prose prose-invert prose-white 
          max-w-none

          /* Headings */
          prose-h2:text-white prose-h2:text-3xl prose-h2:tracking-[0.2em] prose-h2:uppercase prose-h2:font-bold prose-h2:mt-24
          prose-h3:text-white prose-h3:text-xl prose-h3:tracking-wider prose-h3:uppercase prose-h3:mt-16

          /* Body Text */
          prose-p:text-neutral-400 prose-p:leading-relaxed prose-p:text-lg
          prose-strong:text-brand prose-strong:font-bold

          /* Decorative Elements */
          prose-blockquote:border-l-brand prose-blockquote:bg-white/5 prose-blockquote:py-2 prose-blockquote:rounded-r-2xl
          prose-blockquote:italic prose-blockquote:text-neutral-300

          /* Data Tables */
          prose-table:border-white/10
          prose-th:text-brand prose-th:uppercase prose-th:text-[10px] prose-th:tracking-widest

          /* List Styles */
          prose-li:text-neutral-400
        "
        >
          {content && (
            <MDXRemote
              source={content}
              components={mdxComponents}
              options={{
                mdxOptions: { remarkPlugins: [remarkGfm] },
              }}
            />
          )}
        </div>
      </div>
    </article>
  );
}
