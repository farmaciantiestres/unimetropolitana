const consejos = [
  {
    emoji: "🧘",
    title: "Meditación rápida",
    description: "Cierra los ojos por 60 segundos. Enfócate solo en tu respiración. Inhala contando hasta 4, exhala contando hasta 6.",
  },
  {
    emoji: "🎵",
    title: "Música relajante",
    description: "Escucha sonidos de la naturaleza o música instrumental suave. Activa la música de fondo de esta página para empezar.",
  },
  {
    emoji: "🍫",
    title: "Come un chocolate",
    description: "Un pequeño trozo de chocolate oscuro libera endorfinas. Disfrútalo lentamente, saboreando cada pedacito.",
  },
  {
    emoji: "🚶",
    title: "Camina 5 minutos",
    description: "Una caminata corta al aire libre puede reducir el cortisol. Mira el cielo, siente la brisa, desconéctate.",
  },
  {
    emoji: "📝",
    title: "Escribe tus pensamientos",
    description: "Dedica 3 minutos a escribir lo que sientes sin juzgarte. Liberar tus ideas en papel aligera la mente.",
  },
  {
    emoji: "🤗",
    title: "Abraza a alguien",
    description: "Un abrazo de 20 segundos libera oxitocina, la hormona del bienestar. ¡O abrázate a ti mismo!",
  },
];

export default function ConsejosSection() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
      {consejos.map((c, i) => (
        <div
          key={i}
          className="group glass-card rounded-2xl p-5 md:p-6 border-2 border-[hsl(var(--candy-rose))] hover:border-primary hover:shadow-lg transition-all duration-300 hover:-translate-y-1 text-left"
        >
          <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300 inline-block">
            {c.emoji}
          </div>
          <h3 className="font-serif text-lg font-bold text-foreground mb-2">
            {c.title}
          </h3>
          <p className="font-sans text-sm text-muted-foreground leading-relaxed">
            {c.description}
          </p>
        </div>
      ))}
    </div>
  );
}
