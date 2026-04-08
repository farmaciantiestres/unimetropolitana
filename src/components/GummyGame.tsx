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
  const [highScore, setHighScore] = useState(0);
  const idRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setInterval>>();
  const spawnRef = useRef<ReturnType<typeof setInterval>>();
  const { playPop } = useRelaxSound();

  const spawnGummy = useCallback(() => {
    const g: Gummy = {
      id: idRef.current++,
      emoji: GUMMY_EMOJIS[Math.floor(Math.random() * GUMMY_EMOJIS.length)],
      x: 5 + Math.random() * 80,
      y: 5 + Math.random() * 75,
      popping: false,
    };
    setGummies((prev) => [...prev.slice(-14), g]);
  }, []);

  const stopGame = useCallback(() => {
    setRunning(false);
    setGummies([]);
    clearInterval(timerRef.current);
    clearInterval(spawnRef.current);
  }, []);

  const startGame = useCallback(() => {
    setScore(0);
    setTimeLeft(30);
    setGummies([]);
    setRunning(true);
    idRef.current = 0;
  }, []);

  useEffect(() => {
    if (!running) return;
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          stopGame();
          setHighScore((h) => Math.max(h, score));
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    spawnRef.current = setInterval(spawnGummy, 500);
    return () => {
      clearInterval(timerRef.current);
      clearInterval(spawnRef.current);
    };
  }, [running, spawnGummy, stopGame, score]);

  useEffect(() => {
    if (!running) return;
    const interval = setInterval(() => {
      setGummies((prev) => prev.filter((g) => idRef.current - g.id < 5));
    }, 400);
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
    <div className="p-6 md:p-8 bg-[hsl(var(--candy-cream))] rounded-3xl border-4 border-[hsl(var(--candy-coral))] w-full">
      <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary mb-2">
        🎮 Juego Antiestrés
      </h2>
      <p className="text-muted-foreground text-sm md:text-base mb-4">
        ¡Aplasta las gomitas antes de que desaparezcan! Libera tu estrés 💪
      </p>

      {/* Game area */}
      <div className="relative w-full h-[280px] md:h-[320px] bg-[hsl(var(--candy-rose)/0.4)] rounded-2xl overflow-hidden border-[3px] border-dashed border-[hsl(var(--candy-rose))] my-4 cursor-crosshair">
        {!running && timeLeft === 30 && (
          <div className="absolute inset-0 flex items-center justify-center text-center p-4">
            <p className="font-serif text-xl text-muted-foreground">
              Presiona "Iniciar" para comenzar 🍭
            </p>
          </div>
        )}
        {!running && timeLeft === 0 && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 animate-bounce-in">
            <p className="font-serif text-3xl font-bold text-primary mb-2">
              ¡Tiempo! 🎉
            </p>
            <p className="font-sans text-xl text-foreground">
              Puntuación: <span className="font-bold text-primary">{score}</span>
            </p>
            {score >= highScore && score > 0 && (
              <p className="font-sans text-lg text-secondary mt-1 font-bold">
                🏆 ¡Nuevo récord!
              </p>
            )}
          </div>
        )}
        {gummies.map((g) => (
          <span
            key={g.id}
            onClick={() => !g.popping && smashGummy(g.id)}
            className={`absolute text-4xl md:text-5xl cursor-pointer select-none transition-transform duration-150 hover:scale-125 ${
              g.popping ? "animate-pop" : "animate-bounce-in"
            }`}
            style={{ left: `${g.x}%`, top: `${g.y}%` }}
          >
            {g.emoji}
          </span>
        ))}
      </div>

      {/* Score bar */}
      <div className="flex items-center justify-center gap-6 my-4 flex-wrap">
        <div className="glass-card px-5 py-2 rounded-full border border-border">
          <span className="font-sans font-bold text-primary">⭐ {score}</span>
        </div>
        <div className="glass-card px-5 py-2 rounded-full border border-border">
          <span className="font-sans font-bold text-foreground">⏱️ {timeLeft}s</span>
        </div>
        {highScore > 0 && (
          <div className="glass-card px-5 py-2 rounded-full border border-border">
            <span className="font-sans font-bold text-secondary">🏆 {highScore}</span>
          </div>
        )}
      </div>

      {/* Buttons */}
      <div className="flex justify-center gap-3 md:gap-4 flex-wrap">
        <button
          onClick={startGame}
          className="font-sans font-bold text-base md:text-lg px-8 py-3 md:py-4 rounded-full shadow-lg hover:scale-105 hover:-translate-y-1 transition-all"
          style={{
            background: "linear-gradient(135deg, hsl(340 82% 65%), hsl(350 65% 72%))",
            color: "white",
          }}
        >
          ▶️ Iniciar Juego
        </button>
        <button
          onClick={stopGame}
          className="font-sans font-bold text-base md:text-lg px-8 py-3 md:py-4 rounded-full shadow-lg hover:scale-105 hover:-translate-y-1 transition-all"
          style={{
            background: "linear-gradient(135deg, hsl(155 52% 66%), hsl(145 45% 78%))",
            color: "hsl(160 50% 18%)",
          }}
        >
          ⏹️ Detener
        </button>
      </div>
    </div>
  );
}
