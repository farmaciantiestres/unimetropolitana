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
    'Haz clic en "Nueva Frase" y respira... todo va a estar bien 💕'
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
          🍫 Farmacia Antiestrés 🍭
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
            💬 Frases Motivadoras
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
              🐝 Nueva Frase
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

      {/* ====== REDES SOCIALES ====== */}
      <section id="redes" className="py-12 md:py-16 px-4 scroll-mt-20">
        <div className="max-w-[800px] mx-auto glass-card rounded-[32px] border-[5px] border-[hsl(var(--candy-rose))] shadow-[0_15px_50px_hsl(340_82%_65%/0.2)] p-8 md:p-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-2 text-center">
            💖 Redes Sociales
          </h2>
          <p className="text-muted-foreground text-center mb-8">
            Síguenos para más dosis de dulzura
          </p>

          <div className="flex flex-wrap justify-center gap-6">
            <a
              href="https://www.instagram.com/farmaciantiestres/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-3 p-6 rounded-3xl bg-[hsl(var(--candy-cream))] border-4 border-[hsl(var(--candy-coral))] shadow-lg hover:scale-110 hover:-translate-y-2 transition-all duration-300 min-w-[160px]"
            >
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-md group-hover:rotate-6 transition-transform"
                style={{
                  background:
                    "linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-9 h-9">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </div>
              <span className="font-serif font-bold text-lg text-foreground">Instagram</span>
              <span className="font-sans text-xs text-muted-foreground">@farmaciantiestres</span>
            </a>

            <a
              href="https://www.tiktok.com/@farmaciantiestres"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-3 p-6 rounded-3xl bg-[hsl(var(--candy-cream))] border-4 border-[hsl(var(--candy-coral))] shadow-lg hover:scale-110 hover:-translate-y-2 transition-all duration-300 min-w-[160px]"
            >
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-md bg-black group-hover:rotate-6 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-9 h-9">
                  <path fill="#25F4EE" d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.6 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.64-.1z" transform="translate(-1 -1)"/>
                  <path fill="#FE2C55" d="M20.59 7.69a4.83 4.83 0 0 1-3.77-4.25V3h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V10.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 6.6 21.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.64-.1z" transform="translate(-2 -2)"/>
                  <path fill="white" d="M20 7a4.83 4.83 0 0 1-3.77-4.25V2.5h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.9a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 6 20.6a6.34 6.34 0 0 0 10.86-4.43v-7A8.16 8.16 0 0 0 21.63 10.7v-3.4A4.85 4.85 0 0 1 20 7z"/>
                </svg>
              </div>
              <span className="font-serif font-bold text-lg text-foreground">TikTok</span>
              <span className="font-sans text-xs text-muted-foreground">@farmaciantiestres</span>
            </a>
          </div>
        </div>
      </section>

      {/* ====== FOOTER ====== */}
      <footer className="py-10 text-center px-4">
        <div className="font-serif text-lg md:text-xl font-semibold text-muted-foreground flex items-center justify-center gap-3">
          <span className="text-3xl animate-float inline-block">🍫</span>
          <span>Eres más dulce que cualquier chocolate</span>
          <span className="text-3xl animate-float inline-block" style={{ animationDelay: "1s" }}>🍭</span>
        </div>
        <p className="font-sans text-sm text-muted-foreground mt-4 opacity-100">
          Hecho con 💕 para endulzar tu día
        </p>
      </footer>
    </div>
  );
};

export default Index;
