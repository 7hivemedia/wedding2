import React, { useEffect, useState } from 'react';
import { WEDDING_CONFIG } from '../config.js';
import { HeroThreeCanvas } from './HeroThreeCanvas';

const CORNER_FLORAL_SRC =
  '/src/assets/images/floral_corner_peony_1795287048495.jpg';
const RING_ACCENT_SRC =
  '/src/assets/images/floral_ring_accent_1795287048716.jpg';

interface HeroSectionProps {
  doorsStartedOpening: boolean;
}

const FLOATING_PETALS = [
  { left: '8%', delay: '0s', duration: '13s', drift: '45px', color: '#D47FC4', size: 12 },
  { left: '19%', delay: '3.2s', duration: '16s', drift: '-32px', color: '#B49CE0', size: 10 },
  { left: '34%', delay: '1.4s', duration: '14.5s', drift: '52px', color: '#E2A6D7', size: 11 },
  { left: '63%', delay: '2.5s', duration: '15s', drift: '-46px', color: '#C6B0EC', size: 13 },
  { left: '78%', delay: '0.8s', duration: '13.5s', drift: '36px', color: '#D47FC4', size: 10 },
  { left: '91%', delay: '4.1s', duration: '16.5s', drift: '-38px', color: '#B49CE0', size: 12 },
];

