import type { NavItem } from "@/types/navigation";

export const navItems: NavItem[] = [
  {
    id: "home",
    label: "Home",
    href: "/",
    icon: "Home",
    tooltip: "Back to top",
  },
  {
    id: "about",
    label: "About",
    href: "/#about",
    icon: "User",
    tooltip: "About me",
  },
  {
    id: "projects",
    label: "Projects",
    href: "/#projects",
    icon: "FolderGit2",
    tooltip: "Projects",
  },
  {
    id: "activity",
    label: "Activity",
    href: "/#activity",
    icon: "Github",
    tooltip: "Code activity",
  },
  {
    id: "contact",
    label: "Contact",
    href: "/#contact",
    icon: "Mail",
    tooltip: "Get in touch",
  },
];
