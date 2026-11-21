import React, { useEffect, useState } from 'react';
import { CalendarPlus, MapPin, MessageCircleHeart } from 'lucide-react';
import { WEDDING_CONFIG } from '../config.js';
import { downloadWeddingCalendarIcs } from '../utils/ics';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  completed: boolean;
}

function computeTimeLeft(targetIso: string): TimeLeft {
  const target = new Date(targetIso).getTime();
  const diff = target - Date.now();
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, completed: true };
  }
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds, completed: false };
}

interface FlipUnitProps {
  value: number;
  label: string;
}

const FlipUnit: React.FC<FlipUnitProps> = ({ value, label }) => {
  const formatted = String(value).padStart(2, '0');

  return (
    <div className="flex flex-col items-center">
      <div className="relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-xl border border-[#C9A24B]/55 bg-gradient-to-b from-[#FBFAFF] via-[#F2ECFA] to-[#E6DCF5] shadow-[0_10px_24px_-10px_rgba(75,54,128,0.24)] sm:h-24 sm:w-24">
        {/* Split-flap centre seam */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-1/2 z-10 h-px bg-[#4B3680]/15"
        />
        {/* Side hinge notches */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-0 z-10 h-2.5 w-1 -translate-y-1/2 rounded-r bg-[#C9A24B]/55"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 right-0 z-10 h-2.5 w-1 -translate-y-1/2 rounded-l bg-[#C9A24B]/55"
        />

        <span
          key={formatted}
          className="animate-flip-tick font-serif-num relative z-0 text-4xl font-semibold text-[#4B3680] tabular-nums sm:text-5xl"
        >
          {formatted}
        </span>
      </div>

      <span className="font-cinzel mt-2.5 text-[11px] tracking-[0.2em] text-[#2A2A56]/80 uppercase sm:text-xs">
        {label}
      </span>
    </div>
  );
};

export const CountdownAndActions: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() =>
    computeTimeLeft(WEDDING_CONFIG.countdown.targetIso)
  );

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTimeLeft(computeTimeLeft(WEDDING_CONFIG.countdown.targetIso));
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section
      aria-label="Wedding Countdown and Actions"
      className="mx-auto max-w-4xl px-4 py-12 text-center sm:px-8 sm:py-16"
    >
      <p className="font-cinzel text-xs tracking-[0.26em] text-[#4B3680] uppercase sm:text-sm">
        {WEDDING_CONFIG.countdown.heading}
      </p>

      {timeLeft.completed ? (
        <p className="font-script mt-6 text-4xl text-[#7A5BB5] sm:text-5xl">
          {WEDDING_CONFIG.countdown.completedText}
        </p>
      ) : (
        <div
          className="mt-7 flex flex-wrap items-center justify-center gap-3.5 sm:gap-6"
          role="timer"
          aria-live="off"
        >
          <FlipUnit value={timeLeft.days} label="Days" />
          <FlipUnit value={timeLeft.hours} label="Hours" />
          <FlipUnit value={timeLeft.minutes} label="Minutes" />
          <FlipUnit value={timeLeft.seconds} label="Seconds" />
        </div>
      )}

      {/* Action Buttons */}
      <div className="mt-10 flex flex-wrap items-center justify-center gap-3.5 sm:gap-4">
        <button
          type="button"
          onClick={downloadWeddingCalendarIcs}
          className="font-cinzel inline-flex min-h-11 cursor-pointer items-center gap-2.5 rounded-xl border border-[#C9A24B] bg-[#4B3680] px-5 py-2.5 text-xs font-medium tracking-[0.14em] text-[#FBFAFF] whitespace-nowrap shrink-0 uppercase shadow-sm transition-colors duration-200 hover:bg-[#5E4699] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A24B] focus-visible:ring-offset-2"
        >
          <CalendarPlus className="h-4 w-4 text-[#E6C97A]" aria-hidden="true" />
          {WEDDING_CONFIG.actions.calendarLabel}
        </button>

        <a
          href={WEDDING_CONFIG.actions.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-cinzel inline-flex min-h-11 items-center gap-2.5 rounded-xl border border-[#C9A24B]/70 bg-[#FBFAFF]/85 px-5 py-2.5 text-xs font-medium tracking-[0.14em] text-[#4B3680] whitespace-nowrap shrink-0 uppercase shadow-sm transition-colors duration-200 hover:bg-[#FBFAFF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7A5BB5] focus-visible:ring-offset-2"
        >
          <MapPin className="h-4 w-4 text-[#C9A24B]" aria-hidden="true" />
          {WEDDING_CONFIG.actions.mapsLabel}
        </a>

        <a
          href={WEDDING_CONFIG.actions.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-cinzel inline-flex min-h-11 items-center gap-2.5 rounded-xl border border-[#C9A24B]/70 bg-[#FBFAFF]/85 px-5 py-2.5 text-xs font-medium tracking-[0.14em] text-[#4B3680] whitespace-nowrap shrink-0 uppercase shadow-sm transition-colors duration-200 hover:bg-[#FBFAFF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7A5BB5] focus-visible:ring-offset-2"
        >
          <MessageCircleHeart
            className="h-4 w-4 text-[#D47FC4]"
            aria-hidden="true"
          />
          {WEDDING_CONFIG.actions.whatsappLabel}
        </a>
      </div>
    </section>
  );
};
