/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { CountdownAndActions } from './components/CountdownAndActions';
import { EventsSection } from './components/EventsSection';
import { FamiliesSection } from './components/FamiliesSection';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { MusicToggle } from './components/MusicToggle';
import { RoyalDoors } from './components/RoyalDoors';
import { StickyNav } from './components/StickyNav';

export default function App() {
  const [doorsStartedOpening, setDoorsStartedOpening] = useState(false);
  const [doorsUnmounted, setDoorsUnmounted] = useState(false);

  useEffect(() => {
    if (!doorsUnmounted) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [doorsUnmounted]);

  return (
    <div className="min-h-screen text-[#2A2A56]">
      {!doorsUnmounted && (
        <RoyalDoors
          onStartOpen={() => setDoorsStartedOpening(true)}
          onOpened={() => setDoorsUnmounted(true)}
        />
      )}

      <StickyNav />

      <main aria-hidden={!doorsStartedOpening}>
        <HeroSection doorsStartedOpening={doorsStartedOpening} />
        <FamiliesSection />
        <EventsSection />
        <CountdownAndActions />
      </main>

      <Footer />
      <MusicToggle />
    </div>
  );
}
