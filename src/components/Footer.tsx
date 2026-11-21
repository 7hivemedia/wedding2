import React from 'react';
import { WEDDING_CONFIG } from '../config.js';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-[#C9A24B]/30 bg-[#FBFAFF]/55 px-4 py-12 text-center">
      <p className="text-xs tracking-[0.2em] text-[#2A2A56]/70 uppercase">
        {WEDDING_CONFIG.footer.prelude}
      </p>
      <p className="font-script mt-2 text-4xl text-[#4B3680] sm:text-5xl">
        {WEDDING_CONFIG.footer.familyEn}
      </p>
      <p className="font-hindi mt-1 text-lg text-[#7A5BB5]">
        {WEDDING_CONFIG.footer.familyHi}
      </p>
    </footer>
  );
};
