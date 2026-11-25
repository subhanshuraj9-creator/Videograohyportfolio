import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Mouse, Play } from 'lucide-react';
import FadeIn from '../components/FadeIn';
import { ProjectData, ProjectFilterGroup } from '../components/ProjectLightbox';

interface ProjectsSectionProps {
  projects: ProjectData[];
  onSelectProject: (project: ProjectData) => void;
}

export const INITIAL_PROJECTS_DATA: ProjectData[] = [
  {
    number: '01',
    name: 'THE LOCAL CAFE',
    category: 'CAFE REEL',
    filterGroup: 'cafe',
    buttonLabel: 'WATCH REEL',
    metric: '0:14 · 9:16 CAFE REEL',
    formatLabel: 'Sikkim Culture · Specialty Coffee & Interiors',
    mediaUrl: '/assets/reels/local_cafe.mp4',
    posterUrl: '/assets/posters/IMG_3153.jpg',
    mediaType: 'video',
    hasAudio: true,
    mediaTitle: 'The Local Cafe Reel',
    description:
      'Atmospheric cafe reel rooted in Sikkim culture—weaving together newspaper menus, velvety latte art, hand-painted murals, sunlit wooden seating, and handwritten wall notes.',
    conceptDetails:
      'Crafted as a warm visual vignette celebrating local heritage, authentic hospitality texture, and calm coffee-house energy.',
    creativeDirection:
      'Warm lo-fi rhythm, textured natural shadows, tight tabletop detail cuts, and authentic cultural storytelling.',
    toolsUsed: ['Cafe Reel', 'Latte Art', 'Cultural Vibe'],
    tags: ['Cafe Reel', 'Hospitality', '9:16 Video'],
  },
  {
    number: '02',
    name: 'APPETITO — WEEKEND ESCAPE',
    category: 'RESORT & CAFE REEL',
    filterGroup: 'resort',
    buttonLabel: 'WATCH REEL',
    metric: '0:53 · 9:16 LIFESTYLE REEL',
    formatLabel: 'Farmhouse Dining · Mini-Golf & Pickleball',
    mediaUrl: '/assets/reels/appetito.mp4',
    posterUrl: '/assets/posters/IMG_3164.jpg',
    mediaType: 'video',
    hasAudio: true,
    mediaTitle: 'Appetito Weekend Escape Reel',
    description:
      'Full weekend escape reel following the drive into Appetito—golden-hour plated dining, woven rattan lantern interiors, sunset mini-golf putting greens, and pickleball courts.',
    conceptDetails:
      'Paced like an afternoon getaway from arrival to sunset leisure, showcasing food, ambiance, and resort-style activities in one seamless flow.',
    creativeDirection:
      'Sunlit lifestyle cinematography transitioning smoothly from artisanal dishes to warm evening hospitality and outdoor play.',
    toolsUsed: ['Weekend Escape', 'Farmhouse Cafe', 'Lifestyle Film'],
    tags: ['Resort & Cafe', 'Hospitality', 'Lifestyle'],
  },
  {
    number: '03',
    name: 'GATSBY COFFEE COMPANY',
    category: 'CAFE REEL',
    filterGroup: 'cafe',
    buttonLabel: 'WATCH REEL',
    metric: '0:13 · 9:16 CAFE REEL',
    formatLabel: 'Must-Visit Patio · Coffee & Berry Pancakes',
    mediaUrl: '/assets/reels/gatsby_coffee.mp4',
    posterUrl: '/assets/posters/IMG_3151.jpg',
    mediaType: 'video',
    hasAudio: false,
    mediaTitle: 'Gatsby Coffee Company Reel',
    description:
      'Fast-cut cafe highlight reel capturing Gatsby Coffee Company’s lush green patio, festive charm, freshly poured lattes, berry pancakes, striped awnings, and charming cafe moments.',
    conceptDetails:
      'Structured with an instant lifestyle hook and tight visual rhythm designed to maximize Instagram saves and weekend footfall.',
    creativeDirection:
      'Crisp beat-synced pacing with inviting food close-ups, greenery frames, and playful lifestyle cutaways.',
    toolsUsed: ['Cafe UGC', 'Food & Coffee', 'Fast-Cut Reel'],
    tags: ['Cafe Reel', 'Coffee', 'Instagram Reels'],
  },
  {
    number: '04',
    name: 'EXPERIENCE SERENITY',
    category: 'RESORT REEL',
    filterGroup: 'resort',
    buttonLabel: 'WATCH REEL',
    metric: '0:57 · 9:16 RESORT WALKTHROUGH',
    formatLabel: 'Day-to-Night Stay · Pool Cabanas & Suites',
    mediaUrl: '/assets/reels/serenity_resort.mp4',
    posterUrl: '/assets/posters/IMG_3150.jpg',
    mediaType: 'video',
    hasAudio: true,
    mediaTitle: 'Experience Serenity Resort Reel',
    description:
      'Tranquil day-to-night resort walkthrough featuring poolside cabanas, illuminated architectural facades, garden walkways, guest suites, and floral evening dining spaces.',
    conceptDetails:
      'Takes prospective guests through the entire stay experience—from bright afternoon poolside views to warm fairy-lit evenings.',
    creativeDirection:
      'Calm architectural pans and pool water reflections transitioning gently from golden dusk into glowing night ambiance.',
    toolsUsed: ['Resort Walkthrough', 'Day-to-Night', 'Hospitality'],
    tags: ['Resort UGC', 'Stay Tour', 'Hospitality'],
  },
  {
    number: '05',
    name: 'HONEY & DOUGH',
    category: 'CAFE REEL',
    filterGroup: 'cafe',
    buttonLabel: 'WATCH REEL',
    metric: '0:13 · 9:16 CAFE REEL',
    formatLabel: 'European-Style Bakery Cafe · Pasta & Pastries',
    mediaUrl: '/assets/reels/honey_dough.mp4',
    posterUrl: '/assets/posters/IMG_3154.jpg',
    mediaType: 'video',
    hasAudio: false,
    mediaTitle: 'Honey & Dough Bakery Cafe Reel',
    description:
      'Save-worthy bakery cafe reel for Honey & Dough—featuring artisan pastry displays, pastel gift hampers, creamy pasta with garlic toast, iced lattes, and herringbone wooden interiors.',
    conceptDetails:
      'Built around a "saving this café for later" hook pairing appetizing food action shots with boutique bakery aesthetics.',
    creativeDirection:
      'Appetizing tabletop movements paired with bright interior reveals and glowing evening exterior signage.',
    toolsUsed: ['Bakery Cafe', 'Food Reels', 'Interior Tour'],
    tags: ['Cafe Reel', 'Bakery', 'Food & Drink'],
  },
  {
    number: '06',
    name: 'GREENR CAFE',
    category: 'CAFE REEL',
    filterGroup: 'cafe',
    buttonLabel: 'WATCH REEL',
    metric: '0:21 · 9:16 CREATOR VLOG',
    formatLabel: 'Plant-Based Kitchen · Work-From-Cafe Story',
    mediaUrl: '/assets/reels/greenr_cafe.mp4',
    posterUrl: '/assets/posters/IMG_3152.jpg',
    mediaType: 'video',
    hasAudio: false,
    mediaTitle: 'Greenr Cafe Creator Vlog',
    description:
      'Aesthetic work-from-cafe reel inside Greenr’s plant-based kitchen—sunlit wood tables, fresh earthy bowls, laptop creative sessions, espresso bar textures, and the dusk metro commute.',
    conceptDetails:
      'Captures the authentic slow-living creator workday, making the space feel inspiring for remote workers and cafe regulars.',
    creativeDirection:
      'Natural window-light shadows, authentic creator POV storytelling, and clean architectural framing.',
    toolsUsed: ['Cafe Vlog', 'Plant-Based', 'Creator POV'],
    tags: ['Cafe Reel', 'Lifestyle Vlog', 'Work From Cafe'],
  },
  {
    number: '07',
    name: 'KITAAB KOFFEE',
    category: 'CAFE REEL',
    filterGroup: 'cafe',
    buttonLabel: 'WATCH REEL',
    metric: '0:15 · 9:16 CAFE REEL',
    formatLabel: 'Boho Garden Cafe · Books, UNO & Open Mic',
    mediaUrl: '/assets/reels/kitaab_koffee.mp4',
    posterUrl: '/assets/posters/IMG_3155.jpg',
    mediaType: 'video',
    hasAudio: true,
    mediaTitle: 'Kitaab Koffee Garden Cafe Reel',
    description:
      'Storytelling reel for Kitaab Koffee & HouseTaFe capturing brick-wall bookshelves, palm-lit fairy garden seating, steaming noodle bowls over UNO games, and live acoustic open-mic nights.',
    conceptDetails:
      'Framed around a "this café deserves more hype" discovery hook highlighting community warmth and boho night atmosphere.',
    creativeDirection:
      'Intimate warm evening lighting and lively community-driven pacing celebrating hidden-gem cafe culture.',
    toolsUsed: ['Hidden Gem', 'Open Mic Night', 'Community Vibe'],
    tags: ['Cafe Reel', 'Boho Cafe', 'Discovery Hook'],
  },
  {
    number: '08',
    name: 'MINIMALIST HOCL SPRAY',
    category: 'AI SKINCARE CONCEPT',
    filterGroup: 'ai-ugc',
    buttonLabel: 'WATCH AI AD',
    metric: '0:15 · AI SKINCARE UGC CONCEPT',
    formatLabel: 'Self-Initiated Concept · Barrier Relief Commercial',
    mediaUrl: '/assets/reels/minimalist_hocl.mp4',
    posterUrl: '/assets/posters/IMG_1235.jpg',
    mediaType: 'video',
    hasAudio: true,
    mediaTitle: 'Minimalist HOCL Spray AI Skincare Ad',
    description:
      'Self-initiated AI skincare commercial concept for Minimalist HOCL Skin Relief Spray (150 ppm)—pairing calm voiceover storytelling with mist application, glowing skin barrier close-ups, and clean studio packshots.',
    conceptDetails:
      'Demonstrates studio-grade AI product storytelling for dermatological skincare brands with zero physical studio shoot overhead.',
    creativeDirection:
      'Minimalist neutral studio lighting, fine water droplets on matte packaging, and crisp clinical clarity.',
    toolsUsed: ['AI Skincare UGC', 'Concept Commercial', 'Voiceover Ad'],
    tags: ['AI Product UGC', 'Skincare', 'Concept Ad'],
  },
  {
    number: '09',
    name: 'DOT & KEY CICA SUNSCREEN',
    category: 'AI SKINCARE CONCEPT',
    filterGroup: 'ai-ugc',
    buttonLabel: 'WATCH AI AD',
    metric: '0:15 · AI SKINCARE UGC CONCEPT',
    formatLabel: 'Self-Initiated Concept · SPF 50+ Commercial',
    mediaUrl: '/assets/reels/dotkey_sunscreen.mp4',
    posterUrl: '/assets/posters/IMG_1273.jpg',
    mediaType: 'video',
    hasAudio: true,
    mediaTitle: 'Dot & Key Cica Sunscreen AI Skincare Ad',
    description:
      'Self-initiated AI skincare ad concept for Dot & Key Cica Calming Mattifying Sunscreen SPF 50+—blending golden sunlight beauty shots, macro gel-cream texture, mint & hydration visuals, and clean product renders.',
    conceptDetails:
      'Built with a 3-second problem-solution hook ("Sun, heat, excess oil?") leading straight into tactile texture proof and key benefits.',
    creativeDirection:
      'Fresh botanical greens, warm golden-hour skin sheen, tactile formula macro shots, and energetic social-ad pacing.',
    toolsUsed: ['AI Skincare UGC', 'Macro Texture', 'Hook-Driven Ad'],
    tags: ['AI Product UGC', 'Skincare', 'Concept Ad'],
  },
  {
    number: '10',
    name: 'MARS VELVET LIP TINT',
    category: 'AI BEAUTY CONCEPT',
    filterGroup: 'ai-ugc',
    buttonLabel: 'WATCH AI AD',
    metric: '0:15 · AI BEAUTY CONCEPT',
    formatLabel: 'Self-Initiated Concept · Cosmetics Commercial',
    mediaUrl: '/assets/reels/mars_liptint.mp4',
    posterUrl: '/assets/posters/IMG_1204.jpg',
    mediaType: 'video',
    hasAudio: true,
    mediaTitle: 'MARS Three Words Velvet Lip Tint AI Ad',
    description:
      'Self-initiated AI beauty commercial concept for MARS Three Words Velvet Lip Tint—combining crimson satin fashion frames, rich velvet pigment swatch macros, and reflective hero bottle shots.',
    conceptDetails:
      'Highlights how generative AI direction can craft high-fashion cosmetics launch reels with realistic skin texture and packaging fidelity.',
    creativeDirection:
      'Editorial crimson color story, silky macro pigment swirls, expressive close-ups, and sleek luxury end-frames.',
    toolsUsed: ['AI Beauty Ad', 'Pigment Macro', 'Concept Film'],
    tags: ['AI Product UGC', 'Beauty', 'Concept Ad'],
  },
  {
    number: '11',
    name: 'KAYALI EDEN JUICY APPLE',
    category: 'AI FRAGRANCE CONCEPT',
    filterGroup: 'ai-ugc',
    buttonLabel: 'WATCH AI FILM',
    metric: '0:30 · AI FRAGRANCE CONCEPT',
    formatLabel: 'Self-Initiated Concept · Luxury Perfume Film',
    mediaUrl: '/assets/reels/kayali_apple.mp4',
    posterUrl: '/assets/posters/IMG_1195.jpg',
    mediaType: 'video',
    hasAudio: true,
    mediaTitle: 'Kayali Eden Juicy Apple AI Commercial',
    description:
      'Self-initiated AI luxury fragrance film concept for Kayali Eden Juicy Apple | 01—blending crimson studio choreography, sleek black tailoring, dramatic mist moments, and glowing crystal bottle reflections.',
    conceptDetails:
      'Showcases end-to-end AI luxury commercial direction, uniting editorial motion, sensory voiceover rhythm, and jewel-like bottle lighting.',
    creativeDirection:
      'High-contrast monochromatic red studio art direction, fluid editorial choreography, and cinematic luxury pacing.',
    toolsUsed: ['AI Fragrance Ad', 'Luxury Editorial', 'Concept Film'],
    tags: ['AI Product UGC', 'Fragrance', 'Concept Film'],
  },
];

