"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface GlassImageProps {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}

/**
 * Renders an image with a glassmorphic frame (translucent border + diagonal
 * shine overlay). Fails silently (renders nothing) if the image 404s, so a
 * parent's own placeholder background shows through underneath — lets us
 * point every project at a coverImage path without needing the asset to
 * exist yet.
 */
export function GlassImage({ src, alt, className, sizes, priority }: GlassImageProps) {
  const [errored, setErrored] = useState(false);

  if (errored) return null;

  return (
    <div className={cn("absolute inset-0", className)}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
        onError={() => setErrored(true)}
      />
      {/* Glass shine overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0.03) 32%, transparent 55%)",
        }}
      />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/50 via-black/5 to-transparent" />
      <div className="absolute inset-0 pointer-events-none border border-white/15 rounded-[inherit]" />
    </div>
  );
}
