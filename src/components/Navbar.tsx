import { useState, useEffect } from "react";

const NAV_ITEMS = [
  { id: "inicio", label: "Inicio", emoji: "🏠" },
  { id: "frases", label: "Frases", emoji: "💬" },
  { id: "respiracion", label: "Respiración", emoji: "🌬️" },
  { id: "juego", label: "Juego", emoji: "🎮" },
  { id: "consejos", label: "Consejos", emoji: "🌸" },
];

export default function Navbar() {
  const [active, setActive] = useState("inicio");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);

      const sections = NAV_ITEMS.map((n) => document.getElementById(n.id));
      const scrollPos = window.scrollY + 120;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPos) {
          setActive(NAV_ITEMS[i].id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "glass-card shadow-lg border-b border-border py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-[900px] mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => scrollTo("inicio")}
          className="font-cursive text-2xl md:text-3xl text-primary hover:scale-105 transition-transform"
        >
          🍫 Dulce Calma
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`font-sans text-sm font-semibold px-4 py-2 rounded-full transition-all duration-200 ${
                active === item.id
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-foreground hover:bg-muted"
              }`}
            >
              <span className="mr-1.5">{item.emoji}</span>
              {item.label}
            </button>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-2xl p-2 rounded-lg hover:bg-muted transition-colors"
          aria-label="Menú"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden glass-card border-t border-border mt-2 py-3 px-4 animate-bounce-in">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`w-full text-left font-sans font-semibold text-base px-4 py-3 rounded-xl transition-all mb-1 ${
                active === item.id
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground hover:bg-muted"
              }`}
            >
              <span className="mr-2">{item.emoji}</span>
              {item.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