export const HeroSection: React.FC<HeroSectionProps> = ({
  doorsStartedOpening,
}) => {
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const [cornerFailed, setCornerFailed] = useState(false);
  const [ringAccentFailed, setRingAccentFailed] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReduced) return;

    const handleMove = (e: PointerEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 14;
      const y = (e.clientY / window.innerHeight - 0.5) * 14;
      setParallax({ x, y });
    };

    window.addEventListener('pointermove', handleMove, { passive: true });
    return () => window.removeEventListener('pointermove', handleMove);
  }, []);

  const cornerClass =
    'pointer-events-none select-none w-44 h-44 sm:w-64 sm:h-64 md:w-76 md:h-76 object-contain watercolor-blend';

  return (
    <section
      id="home"
      className={`relative flex min-h-[calc(100svh-3rem)] items-center justify-center overflow-hidden px-4 py-14 sm:px-8 sm:py-16 ${
        doorsStartedOpening ? 'hero-visible' : ''
      }`}
    >
      {/* Three.js Subtle 3D Depth Layer */}
      <HeroThreeCanvas />

      {/* Lightweight Drifting Lilac & Orchid CSS Petals */}
      <div
        className="pointer-events-none absolute inset-0 z-1 overflow-hidden"
        aria-hidden="true"
      >
        {FLOATING_PETALS.map((petal, idx) => (
          <span
            key={idx}
            className="animate-petal absolute -top-6 block rounded-[70%_30%_65%_35%/40%_65%_35%_60%] opacity-0"
            style={
              {
                left: petal.left,
                width: `${petal.size}px`,
                height: `${Math.round(petal.size * 1.35)}px`,
                backgroundColor: petal.color,
                '--petal-delay': petal.delay,
                '--petal-duration': petal.duration,
                '--petal-drift': petal.drift,
              } as React.CSSProperties
            }
          />
        ))}
      </div>

      {/* Four Watercolour Floral Corners with Sway & Pointer Parallax */}
      {!cornerFailed && (
        <>
          <div
            className="pointer-events-none absolute -top-4 -left-4 z-1 transition-transform duration-300 ease-out sm:-top-5 sm:-left-5"
            style={{
              transform: `translate3d(${parallax.x * -0.8}px, ${parallax.y * -0.8}px, 0)`,
            }}
            aria-hidden="true"
          >
            <img
              src={CORNER_FLORAL_SRC}
              alt=""
              referrerPolicy="no-referrer"
              onError={() => setCornerFailed(true)}
              className={`${cornerClass} animate-floral-sway`}
            />
          </div>

          <div
            className="pointer-events-none absolute -top-4 -right-4 z-1 transition-transform duration-300 ease-out sm:-top-5 sm:-right-5"
            style={{
              transform: `translate3d(${parallax.x * 0.8}px, ${parallax.y * -0.8}px, 0) scaleX(-1)`,
            }}
            aria-hidden="true"
          >
            <img
              src={CORNER_FLORAL_SRC}
              alt=""
              referrerPolicy="no-referrer"
              onError={() => setCornerFailed(true)}
              className={`${cornerClass} animate-floral-sway-alt`}
            />
          </div>

          <div
            className="pointer-events-none absolute -bottom-4 -left-4 z-1 transition-transform duration-300 ease-out sm:-bottom-5 sm:-left-5"
            style={{
              transform: `translate3d(${parallax.x * -0.6}px, ${parallax.y * 0.6}px, 0) scaleY(-1)`,
            }}
            aria-hidden="true"
          >
            <img
              src={CORNER_FLORAL_SRC}
              alt=""
              referrerPolicy="no-referrer"
              onError={() => setCornerFailed(true)}
              className={`${cornerClass} animate-floral-sway-alt opacity-85`}
            />
          </div>

          <div
            className="pointer-events-none absolute -right-4 -bottom-4 z-1 transition-transform duration-300 ease-out sm:-right-5 sm:-bottom-5"
            style={{
              transform: `translate3d(${parallax.x * 0.6}px, ${parallax.y * 0.6}px, 0) scale(-1, -1)`,
            }}
            aria-hidden="true"
          >
            <img
              src={CORNER_FLORAL_SRC}
              alt=""
              referrerPolicy="no-referrer"
              onError={() => setCornerFailed(true)}
              className={`${cornerClass} animate-floral-sway opacity-85`}
            />
          </div>
        </>
      )}

      {/* Centered Invitation Typography */}
      <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center text-center">
        <p
          className="hero-stagger font-hindi text-lg tracking-wide text-[#C9A24B] sm:text-xl"
          style={{ transitionDelay: '180ms' }}
        >
          {WEDDING_CONFIG.hero.invocation}
        </p>

        <p
          className="hero-stagger mt-3 text-sm tracking-[0.08em] text-[#2A2A56]/85 sm:text-base"
          style={{ transitionDelay: '340ms' }}
        >
          {WEDDING_CONFIG.hero.prelude}
        </p>

        {/* Hand-drawn Triple Gold Ring + Flowers + Couple Names */}
        <div
          className="hero-stagger relative my-4 flex h-[280px] w-[300px] items-center justify-center sm:my-6 sm:h-[340px] sm:w-[370px]"
          style={{ transitionDelay: '520ms' }}
        >
          {/* Watercolour Floral Spray Accent on Ring Top-Left & Bottom-Right */}
          {!ringAccentFailed && (
            <>
              <img
                src={RING_ACCENT_SRC}
                alt=""
                referrerPolicy="no-referrer"
                onError={() => setRingAccentFailed(true)}
                aria-hidden="true"
                className="watercolor-blend pointer-events-none absolute -top-2 -left-4 h-36 w-36 -rotate-12 object-contain opacity-90 sm:-top-3 sm:-left-6 sm:h-44 sm:w-44"
              />
              <img
                src={RING_ACCENT_SRC}
                alt=""
                referrerPolicy="no-referrer"
                onError={() => setRingAccentFailed(true)}
                aria-hidden="true"
                className="watercolor-blend pointer-events-none absolute -right-4 -bottom-2 h-36 w-36 rotate-[168deg] object-contain opacity-90 sm:-right-6 sm:-bottom-3 sm:h-44 sm:w-44"
              />
            </>
          )}

          {/* Hand-drawn Triple Gold Ring SVG */}
          <svg
            viewBox="0 0 360 340"
            className="pointer-events-none absolute inset-0 h-full w-full"
            aria-hidden="true"
          >
            <path
              d="M 180 26 C 266 26, 332 88, 332 170 C 332 252, 264 314, 178 314 C 92 314, 28 250, 28 168 C 28 86, 94 26, 180 26 Z"
              fill="rgba(251, 250, 255, 0.42)"
              stroke="#C9A24B"
              strokeWidth="1.65"
              strokeLinecap="round"
              className={`ring-draw ${doorsStartedOpening ? 'ring-draw-active' : ''}`}
            />
            <path
              d="M 183 33 C 263 36, 325 94, 324 172 C 323 248, 260 307, 176 307 C 96 307, 35 245, 36 167 C 37 91, 102 30, 183 33 Z"
              fill="none"
              stroke="#C9A24B"
              strokeWidth="1.1"
              strokeOpacity="0.82"
              strokeLinecap="round"
              className={`ring-draw ${doorsStartedOpening ? 'ring-draw-active-2' : ''}`}
            />
            <path
              d="M 177 21 C 270 22, 338 86, 336 168 C 334 256, 266 320, 180 319 C 89 318, 22 252, 23 170 C 24 85, 90 20, 177 21 Z"
              fill="none"
              stroke="#D8B86A"
              strokeWidth="0.95"
              strokeOpacity="0.72"
              strokeLinecap="round"
              className={`ring-draw ${doorsStartedOpening ? 'ring-draw-active-3' : ''}`}
            />
          </svg>

          <h1 className="font-script relative z-10 px-6 text-[2.95rem] leading-[1.06] text-[#4B3680] drop-shadow-[0_1px_12px_rgba(251,250,255,0.95)] sm:text-[3.75rem]">
            Hariom
            <span className="my-0.5 block text-3xl text-[#C9A24B] sm:text-4xl">
              &amp;
            </span>
            Akansha
          </h1>
        </div>

        <p
          className="hero-stagger font-hindi text-lg text-[#4B3680] sm:text-xl"
          style={{ transitionDelay: '720ms' }}
        >
          {WEDDING_CONFIG.hero.coupleHindi}
        </p>

        {/* Date Lockup */}
        <div
          className="hero-stagger mt-7 flex flex-col items-center"
          style={{ transitionDelay: '900ms' }}
        >
          <span className="font-cinzel text-xs font-semibold tracking-[0.34em] text-[#4B3680] uppercase sm:text-sm">
            {WEDDING_CONFIG.hero.month}
          </span>

          <div className="mt-2 flex items-center justify-center gap-4 sm:gap-7">
            <div className="w-24 border-y border-[#C9A24B]/70 py-1.5 sm:w-32">
              <span className="font-cinzel block text-[11px] font-medium tracking-[0.18em] text-[#2A2A56] uppercase sm:text-xs">
                {WEDDING_CONFIG.hero.dayOfWeek}
              </span>
            </div>

            <span className="font-serif-num text-5xl font-semibold tracking-tight text-[#7A5BB5] tabular-nums sm:text-6xl">
              {WEDDING_CONFIG.hero.dateRange}
            </span>

            <div className="w-24 border-y border-[#C9A24B]/70 py-1.5 sm:w-32">
              <span className="font-cinzel block text-xs font-medium tracking-[0.22em] text-[#2A2A56] sm:text-sm">
                {WEDDING_CONFIG.hero.year}
              </span>
            </div>
          </div>
        </div>

        <p
          className="hero-stagger mt-6 text-xs tracking-[0.14em] text-[#2A2A56]/75 uppercase sm:text-sm"
          style={{ transitionDelay: '1080ms' }}
        >
          {WEDDING_CONFIG.hero.venueNote}
        </p>
      </div>
    </section>
  );
};
