import Link from "next/link";
import { ArrowLeft, Clock, Tag, ArrowRight } from "lucide-react";
import { getAllPosts } from "@/lib/mdx";
import { siteConfig } from "@/config/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Blog | ${siteConfig.name}`,
  description: "Writings on AI, robotics, computer vision, and building things.",
};

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="min-h-screen bg-[#030305] text-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-24">
        {/* Header */}
        <div className="mb-16">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-white/30 hover:text-white/60 transition-colors duration-200 mb-8"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to portfolio
          </Link>

          <p className="text-xs font-mono tracking-widest uppercase text-violet-400/60 mb-3">
            Writing
          </p>
          <h1 className="text-4xl sm:text-5xl font-display font-bold text-white/90 leading-tight">
            Blog
          </h1>
          <p className="text-white/40 mt-4 text-lg leading-relaxed">
            Notes on AI, robotics, and building things from scratch.
          </p>
        </div>

        {/* Posts */}
        {posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-white/20 font-mono text-sm">No posts yet. Check back soon.</p>
          </div>
        ) : (
          <div className="space-y-10">
            {posts.map((post) => (
              <article key={post.slug} className="group">
                <Link href={`/blog/${post.slug}`} className="block">
                  {post.featured && (
                    <span className="inline-block mb-3 px-2.5 py-1 rounded-lg text-[10px] font-mono tracking-widest uppercase bg-violet-500/10 border border-violet-500/20 text-violet-400/70">
                      Featured
                    </span>
                  )}

                  <h2 className="text-xl sm:text-2xl font-display font-semibold text-white/80 group-hover:text-white/95 transition-colors duration-200 leading-snug mb-3">
                    {post.title}
                  </h2>

                  <p className="text-white/40 text-sm leading-relaxed mb-4">
                    {post.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-white/25 font-mono">
                    <span>{formatDate(post.date)}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readingTime} min read
                    </span>
                    {post.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="flex items-center gap-1">
                        <Tag className="w-2.5 h-2.5" />
                        {tag}
                      </span>
                    ))}
                    <span className="ml-auto flex items-center gap-1 text-violet-400/50 group-hover:text-violet-400 transition-colors duration-200">
                      Read
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform duration-200" />
                    </span>
                  </div>
                </Link>

                <div className="mt-8 border-b border-white/[0.05]" />
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
