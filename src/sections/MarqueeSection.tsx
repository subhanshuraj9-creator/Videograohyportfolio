import React, { useEffect, useRef, useState } from 'react';

interface MarqueeCard {
  index: string;
  category: string;
  title: string;
  format: string;
  gifUrl: string;
}

const ROW1_CARDS: MarqueeCard[] = [
  {
    index: '01',
    category: 'Product UGC',
    title: 'Minimalist HOCL Spray',
    format: 'AI Skincare · Studio Mist',
    gifUrl: '/assets/marquee/marquee_01.webp',
  },
  {
    index: '02',
    category: 'Cafe Reel',
    title: 'The Local Cafe',
    format: 'Sikkim Culture · Latte Art',
    gifUrl: '/assets/marquee/marquee_02.webp',
  },
  {
    index: '03',
    category: 'Resort & Cafe',
    title: 'Appetito Escape',
    format: 'Golden Hour · Dining & Play',
    gifUrl: '/assets/marquee/marquee_03.webp',
  },
  {
    index: '04',
    category: 'Product UGC',
    title: 'Kayali Eden Apple',
    format: 'AI Fragrance · Red Studio',
    gifUrl: '/assets/marquee/marquee_04.webp',
  },
  {
    index: '05',
    category: 'Cafe Reel',
    title: 'Gatsby Coffee Co.',
    format: 'Patio · Coffee & Pancakes',
    gifUrl: '/assets/marquee/marquee_05.webp',
  },
  {
    index: '06',
    category: 'Resort UGC',
    title: 'Experience Serenity',
    format: 'Poolside Villa Walkthrough',
    gifUrl: '/assets/marquee/marquee_06.webp',
  },
];

const ROW2_CARDS: MarqueeCard[] = [
  {
    index: '07',
    category: 'Product UGC',
    title: 'Dot & Key Cica SPF',
    format: 'AI Skincare · Botanical Macro',
    gifUrl: '/assets/marquee/marquee_07.webp',
  },
  {
    index: '08',
    category: 'Cafe Reel',
    title: 'Honey & Dough',
    format: 'European Bakery · Tabletop',
    gifUrl: '/assets/marquee/marquee_08.webp',
  },
  {
    index: '09',
    category: 'Product UGC',
    title: 'MARS Velvet Lip Tint',
    format: 'AI Beauty · Crimson Editorial',
    gifUrl: '/assets/marquee/marquee_09.webp',
  },
  {
    index: '10',
    category: 'Cafe Vlog',
    title: 'Greenr Kitchen',
    format: 'Plant-Based · Creator POV',
    gifUrl: '/assets/marquee/marquee_10.webp',
  },
  {
    index: '11',
    category: 'Resort UGC',
    title: 'Serenity After Dusk',
    format: 'Twilight Pool & Fairy Lights',
    gifUrl: '/assets/marquee/marquee_11.webp',
  },
  {
    index: '12',
    category: 'Cafe Reel',
    title: 'Kitaab Koffee',
    format: 'Boho Garden · Evening Lights',
    gifUrl: '/assets/marquee/marquee_12.webp',
  },
];

const DOUBLED_ROW1 = [...ROW1_CARDS, ...ROW1_CARDS];
const DOUBLED_ROW2 = [...ROW2_CARDS, ...ROW2_CARDS];

const getAbsoluteTop = (el: HTMLElement): number => {
  let top = 0;
  let curr: HTMLElement | null = el;
  while (curr) {
    top += curr.offsetTop;
    curr = curr.offsetParent as HTMLElement | null;
  }
  return top;
};

