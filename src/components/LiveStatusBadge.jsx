import { useEffect, useState } from "react";

const SITE_URL = "https://portfolio.priyanshicloud.space/";

export default function LiveStatusBadge({ theme }) {
  const [responseTime, setResponseTime] = useState(null);
  const aurora = theme === "aurora";

  useEffect(() => {
    let active = true;
    async function measure() {
      const start = performance.now();
      try {
        await fetch(SITE_URL, { cache: "no-store" });
        if (active) setResponseTime(Math.round(performance.now() - start));
      } catch {
        if (active) setResponseTime(null);
      }
    }
    measure();
    const interval = window.setInterval(measure, 30000);
    return () => { active = false; window.clearInterval(interval); };
  }, []);

  return (
    <section id="live-status" className={`relative mx-auto w-full max-w-6xl scroll-mt-24 px-4 py-14 sm:px-6 lg:px-8 dark:py-24 ${aurora ? "aurora-reveal-section" : ""}`}>
      <div className={`glass card-hover flex flex-wrap items-center justify-between gap-5 rounded-2xl border border-white/50 p-6 shadow-sm shadow-indigo-100/30 dark:rounded-xl dark:border-white/[0.06] dark:bg-black/25 dark:shadow-none sm:px-10 ${aurora ? "" : ""}`}>
        <div className="flex items-center gap-3"><span className="relative flex h-3 w-3"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" /><span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-400" /></span><div><p className={`text-sm font-semibold ${aurora ? "text-slate-100" : "text-slate-900 dark:text-neutral-100"}`}>Operational</p><p className="text-xs text-slate-500">portfolio.priyanshicloud.space</p></div></div>
        <div className="flex flex-wrap gap-6 font-mono text-xs"><div><p className="text-slate-500">response time</p><p className="mt-1 text-cyan-300">{responseTime === null ? "—" : `${responseTime} ms`}</p></div><div><p className="text-slate-500">pods healthy</p><p className="mt-1 text-emerald-300">2 / 2</p></div></div>
      </div>
    </section>
  );
}
