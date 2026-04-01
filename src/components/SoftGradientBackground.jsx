import AuroraBackground from "./AuroraBackground.jsx";

/**
 * Light: soft mesh. Midnight: black + dot grid. Aurora: cosmic + stars + neon orbs.
 */
export default function SoftGradientBackground({ theme }) {
  if (theme === "aurora") {
    return <AuroraBackground />;
  }

  if (theme === "midnight") {
    return (
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
        <div className="absolute inset-0 bg-black" />
        <div
          className="absolute inset-0 opacity-[0.55]"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255, 255, 255, 0.07) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_60%_at_50%_0%,rgba(255,255,255,0.03),transparent_55%)]" />
      </div>
    );
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-gradient-to-br from-white via-[#f4f7ff] to-[#eef2ff]" />
      <div className="mesh-blob absolute -left-[20%] -top-[10%] h-[min(90vw,520px)] w-[min(90vw,520px)] rounded-full bg-indigo-300/35 blur-3xl" />
      <div
        className="mesh-blob absolute -right-[15%] top-[20%] h-[min(70vw,420px)] w-[min(70vw,420px)] rounded-full bg-violet-200/50 blur-3xl"
        style={{ animationDelay: "-4s" }}
      />
      <div
        className="mesh-blob absolute bottom-[-15%] left-[20%] h-[min(80vw,480px)] w-[min(80vw,480px)] rounded-full bg-sky-200/45 blur-3xl"
        style={{ animationDelay: "-8s" }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(255,255,255,0.9),transparent)]" />
    </div>
  );
}
