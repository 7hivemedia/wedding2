import React, { useState } from 'react';
import { WEDDING_CONFIG } from '../config.js';

interface FamilyCardProps {
  role: string;
  name: string;
  parentsLabel: string;
  parents: string;
  address: string;
}

const FamilyTiltCard: React.FC<FamilyCardProps> = ({
  role,
  name,
  parentsLabel,
  parents,
  address,
}) => {
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  const updateTilt = (clientX: number, clientY: number, el: HTMLElement) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rect = el.getBoundingClientRect();
    const px = (clientX - rect.left) / rect.width - 0.5;
    const py = (clientY - rect.top) / rect.height - 0.5;
    setTilt({
      rx: -py * 8,
      ry: px * 8,
    });
  };

  const resetTilt = () => setTilt({ rx: 0, ry: 0 });

  return (
    <article
      onPointerMove={(e) => updateTilt(e.clientX, e.clientY, e.currentTarget)}
      onPointerLeave={resetTilt}
      onTouchMove={(e) => {
        if (e.touches[0]) {
          updateTilt(
            e.touches[0].clientX,
            e.touches[0].clientY,
            e.currentTarget
          );
        }
      }}
      onTouchEnd={resetTilt}
      style={{
        transform: `perspective(850px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
        transition:
          tilt.rx === 0 && tilt.ry === 0
            ? 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)'
            : 'transform 0.1s ease-out',
      }}
      className="relative rounded-2xl bg-[#FBFAFF]/78 p-7 text-center shadow-[0_12px_32px_-12px_rgba(75,54,128,0.16)] backdrop-blur-md sm:p-8"
    >
      {/* Thin Gold Inner Border */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-2.5 rounded-xl border border-[#C9A24B]/55"
      />

      <div className="relative z-10 flex flex-col items-center">
        <span className="font-cinzel text-[11px] font-medium tracking-[0.26em] text-[#C9A24B] uppercase">
          {role}
        </span>

        <h3 className="font-script mt-2 text-4xl text-[#4B3680] sm:text-[2.6rem]">
          {name}
        </h3>

        <div
          aria-hidden="true"
          className="my-3 h-px w-14 bg-gradient-to-r from-transparent via-[#C9A24B]/70 to-transparent"
        />

        <p className="text-xs tracking-[0.14em] text-[#2A2A56]/70 uppercase">
          {parentsLabel}
        </p>
        <p className="mt-1.5 text-sm font-medium leading-relaxed text-[#2A2A56] sm:text-[15px]">
          {parents}
        </p>

        <p className="mt-4 max-w-xs text-xs leading-relaxed text-[#2A2A56]/80 sm:text-[13px]">
          {address}
        </p>
      </div>
    </article>
  );
};

const CoupleArchIllustration: React.FC = () => {
  return (
    <div className="animate-float-gentle relative mx-auto w-full max-w-[300px] sm:max-w-[320px]">
      {/* Gold-framed arch container */}
      <div
        className="relative overflow-hidden rounded-t-full rounded-b-2xl border-[1.5px] border-[#C9A24B] bg-gradient-to-b from-[#FBFAFF]/85 via-[#EFEAF9]/80 to-[#E2D8F3]/85 p-3 shadow-[0_18px_40px_-14px_rgba(75,54,128,0.22)]"
      >
        {/* Inner thin gold arch hairline */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-2 rounded-t-full rounded-b-xl border border-[#C9A24B]/45"
        />

        <svg
          viewBox="0 0 280 340"
          className="relative z-10 block h-auto w-full"
          role="img"
          aria-label="Illustration of bride Hariom's partner Akansha in a violet gown with orchid-pink dupatta and groom Hariom in a plum sherwani standing under a floral arch"
        >
          <defs>
            <linearGradient id="archBg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FBFAFF" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#E4DCF4" stopOpacity="0.95" />
            </linearGradient>
            <linearGradient id="violetGown" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8565C2" />
              <stop offset="100%" stopColor="#65469E" />
            </linearGradient>
            <linearGradient id="plumSherwani" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#584094" />
              <stop offset="100%" stopColor="#412D73" />
            </linearGradient>
          </defs>

          {/* Soft arch inner backdrop */}
          <path
            d="M 16 326 L 16 144 A 124 124 0 0 1 264 144 L 264 326 Z"
            fill="url(#archBg)"
          />

          {/* Sage Leaves Fanning Behind the Couple */}
          <g opacity="0.88">
            <path d="M140 245 C104 195, 62 152, 40 108 C72 132, 108 175, 140 232 Z" fill="#9CB6A0" />
            <path d="M140 245 C116 184, 92 126, 86 72 C108 116, 128 175, 140 232 Z" fill="#85A38A" />
            <path d="M140 245 C136 176, 136 112, 140 54 C146 112, 146 176, 140 235 Z" fill="#A9C2AD" />
            <path d="M140 245 C164 184, 188 126, 194 72 C172 116, 152 175, 140 232 Z" fill="#85A38A" />
            <path d="M140 245 C176 195, 218 152, 240 108 C208 132, 172 175, 140 232 Z" fill="#9CB6A0" />
            {/* Side sage sprigs */}
            <ellipse cx="64" cy="176" rx="14" ry="7" transform="rotate(-38 64 176)" fill="#A9C2AD" />
            <ellipse cx="216" cy="176" rx="14" ry="7" transform="rotate(38 216 176)" fill="#A9C2AD" />
            <ellipse cx="52" cy="212" rx="15" ry="7.5" transform="rotate(-24 52 212)" fill="#8CA991" />
            <ellipse cx="228" cy="212" rx="15" ry="7.5" transform="rotate(24 228 212)" fill="#8CA991" />
          </g>

          {/* Ground shadow */}
          <ellipse cx="140" cy="308" rx="92" ry="10" fill="#7A5BB5" opacity="0.14" />

          {/* BRIDE (Left) — Faceless flat vector */}
          <g>
            {/* Long brown hair flowing behind */}
            <path
              d="M 86 120 C 78 122, 74 146, 76 184 C 78 202, 85 208, 92 204 L 114 196 C 117 166, 117 132, 108 118 Z"
              fill="#4D3328"
            />
            {/* Neck */}
            <rect x="94" y="136" width="10" height="14" rx="4" fill="#EAC1A7" />
            {/* Faceless head silhouette */}
            <ellipse cx="99" cy="122" rx="13.5" ry="16.5" fill="#F2CCB4" />
            {/* Brown hair crown & side sweep */}
            <path
              d="M 85 120 C 85 104, 112 103, 113 120 C 107 113, 96 112, 85 120 Z"
              fill="#4D3328"
            />
            {/* Subtle gold hair ornament (maang tikka) */}
            <circle cx="99" cy="111" r="2.2" fill="#C9A24B" />

            {/* Violet gown bodice & flared skirt */}
            <path
              d="M 86 148 L 112 148 L 116 196 L 130 302 L 68 302 L 82 196 Z"
              fill="url(#violetGown)"
            />
            {/* Gown vertical fold lines */}
            <path
              d="M 94 196 L 86 298 M 103 196 L 104 298 M 111 196 L 120 298"
              stroke="#5A3D91"
              strokeWidth="1.2"
              opacity="0.45"
            />
            {/* Gold hem on violet gown */}
            <path
              d="M 68.5 294 L 129.5 294 L 130 302 L 68 302 Z"
              fill="#C9A24B"
            />
            <path
              d="M 70 289 L 128 289"
              stroke="#E6C97A"
              strokeWidth="1.4"
              strokeDasharray="3 3"
            />

            {/* Gold waist belt */}
            <rect x="83.5" y="186" width="31" height="4" rx="2" fill="#C9A24B" />

            {/* Orchid-pink dupatta draped over shoulder and down her left side */}
            <path
              d="M 85 147 C 75 154, 67 182, 65 218 C 63 246, 65 272, 72 288 C 80 280, 84 252, 85 218 C 87 190, 96 172, 113 156 L 111 147 C 98 153, 90 151, 85 147 Z"
              fill="#D47FC4"
              opacity="0.94"
            />
            {/* Gold border trim on dupatta */}
            <path
              d="M 65.5 218 C 63.5 246, 65.5 272, 72 288"
              fill="none"
              stroke="#C9A24B"
              strokeWidth="1.6"
            />

            {/* Bride arm reaching gently toward groom */}
            <path
              d="M 112 156 C 122 174, 130 190, 140 196"
              fill="none"
              stroke="#F2CCB4"
              strokeWidth="6.5"
              strokeLinecap="round"
            />
            {/* Gold bangles */}
            <circle cx="133" cy="192" r="2.2" fill="#C9A24B" />
          </g>

          {/* GROOM (Right) — Faceless flat vector */}
          <g>
            {/* Neck */}
            <rect x="171" y="128" width="11" height="15" rx="4" fill="#E6B99D" />
            {/* Faceless head silhouette */}
            <ellipse cx="176.5" cy="113" rx="14" ry="17" fill="#EEC4AA" />
            {/* Neat dark hair */}
            <path
              d="M 162 110 C 161 95, 190 94, 191 110 C 189 102, 168 101, 162 110 Z"
              fill="#292038"
            />

            {/* Cream churidar trousers */}
            <path d="M 162 246 L 174 246 L 173 302 L 160 302 Z" fill="#F5EFFA" />
            <path d="M 178 246 L 190 246 L 192 302 L 179 302 Z" fill="#ECE4F6" />

            {/* Plum Sherwani */}
            <path
              d="M 156 142 L 196 142 L 201 254 L 152 254 Z"
              fill="url(#plumSherwani)"
            />
            {/* Sherwani skirt flare & side overlap */}
            <path
              d="M 176 142 L 176 254"
              stroke="#33205C"
              strokeWidth="1.4"
              opacity="0.7"
            />
            {/* Gold Mandarin Collar */}
            <path
              d="M 166 138 L 187 138 L 186 146 L 167 146 Z"
              fill="#C9A24B"
            />
            {/* Gold Buttons */}
            <circle cx="176" cy="156" r="2.2" fill="#C9A24B" />
            <circle cx="176" cy="168" r="2.2" fill="#C9A24B" />
            <circle cx="176" cy="180" r="2.2" fill="#C9A24B" />
            <circle cx="176" cy="192" r="2.2" fill="#C9A24B" />
            <circle cx="176" cy="204" r="2.2" fill="#C9A24B" />
            {/* Gold pocket square accent */}
            <polygon points="183,162 191,162 187,156" fill="#C9A24B" />

            {/* Groom left arm holding bride's hand */}
            <path
              d="M 157 149 C 149 170, 144 188, 139 197"
              fill="none"
              stroke="#4B3680"
              strokeWidth="9.5"
              strokeLinecap="round"
            />
            <circle cx="139" cy="197" r="4.2" fill="#EEC4AA" />

            {/* Groom right arm */}
            <path
              d="M 195 149 C 204 172, 204 198, 198 218"
              fill="none"
              stroke="#4B3680"
              strokeWidth="9.5"
              strokeLinecap="round"
            />
            <circle cx="198" cy="220" r="4" fill="#EEC4AA" />
          </g>

          {/* Small Botanical Bushes & Lavender Blooms at Their Feet */}
          <g>
            {/* Left bush */}
            <circle cx="58" cy="296" r="16" fill="#89A68E" />
            <circle cx="74" cy="302" r="13" fill="#A0B9A4" />
            <circle cx="46" cy="304" r="11" fill="#77957D" />
            <circle cx="56" cy="288" r="3.2" fill="#D47FC4" />
            <circle cx="68" cy="295" r="2.8" fill="#7A5BB5" />

            {/* Right bush */}
            <circle cx="220" cy="296" r="16" fill="#89A68E" />
            <circle cx="204" cy="302" r="13" fill="#A0B9A4" />
            <circle cx="232" cy="304" r="11" fill="#77957D" />
            <circle cx="222" cy="288" r="3.2" fill="#D47FC4" />
            <circle cx="210" cy="295" r="2.8" fill="#7A5BB5" />
          </g>
        </svg>
      </div>
    </div>
  );
};

export const FamiliesSection: React.FC = () => {
  return (
    <section
      id="families"
      className="relative mx-auto max-w-6xl px-4 py-16 sm:px-8 sm:py-20"
    >
      <div className="mb-12 text-center">
        <h2 className="font-script text-4xl text-[#4B3680] sm:text-5xl">
          {WEDDING_CONFIG.families.heading}
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

      {/* Three Columns: Groom | Arched Couple (first on mobile) | Bride */}
      <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-3 lg:gap-10">
        <div className="order-2 lg:order-1">
          <FamilyTiltCard {...WEDDING_CONFIG.families.groom} />
        </div>

        <div className="order-1 lg:order-2">
          <CoupleArchIllustration />
        </div>

        <div className="order-3 lg:order-3">
          <FamilyTiltCard {...WEDDING_CONFIG.families.bride} />
        </div>
      </div>
    </section>
  );
};
