import { useState, useCallback, useRef, useEffect } from "react";
import { useRelaxSound } from "@/hooks/useAudio";

const GUMMY_EMOJIS = ["🍬", "🍭", "🧁", "🍩", "🍪", "🎂", "🍰", "🍡", "🍮"];

interface Gummy {
  id: number;
  emoji: string;
  x: number;
  y: number;
  popping: boolean;
}

export default function GummyGame() {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [running, setRunning] = useState(false);
  const [gummies, setGummies] = useState<Gummy[]>([]);
  const idRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setInterval>>();
  const spawnRef = useRef<ReturnType<typeof setInterval>>();
  const { playPop } = useRelaxSound();

  const spawnGummy = useCallback(() => {
    const g: Gummy = {
      id: idRef.current++,
      emoji: GUMMY_EMOJIS[Math.floor(Math.random() * GUMMY_EMOJIS.length)],
      x: Math.random() * 85,
      y: Math.random() * 80,
      popping: false,
    };
    setGummies((prev) => [...prev.slice(-12), g]);
  }, []);

  const startGame = useCallback(() => {
    setScore(0);
    setTimeLeft(30);
    setGummies([]);
    setRunning(true);
    idRef.current = 0;
  }, []);

  const stopGame = useCallback(() => {
    setRunning(false);
    setGummies([]);
    clearInterval(timerRef.current);
    clearInterval(spawnRef.current);
  }, []);

  useEffect(() => {
    if (!running) return;
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          stopGame();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    spawnRef.current = setInterval(spawnGummy, 600);
    return () => {
      clearInterval(timerRef.current);
      clearInterval(spawnRef.current);
    };
  }, [running, spawnGummy, stopGame]);

  // Auto-remove gummies after 1.8s
  useEffect(() => {
    if (!running) return;
    const interval = setInterval(() => {
      setGummies((prev) => prev.filter((g) => idRef.current - g.id < 4));
    }, 500);
    return () => clearInterval(interval);
  }, [running]);

  const smashGummy = (id: number) => {
    playPop();
    setGummies((prev) =>
      prev.map((g) => (g.id === id ? { ...g, popping: true } : g))
    );
    setScore((s) => s + 1);
    setTimeout(() => {
      setGummies((prev) => prev.filter((g) => g.id !== id));
    }, 300);
  };

  return (
    <div className="mt-10 p-8 bg-muted/95 rounded-candy border-[7px] border-candy-coral w-full">
      <h2 className="font-serif text-4xl font-bold text-primary mb-4">
        🎮 Juego Antiestrés ¡Aplasta Gomitas!
      </h2>
      <p className="text-muted-foreground mb-4">
        Haz clic en las gomitas antes de que desaparezcan. ¡Libera tu estrés!
      </p>

      <div className="relative w-full h-[300px] bg-candy-rose/30 rounded-2xl overflow-hidden border-4 border-dashed border-candy-rose my-5">
        {gummies.map((g) => (
          <span
            key={g.id}
            onClick={() => !g.popping && smashGummy(g.id)}
            className={`absolute text-[3.6rem] cursor-pointer select-none transition-transform hover:scale-[1.4] ${g.popping ? "animate-pop" : ""}`}
            style={{ left: `${g.x}%`, top: `${g.y}%` }}
          >
            {g.emoji}
          </span>
        ))}
      </div>

      <p className="font-sans text-xl font-bold text-primary my-4">
        Puntuación: {score} | Tiempo restante: {timeLeft}s
      </p>

      <div className="flex justify-center gap-4 flex-wrap">
        <button
          onClick={startGame}
          className="font-sans font-bold text-xl px-10 py-4 rounded-full bg-gradient-to-br from-candy-pink to-candy-coral text-primary-foreground shadow-md hover:scale-105 hover:-translate-y-1 transition-all"
        >
          ▶️ Iniciar Juego
        </button>
        <button
          onClick={stopGame}
          className="font-sans font-bold text-xl px-10 py-4 rounded-full bg-gradient-to-br from-candy-mint to-emerald-200 text-secondary-foreground shadow-md hover:scale-105 hover:-translate-y-1 transition-all"
        >
          ⏹️ Detener Juego
        </button>
      </div>
    </div>
  );
}
