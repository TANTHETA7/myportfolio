export const siteConfig = {
  name: "Tanmay",
  fullName: "Tanmay Singh",
  title: "AI Engineer & CS Student",
  tagline: "I build intelligent systems where AI meets hardware.",
  description:
    "Computer Science & Data Science student passionate about AI, Machine Learning, Computer Vision, Embedded Systems, and Robotics. Building at the intersection of intelligence and hardware.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://tanmay.dev",
  ogImage: "/og-image.png",
  email: "tanmaynew25@gmail.com",
  location: "Bengaluru, India",
  university: "CMR Institute of Technology",
  degree: "B.E. Computer Science & Data Science",
  graduationYear: "2028",

  github: {
    username: "TANTHETA7",
    url: "https://github.com/TANTHETA7",
  },
  leetcode: {
    username: "U1dRE5dhPW",
    url: "https://leetcode.com/u/U1dRE5dhPW/",
  },
  linkedin: {
    url: "https://www.linkedin.com/in/tanmay-singh-82456a34a",
    username: "tanmay-singh-82456a34a",
  },

  keywords: [
    "Tanmay Singh",
    "AI Engineer",
    "Machine Learning",
    "Computer Vision",
    "Embedded Systems",
    "IoT",
    "Robotics",
    "Full Stack Developer",
    "Next.js",
    "Python",
    "Deep Learning",
    "Neural Networks",
    "Portfolio",
    "TANTHETA7",
  ],
  authors: [{ name: "Tanmay Singh", url: "https://tanmay.dev" }],
  creator: "Tanmay Singh",
  themeColor: "#030305",
  accentColors: {
    primary: "#8b5cf6",
    secondary: "#3b82f6",
    tertiary: "#06b6d4",
  },

  sections: {
    hero: true,
    about: true,
    skills: false, // Skills section removed from the page
    projects: true,
    research: false, // no verified paper titles/venues yet — flip on once available
    experience: true,
    github: true,
    leetcode: true,
    linkedin: true,
    certificates: true,
    resume: true,
    contact: true,
  },

  resumeUrl: "/resume.pdf",

  // ISR revalidation seconds for live data
  revalidate: {
    github: 3600,      // 1 hour
    leetcode: 3600,    // 1 hour
    projects: 1800,    // 30 min (projects may update more often)
    resume: 86400,     // 24 hours
  },

  // Projects engine settings
  projectsEngine: {
    maxAutoProjects: 20,       // Max projects fetched from GitHub
    minStars: 0,               // Minimum stars to include
    excludeForks: true,        // Skip forks
    excludePrivate: true,      // Skip private repos
    featuredRepos: [] as string[], // Add real repo names here once public
  },
} as const;

export type SiteConfig = typeof siteConfig;
