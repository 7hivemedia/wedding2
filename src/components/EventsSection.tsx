import React, { useEffect, useRef, useState } from 'react';
import { WEDDING_CONFIG } from '../config.js';

export const EventsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.16 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="events"
      ref={sectionRef}
      className="relative mx-auto max-w-6xl px-4 py-14 sm:px-8 sm:py-20"
    >
      <div className="mb-12 text-center">
        <h2 className="font-script text-4xl text-[#4B3680] sm:text-5xl">
          {WEDDING_CONFIG.eventsSection.heading}
        </h2>
        <div
          aria-hidden="true"
          className="mx-auto mt-3 flex items-center justify-center gap-3"
        >
          <span className="h-px w-14 bg-[#C9A24B]/65" />
          <span className="h-1.5 w-1.5 rotate-45 bg-[#C9A24B]" />
          <span className="h-px w-14 bg-[#C9A24B]/65" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {WEDDING_CONFIG.eventsSection.events.map((ev, index) => (
          <article
            key={ev.id}
            style={{ transitionDelay: `${index * 110}ms` }}
            className={`reveal-up relative flex flex-col items-center rounded-2xl bg-[#FBFAFF]/80 px-5 py-8 text-center shadow-[0_10px_28px_-12px_rgba(75,54,128,0.16)] backdrop-blur-md transition-shadow duration-300 hover:shadow-[0_16px_36px_-12px_rgba(75,54,128,0.24)] ${
              visible ? 'is-visible' : ''
            }`}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-2.5 rounded-xl border border-[#C9A24B]/45"
            />

            <span className="font-cinzel relative z-10 text-xs tracking-[0.22em] text-[#2A2A56]/75 uppercase">
              {ev.dayName} · {ev.monthYear}
            </span>

            <span
              className="font-serif-num relative z-10 mt-2 text-6xl font-semibold leading-none tabular-nums"
              style={{ color: ev.color }}
            >
              {ev.dateNum}
            </span>

            <div
              aria-hidden="true"
              className="relative z-10 my-4 h-px w-12"
              style={{ backgroundColor: `${ev.color}66` }}
            />

            <h3 className="font-cinzel relative z-10 text-sm font-semibold tracking-[0.06em] text-[#4B3680] sm:text-[15px]">
              {ev.title}
            </h3>

            <p className="font-hindi relative z-10 mt-1.5 text-base text-[#2A2A56]/90">
              {ev.hindi}
            </p>

            <p className="relative z-10 mt-4 text-xs font-medium tracking-[0.16em] text-[#C9A24B] uppercase">
              {ev.time}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
};
