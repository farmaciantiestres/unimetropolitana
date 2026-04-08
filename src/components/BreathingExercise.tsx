import { useState, useCallback } from "react";

export default function BreathingExercise() {
  const [breathing, setBreathing] = useState(false);
  const [phase, setPhase] = useState("");

  const startBreathing = useCallback(() => {
    if (breathing) return;
    setBreathing(true);

    const phases = [
      { text: "Inhala... 🌬️", duration: 4000 },
      { text: "Sostén... 💫", duration: 7000 },
      { text: "Exhala... 🍃", duration: 8000 },
    ];

    let cycle = 0;
    const maxCycles = 3;

    const runPhase = (pi: number) => {
      if (cycle >= maxCycles) {
        setPhase("¡Bien hecho! Te sientes mejor 💕");
        setTimeout(() => {
          setBreathing(false);
          setPhase("");
        }, 2000);
        return;
      }
      setPhase(phases[pi].text);
      setTimeout(() => {
        const next = pi + 1;
        if (next >= phases.length) {
          cycle++;
          runPhase(0);
        } else {
          runPhase(next);
        }
      }, phases[pi].duration);
    };

    runPhase(0);
  }, [breathing]);

  return (
    <div className="text-center">
      {phase && (
        <div className="mb-6 p-6 bg-[hsl(var(--candy-cream))] rounded-3xl border-4 border-[hsl(var(--candy-coral))] animate-bounce-in">
          <p className="font-serif text-2xl font-semibold text-primary animate-pulse">
            {phase}
          </p>
        </div>
      )}
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
    </div>
  );
}
