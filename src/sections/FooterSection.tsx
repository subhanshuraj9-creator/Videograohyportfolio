import React from 'react';
import ContactButton from '../components/ContactButton';
import { ArrowUpRight } from 'lucide-react';

interface FooterSectionProps {
  onOpenContact: () => void;
  onOpenPrice: () => void;
}

export const FooterSection: React.FC<FooterSectionProps> = ({ onOpenContact, onOpenPrice }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="bg-[#080808] border-t border-[#1F1F1F] text-[#D7E2EA] pt-20 pb-12 px-6 md:px-10 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-16 border-b border-[#1A1A1A]">
          {/* Left - Large Text & Brand */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-mono uppercase tracking-widest text-[#B600A8]">
              Available For Resorts, Cafes, Weddings, Travel &amp; Brand UGC
            </span>
            <h3 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white leading-tight">
              Ready to elevate your brand with <span className="hero-heading">Visual Storytelling</span>?
            </h3>
            <p className="text-sm sm:text-base text-[#D7E2EA]/70 font-light max-w-lg leading-relaxed">
              SUBHANSHU RAJ — Photographer, Videographer &amp; UGC Creator capturing resorts, cafe reels, travel stories, weddings, and AI-powered product commercials.
            </p>
            <div className="pt-2">
              <ContactButton onClick={onOpenContact} label="Book A Shoot" />
            </div>
          </div>

          {/* Right - Quick Links & Socials */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-8">
            <div>
              <h4 className="text-xs uppercase font-bold tracking-widest text-[#D7E2EA]/50 mb-4">Navigation</h4>
              <ul className="space-y-3 text-sm font-medium uppercase tracking-wider">
                <li>
                  <a href="#about" className="hover:text-white transition-colors">About</a>
                </li>
                <li>
                  <button onClick={onOpenPrice} className="hover:text-white transition-colors cursor-pointer text-left">Price</button>
                </li>
                <li>
                  <a href="#projects" className="hover:text-white transition-colors">Projects</a>
                </li>
                <li>
                  <button onClick={onOpenContact} className="hover:text-white transition-colors cursor-pointer text-left">Contact</button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs uppercase font-bold tracking-widest text-[#D7E2EA]/50 mb-4">Connect</h4>
              <ul className="space-y-3 text-sm font-light text-[#D7E2EA]/80">
                <li>
                  <a href="https://www.instagram.com/raj_subhanshu/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
                    <span>Instagram</span>
                    <ArrowUpRight size={14} />
                  </a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/in/subhanshu-raj-1402991b8" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
                    <span>LinkedIn</span>
                    <ArrowUpRight size={14} />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-light text-[#D7E2EA]/50">
          <div>
            &copy; {currentYear} SUBHANSHU RAJ. All rights reserved.
          </div>
          <div className="flex items-center gap-2">
            <span>Photography · Videography · Cafe, Resort &amp; AI UGC</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
