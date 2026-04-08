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
        <div className="mt-6 p-6 bg-candy-cream rounded-candy border-4 border-candy-coral">
          <p className="font-serif text-2xl font-semibold text-primary animate-pulse">
            {phase}
          </p>
        </div>
      )}
      <button
        onClick={startBreathing}
        disabled={breathing}
        className="font-sans font-bold text-xl px-12 py-5 rounded-full bg-gradient-to-br from-candy-mint to-emerald-200 text-secondary-foreground shadow-md hover:scale-105 hover:-translate-y-1 transition-all disabled:opacity-50 mt-4"
      >
        🌬️ Respirar 4-7-8
      </button>
    </div>
  );
}
