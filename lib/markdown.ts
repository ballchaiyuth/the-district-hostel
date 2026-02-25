import fs from "fs";
import matter from "gray-matter";
import path from "path";

const contentDirectory = path.join(process.cwd(), "public/content/blog");

/**
 * Get a single post by slug and locale
 */
export async function getPostBySlug(slug: string, locale: string) {
  const fullPath = path.join(contentDirectory, slug, `index.${locale}.md`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");

  // Separate frontmatter and raw content
  const { data, content } = matter(fileContents);

  return {
    slug,
    frontmatter: data,
    content, // Passed as raw string to MDXRemote
  };
}

/**
 * Get all posts for a specific locale (for Listing Page)
 */
export async function getAllPosts(locale: string) {
  if (!fs.existsSync(contentDirectory)) return [];

  const folders = fs.readdirSync(contentDirectory);

  const posts = await Promise.all(
    folders.map(async (folder) => {
      // Ensure it's a directory (ignore system files like .DS_Store)
      const folderPath = path.join(contentDirectory, folder);
      if (!fs.statSync(folderPath).isDirectory()) return null;

      const post = await getPostBySlug(folder, locale);
      if (!post) return null;

      return {
        slug: folder,
        frontmatter: post.frontmatter,
      };
    }),
  );

  // Filter nulls and sort by date descending
  return posts
    .filter((post): post is { slug: string; frontmatter: any } => post !== null)
    .sort((a, b) => {
      const dateA = new Date(a.frontmatter.date as string).getTime();
      const dateB = new Date(b.frontmatter.date as string).getTime();
      return dateB - dateA;
    });
}
