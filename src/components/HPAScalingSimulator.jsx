import { useEffect, useState } from "react";
import { Container } from "lucide-react";

function podsForLoad(load) {
  if (load < 20) return 2;
  if (load < 40) return 3;
  if (load < 60) return 4;
  if (load < 80) return 5;
  return 6;
}

export default function HPAScalingSimulator({ theme }) {
  const [load, setLoad] = useState(18);
  const [podCount, setPodCount] = useState(2);
  const aurora = theme === "aurora";

  useEffect(() => setPodCount(podsForLoad(load)), [load]);
  const stable = podCount === 2;

  return (
    <section id="hpa-simulator" className={`relative mx-auto w-full max-w-6xl scroll-mt-24 px-4 py-14 sm:px-6 lg:px-8 dark:py-24 ${aurora ? "aurora-reveal-section" : ""}`}>
      <div className="glass card-hover rounded-2xl border border-white/50 p-6 shadow-sm shadow-indigo-100/30 dark:rounded-xl dark:border-white/[0.06] dark:bg-black/25 dark:shadow-none sm:p-12 lg:p-14">
        <p className={`mb-2 text-xs font-semibold uppercase tracking-[0.2em] ${aurora ? "text-cyan-400/80" : "text-indigo-600 dark:text-neutral-500"}`}>Kubernetes autoscaling</p>
        <h2 className="font-poppins text-2xl font-bold tracking-tight text-slate-900 dark:text-neutral-100 sm:text-3xl">HPA scaling simulator</h2>
        <div className="mt-10 max-w-3xl">
          <div className="flex items-center justify-between gap-4"><label htmlFor="simulated-load" className={`text-sm font-medium ${aurora ? "text-slate-300" : "text-slate-700 dark:text-neutral-300"}`}>Simulated load</label><output className="font-mono text-sm text-cyan-300">{load}%</output></div>
          <input id="simulated-load" type="range" min="0" max="100" value={load} onChange={(event) => setLoad(Number(event.target.value))} className="mt-4 h-2 w-full cursor-pointer accent-cyan-400" />
        </div>
        <div className="mt-10 flex min-h-24 flex-wrap items-center gap-3">
          {Array.from({ length: 6 }, (_, index) => {
            const active = index < podCount;
            return <div key={index} aria-label={`Pod ${index + 1}${active ? " active" : " inactive"}`} className={`flex h-16 w-16 items-center justify-center rounded-xl border transition-all duration-500 ease-out ${active ? "scale-100 border-cyan-400/30 bg-cyan-500/10 text-cyan-200 opacity-100 shadow-[0_0_20px_-12px_rgba(34,211,238,0.65)]" : "scale-75 border-transparent bg-transparent text-transparent opacity-0"}`}><Container size={25} /></div>;
          })}
        </div>
        <p className={`mt-6 rounded-lg border px-4 py-3 text-sm ${stable ? "border-emerald-400/20 bg-emerald-500/[0.07] text-emerald-300" : "border-amber-400/20 bg-amber-500/[0.07] text-amber-200"}`}><span className="font-semibold">{podCount} {podCount === 1 ? "replica" : "replicas"}</span> · {stable ? "stable — within baseline" : "scaling up — HPA target CPU exceeded"}</p>
      </div>
    </section>
  );
}