const FILTER_TABS: { id: 'all' | ProjectFilterGroup; label: string }[] = [
  { id: 'all', label: 'All Reels' },
  { id: 'cafe', label: 'Cafe Reels' },
  { id: 'resort', label: 'Resort & Escapes' },
  { id: 'ai-ugc', label: 'AI Skincare & Beauty' },
];

const isVideoMedia = (url: string, explicitType?: 'image' | 'video') => {
  if (explicitType) return explicitType === 'video';
  return url.startsWith('data:video/') || /\.(mp4|mov|webm|m4v)(\?|$)/i.test(url);
};

const getAbsoluteTop = (el: HTMLElement): number => {
  let top = 0;
  let curr: HTMLElement | null = el;
  while (curr) {
    top += curr.offsetTop;
    curr = curr.offsetParent as HTMLElement | null;
  }
  return top;
};

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  projects,
  onSelectProject,
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | ProjectFilterGroup>('all');
  const [activeIndex, setActiveIndex] = useState(0);
  const [settledIndex, setSettledIndex] = useState(0);
  const [stageWidth, setStageWidth] = useState(() =>
    typeof window !== 'undefined' ? Math.min(window.innerWidth - 32, 1080) : 1080
  );
  const [isTouchOrMobile, setIsTouchOrMobile] = useState(() =>
    typeof window !== 'undefined'
      ? window.innerWidth < 768 || window.matchMedia('(pointer: coarse)').matches
      : false
  );

  const scrollTrackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const activeVideoRef = useRef<HTMLVideoElement>(null);
  const sectionInViewRef = useRef(false);

  // Cached layout geometry (re-measured ONLY on width/filter change — zero getBoundingClientRect during scroll!)
  const stableViewportHeightRef = useRef<number>(
    typeof window !== 'undefined' ? window.innerHeight : 800
  );
  const lastWindowWidthRef = useRef<number>(
    typeof window !== 'undefined' ? window.innerWidth : 1080
  );
  const trackTopRef = useRef<number>(0);
  const trackScrollableRef = useRef<number>(1);

  // On-demand rAF orbital state (0% CPU when settled or off-screen!)
  const angleRef = useRef(0);
  const targetAngleRef = useRef(0);
  const activeIndexRef = useRef(0);
  const rafIdRef = useRef<number>(0);

  const filteredProjects = useMemo(
    () =>
      activeFilter === 'all'
        ? projects
        : projects.filter((proj) => proj.filterGroup === activeFilter),
    [activeFilter, projects]
  );

  const count = filteredProjects.length;
  const stepAngle = count > 0 ? (Math.PI * 2) / count : 0;

  // Apply 3D orbital transforms directly to DOM nodes (pure GPU transform + opacity)
  const applyCardTransforms = useCallback(
    (currentAngle: number) => {
      if (count === 0) return;

      const isMobile = stageWidth < 640;
      const isTablet = stageWidth >= 640 && stageWidth < 1024;
      const baseRadiusX = isMobile
        ? Math.max(115, stageWidth * 0.35)
        : isTablet
          ? Math.min(320, stageWidth * 0.36)
          : Math.min(430, stageWidth * 0.38);
      const radiusX =
        count <= 2 ? baseRadiusX * 0.55 : count <= 5 ? baseRadiusX * 0.85 : baseRadiusX;
      const arcLift = isMobile ? 16 : 36;

      for (let i = 0; i < count; i++) {
        const el = cardRefs.current[i];
        if (!el) continue;

        const theta = i * stepAngle + currentAngle;
        const sinT = Math.sin(theta);
        const cosT = Math.cos(theta);
        const depth = (cosT + 1) * 0.5;

        const xOffset = count === 2 ? sinT * radiusX + (1 - depth) * 110 : sinT * radiusX;
        const yOffset = (1 - depth) * -arcLift;

        const scale = (isMobile ? 0.58 : 0.52) + depth * (isMobile ? 0.42 : 0.54);
        const rotateY = -sinT * (isMobile ? 20 : 34);
        const opacity = 0.25 + depth * 0.75;
        const zIndex = Math.round(depth * 100) + 10;

        el.style.transform = `translate3d(${xOffset.toFixed(1)}px, ${yOffset.toFixed(1)}px, 0) scale(${scale.toFixed(3)}) perspective(1100px) rotateY(${rotateY.toFixed(1)}deg)`;
        el.style.opacity = opacity.toFixed(3);
        el.style.zIndex = String(zIndex);
      }
    },
    [count, stepAngle, stageWidth]
  );

  // On-demand rAF loop — runs ONLY while animating toward targetAngle, then cleanly stops
  const startOrbitAnimation = useCallback(() => {
    if (rafIdRef.current) return;

    const lerpFactor = isTouchOrMobile ? 0.26 : 0.16;

    const step = () => {
      rafIdRef.current = 0;
      const diff = targetAngleRef.current - angleRef.current;

      if (Math.abs(diff) < 0.001) {
        angleRef.current = targetAngleRef.current;
      } else {
        angleRef.current += diff * lerpFactor;
      }

      applyCardTransforms(angleRef.current);

      const frontRaw = count > 1 ? Math.round(-angleRef.current / stepAngle) : 0;
      const frontIdx = Math.max(
        0,
        Math.min(count - 1, ((frontRaw % count) + count) % count)
      );
      if (frontIdx !== activeIndexRef.current) {
        activeIndexRef.current = frontIdx;
        setActiveIndex(frontIdx);
      }

      if (Math.abs(targetAngleRef.current - angleRef.current) >= 0.001) {
        rafIdRef.current = requestAnimationFrame(step);
      }
    };

    rafIdRef.current = requestAnimationFrame(step);
  }, [applyCardTransforms, count, isTouchOrMobile, stepAngle]);

  // Measure absolute runway coordinates ONCE (never during scroll)
  const measureTrack = useCallback(() => {
    const trackEl = scrollTrackRef.current;
    if (!trackEl) return;
    trackTopRef.current = getAbsoluteTop(trackEl);
    trackScrollableRef.current = Math.max(
      1,
      trackEl.offsetHeight - stableViewportHeightRef.current
    );
  }, []);

  // Pure math scroll update — reads only window.scrollY (zero reflow!)
  const updateTargetFromScroll = useCallback(() => {
    if (count <= 1) {
      targetAngleRef.current = 0;
      startOrbitAnimation();
      return;
    }
    const rawProgress = (window.scrollY - trackTopRef.current) / trackScrollableRef.current;
    const progress = Math.max(0, Math.min(1, rawProgress));
    const nextTarget = -progress * (count - 1) * stepAngle;

    if (Math.abs(nextTarget - targetAngleRef.current) > 0.0005) {
      targetAngleRef.current = nextTarget;
      startOrbitAnimation();
    }
  }, [count, startOrbitAnimation, stepAngle]);

  // Reset orbit cleanly when category filter changes
  useEffect(() => {
    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = 0;
    }
    angleRef.current = 0;
    targetAngleRef.current = 0;
    activeIndexRef.current = 0;
    setActiveIndex(0);
    setSettledIndex(0);

    // Measure after DOM updates runway height
    const id = requestAnimationFrame(() => {
      measureTrack();
      applyCardTransforms(0);
      if (window.scrollY > trackTopRef.current) {
        window.scrollTo({ top: trackTopRef.current, behavior: 'smooth' });
      }
    });
    return () => cancelAnimationFrame(id);
  }, [activeFilter, count, applyCardTransforms, measureTrack]);

  // Listen to scroll + width-only resize (ignores mobile address bar height changes!)
  useEffect(() => {
    measureTrack();
    applyCardTransforms(angleRef.current);
    updateTargetFromScroll();

    const onScroll = () => updateTargetFromScroll();
    const onResize = () => {
      if (window.innerWidth !== lastWindowWidthRef.current) {
        lastWindowWidthRef.current = window.innerWidth;
        stableViewportHeightRef.current = window.innerHeight;
        setIsTouchOrMobile(
          window.innerWidth < 768 || window.matchMedia('(pointer: coarse)').matches
        );
        if (stageRef.current) {
          setStageWidth(stageRef.current.clientWidth || window.innerWidth);
        }
        measureTrack();
        applyCardTransforms(angleRef.current);
        updateTargetFromScroll();
      }
    };

    // Re-measure once after images/fonts settle on initial load
    const loadTimer = window.setTimeout(() => {
      measureTrack();
      updateTargetFromScroll();
    }, 600);

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });
    return () => {
      window.clearTimeout(loadTimer);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = 0;
      }
    };
  }, [applyCardTransforms, measureTrack, updateTargetFromScroll]);

  // Measure initial stage width once
  useEffect(() => {
    if (stageRef.current) {
      setStageWidth(stageRef.current.clientWidth || 1080);
    }
  }, []);

  // Re-position cards whenever stageWidth updates
  useEffect(() => {
    applyCardTransforms(angleRef.current);
  }, [stageWidth, applyCardTransforms]);

  // Desktop-only subtle inline muted preview (NEVER mounted on mobile/touch so scrolling stays 100% silky!)
  useEffect(() => {
    if (isTouchOrMobile) return;
    const el = stageRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries[0]?.isIntersecting ?? false;
        sectionInViewRef.current = visible;
        const vid = activeVideoRef.current;
        if (vid) {
          if (visible) {
            vid.defaultMuted = true;
            vid.muted = true;
            vid.play().catch(() => {});
          } else {
            vid.pause();
          }
        }
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [isTouchOrMobile]);

  useEffect(() => {
    if (isTouchOrMobile) return;
    const timer = window.setTimeout(() => {
      setSettledIndex(activeIndex);
    }, 350);
    return () => window.clearTimeout(timer);
  }, [activeIndex, activeFilter, isTouchOrMobile]);

  useEffect(() => {
    if (isTouchOrMobile) return;
    const vid = activeVideoRef.current;
    if (!vid || !sectionInViewRef.current) return;
    vid.defaultMuted = true;
    vid.muted = true;
    vid.play().catch(() => {});
  }, [settledIndex, activeFilter, isTouchOrMobile]);

  // Smoothly scroll runway to bring a specific reel index dead-center front
  const scrollToReelIndex = useCallback(
    (index: number) => {
      if (count <= 1) return;
      measureTrack();
      const clamped = Math.max(0, Math.min(count - 1, index));
      const targetScrollY =
        trackTopRef.current + (clamped / (count - 1)) * trackScrollableRef.current;
      window.scrollTo({ top: targetScrollY, behavior: 'smooth' });
    },
    [count, measureTrack]
  );

  const handleCardClick = (project: ProjectData, idx: number) => {
    if (idx === activeIndex) {
      onSelectProject(project);
    } else {
      scrollToReelIndex(idx);
    }
  };

  const getCount = (id: 'all' | ProjectFilterGroup) =>
    id === 'all'
      ? projects.length
      : projects.filter((p) => p.filterGroup === id).length;

  const perReelStepPx = isTouchOrMobile ? 190 : 320;
  const scrollRunwayHeight = `calc(100svh + ${Math.max(1, count - 1) * perReelStepPx}px)`;

  return (
    <section
      id="projects"
      className="bg-[#0C0C0C] text-[#D7E2EA] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 z-10 relative pt-16 sm:pt-20 md:pt-24 pb-16 md:pb-24 px-4 sm:px-6 md:px-10"
    >
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <FadeIn delay={0} y={40}>
          <h2 className="hero-heading font-black uppercase text-center text-[clamp(3rem,12vw,160px)] leading-none mb-4 sm:mb-6 select-none">
            Portfolio
          </h2>
        </FadeIn>

        {/* Scroll-Driven Sticky Runway (100svh prevents mobile URL-bar fluctuation) */}
        <div
          ref={scrollTrackRef}
          style={{ height: scrollRunwayHeight }}
          className="relative w-full"
        >
          <div className="sticky top-0 h-[100svh] flex flex-col justify-center py-5 sm:py-8 overflow-x-clip">
            {/* Category Filter Bar */}
            <div className="flex flex-wrap items-center justify-center gap-x-4 sm:gap-x-10 gap-y-2 mb-3 border-b border-[#D7E2EA]/15 pb-3">
              {FILTER_TABS.map((tab) => {
                const isActive = activeFilter === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveFilter(tab.id)}
                    className={`relative pb-1.5 text-xs sm:text-sm uppercase tracking-widest font-semibold transition-colors cursor-pointer bg-transparent border-0 ${
                      isActive ? 'text-white' : 'text-[#D7E2EA]/50 hover:text-[#D7E2EA]'
                    }`}
                  >
                    <span>{tab.label}</span>
                    <span className="ml-1.5 text-[11px] font-mono text-[#38bdf8]">
                      ({getCount(tab.id)})
                    </span>
                    <span
                      className={`absolute left-0 right-0 -bottom-[13px] h-[2px] bg-[#38bdf8] transition-opacity duration-200 ${
                        isActive ? 'opacity-100' : 'opacity-0'
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            {/* Scroll Instruction Cue */}
            <div className="flex items-center justify-center gap-2 text-[11px] sm:text-xs uppercase tracking-[0.2em] text-[#D7E2EA]/55 mb-2 select-none text-center">
              <Mouse size={14} className="text-[#38bdf8] shrink-0" />
              <span>Scroll to spin circle &middot; Tap front reel to open &amp; play</span>
            </div>

            {/* 3D Floating Circular Reel Stage (Scroll-Driven) */}
            <div
              ref={stageRef}
              className="relative w-full h-[350px] sm:h-[430px] md:h-[490px] flex items-center justify-center select-none"
            >
              {/* Subtle glowing orbital floor ring */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-[62%] -translate-x-1/2 -translate-y-1/2 w-[82%] max-w-[860px] h-[140px] sm:h-[185px] rounded-full border border-[#38bdf8]/20 shadow-[0_0_80px_rgba(56,189,248,0.12)]"
                style={{
                  background:
                    'radial-gradient(ellipse at center, rgba(56,189,248,0.09) 0%, rgba(12,12,12,0) 70%)',
                }}
              />

              {/* Orbiting Floating Reel Cards */}
              {filteredProjects.map((project, idx) => {
                const isFront = idx === activeIndex;
                const isSettledFront = !isTouchOrMobile && idx === settledIndex && isFront;
                const isVideo = isVideoMedia(project.mediaUrl, project.mediaType);

                return (
                  <div
                    key={project.number}
                    ref={(el) => {
                      cardRefs.current[idx] = el;
                    }}
                    onClick={() => handleCardClick(project, idx)}
                    className="absolute left-1/2 top-1/2 -ml-[82px] -mt-[146px] sm:-ml-[102px] sm:-mt-[181px] md:-ml-[116px] md:-mt-[206px] w-[164px] h-[292px] sm:w-[204px] sm:h-[362px] md:w-[232px] md:h-[412px] will-change-transform"
                  >
                    <div
                      className={`relative w-full h-full rounded-[24px] sm:rounded-[30px] overflow-hidden bg-[#080a0e] group/reel cursor-pointer ${
                        isFront
                          ? 'border-2 border-[#38bdf8] shadow-[0_20px_50px_rgba(56,189,248,0.28)]'
                          : 'border border-[#38bdf8]/35 shadow-[0_12px_28px_rgba(0,0,0,0.7)]'
                      }`}
                    >
                      {/* Always render crisp instant cover frame underneath */}
                      {project.posterUrl && (
                        <img
                          src={project.posterUrl}
                          alt={project.name}
                          draggable={false}
                          decoding="async"
                          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                        />
                      )}

                      {/* Desktop-only subtle muted inline preview once settled */}
                      {isSettledFront && isVideo && (
                        <video
                          ref={activeVideoRef}
                          key={project.mediaUrl}
                          src={project.mediaUrl}
                          poster={project.posterUrl}
                          preload="metadata"
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="relative w-full h-full object-cover pointer-events-none"
                        />
                      )}

                      {/* Top & Bottom Contrast Gradient */}
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/55 via-transparent to-black/85" />

                      {/* Top Index + Category */}
                      <div className="pointer-events-none absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                        <span className="text-[11px] font-black tracking-widest text-white/90 bg-black/70 px-2.5 py-0.5 rounded-full border border-white/15">
                          {project.number}
                        </span>
                        <span className="text-[9px] sm:text-[10px] uppercase tracking-wider font-semibold text-[#38bdf8] bg-black/70 px-2.5 py-0.5 rounded-full border border-[#38bdf8]/40 truncate max-w-[130px]">
                          {project.category}
                        </span>
                      </div>

                      {/* Center Play Indicator on Front Active Reel */}
                      {isFront && (
                        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-black/75 border border-[#38bdf8]/90 text-white flex items-center justify-center shadow-[0_0_25px_rgba(56,189,248,0.45)] group-hover/reel:scale-110 group-hover/reel:bg-[#38bdf8] group-hover/reel:text-[#0C0C0C] transition-all duration-200">
                            <Play size={20} className="fill-current ml-0.5" />
                          </div>
                        </div>
                      )}

                      {/* Bottom Title inside Card */}
                      <div className="pointer-events-none absolute bottom-3 left-3.5 right-3.5">
                        <h3 className="text-sm sm:text-base font-bold uppercase tracking-wide text-white leading-tight truncate">
                          {project.name}
                        </h3>
                        <p className="text-[10px] uppercase tracking-widest text-[#D7E2EA]/80 mt-0.5 truncate">
                          {isFront ? 'Tap to Play with Sound' : project.metric}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Clean Step Controls for effortless phone navigation alongside scrolling */}
            {count > 1 && (
              <div className="mt-2 flex items-center justify-center gap-4 select-none">
                <button
                  type="button"
                  onClick={() => scrollToReelIndex(activeIndex - 1)}
                  disabled={activeIndex === 0}
                  aria-label="Previous reel"
                  className="p-2 rounded-full bg-[#151820] border border-[#38bdf8]/35 text-white disabled:opacity-30 cursor-pointer disabled:cursor-default hover:border-[#38bdf8] transition-colors"
                >
                  <ChevronLeft size={16} />
                </button>
                <span className="text-xs font-mono tracking-widest text-[#D7E2EA]/75 min-w-[64px] text-center">
                  {String(activeIndex + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
                </span>
                <button
                  type="button"
                  onClick={() => scrollToReelIndex(activeIndex + 1)}
                  disabled={activeIndex === count - 1}
                  aria-label="Next reel"
                  className="p-2 rounded-full bg-[#151820] border border-[#38bdf8]/35 text-white disabled:opacity-30 cursor-pointer disabled:cursor-default hover:border-[#38bdf8] transition-colors"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
