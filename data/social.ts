import type { SocialLink } from "@/types/social";

export const socialLinks: SocialLink[] = [
  {
    platform: "github",
    label: "GitHub",
    url: "https://github.com/TANTHETA7",
    icon: "FiGithub",
    username: "TANTHETA7",
    color: "#ffffff",
    showInNav: true,
    showInFooter: true,
    showInContact: true,
  },
  {
    platform: "linkedin",
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/tanmay-singh-82456a34a",
    icon: "FiLinkedin",
    username: "tanmay-singh-82456a34a",
    color: "#0A66C2",
    showInNav: true,
    showInFooter: true,
    showInContact: true,
  },
  {
    platform: "email",
    label: "Email",
    url: "mailto:tanmaynew25@gmail.com",
    icon: "FiMail",
    color: "#8b5cf6",
    showInNav: false,
    showInFooter: true,
    showInContact: true,
  },
  {
    platform: "leetcode",
    label: "LeetCode",
    url: "https://leetcode.com/u/U1dRE5dhPW/",
    icon: "SiLeetcode",
    username: "U1dRE5dhPW",
    color: "#FFA116",
    showInNav: false,
    showInFooter: true,
    showInContact: false,
  },
  {
    platform: "scholar",
    label: "Google Scholar",
    url: "https://scholar.google.com",
    icon: "SiGooglescholar",
    color: "#4285F4",
    showInNav: false,
    showInFooter: false,
    showInContact: true,
  },
];

export const getNavSocialLinks = (): SocialLink[] =>
  socialLinks.filter((s) => s.showInNav);

export const getFooterSocialLinks = (): SocialLink[] =>
  socialLinks.filter((s) => s.showInFooter);

export const getContactSocialLinks = (): SocialLink[] =>
  socialLinks.filter((s) => s.showInContact);
