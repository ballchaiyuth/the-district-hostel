import BlogGallery from "@/components/blog/BlogGallery";
import SafeImage from "@/components/ui/SafeImage";
import { getPostBySlug } from "@/lib/markdown";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import remarkGfm from "remark-gfm";

interface PostPageProps {
  params: Promise<{
    slug: string;
    locale: string;
  }>;
}

/**
 * Custom MDX Components
 * We override standard elements to ensure design consistency and safety.
 */
const mdxComponents = {
  // Use our custom gallery component
  ImageGallery: (props: any) => (
    <div className="not-prose">
      <BlogGallery {...props} />
    </div>
  ),

  // Override standard Markdown image ![alt](src)
  img: (props: any) => (
    <div className="not-prose my-12 overflow-hidden rounded-[2rem] shadow-xl border border-white/5">
      <div className="aspect-[16/9] relative">
        <SafeImage
          src={props.src}
          alt={props.alt || "Blog image"}
          className="object-cover"
        />
      </div>
      {props.alt && (
        <p className="mt-4 text-center text-xs tracking-[0.2em] text-white/30 uppercase">
          {props.alt}
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
    <article className="min-h-screen bg-black text-white pb-24">
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
            <p className="text-orange-500 text-[10px] font-bold uppercase tracking-[0.5em] mb-6">
              {frontmatter.date as string}
            </p>
            <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9] text-white italic">
              {frontmatter.title as string}
            </h1>
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="max-w-3xl mx-auto px-6 mt-20">
        <div
          className="
          prose prose-invert prose-orange 
          max-w-none
          prose-h2:text-3xl prose-h2:tracking-widest prose-h2:uppercase prose-h2:font-bold prose-h2:mt-20
          prose-h3:text-xl prose-h3:tracking-wider prose-h3:uppercase prose-h3:mt-12
          prose-p:text-neutral-400 prose-p:leading-relaxed prose-p:text-lg
          prose-strong:text-orange-500
          prose-blockquote:border-l-orange-500 prose-blockquote:bg-white/5 prose-blockquote:py-4 prose-blockquote:rounded-r-2xl
          prose-table:border-white/10
          prose-th:text-orange-500 prose-th:uppercase prose-th:text-xs
          prose-li:text-neutral-400
        "
        >
          <MDXRemote
            source={content}
            components={mdxComponents}
            options={{
              mdxOptions: { remarkPlugins: [remarkGfm] },
            }}
          />
        </div>
      </div>
    </article>
  );
}
