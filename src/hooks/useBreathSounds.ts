import { useCallback, useRef } from "react";

export function useBreathSounds() {
  const ctxRef = useRef<AudioContext | null>(null);

  const getCtx = useCallback(() => {
    if (!ctxRef.current) ctxRef.current = new AudioContext();
    return ctxRef.current;
  }, []);

  // Filtered noise that sounds like a calm inhale
  const playInhale = useCallback(() => {
    try {
      const ctx = getCtx();
      const duration = 4;
      const bufferSize = ctx.sampleRate * duration;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) data[i] = (Math.random() * 2 - 1);

      const source = ctx.createBufferSource();
      source.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(600, ctx.currentTime);
      filter.frequency.linearRampToValueAtTime(900, ctx.currentTime + duration);
      filter.Q.value = 1.2;

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 1);
      gain.gain.setValueAtTime(0.08, ctx.currentTime + duration - 0.5);
      gain.gain.linearRampToValueAtTime(0, ctx.currentTime + duration);

      source.connect(filter).connect(gain).connect(ctx.destination);
      source.start();
      source.stop(ctx.currentTime + duration);
    } catch {}
  }, [getCtx]);

  // Filtered noise that sounds like a calm exhale
  const playExhale = useCallback(() => {
    try {
      const ctx = getCtx();
      const duration = 8;
      const bufferSize = ctx.sampleRate * duration;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) data[i] = (Math.random() * 2 - 1);

      const source = ctx.createBufferSource();
      source.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(900, ctx.currentTime);
      filter.frequency.linearRampToValueAtTime(400, ctx.currentTime + duration);
      filter.Q.value = 0.8;

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 0.5);
      gain.gain.linearRampToValueAtTime(0.06, ctx.currentTime + duration - 1);
      gain.gain.linearRampToValueAtTime(0, ctx.currentTime + duration);

      source.connect(filter).connect(gain).connect(ctx.destination);
      source.start();
      source.stop(ctx.currentTime + duration);
    } catch {}
  }, [getCtx]);

  return { playInhale, playExhale };
}
