const frases = [
  "Respira profundo... eres más fuerte de lo que crees 🌸",
  "Este momento difícil pasará, como siempre lo hacen 💫",
  "Mereces paz, calma y todo lo dulce de la vida 🍫",
  "No tienes que ser perfecto/a, solo ser tú 🦋",
  "Cada respiración te acerca más a la calma 🌊",
  "Eres suficiente, tal como eres ahora mismo 💕",
  "El estrés es temporal, tu fuerza es permanente 💪",
  "Permítete descansar, no es pereza, es amor propio 🌷",
  "Como el chocolate, los mejores momentos se derriten lento 🍫",
  "Hoy es un buen día para ser amable contigo 🌈",
  "Las estrellas brillan más en la oscuridad ✨",
  "Tu corazón sabe el camino, confía en él 💝",
  "Cada día es una nueva oportunidad para sonreír 😊",
  "Eres una obra maestra en progreso 🎨",
  "La calma es tu superpoder secreto 🦸",
  "Como una flor, creces a tu propio ritmo 🌺",
  "El universo conspira a tu favor 🌟",
  "Tus preocupaciones no definen tu futuro 🔮",
  "Mereces todos los abrazos del mundo 🤗",
  "La vida es dulce cuando te das permiso de disfrutarla 🍭",
];

export function getRandomQuote(): string {
  return frases[Math.floor(Math.random() * frases.length)];
}
