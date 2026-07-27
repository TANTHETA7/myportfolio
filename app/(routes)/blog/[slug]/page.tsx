import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, Tag, Calendar } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { getAllPosts, getPostBySlug } from "@/lib/mdx";
import { siteConfig } from "@/config/site";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} | ${siteConfig.name}`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
    },
  };
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <main className="min-h-screen bg-[#030305] text-white">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-24">
        {/* Nav */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-white/30 hover:text-white/60 transition-colors duration-200 mb-12"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          All posts
        </Link>

        {/* Header */}
        <header className="mb-12">
          {post.featured && (
            <span className="inline-block mb-4 px-2.5 py-1 rounded-lg text-[10px] font-mono tracking-widest uppercase bg-violet-500/10 border border-violet-500/20 text-violet-400/70">
              Featured
            </span>
          )}

          <h1 className="text-3xl sm:text-4xl font-display font-bold text-white/90 leading-tight mb-4">
            {post.title}
          </h1>

          <p className="text-white/40 text-lg leading-relaxed mb-6">{post.description}</p>

          <div className="flex flex-wrap items-center gap-5 text-xs text-white/25 font-mono pb-6 border-b border-white/[0.06]">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {formatDate(post.date)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {post.readingTime} min read
            </span>
            {post.tags.map((tag) => (
              <span key={tag} className="flex items-center gap-1">
                <Tag className="w-3 h-3" />
                {tag}
              </span>
            ))}
          </div>
        </header>

        {/* MDX Content */}
        <div className="prose-blog">
          <MDXRemote
            source={post.content}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
                rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
              },
            }}
          />
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-white/[0.06]">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-white/30 hover:text-white/60 transition-colors duration-200"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to all posts
          </Link>
        </footer>
      </div>
    </main>
  );
}
