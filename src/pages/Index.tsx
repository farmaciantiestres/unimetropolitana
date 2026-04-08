import { useState, useRef } from "react";
import { getRandomQuote } from "@/data/quotes";
import { useBackgroundMusic } from "@/hooks/useAudio";
import BreathingExercise from "@/components/BreathingExercise";
import GummyGame from "@/components/GummyGame";

const Index = () => {
  const [quote, setQuote] = useState("Haz clic en \"Nueva Frase Dulce\" y respira... todo va a estar bien 💕");
  const { start, stop, isPlaying } = useBackgroundMusic();
  const [musicOn, setMusicOn] = useState(false);

  const toggleMusic = () => {
    if (musicOn) {
      stop();
    } else {
      start();
    }
    setMusicOn(!musicOn);
  };

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-8 relative">
      {/* Background overlay */}
      <div className="fixed inset-0 bg-candy-rose/40 -z-10" />

      {/* Music toggle */}
      <button
        onClick={toggleMusic}
        className="fixed top-4 right-4 z-50 font-sans font-bold text-lg px-5 py-3 rounded-full bg-card/90 border-2 border-border shadow-lg hover:scale-105 transition-all"
      >
        {musicOn ? "🔊 Música On" : "🔇 Música Off"}
      </button>

      {/* Main container */}
      <div className="relative z-10 text-center max-w-[880px] w-full p-10 bg-card/95 rounded-candy shadow-[var(--shadow-candy)] border-[9px] border-candy-rose mb-10">
        <h1 className="font-cursive text-7xl md:text-8xl text-primary mb-3" style={{ textShadow: "4px 4px 12px hsl(340 100% 88% / 0.9)" }}>
          🍫 Dulce Calma 🍭
        </h1>
        <p className="font-serif text-2xl text-muted-foreground font-semibold mb-8">
          Vamos a derretir tu estrés
        </p>

        {/* Quote box */}
        <div className="min-h-[220px] bg-candy-cream border-[7px] border-candy-coral rounded-[30px] p-10 my-8 shadow-lg flex items-center justify-center">
          <p className="font-serif text-2xl leading-relaxed font-semibold text-foreground">
            {quote}
          </p>
        </div>

        {/* Centered new quote button */}
        <div className="flex justify-center mb-6">
          <button
            onClick={() => setQuote(getRandomQuote())}
            className="font-sans font-bold text-xl px-12 py-5 rounded-full bg-gradient-to-br from-candy-pink to-candy-coral text-primary-foreground shadow-md hover:scale-105 hover:-translate-y-1 transition-all"
          >
            🐝 Nueva Frase Dulce
          </button>
        </div>

        {/* Breathing exercise */}
        <BreathingExercise />

        {/* Gummy game */}
        <GummyGame />

        {/* Footer */}
        <div className="font-serif text-xl font-semibold text-muted-foreground text-center mt-12">
          <span className="text-4xl animate-float inline-block">🍫</span>
          <span className="mx-4">Eres más dulce que cualquier chocolate</span>
          <span className="text-4xl animate-float inline-block">🍭</span>
        </div>
      </div>
    </div>
  );
};

export default Index;
