import React, { useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import HeroSection from './sections/HeroSection';
import MarqueeSection from './sections/MarqueeSection';
import AboutSection from './sections/AboutSection';
import ServicesSection from './sections/ServicesSection';
import ProjectsSection, { INITIAL_PROJECTS_DATA } from './sections/ProjectsSection';
import FooterSection from './sections/FooterSection';
import ContactModal from './components/ContactModal';
import PriceModal from './components/PriceModal';
import ProjectLightbox, {
  ProjectData,
  ProjectLightboxHandle,
} from './components/ProjectLightbox';

export function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isPriceOpen, setIsPriceOpen] = useState(false);
  const [projects] = useState<ProjectData[]>(INITIAL_PROJECTS_DATA);
  const [selectedProjectNumber, setSelectedProjectNumber] = useState<string | null>(null);
  const lightboxRef = useRef<ProjectLightboxHandle>(null);

  const selectedProject =
    projects.find((proj) => proj.number === selectedProjectNumber) || null;

  // Mount Lightbox synchronously inside the tap gesture so mobile browsers allow instant video + audio playback
  const handleSelectProject = (project: ProjectData) => {
    flushSync(() => {
      setSelectedProjectNumber(project.number);
    });
    lightboxRef.current?.playFromGesture();
  };

  const handleNavigateSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectTier = (_tierName: string) => {
    setIsContactOpen(true);
  };

  return (
    <div className="bg-[#0C0C0C] text-[#D7E2EA] font-['Kanit',sans-serif] min-h-[100svh]">
      {/* 1. HERO SECTION */}
      <HeroSection
        onOpenContact={() => setIsContactOpen(true)}
        onOpenPrice={() => setIsPriceOpen(true)}
        onNavigateSection={handleNavigateSection}
      />

      {/* 2. MARQUEE SECTION */}
      <MarqueeSection />

      {/* 3. ABOUT SECTION */}
      <AboutSection onOpenContact={() => setIsContactOpen(true)} />

      {/* 4. SERVICES SECTION */}
      <ServicesSection />

      {/* 5. PROJECTS SECTION */}
      <ProjectsSection
        projects={projects}
        onSelectProject={handleSelectProject}
      />

      {/* FOOTER */}
      <FooterSection
        onOpenContact={() => setIsContactOpen(true)}
        onOpenPrice={() => setIsPriceOpen(true)}
      />

      {/* INTERACTIVE MODALS */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

      <PriceModal
        isOpen={isPriceOpen}
        onClose={() => setIsPriceOpen(false)}
        onSelectTier={handleSelectTier}
      />

      <ProjectLightbox
        ref={lightboxRef}
        project={selectedProject}
        onClose={() => setSelectedProjectNumber(null)}
        onContact={() => setIsContactOpen(true)}
      />
    </div>
  );
}

export default App;
