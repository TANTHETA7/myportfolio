import { FloatingNav } from "@/components/layout/FloatingNav";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ResumeSection } from "@/components/sections/ResumeSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { ScrollProgress } from "@/components/common/ScrollProgress";

export default function HomePage() {
  return (
    <>
      <ScrollProgress />
      <FloatingNav />

      <HeroSection />
      <ProjectsSection />
      <ResumeSection />
      <ContactSection />
      <Footer />
    </>
  );
}
