import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface ContactButtonProps {
  onClick?: () => void;
  className?: string;
  label?: string;
  showArrow?: boolean;
}

export const ContactButton: React.FC<ContactButtonProps> = ({
  onClick,
  className = '',
  label = 'Contact Me',
  showArrow = false,
}) => {
  return (
    <button
      onClick={onClick}
      type="button"
      style={{
        background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
        boxShadow: '0px 4px 4px rgba(181, 1, 167, 0.25), inset 4px 4px 12px #7721B1',
        outline: '2px solid white',
        outlineOffset: '-3px',
      }}
      className={`rounded-full text-white font-medium uppercase tracking-widest px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-xs sm:text-sm md:text-base hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 cursor-pointer inline-flex items-center justify-center gap-1.5 shrink-0 ${className}`}
    >
      <span>{label}</span>
      {showArrow && (
        <ArrowUpRight
          aria-hidden="true"
          className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-[18px] md:h-[18px] shrink-0"
          strokeWidth={2.25}
        />
      )}
    </button>
  );
};

export default ContactButton;
