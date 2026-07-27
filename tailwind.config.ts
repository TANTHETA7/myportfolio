import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./sections/**/*.{js,ts,jsx,tsx,mdx}",
    "./providers/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", ...defaultTheme.fontFamily.sans],
        display: ["var(--font-clash-display)", ...defaultTheme.fontFamily.sans],
        mono: ["var(--font-geist-mono)", ...defaultTheme.fontFamily.mono],
      },
      colors: {
        background: {
          DEFAULT: "#030305",
          secondary: "#08080f",
          tertiary: "#0d0d1a",
        },
        surface: {
          DEFAULT: "rgba(255,255,255,0.04)",
          hover: "rgba(255,255,255,0.07)",
          active: "rgba(255,255,255,0.10)",
        },
        border: {
          DEFAULT: "rgba(255,255,255,0.07)",
          hover: "rgba(255,255,255,0.15)",
          strong: "rgba(255,255,255,0.20)",
        },
        text: {
          primary: "#f0f0ff",
          secondary: "#8b8ba8",
          tertiary: "#5a5a72",
          accent: "#a78bfa",
        },
        accent: {
          blue: "#3b82f6",
          purple: "#8b5cf6",
          violet: "#7c3aed",
          cyan: "#06b6d4",
          pink: "#ec4899",
          indigo: "#6366f1",
        },
        glow: {
          blue: "rgba(59,130,246,0.4)",
          purple: "rgba(139,92,246,0.4)",
          cyan: "rgba(6,182,212,0.4)",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "glass-gradient":
          "linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 100%)",
        "hero-gradient":
          "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(120,80,255,0.25), transparent)",
        "aurora-1":
          "radial-gradient(ellipse at 20% 50%, rgba(120,40,200,0.18) 0%, transparent 60%)",
        "aurora-2":
          "radial-gradient(ellipse at 80% 20%, rgba(40,80,200,0.18) 0%, transparent 60%)",
        "aurora-3":
          "radial-gradient(ellipse at 60% 80%, rgba(20,160,220,0.12) 0%, transparent 60%)",
      },
      boxShadow: {
        glass: "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)",
        "glass-hover":
          "0 16px 48px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.12)",
        "glow-blue": "0 0 40px rgba(59,130,246,0.35)",
        "glow-purple": "0 0 40px rgba(139,92,246,0.35)",
        "glow-cyan": "0 0 40px rgba(6,182,212,0.35)",
        "glow-sm-blue": "0 0 20px rgba(59,130,246,0.25)",
        "glow-sm-purple": "0 0 20px rgba(139,92,246,0.25)",
        "card-lift":
          "0 24px 64px rgba(0,0,0,0.6), 0 8px 24px rgba(0,0,0,0.4)",
        "nav-shadow":
          "0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)",
        premium:
          "0 0 0 1px rgba(255,255,255,0.06), 0 32px 64px rgba(0,0,0,0.5), 0 8px 16px rgba(0,0,0,0.3)",
      },
      backdropBlur: {
        xs: "2px",
        "4xl": "48px",
      },
      animation: {
        "float-slow": "float 8s ease-in-out infinite",
        "float-medium": "float 6s ease-in-out infinite",
        "float-fast": "float 4s ease-in-out infinite",
        "pulse-glow": "pulseGlow 3s ease-in-out infinite",
        "aurora-shift": "auroraShift 12s ease-in-out infinite",
        "spin-slow": "spin 20s linear infinite",
        "gradient-shift": "gradientShift 8s ease-in-out infinite",
        "slide-up": "slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-in": "fadeIn 0.6s ease forwards",
        shimmer: "shimmer 2.5s linear infinite",
        orbit: "orbit 20s linear infinite",
        "bounce-subtle": "bounceSub 2s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "33%": { transform: "translateY(-12px) rotate(1deg)" },
          "66%": { transform: "translateY(-6px) rotate(-1deg)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "0.8", transform: "scale(1.05)" },
        },
        auroraShift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        gradientShift: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        slideUp: {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        orbit: {
          from: { transform: "rotate(0deg) translateX(120px) rotate(0deg)" },
          to: { transform: "rotate(360deg) translateX(120px) rotate(-360deg)" },
        },
        bounceSub: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
      transitionTimingFunction: {
        "spring-bounce": "cubic-bezier(0.34, 1.56, 0.64, 1)",
        "spring-smooth": "cubic-bezier(0.16, 1, 0.3, 1)",
        "expo-out": "cubic-bezier(0.16, 1, 0.3, 1)",
        "expo-in": "cubic-bezier(0.7, 0, 0.84, 0)",
      },
      spacing: {
        "18": "4.5rem",
        "88": "22rem",
        "128": "32rem",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      zIndex: {
        "60": "60",
        "70": "70",
        "80": "80",
        "90": "90",
        "100": "100",
      },
      screens: {
        xs: "480px",
        "3xl": "1920px",
      },
    },
  },
  plugins: [],
};

export default config;
