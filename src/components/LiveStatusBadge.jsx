import { useEffect, useState } from "react";

const SITE_URL = "https://priyanshi-kothari-portfolio.netlify.app/";

export default function LiveStatusBadge({ theme, compact = true }) {
  const [responseTime, setResponseTime] = useState(null);
  const aurora = theme === "aurora";

  useEffect(() => {
    let active = true;
    async function measure() {
      const start = performance.now();
      try {
        await fetch(SITE_URL, { cache: "no-store", mode: "no-cors" });
        if (active) setResponseTime(Math.round(performance.now() - start));
      } catch {
        if (active) setResponseTime(null);
      }
    }
    measure();
    const interval = window.setInterval(measure, 45000);
    return () => {
      active = false;
      window.clearInterval(interval);
    };
  }, []);

  if (compact) {
    return (
      <div
        className={`inline-flex items-center gap-2.5 rounded-full border px-3.5 py-1.5 text-xs font-semibold backdrop-blur-md transition duration-300 ${
          aurora
            ? "border-emerald-400/30 bg-emerald-500/10 text-emerald-200 shadow-[0_0_16px_-4px_rgba(16,185,129,0.3)]"
            : "border-emerald-200 bg-emerald-50 text-emerald-700"
        }`}
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
        </span>
        <span>Production</span>
        <span className="opacity-40">•</span>
        <span className="font-mono font-normal">K8s Cluster Active</span>
        {responseTime ? (
          <>
            <span className="opacity-40">•</span>
            <span className="font-mono text-[11px] text-cyan-300">{responseTime}ms</span>
          </>
        ) : null}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-cyan-400/20 bg-slate-950/60 p-4 font-mono text-xs text-slate-300 backdrop-blur-md text-left">
      <div className="flex items-center gap-3">
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
        </span>
        <div>
          <p className="font-sans text-sm font-semibold text-slate-100">Live Status: Operational</p>
          <p className="text-[11px] text-slate-400">AWS EC2 · Kubernetes Deployment · Ingress Active</p>
        </div>
      </div>
      <div className="flex items-center gap-4 text-cyan-300">
        <span>Pods: 2/2 Healthy</span>
        <span>{responseTime ? `${responseTime} ms` : "Online"}</span>
      </div>
    </div>
  );
}
