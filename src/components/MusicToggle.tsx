import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

/**
 * Floating ambient wedding chime & soft tanpura-inspired drone (off by default, no autoplay).
 * Synthesized purely via Web Audio API so zero external MP3 dependencies can 404.
 */
export const MusicToggle: React.FC = () => {
  const [playing, setPlaying] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const loopTimerRef = useRef<number | null>(null);
  const droneOscsRef = useRef<OscillatorNode[]>([]);

  const stopAudio = () => {
    if (loopTimerRef.current !== null) {
      window.clearInterval(loopTimerRef.current);
      loopTimerRef.current = null;
    }

    const ctx = ctxRef.current;
    const master = masterGainRef.current;
    if (ctx && master) {
      const now = ctx.currentTime;
      master.gain.cancelScheduledValues(now);
      master.gain.setValueAtTime(master.gain.value, now);
      master.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);

      window.setTimeout(() => {
        droneOscsRef.current.forEach((osc) => {
          try {
            osc.stop();
            osc.disconnect();
          } catch {
            // ignore already stopped
          }
        });
        droneOscsRef.current = [];
        ctx.close().catch(() => {});
        ctxRef.current = null;
        masterGainRef.current = null;
      }, 380);
    }
    setPlaying(false);
  };

  const startAudio = () => {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    if (!AudioCtx) return;

    const ctx = new AudioCtx();
    ctxRef.current = ctx;

    const master = ctx.createGain();
    master.gain.setValueAtTime(0.0001, ctx.currentTime);
    master.gain.exponentialRampToValueAtTime(0.14, ctx.currentTime + 0.8);
    master.connect(ctx.destination);
    masterGainRef.current = master;

    // Gentle Sa-Pa-Sa tanpura-like drone (C3, G3, C4)
    const droneFreqs = [130.81, 196.0, 261.63];
    const oscs: OscillatorNode[] = [];

    droneFreqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = idx === 0 ? 'triangle' : 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(idx === 0 ? 0.14 : 0.08, ctx.currentTime);
      osc.connect(gain);
      gain.connect(master);
      osc.start();
      oscs.push(osc);
    });
    droneOscsRef.current = oscs;

    // Soft Raag Yaman / Bhupali inspired pentatonic chime notes
    const melody = [329.63, 392.0, 440.0, 523.25, 440.0, 392.0, 329.63, 293.66];
    let step = 0;

    const playChime = () => {
      if (!ctxRef.current || !masterGainRef.current) return;
      const now = ctxRef.current.currentTime;
      const osc = ctxRef.current.createOscillator();
      const env = ctxRef.current.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(melody[step % melody.length], now);
      step += 1;

      env.gain.setValueAtTime(0.0001, now);
      env.gain.linearRampToValueAtTime(0.16, now + 0.06);
      env.gain.exponentialRampToValueAtTime(0.0001, now + 1.9);

      osc.connect(env);
      env.connect(masterGainRef.current);
      osc.start(now);
      osc.stop(now + 2.0);
    };

    playChime();
    loopTimerRef.current = window.setInterval(playChime, 1600);
    setPlaying(true);
  };

  useEffect(() => {
    return () => {
      if (loopTimerRef.current !== null) {
        window.clearInterval(loopTimerRef.current);
      }
      droneOscsRef.current.forEach((osc) => {
        try {
          osc.stop();
        } catch {
          // ignore
        }
      });
      ctxRef.current?.close().catch(() => {});
    };
  }, []);

  const toggleMusic = () => {
    if (playing) {
      stopAudio();
    } else {
      startAudio();
    }
  };

  return (
    <button
      type="button"
      onClick={toggleMusic}
      aria-pressed={playing}
      aria-label={playing ? 'Mute background music' : 'Play background music'}
      title={playing ? 'Mute Music' : 'Play Music'}
      className="fixed right-5 bottom-5 z-40 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-[#C9A24B] bg-[#FBFAFF]/92 text-[#4B3680] shadow-[0_8px_24px_rgba(75,54,128,0.22)] backdrop-blur-md transition-transform duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A24B] focus-visible:ring-offset-2"
    >
      {playing ? (
        <Volume2 className="h-5 w-5 text-[#7A5BB5]" aria-hidden="true" />
      ) : (
        <VolumeX className="h-5 w-5 text-[#4B3680]/75" aria-hidden="true" />
      )}
    </button>
  );
};
