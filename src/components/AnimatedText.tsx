import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  className?: string;
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  className = '',
}) => {
  return (
    <motion.p
      initial={{ opacity: 0.2, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      className={`text-[#D7E2EA] font-medium text-center leading-relaxed max-w-[560px] text-[clamp(1rem,2vw,1.35rem)] select-none ${className}`}
    >
      {text}
    </motion.p>
  );
};

export default AnimatedText;
