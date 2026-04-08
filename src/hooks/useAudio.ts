import { useCallback, useEffect, useRef } from "react";

const NOTES = [261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 493.88];

export function useRelaxSound() {
  const ctxRef = useRef<AudioContext | null>(null);

  const getCtx = useCallback(() => {
    if (!ctxRef.current) {
      ctxRef.current = new AudioContext();
    }
    return ctxRef.current;
  }, []);

  const playPop = useCallback(() => {
    try {
      const ctx = getCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const note = NOTES[Math.floor(Math.random() * NOTES.length)];
      osc.type = "sine";
      osc.frequency.setValueAtTime(note, ctx.currentTime);
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
      osc.connect(gain).connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.4);
    } catch {}
  }, [getCtx]);

  return { playPop };
}

export function useBackgroundMusic() {
  const ctxRef = useRef<AudioContext | null>(null);
  const playingRef = useRef(false);
  const nodesRef = useRef<{ osc: OscillatorNode; gain: GainNode }[]>([]);

  const start = useCallback(() => {
    if (playingRef.current) return;
    try {
      const ctx = ctxRef.current || new AudioContext();
      ctxRef.current = ctx;
      playingRef.current = true;

      const chords = [
        [261.63, 329.63, 392.00],
        [293.66, 349.23, 440.00],
        [329.63, 392.00, 493.88],
        [261.63, 349.23, 440.00],
      ];

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.06, ctx.currentTime);
      masterGain.connect(ctx.destination);

      chords.forEach((chord, ci) => {
        chord.forEach((freq) => {
          const osc = ctx.createOscillator();
          const g = ctx.createGain();
          osc.type = "sine";
          osc.frequency.setValueAtTime(freq, ctx.currentTime);
          g.gain.setValueAtTime(0, ctx.currentTime);

          const loopDur = chords.length * 4;
          const startOffset = ci * 4;

          for (let loop = 0; loop < 100; loop++) {
            const base = ctx.currentTime + loop * loopDur + startOffset;
            g.gain.setValueAtTime(0, base);
            g.gain.linearRampToValueAtTime(1, base + 1);
            g.gain.setValueAtTime(1, base + 3);
            g.gain.linearRampToValueAtTime(0, base + 4);
          }

          osc.connect(g).connect(masterGain);
          osc.start();
          nodesRef.current.push({ osc, gain: g });
        });
      });
    } catch {}
  }, []);

  const stop = useCallback(() => {
    nodesRef.current.forEach(({ osc }) => {
      try { osc.stop(); } catch {}
    });
    nodesRef.current = [];
    playingRef.current = false;
  }, []);

  useEffect(() => () => stop(), [stop]);

  return { start, stop, isPlaying: playingRef };
}