export const MarqueeSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );

  useEffect(() => {
    let rafId = 0;
    let lastWidth = window.innerWidth;
    let stableHeight = window.innerHeight;
    let sectionTop = 0;
    let sectionHeight = 600;

    const measure = () => {
      const section = sectionRef.current;
      if (!section) return;
      sectionTop = getAbsoluteTop(section);
      sectionHeight = section.offsetHeight || 600;
    };

    const updateTransforms = () => {
      rafId = 0;
      const scrollY = window.scrollY;
      const viewBottom = scrollY + stableHeight;
      // Skip work when section is off-screen
      if (viewBottom < sectionTop - 250 || scrollY > sectionTop + sectionHeight + 250) {
        return;
      }

      const progress = Math.max(
        0,
        Math.min(1, (viewBottom - sectionTop) / (stableHeight + sectionHeight))
      );
      const maxTravel = lastWidth < 768 ? 220 : 340;
      const row1Offset = -maxTravel + progress * maxTravel;
      const row2Offset = -progress * maxTravel;

      if (row1Ref.current) {
        row1Ref.current.style.transform = `translate3d(${row1Offset.toFixed(1)}px, 0, 0)`;
      }
      if (row2Ref.current) {
        row2Ref.current.style.transform = `translate3d(${row2Offset.toFixed(1)}px, 0, 0)`;
      }
    };

    const handleScroll = () => {
      if (!rafId) {
        rafId = requestAnimationFrame(updateTransforms);
      }
    };

    const handleResize = () => {
      if (window.innerWidth !== lastWidth) {
        lastWidth = window.innerWidth;
        stableHeight = window.innerHeight;
        setIsMobile(lastWidth < 768);
        measure();
        handleScroll();
      }
    };

    measure();
    updateTransforms();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const row1Items = isMobile ? ROW1_CARDS : DOUBLED_ROW1;
  const row2Items = isMobile ? ROW2_CARDS : DOUBLED_ROW2;

  const renderTile = (card: MarqueeCard, key: string) => (
    <div
      key={key}
      className="group relative w-[260px] h-[164px] sm:w-[350px] sm:h-[214px] md:w-[420px] md:h-[250px] shrink-0 rounded-2xl overflow-hidden bg-[#111215] border border-white/10 hover:border-[#38bdf8]/50 transition-colors duration-300 select-none shadow-[0_12px_32px_rgba(0,0,0,0.45)]"
    >
      {/* Full-bleed looping animated clip */}
      <img
        src={card.gifUrl}
        alt={`${card.title} — ${card.category}`}
        decoding="async"
        draggable={false}
        className="w-full h-full object-cover md:group-hover:scale-105 md:transition-transform md:duration-700"
      />

      {/* Luxury dark editorial gradient scrim */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/40" />

      {/* Top minimal index & category label */}
      <div className="pointer-events-none absolute top-3.5 left-4 right-4 flex items-center justify-between">
        <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.18em] text-[#D7E2EA]/90 bg-black/70 px-2.5 py-1 rounded-full border border-white/10">
          {card.index} &middot; {card.category}
        </span>
      </div>

      {/* Bottom title & format */}
      <div className="pointer-events-none absolute bottom-3.5 left-4 right-4">
        <h3 className="text-base sm:text-xl md:text-2xl font-bold uppercase tracking-tight text-white leading-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]">
          {card.title}
        </h3>
        <p className="text-[11px] sm:text-xs text-[#D7E2EA]/80 mt-0.5 tracking-wide">
          {card.format}
        </p>
      </div>
    </div>
  );

  return (
    <section
      ref={sectionRef}
      className="bg-[#0C0C0C] pt-14 sm:pt-24 md:pt-32 pb-12 overflow-hidden relative touch-pan-y"
    >
      {/* Subtle left/right vignette fades so moving visuals melt seamlessly into dark background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-10 sm:w-24 md:w-36 z-10 bg-gradient-to-r from-[#0C0C0C] to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 w-10 sm:w-24 md:w-36 z-10 bg-gradient-to-l from-[#0C0C0C] to-transparent"
      />

      <div className="flex flex-col gap-3.5 sm:gap-4">
        {/* Row 1 - Moves RIGHT on scroll */}
        <div className="overflow-hidden w-full flex">
          <div
            ref={row1Ref}
            className="flex gap-3.5 sm:gap-4 shrink-0 will-change-transform"
          >
            {row1Items.map((card, index) => renderTile(card, `r1-${index}`))}
          </div>
        </div>

        {/* Row 2 - Moves LEFT on scroll */}
        <div className="overflow-hidden w-full flex">
          <div
            ref={row2Ref}
            className="flex gap-3.5 sm:gap-4 shrink-0 will-change-transform"
          >
            {row2Items.map((card, index) => renderTile(card, `r2-${index}`))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarqueeSection;
