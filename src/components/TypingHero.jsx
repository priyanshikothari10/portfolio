import { useEffect, useState } from "react";

const DEFAULT_PHRASES = [
  "AI & Data Science · Cloud & DevOps",
  "Building scalable, intelligent systems",
  "From data pipelines to production deployments",
];

export default function TypingHero({
  phrases = DEFAULT_PHRASES,
  className = "",
  typingMs = 42,
  deletingMs = 28,
  pauseAtEndMs = 2600,
}) {
  const n = phrases.length || 1;
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [display, setDisplay] = useState("");
  const [mode, setMode] = useState("typing");

  useEffect(() => {
    const full = phrases[phraseIndex] ?? "";
    let t;

    if (mode === "typing") {
      if (display.length < full.length) {
        t = setTimeout(() => {
          setDisplay(full.slice(0, display.length + 1));
        }, typingMs);
      } else {
        t = setTimeout(() => setMode("deleting"), pauseAtEndMs);
      }
    } else if (mode === "deleting") {
      if (display.length > 0) {
        t = setTimeout(() => {
          setDisplay((d) => d.slice(0, -1));
        }, deletingMs);
      } else {
        setPhraseIndex((i) => (i + 1) % n);
        setMode("typing");
      }
    }

    return () => clearTimeout(t);
  }, [display, mode, phraseIndex, phrases, typingMs, deletingMs, pauseAtEndMs, n]);

  return (
    <p className={className}>
      <span className="font-medium">{display}</span>
      <span className="typing-caret ml-0.5 inline-block h-[1.05em] w-[2px] translate-y-0.5 rounded-full bg-violet-400/70 align-middle opacity-90" />
    </p>
  );
}
