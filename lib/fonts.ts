import { Inter, JetBrains_Mono, Outfit } from "next/font/google";

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

export const geistMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
  preload: false,
});

// Using Outfit as the display font (close to Clash Display in feel, freely available on Google Fonts)
// To use Clash Display: download from https://www.fontshare.com/fonts/clash-display
// Place the .woff2 files in /public/fonts/ and switch to localFont below
export const clashDisplay = Outfit({
  subsets: ["latin"],
  variable: "--font-clash-display",
  display: "swap",
  preload: true,
  weight: ["400", "500", "600", "700", "800"],
});
