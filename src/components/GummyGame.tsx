import { useState, useCallback, useRef, useEffect } from "react";
import { useRelaxSound } from "@/hooks/useAudio";
import RankingModal from "@/components/RankingModal";
import RankingTable from "@/components/RankingTable";
import { supabase } from "@/integrations/supabase/client";

const GUMMY_EMOJIS = ["🍬", "🍭", "🧁", "🍩", "🍪", "🎂", "🍰", "🍡", "🍮"];

type Speed = "relax" | "normal" | "fast" | "extreme";

const SPEED_CONFIG: Record<Speed, { label: string; emoji: string; spawnMs: number; lifetimeCount: number }> = {
  relax:   { label: "Relajado",   emoji: "🐢", spawnMs: 800, lifetimeCount: 8 },
  normal:  { label: "Normal",     emoji: "🍭", spawnMs: 500, lifetimeCount: 5 },
  fast:    { label: "Rápido",     emoji: "🔥", spawnMs: 300, lifetimeCount: 4 },
  extreme: { label: "Extremo",    emoji: "⚡", spawnMs: 180, lifetimeCount: 3 },
};

export type { Speed };
export { SPEED_CONFIG };

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
  const [highScores, setHighScores] = useState<Record<Speed, number>>({
    relax: 0,
    normal: 0,
    fast: 0,
    extreme: 0,
  });
  const [speed, setSpeed] = useState<Speed>("normal");
  const [showNameModal, setShowNameModal] = useState(false);
  const [showRanking, setShowRanking] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const idRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setInterval>>();
  const spawnRef = useRef<ReturnType<typeof setInterval>>();
  const { playPop } = useRelaxSound();

  const config = SPEED_CONFIG[speed];

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
    setShowRanking(false);
    idRef.current = 0;
  }, []);

  const scoreRef = useRef(0);
  scoreRef.current = score;

  useEffect(() => {
    if (!running) return;
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          stopGame();
          const s = scoreRef.current;
          setHighScores((prev) => ({ ...prev, [speed]: Math.max(prev[speed], s) }));
          setFinalScore(s);
          if (s > 0) setShowNameModal(true);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    spawnRef.current = setInterval(spawnGummy, config.spawnMs);
    return () => {
      clearInterval(timerRef.current);
      clearInterval(spawnRef.current);
    };
  }, [running, spawnGummy, stopGame, config.spawnMs]);

  useEffect(() => {
    if (!running) return;
    const interval = setInterval(() => {
      setGummies((prev) => prev.filter((g) => idRef.current - g.id < config.lifetimeCount));
    }, 400);
    return () => clearInterval(interval);
  }, [running, config.lifetimeCount]);

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

  const handleNameSubmit = async (name: string) => {
    // Check if this name+speed already exists
    const { data: existing } = await supabase
      .from("game_rankings")
      .select("id, score")
      .eq("name", name)
      .eq("speed", speed)
      .maybeSingle();

    if (existing) {
      // Only update if new score is higher
      if (finalScore > existing.score) {
        await supabase
          .from("game_rankings")
          .update({ score: finalScore, updated_at: new Date().toISOString() })
          .eq("id", existing.id);
      }
    } else {
      await supabase
        .from("game_rankings")
        .insert({ name, speed, score: finalScore });
    }

    setShowNameModal(false);
  };

  const speeds: Speed[] = ["relax", "normal", "fast", "extreme"];

  return (
    <div className="w-full">
      <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary mb-2">
        🎮 Juego Antiestrés
      </h2>
      <p className="text-muted-foreground text-sm md:text-base mb-4">
        ¡Aplasta las gomitas antes de que desaparezcan! Libera tu estrés 💪
      </p>

      {/* Speed selector */}
      <div className="flex items-center justify-center gap-2 mb-4 flex-wrap">
        <span className="font-sans text-sm font-semibold text-muted-foreground mr-1">Velocidad:</span>
        {speeds.map((s) => (
          <button
            key={s}
            onClick={() => !running && setSpeed(s)}
            disabled={running}
            className={`font-sans text-xs md:text-sm font-bold px-3 py-1.5 rounded-full border-2 transition-all ${
              speed === s
                ? "border-primary bg-primary text-primary-foreground scale-105 shadow-md"
                : "border-border bg-background text-foreground hover:border-primary/50"
            } ${running ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:scale-105"}`}
          >
            {SPEED_CONFIG[s].emoji} {SPEED_CONFIG[s].label}
          </button>
        ))}
      </div>

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
            {score >= highScores[speed] && score > 0 && (
              <p className="font-sans text-lg text-secondary mt-1 font-bold">
                🏆 ¡Nuevo récord en {SPEED_CONFIG[speed].label}!
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
        {highScores[speed] > 0 && (
          <div className="glass-card px-5 py-2 rounded-full border border-border">
            <span className="font-sans font-bold text-secondary">🏆 {highScores[speed]} ({SPEED_CONFIG[speed].label})</span>
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
          onClick={() => setShowRanking(true)}
          className="font-sans font-bold text-base md:text-lg px-8 py-3 md:py-4 rounded-full shadow-lg hover:scale-105 hover:-translate-y-1 transition-all"
          style={{
            background: "linear-gradient(135deg, hsl(45 93% 58%), hsl(35 90% 65%))",
            color: "hsl(30 60% 20%)",
          }}
        >
          🏆 Ranking
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

      {/* Name input modal */}
      {showNameModal && (
        <RankingModal
          score={finalScore}
          speed={SPEED_CONFIG[speed].label}
          onSubmit={handleNameSubmit}
          onClose={() => setShowNameModal(false)}
        />
      )}

      {/* Ranking table */}
      {showRanking && (
        <RankingTable
          onClose={() => setShowRanking(false)}
        />
      )}
    </div>
  );
}
