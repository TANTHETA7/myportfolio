"use client";

import { useState, useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import {
  Home,
  FolderGit2,
  Github,
  Mail,
  FileText,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useScrollY } from "@/hooks/useScrollProgress";
import { scrollToSection } from "@/hooks/useLenis";

type IconComponent = React.ComponentType<{ className?: string; style?: React.CSSProperties }>;

const iconMap: Record<string, IconComponent> = {
  Home,
  FolderGit2,
  Github,
  Mail,
  ExternalLink,
};

interface DockItem {
  id: string;
  label: string;
  icon: string;
  href: string;
  isExternal?: boolean;
}

const dockItems: DockItem[] = [
  { id: "home", label: "Home", icon: "Home", href: "#" },
  { id: "projects", label: "Projects", icon: "FolderGit2", href: "#projects" },
  { id: "activity", label: "Activity", icon: "Github", href: "#activity" },
  { id: "contact", label: "Contact", icon: "Mail", href: "#contact" },
];

function DockIcon({
  item,
  mouseX,
}: {
  item: DockItem;
  mouseX: ReturnType<typeof useMotionValue<number>>;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthTransform = useTransform(distance, [-120, 0, 120], [40, 56, 40]);
  const heightTransform = useTransform(distance, [-120, 0, 120], [40, 56, 40]);
  const yTransform = useTransform(distance, [-120, 0, 120], [0, -8, 0]);

  const width = useSpring(widthTransform, { stiffness: 300, damping: 30 });
  const height = useSpring(heightTransform, { stiffness: 300, damping: 30 });
  const y = useSpring(yTransform, { stiffness: 300, damping: 30 });

  const [hovered, setHovered] = useState(false);
  const Icon: IconComponent = iconMap[item.icon] ?? Home;

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      if (item.isExternal) return;
      e.preventDefault();
      const sectionId = item.href.replace("#", "");
      if (sectionId === "" || sectionId === "#") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        scrollToSection(sectionId, -80);
      }
    },
    [item]
  );

  return (
    <div className="relative flex flex-col items-center">
      {/* Tooltip */}
      {hovered && (
        <motion.div
          className="absolute -top-10 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-lg text-xs font-medium text-white/90 bg-white/10 border border-white/10 backdrop-blur-xl whitespace-nowrap pointer-events-none"
          initial={{ opacity: 0, y: 4, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.15 }}
        >
          {item.label}
        </motion.div>
      )}

      <motion.div
        ref={ref}
        style={{ width, height, y }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="flex items-center justify-center"
      >
        <a
          href={item.href}
          onClick={handleClick}
          aria-label={item.label}
          className={cn(
            "relative flex items-center justify-center w-full h-full rounded-xl",
            "bg-white/[0.06] border border-white/[0.08]",
            "hover:bg-white/[0.10] hover:border-white/[0.14]",
            "transition-colors duration-200",
            "text-white/50 hover:text-white/90"
          )}
          data-cursor="pointer"
        >
          <Icon className="w-[46%] h-[46%]" style={{ strokeWidth: 1.5 }} />
        </a>
      </motion.div>
    </div>
  );
}

export function FloatingNav() {
  const mouseX = useMotionValue(Infinity);
  const scrollY = useScrollY();
  const isScrolled = scrollY > 80;

  return (
    <motion.nav
      className="fixed bottom-6 left-1/2 z-50"
      style={{ x: "-50%" }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      aria-label="Main navigation"
    >
      <motion.div
        className={cn(
          "flex items-end gap-2 px-3 py-2 rounded-2xl",
          "bg-white/[0.04] backdrop-blur-2xl",
          "border border-white/[0.07]",
          "shadow-nav-shadow"
        )}
        animate={{
          backdropFilter: isScrolled ? "blur(32px)" : "blur(24px)",
          backgroundColor: isScrolled ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.04)",
        }}
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
      >
        {dockItems.map((item) => (
          <DockIcon key={item.id} item={item} mouseX={mouseX} />
        ))}

        {/* Divider */}
        <div className="w-px h-8 bg-white/10 mx-1" aria-hidden="true" />

        {/* Resume link */}
        <div className="relative flex flex-col items-center">
          <motion.div
            className="flex items-center justify-center"
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Link
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View Resume"
              className={cn(
                "flex items-center justify-center w-10 h-10 rounded-xl",
                "bg-gradient-to-br from-violet-600/20 to-blue-600/20",
                "border border-violet-500/20",
                "hover:border-violet-500/40 hover:from-violet-600/30 hover:to-blue-600/30",
                "transition-all duration-200",
                "text-violet-400 hover:text-violet-300"
              )}
              data-cursor="pointer"
            >
              <FileText className="w-4 h-4" strokeWidth={1.5} />
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </motion.nav>
  );
}
