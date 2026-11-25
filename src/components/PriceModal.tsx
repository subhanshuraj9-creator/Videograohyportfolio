import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Sparkles, ArrowRight } from 'lucide-react';
import ContactButton from './ContactButton';

interface PriceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTier: (tierName: string) => void;
}

const PRICING_TIERS = [
  {
    name: 'Resort, Cafe & Travel UGC',
    price: '$650+',
    period: 'reels + photo pack',
    description:
      'Vertical stay walkthroughs, atmospheric cafe reels, travel storytelling, and editorial property photos tailored for resorts, cafes, Airbnbs, and hotels.',
    features: [
      '2–3 vertical UGC / Cafe Reels (15–35s)',
      '20+ edited hospitality & ambiance stills',
      'Ambient sound design & color grading',
      'Social + listing usage rights',
      'Fast 4–5 day turnaround',
    ],
    popular: false,
  },
  {
    name: 'AI Product UGC Ads',
    price: '$850+',
    period: '3 AI product UGC videos',
    description:
      'Scroll-stopping AI-powered product commercials and hook-tested vertical UGC videos built for beauty, skincare, and lifestyle brands.',
    features: [
      '3 AI-powered product UGC videos',
      '2 opening hook variations per ad',
      'Custom captions, pacing & sound SFX',
      'Studio-quality product visuals included',
      'Full paid-ads usage rights',
    ],
    popular: true,
  },
  {
    name: 'Wedding & Event Shoot',
    price: '$1,500+',
    period: 'photo + highlight film',
    description:
      'Candid wedding photography, editorial couple portraits, and cinematic highlight reels capturing every real moment naturally.',
    features: [
      'Full curated high-res photo gallery',
      '2–4 min cinematic highlight film',
      '1 vertical wedding Reel for socials',
      'Editorial portraits & candid coverage',
      'Warm, timeless color grading',
    ],
    popular: false,
  },
];

export const PriceModal: React.FC<PriceModalProps> = ({ isOpen, onClose, onSelectTier }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-5xl bg-[#121212] border border-[#2A2A2A] rounded-[32px] sm:rounded-[40px] p-6 sm:p-10 shadow-2xl z-10 my-auto text-[#D7E2EA] overflow-hidden max-h-[90vh] overflow-y-auto"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full bg-[#1F1F1F] text-[#D7E2EA] hover:bg-[#2A2A2A] hover:text-white transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X size={20} />
            </button>

            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs uppercase tracking-widest text-[#B600A8] font-semibold">
                Packages &amp; Collaborations
              </span>
              <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white mt-1">
                Transparent <span className="hero-heading">Pricing Tiers</span>
              </h2>
              <p className="text-sm sm:text-base text-[#D7E2EA]/70 mt-3 font-light leading-relaxed">
                Tailored packages for resort, cafe &amp; travel UGC, wedding photography &amp; films, and AI-powered product commercials.
              </p>
            </div>

            {/* Tiers Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {PRICING_TIERS.map((tier) => (
                <div
                  key={tier.name}
                  className={`relative bg-[#181818] border rounded-[28px] p-6 flex flex-col justify-between transition-all duration-300 hover:border-[#B600A8]/50 ${
                    tier.popular ? 'border-[#B600A8] shadow-[0_0_30px_rgba(182,0,168,0.15)] bg-[#1a141f]' : 'border-[#282828]'
                  }`}
                >
                  {tier.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#B600A8] to-[#7621B0] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                      <Sparkles size={12} />
                      Most Popular
                    </div>
                  )}

                  <div>
                    <h3 className="text-lg font-bold uppercase text-white tracking-wide">{tier.name}</h3>
                    <div className="mt-4 mb-2 flex items-baseline gap-1">
                      <span className="text-3xl sm:text-4xl font-black text-white">{tier.price}</span>
                      <span className="text-xs text-[#D7E2EA]/60 font-light">{tier.period}</span>
                    </div>
                    <p className="text-xs text-[#D7E2EA]/70 font-light leading-relaxed mb-6">
                      {tier.description}
                    </p>

                    <div className="space-y-2.5 mb-6 pt-4 border-t border-[#282828]">
                      {tier.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-xs text-[#D7E2EA]/90">
                          <Check size={14} className="text-[#B600A8] shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      onSelectTier(tier.name);
                      onClose();
                    }}
                    className={`w-full py-3 px-4 rounded-xl text-xs uppercase font-bold tracking-widest transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 ${
                      tier.popular
                        ? 'bg-gradient-to-r from-[#B600A8] to-[#7621B0] text-white hover:opacity-90'
                        : 'bg-[#252525] hover:bg-[#303030] text-white'
                    }`}
                  >
                    <span>Book {tier.name}</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-10 p-6 bg-[#181818] border border-[#282828] rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
              <div>
                <h4 className="text-sm font-bold uppercase text-white">Hosted Stay or Custom Project Scope?</h4>
                <p className="text-xs text-[#D7E2EA]/70 font-light mt-0.5">
                  Open to hosted resort collaborations, destination travel campaigns, and custom creative retainers.
                </p>
              </div>
              <ContactButton
                label="Custom Quote"
                onClick={() => {
                  onSelectTier('Custom Shoot / Hosted Stay');
                  onClose();
                }}
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default PriceModal;
