import React, { useEffect, useState } from 'react';
import { WEDDING_CONFIG } from '../config.js';

export const StickyNav: React.FC = () => {
  const [activeId, setActiveId] = useState('home');

  useEffect(() => {
    const ids = WEDDING_CONFIG.nav.map((item) => item.id);
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: '-35% 0px -55% 0px' }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-30 border-b border-[#C9A24B]/25 bg-[#FBFAFF]/82 backdrop-blur-md">
      <nav
        aria-label="Primary navigation"
        className="mx-auto flex h-12 max-w-5xl items-center justify-center gap-8 px-4 sm:gap-12"
      >
        {WEDDING_CONFIG.nav.map((item) => {
          const isActive = activeId === item.id;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`font-cinzel relative py-1 text-xs tracking-[0.22em] whitespace-nowrap shrink-0 uppercase transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7A5BB5] sm:text-[13px] ${
                isActive
                  ? 'font-semibold text-[#4B3680]'
                  : 'text-[#2A2A56]/75 hover:text-[#4B3680]'
              }`}
            >
              {item.label}
              <span
                aria-hidden="true"
                className={`absolute right-0 bottom-0 left-0 h-[1.5px] bg-[#C9A24B] transition-transform duration-200 ${
                  isActive ? 'scale-x-100' : 'scale-x-0'
                }`}
              />
            </a>
          );
        })}
      </nav>
    </header>
  );
};
