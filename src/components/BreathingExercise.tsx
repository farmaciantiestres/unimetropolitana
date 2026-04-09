import { useState, useCallback, useRef, useEffect } from "react";
import { useBreathSounds } from "@/hooks/useBreathSounds";

type Phase = "inhale" | "hold" | "exhale" | "done" | null;

const PHASES: { key: Phase; text: string; emoji: string; duration: number }[] = [
  { key: "inhale", text: "Inhala...", emoji: "🌬️", duration: 4000 },
  { key: "hold", text: "Sostén...", emoji: "💫", duration: 7000 },
  { key: "exhale", text: "Exhala...", emoji: "🍃", duration: 8000 },
];

export default function BreathingExercise() {
  const [breathing, setBreathing] = useState(false);
  const [phase, setPhase] = useState<Phase>(null);
  const [phaseText, setPhaseText] = useState("");
  const [phaseEmoji, setPhaseEmoji] = useState("");
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cycleRef = useRef(0);
  const { playInhale, playExhale } = useBreathSounds();

  const clearTimer = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const stopBreathing = useCallback(() => {
    clearTimer();
    setBreathing(false);
    setPhase(null);
    setPhaseText("");
    setPhaseEmoji("");
    cycleRef.current = 0;
  }, [clearTimer]);

  const runPhase = useCallback(
    (pi: number) => {
      if (cycleRef.current >= 3) {
        setPhase("done");
        setPhaseText("¡Bien hecho! Te sientes mejor 💕");
        setPhaseEmoji("💕");
        timeoutRef.current = setTimeout(() => {
          stopBreathing();
        }, 2500);
        return;
      }

      const p = PHASES[pi];
      setPhase(p.key);
      setPhaseText(p.text);
      setPhaseEmoji(p.emoji);

      // Play sounds
      if (p.key === "inhale") playInhale();
      if (p.key === "exhale") playExhale();

      timeoutRef.current = setTimeout(() => {
        const next = pi + 1;
        if (next >= PHASES.length) {
          cycleRef.current++;
          runPhase(0);
        } else {
          runPhase(next);
        }
      }, p.duration);
    },
    [stopBreathing, playInhale, playExhale]
  );

  const startBreathing = useCallback(() => {
    if (breathing) return;
    setBreathing(true);
    cycleRef.current = 0;
    runPhase(0);
  }, [breathing, runPhase]);

  useEffect(() => () => clearTimer(), [clearTimer]);

  // Circle scale based on phase
  const circleScale =
    phase === "inhale"
      ? "scale-[1.35]"
      : phase === "exhale"
      ? "scale-[0.75]"
      : phase === "hold"
      ? "scale-[1.35]"
      : "scale-100";

  // Duration for the CSS transition matching the phase
  const circleDuration =
    phase === "inhale"
      ? "duration-[4000ms]"
      : phase === "exhale"
      ? "duration-[8000ms]"
      : phase === "hold"
      ? "duration-[7000ms]"
      : "duration-500";

  return (
    <div className="text-center flex flex-col items-center gap-6">
      {/* Animated breathing circle */}
      {breathing && phase && phase !== "done" && (
        <div className="relative flex items-center justify-center my-4">
          {/* Outer pulse ring */}
          <div
            className={`absolute w-44 h-44 md:w-52 md:h-52 rounded-full border-4 transition-transform ease-in-out ${circleDuration} ${circleScale}`}
            style={{
              borderColor: "hsl(var(--candy-pink) / 0.3)",
              background: "hsl(var(--candy-rose) / 0.15)",
            }}
          />
          {/* Main circle */}
          <div
            className={`relative w-36 h-36 md:w-44 md:h-44 rounded-full flex flex-col items-center justify-center transition-transform ease-in-out ${circleDuration} ${circleScale} shadow-lg`}
            style={{
              background: "linear-gradient(135deg, hsl(var(--candy-rose)), hsl(var(--candy-cream)))",
              border: "4px solid hsl(var(--candy-coral))",
            }}
          >
            <span className="text-4xl mb-1">{phaseEmoji}</span>
            <p className="font-serif text-lg md:text-xl font-semibold text-primary">
              {phaseText}
            </p>
          </div>
        </div>
      )}

      {/* Done message */}
      {phase === "done" && (
        <div className="mb-4 p-6 bg-[hsl(var(--candy-cream))] rounded-3xl border-4 border-[hsl(var(--candy-coral))] animate-bounce-in">
          <p className="font-serif text-2xl font-semibold text-primary">
            {phaseText}
          </p>
        </div>
      )}

      {/* Buttons */}
      <div className="flex gap-4">
        <button
          onClick={startBreathing}
          disabled={breathing}
          className="font-sans font-bold text-lg md:text-xl px-10 py-4 md:py-5 rounded-full shadow-lg hover:scale-105 hover:-translate-y-1 transition-all disabled:opacity-50"
          style={{
            background: "linear-gradient(135deg, hsl(155 52% 66%), hsl(145 45% 78%))",
            color: "hsl(160 50% 18%)",
          }}
        >
          🌬️ Respirar 4-7-8
        </button>

        {breathing && phase !== "done" && (
          <button
            onClick={stopBreathing}
            className="font-sans font-bold text-lg md:text-xl px-8 py-4 md:py-5 rounded-full shadow-lg hover:scale-105 hover:-translate-y-1 transition-all animate-bounce-in"
            style={{
              background: "linear-gradient(135deg, hsl(var(--candy-coral)), hsl(340 82% 65%))",
              color: "white",
            }}
          >
            ⏹️ Detener
          </button>
        )}
      </div>
    </div>
  );
}
