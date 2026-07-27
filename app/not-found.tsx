"use client";

import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(139,92,246,0.08) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 max-w-md">
        <p className="text-8xl font-display font-bold text-gradient mb-4 leading-none">404</p>
        <h1 className="text-2xl font-display font-semibold text-white/80 mb-3">
          Page not found
        </h1>
        <p className="text-white/40 text-sm leading-relaxed mb-8">
          This page doesn&apos;t exist or has been moved. Let&apos;s get you back on track.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium bg-violet-500/15 border border-violet-500/30 text-violet-300 hover:bg-violet-500/20 transition-all duration-200"
          >
            <Home className="w-4 h-4" />
            Go home
          </Link>
          <button
            onClick={() => history.back()}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-white/40 bg-white/[0.04] border border-white/[0.07] hover:bg-white/[0.08] hover:text-white/60 transition-all duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            Go back
          </button>
        </div>
      </div>
    </div>
  );
}
