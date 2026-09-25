import { useEffect, useRef, useState } from "react";
import { Box, CheckCircle2, Container, GitBranch, Rocket, TestTube2 } from "lucide-react";

const STAGES = [
  { name: "Build", icon: GitBranch, log: "npm run build — bundling assets…" },
  { name: "Test", icon: TestTube2, log: "npm test — checks passed…" },
  { name: "Dockerize", icon: Container, log: "docker build — creating production image…" },
  { name: "Push Image", icon: Box, log: "docker push — image published to registry…" },
  { name: "K8s Rollout", icon: Rocket, log: "kubectl rollout status — 2/2 replicas updated" },
];

export default function DeployPipeline({ theme }) {
  const [status, setStatus] = useState(STAGES.map(() => "idle"));
  const [log, setLog] = useState("Ready to deploy the portfolio.");
  const [running, setRunning] = useState(false);
  const mounted = useRef(true);
  const aurora = theme === "aurora";
  useEffect(() => () => { mounted.current = false; }, []);

  async function deploy() {
    setRunning(true); setStatus(STAGES.map(() => "idle"));
    for (let index = 0; index < STAGES.length; index += 1) {
      if (!mounted.current) return;
      setStatus((current) => current.map((value, i) => i === index ? "running" : value));
      setLog(STAGES[index].log);
      await new Promise((resolve) => setTimeout(resolve, 900));
      if (!mounted.current) return;
      setStatus((current) => current.map((value, i) => i === index ? "done" : value));
    }
    if (mounted.current) { setLog("✓ Live at portfolio.priyanshicloud.space"); setRunning(false); }
  }

  return (
    <section id="deploy" className={`relative mx-auto w-full max-w-6xl scroll-mt-24 px-4 py-14 sm:px-6 lg:px-8 dark:py-24 ${aurora ? "aurora-reveal-section" : ""}`}>
      <div className="glass card-hover rounded-2xl border border-white/50 p-6 shadow-sm shadow-indigo-100/30 dark:rounded-xl dark:border-white/[0.06] dark:bg-black/25 dark:shadow-none sm:p-12 lg:p-14">
        <div className="flex flex-wrap items-end justify-between gap-5"><div><p className={`mb-2 text-xs font-semibold uppercase tracking-[0.2em] ${aurora ? "text-cyan-400/80" : "text-indigo-600 dark:text-neutral-500"}`}>Deployment simulator</p><h2 className="font-poppins text-2xl font-bold tracking-tight text-slate-900 dark:text-neutral-100 sm:text-3xl">Ship the portfolio</h2></div>
          <button type="button" disabled={running} onClick={deploy} className={`rounded-lg border px-5 py-2.5 text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-60 ${aurora ? "border-transparent bg-gradient-to-r from-sky-600 via-violet-600 to-purple-600 shadow-[0_0_24px_-4px_rgba(34,211,238,0.35)] hover:scale-[1.03]" : "border-indigo-600 bg-indigo-600 hover:bg-indigo-700 dark:border-white dark:bg-transparent"}`}>{running ? "Deploying…" : "Trigger Deploy"}</button>
        </div>
        <div className="mt-10 grid gap-3 sm:grid-cols-5">
          {STAGES.map((stage, index) => { const Icon = stage.icon; const current = status[index]; return <div key={stage.name} className={`rounded-xl border p-4 transition duration-300 ${current === "running" ? "border-cyan-400/60 bg-cyan-500/10 shadow-[0_0_25px_-12px_rgba(34,211,238,0.7)]" : current === "done" ? "border-emerald-400/30 bg-emerald-500/[0.08]" : aurora ? "aurora-surface" : "border-slate-200 bg-white/60 dark:border-white/[0.06] dark:bg-transparent"}`}><Icon size={20} className={current === "done" ? "text-emerald-300" : current === "running" ? "text-cyan-300" : aurora ? "text-violet-300" : "text-indigo-600 dark:text-neutral-400"} /><p className={`mt-3 text-sm font-semibold ${aurora ? "text-slate-100" : "text-slate-900 dark:text-neutral-100"}`}>{stage.name}</p><p className={`mt-1 text-xs ${current === "done" ? "text-emerald-300" : current === "running" ? "text-cyan-300" : "text-slate-500"}`}>{current === "done" ? "done ✓" : current === "running" ? "running…" : "idle"}</p></div>; })}
        </div>
        <p className={`mt-5 rounded-lg border px-4 py-3 font-mono text-xs ${aurora ? "border-cyan-400/10 bg-slate-950/45 text-slate-400" : "border-slate-200 bg-slate-50 text-slate-600 dark:border-white/[0.06] dark:bg-black/20 dark:text-neutral-400"}`}>{log}</p>
      </div>
    </section>
  );
}
