import React from 'react';
import FadeIn from '../components/FadeIn';

interface ServiceItem {
  number: string;
  name: string;
  description: string;
}

const SERVICES_DATA: ServiceItem[] = [
  {
    number: '01',
    name: 'Resort, Cafe & Travel UGC',
    description:
      'Guest-perspective 9:16 stay walkthroughs, aesthetic cafe reels, travel storytelling, and hospitality visuals captured to inspire visits and bookings.',
  },
  {
    number: '02',
    name: 'Photography & Wedding Shoots',
    description:
      'Candid wedding moments, editorial portraits, resort interiors, and travel photography shot with natural emotion and timeless color grading.',
  },
  {
    number: '03',
    name: 'AI Product UGC & Commercials',
    description:
      'Scroll-stopping AI-powered product videos, studio-grade visuals, and hook-driven ads tailored for beauty, skincare, and modern D2C brands.',
  },
  {
    number: '04',
    name: 'Video Editing & Color Grading',
    description:
      'Dynamic short-form pacing, ambient sound design, clean captions, and filmic color grading delivered ready for Reels, Shorts, and ad campaigns.',
  },
];

export const ServicesSection: React.FC = () => {
  return (
    <section
      id="services"
      className="bg-[#FFFFFF] text-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 relative z-0"
    >
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <FadeIn delay={0} y={40}>
          <h2 className="text-[#0C0C0C] font-black uppercase text-center text-[clamp(3rem,12vw,160px)] leading-none mb-16 sm:mb-20 md:mb-28 select-none">
            Services
          </h2>
        </FadeIn>

        {/* Services List */}
        <div className="flex flex-col border-t border-[#0C0C0C]/15">
          {SERVICES_DATA.map((service, index) => (
            <FadeIn key={service.number} delay={index * 0.1} y={30}>
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 md:gap-12 py-8 sm:py-10 md:py-12 border-b border-[#0C0C0C]/15 group cursor-default">
                {/* Number */}
                <div className="font-black text-[#0C0C0C] text-[clamp(3rem,10vw,140px)] leading-none select-none shrink-0 min-w-[120px] sm:min-w-[180px] group-hover:translate-x-2 transition-transform duration-300">
                  {service.number}
                </div>

                {/* Name + Description Stacked */}
                <div className="flex flex-col gap-2 max-w-2xl my-auto">
                  <h3 className="font-medium uppercase text-[clamp(1rem,2.2vw,2.1rem)] text-[#0C0C0C] tracking-wide group-hover:translate-x-1.5 transition-transform duration-300">
                    {service.name}
                  </h3>
                  <p className="font-light leading-relaxed text-[#0C0C0C] opacity-60 group-hover:opacity-90 transition-opacity duration-300 text-[clamp(0.85rem,1.6vw,1.25rem)]">
                    {service.description}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
