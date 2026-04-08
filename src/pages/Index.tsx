import { useState } from "react";
import { getRandomQuote } from "@/data/quotes";
import { useBackgroundMusic } from "@/hooks/useAudio";
import BreathingExercise from "@/components/BreathingExercise";
import GummyGame from "@/components/GummyGame";
import ConsejosSection from "@/components/ConsejosSection";
import Navbar from "@/components/Navbar";
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
      className="min-h-screen"
      style={{
        backgroundImage: `linear-gradient(to bottom, hsl(340 100% 92% / 0.82), hsl(30 100% 90% / 0.82)), url(${candyBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <Navbar />

      {/* Floating decorative emojis */}
      <div className="fixed top-20 left-6 text-5xl animate-float opacity-40 pointer-events-none select-none z-0">🍬</div>
      <div className="fixed top-40 right-8 text-4xl animate-float opacity-30 pointer-events-none select-none z-0" style={{ animationDelay: "1s" }}>🧁</div>
      <div className="fixed bottom-20 left-10 text-4xl animate-float opacity-30 pointer-events-none select-none z-0" style={{ animationDelay: "1.5s" }}>🍩</div>
      <div className="fixed bottom-40 right-14 text-5xl animate-float opacity-40 pointer-events-none select-none z-0" style={{ animationDelay: "0.5s" }}>🍭</div>

      {/* Music toggle */}
      <button
        onClick={toggleMusic}
        className="fixed bottom-6 right-6 z-50 glass-card font-sans font-semibold text-sm px-4 py-2.5 rounded-full border-2 border-border shadow-lg hover:scale-105 transition-all"
      >
        {musicOn ? "🔊 Música" : "🔇 Música"}
      </button>

      {/* ====== INICIO ====== */}
      <section id="inicio" className="pt-24 pb-12 md:pt-32 md:pb-16 flex flex-col items-center px-4 text-center scroll-mt-20">
        <h1
          className="font-cursive text-6xl sm:text-7xl md:text-8xl text-primary mb-3 leading-tight"
          style={{ textShadow: "3px 3px 15px hsl(340 100% 88% / 0.8)" }}
        >
          🍫 Dulce Calma 🍭
        </h1>
        <p className="font-serif text-xl md:text-2xl text-muted-foreground font-semibold mb-6 max-w-lg">
          ✨ Tu espacio para derretir el estrés y endulzar tu día ✨
        </p>
        <button
          onClick={() => document.getElementById("frases")?.scrollIntoView({ behavior: "smooth" })}
          className="font-sans font-semibold text-base px-8 py-3 rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all"
        >
          Explorar ↓
        </button>
      </section>

      {/* ====== FRASES ====== */}
      <section id="frases" className="py-12 md:py-16 px-4 scroll-mt-20">
        <div className="max-w-[800px] mx-auto glass-card rounded-[32px] border-[5px] border-[hsl(var(--candy-rose))] shadow-[0_15px_50px_hsl(340_82%_65%/0.2)] p-8 md:p-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-2 text-center">
            💬 Frases Dulces
          </h2>
          <p className="text-muted-foreground text-center mb-8">
            Una dosis de dulzura para tu alma
          </p>

          {/* Quote box */}
          <div className="min-h-[160px] md:min-h-[180px] bg-[hsl(var(--candy-cream))] border-4 border-[hsl(var(--candy-coral))] rounded-2xl p-8 md:p-10 shadow-inner flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--candy-peach)/0.3)] to-transparent pointer-events-none" />
            <p
              key={quoteKey}
              className="font-serif text-xl md:text-2xl leading-relaxed font-semibold text-foreground relative z-10 animate-bounce-in"
            >
              {quote}
            </p>
          </div>

          <div className="flex justify-center mt-8">
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
        </div>
      </section>

      {/* ====== RESPIRACIÓN ====== */}
      <section id="respiracion" className="py-12 md:py-16 px-4 scroll-mt-20">
        <div className="max-w-[800px] mx-auto glass-card rounded-[32px] border-[5px] border-[hsl(var(--candy-rose))] shadow-[0_15px_50px_hsl(340_82%_65%/0.2)] p-8 md:p-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-2 text-center">
            🌬️ Técnica de Respiración
          </h2>
          <p className="text-muted-foreground text-center mb-8">
            La técnica 4-7-8 calma tu sistema nervioso en segundos
          </p>

          <div className="flex flex-col items-center gap-4">
            <div className="grid grid-cols-3 gap-3 md:gap-6 mb-4 w-full max-w-md">
              <div className="text-center p-4 rounded-2xl bg-[hsl(var(--candy-cream))] border-2 border-[hsl(var(--candy-coral))]">
                <p className="text-3xl mb-1">4️⃣</p>
                <p className="font-sans text-xs font-semibold text-muted-foreground">Inhala</p>
              </div>
              <div className="text-center p-4 rounded-2xl bg-[hsl(var(--candy-cream))] border-2 border-[hsl(var(--candy-coral))]">
                <p className="text-3xl mb-1">7️⃣</p>
                <p className="font-sans text-xs font-semibold text-muted-foreground">Sostén</p>
              </div>
              <div className="text-center p-4 rounded-2xl bg-[hsl(var(--candy-cream))] border-2 border-[hsl(var(--candy-coral))]">
                <p className="text-3xl mb-1">8️⃣</p>
                <p className="font-sans text-xs font-semibold text-muted-foreground">Exhala</p>
              </div>
            </div>

            <BreathingExercise />
          </div>
        </div>
      </section>

      {/* ====== JUEGO ====== */}
      <section id="juego" className="py-12 md:py-16 px-4 scroll-mt-20">
        <div className="max-w-[800px] mx-auto glass-card rounded-[32px] border-[5px] border-[hsl(var(--candy-rose))] shadow-[0_15px_50px_hsl(340_82%_65%/0.2)] p-8 md:p-12">
          <GummyGame />
        </div>
      </section>

      {/* ====== CONSEJOS ====== */}
      <section id="consejos" className="py-12 md:py-16 px-4 scroll-mt-20">
        <div className="max-w-[800px] mx-auto glass-card rounded-[32px] border-[5px] border-[hsl(var(--candy-rose))] shadow-[0_15px_50px_hsl(340_82%_65%/0.2)] p-8 md:p-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-2 text-center">
            🌸 Consejos de Calma
          </h2>
          <p className="text-muted-foreground text-center mb-8">
            Pequeños hábitos que transforman tu bienestar
          </p>

          <ConsejosSection />
        </div>
      </section>

      {/* ====== FOOTER ====== */}
      <footer className="py-10 text-center px-4">
        <div className="font-serif text-lg md:text-xl font-semibold text-muted-foreground flex items-center justify-center gap-3">
          <span className="text-3xl animate-float inline-block">🍫</span>
          <span>Eres más dulce que cualquier chocolate</span>
          <span className="text-3xl animate-float inline-block" style={{ animationDelay: "1s" }}>🍭</span>
        </div>
        <p className="font-sans text-sm text-muted-foreground mt-4 opacity-60">
          Hecho con 💕 para endulzar tu día
        </p>
      </footer>
    </div>
  );
};

export default Index;
