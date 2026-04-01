import { useMemo } from "react";
import { useMediaQuery } from "../hooks/useMediaQuery.js";

function StarField({ count, subtle }) {
  const stars = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const x = ((i * 7919 + 17) % 1000) / 10;
        const y = ((i * 4177 + 23) % 1000) / 10;
        return {
          id: i,
          left: `${x}%`,
          top: `${y}%`,
          size: 1 + (i % 3),
          delay: `${(i % 20) * (subtle ? 0.15 : 0.12)}s`,
          duration: `${2.4 + (i % 7) * (subtle ? 0.5 : 0.35)}s`,
        };
      }),
    [count, subtle],
  );

  return (
    <div className="absolute inset-0 overflow-hidden">
      {stars.map((s) => (
        <span
          key={s.id}
          className="aurora-star pointer-events-none absolute rounded-full bg-white will-change-[opacity]"
          style={{
            left: s.left,
            top: s.top,
            width: s.size,
            height: s.size,
            animationDelay: s.delay,
            animationDuration: s.duration,
          }}
        />
      ))}
    </div>
  );
}

export default function AuroraBackground() {
  const isMobile = useMediaQuery("(max-width: 639px)");
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  const starCount = prefersReducedMotion ? 0 : isMobile ? 55 : 120;
  const subtle = isMobile || prefersReducedMotion;

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      {/* Base: #020617 → #0f172a */}
      <div className="absolute inset-0 bg-[linear-gradient(165deg,#020617_0%,#0b1224_42%,#0f172a_78%,#020617_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_90%_at_50%_-15%,rgba(15,23,42,0.9)_0%,transparent_58%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_55%_at_85%_95%,rgba(34,211,238,0.09),transparent_52%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_50%_at_12%_85%,rgba(168,85,247,0.08),transparent_48%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_40%_at_50%_45%,rgba(139,92,246,0.05),transparent_55%)]" />
      {starCount > 0 ? <StarField count={starCount} subtle={subtle} /> : null}
      {/* Orbs: cyan, violet, purple, soft blue — transform-only drift */}
      <div
        className={`aurora-orb aurora-orb-float absolute -left-[15%] top-[5%] h-[min(55vw,480px)] w-[min(55vw,480px)] rounded-full bg-[#22d3ee]/[0.18] blur-[100px] will-change-transform max-md:opacity-70`}
        style={{ animationDelay: "0s" }}
      />
      <div
        className="aurora-orb aurora-orb-float absolute -right-[10%] top-[22%] h-[min(45vw,400px)] w-[min(45vw,400px)] rounded-full bg-[#8b5cf6]/[0.16] blur-[92px] will-change-transform max-md:opacity-65"
        style={{ animationDelay: "-4s" }}
      />
      <div
        className="aurora-orb aurora-orb-float absolute bottom-[6%] left-[12%] h-[min(50vw,440px)] w-[min(50vw,440px)] rounded-full bg-[#a855f7]/[0.14] blur-[96px] will-change-transform max-md:opacity-60"
        style={{ animationDelay: "-7s" }}
      />
      <div
        className="aurora-orb aurora-orb-float absolute bottom-[18%] right-[4%] h-[min(40vw,360px)] w-[min(40vw,360px)] rounded-full bg-sky-400/[0.14] blur-[88px] will-change-transform max-md:opacity-65"
        style={{ animationDelay: "-2s" }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(2,6,23,0.88),transparent_38%)]" />
    </div>
  );
}
