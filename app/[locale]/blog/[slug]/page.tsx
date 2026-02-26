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
 * Custom MDX Components with synchronized branding and layout
 */
const mdxComponents = {
  // Gallery Component
  ImageGallery: (props: { images?: string | string[]; caption?: string }) => (
    <div className="not-prose my-16 group">
      <BlogGallery images={props.images} />
      {/* Dynamic Caption: Only renders if caption exists */}
      {props.caption && (
        <div className="mt-6 flex justify-center px-4">
          <div className="flex items-center gap-4">
            <div className="h-[1px] w-8 bg-brand/30" />
            <p className="text-[10px] font-medium uppercase tracking-[0.4em] text-white/40">
              {props.caption}
            </p>
            <div className="h-[1px] w-8 bg-brand/30" />
          </div>
        </div>
      )}
    </div>
  ),

  // Optimized Single Image Component
  // In Markdown, you can use: <SingleImage src="..." caption="..." />
  // Or standard: ![caption](src) -> This will still work as fallback
  SingleImage: (props: { src: string; alt?: string; caption?: string }) => (
    <div className="not-prose my-16 group">
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[2rem] border border-white/5 shadow-2xl">
        <SafeImage
          src={props.src}
          alt={props.caption || props.alt || "The District Blog Image"}
          className="object-cover transition-transform duration-[2s] group-hover:scale-105"
        />
      </div>

      {/* Synchronized Caption: Zero height if empty */}
      {props.caption && (
        <div className="mt-6 flex justify-center px-4">
          <div className="flex items-center gap-4">
            <div className="h-[1px] w-8 bg-brand/30" />
            <p className="text-[10px] font-medium uppercase tracking-[0.4em] text-white/40">
              {props.caption}
            </p>
            <div className="h-[1px] w-8 bg-brand/30" />
          </div>
        </div>
      )}
    </div>
  ),

  // Fallback for standard Markdown images ![alt](src)
  img: (props: ComponentPropsWithoutRef<"img">) => (
    <div className="not-prose my-16 group">
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[2rem] border border-white/5 shadow-2xl">
        {props.src && (
          <SafeImage
            src={props.src}
            alt={props.alt || ""}
            className="object-cover transition-transform duration-[2s] group-hover:scale-105"
          />
        )}
      </div>
      {/* Standard markdown uses alt as caption for convenience */}
      {props.alt && (
        <div className="mt-6 flex justify-center px-4">
          <div className="flex items-center gap-4">
            <div className="h-[1px] w-8 bg-brand/30" />
            <p className="text-[10px] font-medium uppercase tracking-[0.4em] text-white/40">
              {props.alt}
            </p>
            <div className="h-[1px] w-8 bg-brand/30" />
          </div>
        </div>
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
    <article className="min-h-screen bg-neutral-950 text-white pb-24">
      {/* Article Hero */}
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

      {/* Article Body */}
      <div className="max-w-3xl mx-auto px-6 mt-20">
        <div
          className="
          prose prose-invert prose-white 
          max-w-none

          /* Hierarchy & Typography */
          prose-h2:text-white prose-h2:text-3xl prose-h2:tracking-[0.2em] prose-h2:uppercase prose-h2:font-bold prose-h2:mt-24
          prose-h3:text-white prose-h3:text-xl prose-h3:tracking-wider prose-h3:uppercase prose-h3:mt-16
          prose-p:text-neutral-400 prose-p:leading-relaxed prose-p:text-lg
          prose-strong:text-brand prose-strong:font-bold

          /* Block Elements */
          prose-blockquote:border-l-brand prose-blockquote:bg-white/5 prose-blockquote:py-2 prose-blockquote:rounded-r-2xl
          prose-blockquote:italic prose-blockquote:text-neutral-300

          /* Table & List Aesthetics */
          prose-table:border-white/10
          prose-th:text-brand prose-th:uppercase prose-th:text-[10px] prose-th:tracking-widest
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
