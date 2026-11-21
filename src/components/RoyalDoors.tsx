import React, { useEffect, useRef, useState } from 'react';
import { WEDDING_CONFIG } from '../config.js';

interface RoyalDoorsProps {
  onStartOpen: () => void;
  onOpened: () => void;
}

const STUD_POSITIONS = [
  { x: 18, y: 16 },
  { x: 50, y: 16 },
  { x: 82, y: 16 },
  { x: 18, y: 34 },
  { x: 82, y: 34 },
  { x: 18, y: 52 },
  { x: 82, y: 52 },
  { x: 18, y: 70 },
  { x: 82, y: 70 },
  { x: 18, y: 86 },
  { x: 50, y: 86 },
  { x: 82, y: 86 },
];

export const RoyalDoors: React.FC<RoyalDoorsProps> = ({
  onStartOpen,
  onOpened,
}) => {
  const [opening, setOpening] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    triggerRef.current?.focus({ preventScroll: true });
  }, []);

  const handleOpen = () => {
    if (opening) return;
    setOpening(true);
    onStartOpen();

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const duration = prefersReduced ? 280 : 1900;
    window.setTimeout(() => {
      onOpened();
    }, duration);
  };

  return (
    <div
      className={`doors-stage fixed inset-0 z-50 flex overflow-hidden select-none ${
        opening ? 'doors-open pointer-events-none' : ''
      }`}
      role="dialog"
      aria-modal="true"
      aria-label="Royal Wedding Invitation Doors"
    >
      {/* Subtle golden glow along the centre seam */}
      <div
        className={`pointer-events-none absolute inset-y-0 left-1/2 z-20 w-[3px] -translate-x-1/2 bg-gradient-to-b from-transparent via-[#C9A24B]/80 to-transparent transition-opacity duration-500 ${
          opening ? 'opacity-0' : 'opacity-100'
        }`}
        aria-hidden="true"
      />

      {/* Left Royal Plum Door */}
      <div
        className="door-panel door-left relative h-full w-1/2 overflow-hidden border-r border-[#C9A24B]/65 shadow-[inset_-18px_0_40px_rgba(18,10,36,0.55)]"
        style={{
          background:
            'radial-gradient(circle at 75% 45%, #5C4498 0%, #4B3680 48%, #342260 100%)',
        }}
      >
        {/* Subtle vertical timber/silk grain */}
        <div
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              'repeating-linear-gradient(90deg, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 1px, transparent 1px, transparent 28px)',
          }}
        />

        {/* Gold outer moulding */}
        <div className="pointer-events-none absolute inset-3 sm:inset-5 border border-[#C9A24B]/55" />
        <div className="pointer-events-none absolute inset-5 sm:inset-7 border border-[#C9A24B]/30" />

        {/* Gold Arch Frame SVG */}
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox="0 0 100 160"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M 14 142 L 14 54 Q 14 20 50 18 Q 86 20 86 54 L 86 142 Z"
            fill="none"
            stroke="#C9A24B"
            strokeWidth="0.7"
            strokeOpacity="0.8"
          />
          <path
            d="M 19 138 L 19 56 Q 19 27 50 25 Q 81 27 81 56 L 81 138 Z"
            fill="none"
            stroke="#C9A24B"
            strokeWidth="0.35"
            strokeDasharray="1.5 1.5"
            strokeOpacity="0.65"
          />
          {/* Inner diamond filigree motif */}
          <path
            d="M 50 48 L 62 78 L 50 108 L 38 78 Z"
            fill="none"
            stroke="#C9A24B"
            strokeWidth="0.4"
            strokeOpacity="0.45"
          />
        </svg>

        {/* Gold Stud Pattern */}
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          {STUD_POSITIONS.map((stud, idx) => (
            <span
              key={`l-${idx}`}
              className="absolute h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full sm:h-2.5 sm:w-2.5"
              style={{
                left: `${stud.x}%`,
                top: `${stud.y}%`,
                background:
                  'radial-gradient(circle at 32% 32%, #F6DF98 0%, #C9A24B 62%, #8C6A22 100%)',
                boxShadow: '0 1px 3px rgba(0,0,0,0.45)',
              }}
            />
          ))}
        </div>
      </div>

      {/* Right Royal Plum Door */}
      <div
        className="door-panel door-right relative h-full w-1/2 overflow-hidden border-l border-[#C9A24B]/65 shadow-[inset_18px_0_40px_rgba(18,10,36,0.55)]"
        style={{
          background:
            'radial-gradient(circle at 25% 45%, #5C4498 0%, #4B3680 48%, #342260 100%)',
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              'repeating-linear-gradient(90deg, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 1px, transparent 1px, transparent 28px)',
          }}
        />

        <div className="pointer-events-none absolute inset-3 sm:inset-5 border border-[#C9A24B]/55" />
        <div className="pointer-events-none absolute inset-5 sm:inset-7 border border-[#C9A24B]/30" />

        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox="0 0 100 160"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M 14 142 L 14 54 Q 14 20 50 18 Q 86 20 86 54 L 86 142 Z"
            fill="none"
            stroke="#C9A24B"
            strokeWidth="0.7"
            strokeOpacity="0.8"
          />
          <path
            d="M 19 138 L 19 56 Q 19 27 50 25 Q 81 27 81 56 L 81 138 Z"
            fill="none"
            stroke="#C9A24B"
            strokeWidth="0.35"
            strokeDasharray="1.5 1.5"
            strokeOpacity="0.65"
          />
          <path
            d="M 50 48 L 62 78 L 50 108 L 38 78 Z"
            fill="none"
            stroke="#C9A24B"
            strokeWidth="0.4"
            strokeOpacity="0.45"
          />
        </svg>

        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          {STUD_POSITIONS.map((stud, idx) => (
            <span
              key={`r-${idx}`}
              className="absolute h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full sm:h-2.5 sm:w-2.5"
              style={{
                left: `${stud.x}%`,
                top: `${stud.y}%`,
                background:
                  'radial-gradient(circle at 32% 32%, #F6DF98 0%, #C9A24B 62%, #8C6A22 100%)',
                boxShadow: '0 1px 3px rgba(0,0,0,0.45)',
              }}
            />
          ))}
        </div>
      </div>

      {/* Central Glowing Gold Seal */}
      <div
        className={`absolute left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ${
          opening ? 'scale-90 opacity-0' : 'scale-100 opacity-100'
        }`}
      >
        <div className="relative flex items-center justify-center">
          {/* Pulsing Ring */}
          <span
            className="animate-seal-pulse pointer-events-none absolute h-40 w-40 rounded-full border-2 border-[#C9A24B]/70 sm:h-48 sm:w-48"
            aria-hidden="true"
          />
          <span
            className="pointer-events-none absolute h-36 w-36 rounded-full border border-[#C9A24B]/40 sm:h-44 sm:w-44"
            aria-hidden="true"
          />

          <button
            ref={triggerRef}
            type="button"
            onClick={handleOpen}
            aria-label={WEDDING_CONFIG.doors.ariaLabel}
            className="group relative flex h-32 w-32 cursor-pointer flex-col items-center justify-center rounded-full border-2 border-[#E6C97A] text-center transition-transform duration-300 hover:scale-105 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#F5DF9D] sm:h-38 sm:w-38"
            style={{
              background:
                'radial-gradient(circle at 35% 30%, #F4DE96 0%, #C9A24B 58%, #9B7627 100%)',
              boxShadow:
                '0 0 36px rgba(201, 162, 75, 0.55), inset 0 2px 6px rgba(255, 251, 232, 0.6)',
            }}
          >
            <span
              className="pointer-events-none absolute inset-1.5 rounded-full border border-[#4B3680]/30"
              aria-hidden="true"
            />
            <span className="font-cinzel text-[11px] font-semibold tracking-[0.18em] text-[#2B1B4E] uppercase sm:text-xs">
              {WEDDING_CONFIG.doors.sealLabelEn}
            </span>
            <span
              className="my-1 h-px w-10 bg-[#4B3680]/35"
              aria-hidden="true"
            />
            <span className="font-hindi text-base font-normal text-[#2B1B4E] sm:text-lg">
              {WEDDING_CONFIG.doors.sealLabelHi}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
