import React from 'react';
import FadeIn from '../components/FadeIn';
import Magnet from '../components/Magnet';
import ContactButton from '../components/ContactButton';

interface HeroSectionProps {
  onOpenContact: () => void;
  onOpenPrice?: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenContact,
  onNavigateSection,
}) => {
  return (
    <section className="h-[100svh] min-h-[600px] max-h-[1100px] flex flex-col justify-between overflow-x-clip relative bg-[#0C0C0C]">
      {/* 1. Navbar */}
      <FadeIn delay={0} y={-20} className="w-full z-30">
        <nav className="w-full flex items-center justify-between px-6 md:px-10 pt-6 md:pt-8 text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem]">
          <button
            onClick={() => onNavigateSection('about')}
            className="hover:opacity-70 transition-opacity duration-200 cursor-pointer bg-transparent border-0 p-0 text-inherit font-inherit uppercase"
          >
            About
          </button>
          <button
            onClick={() => onNavigateSection('projects')}
            className="hover:opacity-70 transition-opacity duration-200 cursor-pointer bg-transparent border-0 p-0 text-inherit font-inherit uppercase"
          >
            Projects
          </button>
          <button
            onClick={onOpenContact}
            className="hover:opacity-70 transition-opacity duration-200 cursor-pointer bg-transparent border-0 p-0 text-inherit font-inherit uppercase"
          >
            Contact
          </button>
        </nav>
      </FadeIn>

      {/* 2. Hero Heading - Infinite Horizontal Marquee Ticker */}
      <div className="w-full overflow-hidden z-0 my-auto py-2">
        <FadeIn delay={0.15} y={40}>
          <div className="w-full overflow-hidden flex">
            <div className="flex whitespace-nowrap shrink-0 items-center animate-hero-marquee">
              <h1 className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap text-[14vw] sm:text-[15vw] md:text-[16vw] lg:text-[17.5vw] select-none pr-12">
                SUBHANSHU RAJ &nbsp;&bull;&nbsp;
              </h1>
              <h1 className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap text-[14vw] sm:text-[15vw] md:text-[16vw] lg:text-[17.5vw] select-none pr-12">
                SUBHANSHU RAJ &nbsp;&bull;&nbsp;
              </h1>
            </div>
          </div>
        </FadeIn>
      </div>

      {/* 3. Hero Portrait (Centered Absolutely) */}
      <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-10 w-[320px] max-w-[90vw] sm:w-[420px] md:w-[520px] lg:w-[600px] pointer-events-auto">
        <FadeIn delay={0.6} y={30}>
          <Magnet
            padding={150}
            strength={3}
            activeTransition="transform 0.3s ease-out"
            inactiveTransition="transform 0.6s ease-in-out"
            className="w-full flex justify-center"
          >
            <img
              src="/assets/hero/character_cutout.png"
              alt="Subhanshu Raj — Photography, Videography & UGC Creator"
              className="w-full h-auto object-contain md:drop-shadow-[0_20px_50px_rgba(0,0,0,0.85)] pointer-events-none select-none"
            />
          </Magnet>
        </FadeIn>
      </div>

      {/* 4. Bottom Bar */}
      <div className="w-full flex items-end justify-between px-6 md:px-10 pb-5 sm:pb-6 md:pb-8 z-20 relative">
        {/* Left Side: Paragraph + Explore My Work Button */}
        <FadeIn delay={0.35} y={20} className="flex flex-col items-start gap-4 z-20">
          <p className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug text-[clamp(0.75rem,1.4vw,1.5rem)] max-w-[260px] sm:max-w-[320px] md:max-w-[380px] select-none">
            UGC, PHOTOGRAPHY<br />
            &amp; VIDEOGRAPHY.<br />
            RESORTS, CAFES, WEDDINGS<br />
            &amp; AI PRODUCT ADS.
          </p>
          <button
            onClick={() => onNavigateSection('projects')}
            style={{
              background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
              boxShadow: '0px 4px 4px rgba(181, 1, 167, 0.25), inset 4px 4px 12px #7721B1',
              outline: '2px solid white',
              outlineOffset: '-3px',
            }}
            className="rounded-full text-white font-medium uppercase tracking-widest px-6 py-3 sm:px-8 sm:py-3.5 text-xs sm:text-sm md:text-base hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 cursor-pointer inline-flex items-center gap-2 shrink-0 select-none"
          >
            <span>EXPLORE MY WORK</span>
            <span className="text-base">&rarr;</span>
          </button>
        </FadeIn>

        {/* Right Side: Contact Me Button */}
        <FadeIn delay={0.5} y={20} className="z-20">
          <ContactButton onClick={onOpenContact} label="LET'S TALK" showArrow />
        </FadeIn>
      </div>
    </section>
  );
};

export default HeroSection;
