import { useState } from "react";
import { getRandomQuote } from "@/data/quotes";
import { useBackgroundMusic } from "@/hooks/useAudio";
import BreathingExercise from "@/components/BreathingExercise";
import GummyGame from "@/components/GummyGame";
import candyBg from "@/assets/candy-bg.jpg";

const Index = () => {
  const [quote, setQuote] = useState(
    'Haz clic en "Nueva Frase Dulce" y respira... todo va a estar bien 💕'
  );
  const [quoteKey, setQuoteKey] = useState(0);
  const { start, stop } = useBackgroundMusic();
  const [musicOn, setMusicOn] = useState(false);

  const toggleMusic = () => {
    if (musicOn) stop();
    else start();
    setMusicOn(!musicOn);
  };

  const newQuote = () => {
    setQuote(getRandomQuote());
    setQuoteKey((k) => k + 1);
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center px-3 py-6 md:px-6 md:py-10 relative"
      style={{
        backgroundImage: `linear-gradient(to bottom, hsl(340 100% 92% / 0.82), hsl(30 100% 90% / 0.82)), url(${candyBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Floating decorative emojis */}
      <div className="fixed top-10 left-6 text-5xl animate-float opacity-50 pointer-events-none select-none z-0">🍬</div>
      <div className="fixed top-32 right-8 text-4xl animate-float opacity-40 pointer-events-none select-none z-0" style={{ animationDelay: "1s" }}>🧁</div>
      <div className="fixed bottom-20 left-10 text-4xl animate-float opacity-40 pointer-events-none select-none z-0" style={{ animationDelay: "1.5s" }}>🍩</div>
      <div className="fixed bottom-40 right-14 text-5xl animate-float opacity-50 pointer-events-none select-none z-0" style={{ animationDelay: "0.5s" }}>🍭</div>

      {/* Music toggle */}
      <button
        onClick={toggleMusic}
        className="fixed top-4 right-4 z-50 glass-card font-sans font-semibold text-base px-5 py-2.5 rounded-full border-2 border-border shadow-lg hover:scale-105 transition-all"
      >
        {musicOn ? "🔊 Música" : "🔇 Música"}
      </button>

      {/* Main card */}
      <div className="relative z-10 text-center max-w-[860px] w-full glass-card rounded-[40px] border-[6px] border-[hsl(var(--candy-rose))] shadow-[0_20px_60px_hsl(340_82%_65%/0.25)] p-8 md:p-12 mb-10">
        
        {/* Title */}
        <h1
          className="font-cursive text-6xl sm:text-7xl md:text-8xl text-primary mb-2 leading-tight"
          style={{ textShadow: "3px 3px 15px hsl(340 100% 88% / 0.8)" }}
        >
          🍫 Dulce Calma 🍭
        </h1>
        <p className="font-serif text-xl md:text-2xl text-muted-foreground font-semibold mb-8">
          ✨ Vamos a derretir tu estrés ✨
        </p>

        {/* Quote box */}
        <div className="min-h-[180px] md:min-h-[200px] bg-[hsl(var(--candy-cream))] border-4 border-[hsl(var(--candy-coral))] rounded-3xl p-8 md:p-10 my-6 shadow-inner flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--candy-peach)/0.3)] to-transparent pointer-events-none" />
          <p
            key={quoteKey}
            className="font-serif text-xl md:text-2xl leading-relaxed font-semibold text-foreground relative z-10 animate-bounce-in"
          >
            {quote}
          </p>
        </div>

        {/* Centered new quote button */}
        <div className="flex justify-center my-8">
          <button
            onClick={newQuote}
            className="font-sans font-bold text-lg md:text-xl px-10 md:px-14 py-4 md:py-5 rounded-full shadow-lg hover:scale-105 hover:-translate-y-1 transition-all animate-pulse-glow"
            style={{
              background: "linear-gradient(135deg, hsl(340 82% 65%), hsl(350 65% 72%))",
              color: "white",
            }}
          >
            🐝 Nueva Frase Dulce
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-px bg-border" />
          <span className="text-2xl">🌸</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* Breathing */}
        <BreathingExercise />

        {/* Divider */}
        <div className="flex items-center gap-4 my-8">
          <div className="flex-1 h-px bg-border" />
          <span className="text-2xl">🍬</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* Game */}
        <GummyGame />

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="font-serif text-lg md:text-xl font-semibold text-muted-foreground flex items-center justify-center gap-3">
            <span className="text-3xl animate-float inline-block">🍫</span>
            <span>Eres más dulce que cualquier chocolate</span>
            <span className="text-3xl animate-float inline-block" style={{ animationDelay: "1s" }}>🍭</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
