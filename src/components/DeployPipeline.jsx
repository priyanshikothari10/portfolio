import { useEffect, useRef, useState } from "react";
import { Box, Container, GitBranch, Rocket, TestTube2, CheckCircle2 } from "lucide-react";

const STAGES = [
  { name: "Build App", icon: GitBranch, log: "npm run build — React + Vite assets bundled into dist/" },
  { name: "Dockerize", icon: Container, log: "docker build -t priyanshikothari10/portfolio:latest ." },
  { name: "Push Image", icon: Box, log: "docker push priyanshikothari10/portfolio:latest → Docker Hub" },
  { name: "K8s Rollout", icon: Rocket, log: "kubectl apply -f k8s/ & kubectl rollout status deployment/portfolio-app" },
  { name: "Ingress & HPA", icon: TestTube2, log: "NGINX Ingress routing configured · HPA active (min:2, max:10)" },
];

export default function DeployPipeline({ theme }) {
  const [status, setStatus] = useState(STAGES.map(() => "idle"));
  const [log, setLog] = useState("Ready to trigger automated deployment workflow.");
  const [running, setRunning] = useState(false);
  const mounted = useRef(true);
  const aurora = theme === "aurora";

  useEffect(() => {
    return () => {
      mounted.current = false;
    };
  }, []);

  async function triggerDeploy() {
    setRunning(true);
    setStatus(STAGES.map(() => "idle"));
    for (let i = 0; i < STAGES.length; i += 1) {
      if (!mounted.current) return;
      setStatus((current) => current.map((val, idx) => (idx === i ? "running" : val)));
      setLog(STAGES[i].log);
      await new Promise((r) => setTimeout(r, 700));
      if (!mounted.current) return;
      setStatus((current) => current.map((val, idx) => (idx === i ? "done" : val)));
    }
    if (mounted.current) {
      setLog("✓ Production deployment successful. App online at portfolio.priyanshicloud.space");
      setRunning(false);
    }
  }

  return (
    <div className="mt-8 rounded-xl border border-cyan-400/15 bg-slate-950/30 p-5 sm:p-6 backdrop-blur-md text-left">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-400">
            Deployment History &amp; Pipeline
          </span>
          <h3 className="mt-1 font-poppins text-lg font-semibold text-slate-100">
            Containerized Rollout Workflow
          </h3>
        </div>
        <button
          type="button"
          disabled={running}
          onClick={triggerDeploy}
          className={`rounded-lg border px-4 py-2 text-xs font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-60 ${
            aurora
              ? "border-transparent bg-gradient-to-r from-sky-600 via-violet-600 to-purple-600 shadow-[0_0_20px_-4px_rgba(34,211,238,0.35)] hover:scale-[1.02]"
              : "border-indigo-600 bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          {running ? "Executing Deployment…" : "Simulate Live Deploy"}
        </button>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-5">
        {STAGES.map((stage, idx) => {
          const Icon = stage.icon;
          const current = status[idx];
          return (
            <div
              key={stage.name}
              className={`rounded-xl border p-3.5 transition duration-300 ${
                current === "running"
                  ? "border-cyan-400/60 bg-cyan-500/10 shadow-[0_0_20px_-10px_rgba(34,211,238,0.6)]"
                  : current === "done"
                  ? "border-emerald-400/40 bg-emerald-500/[0.08]"
                  : "border-white/[0.08] bg-slate-900/40"
              }`}
            >
              <div className="flex items-center justify-between">
                <Icon
                  size={18}
                  className={
                    current === "done"
                      ? "text-emerald-300"
                      : current === "running"
                      ? "text-cyan-300"
                      : "text-slate-400"
                  }
                />
                {current === "done" ? (
                  <CheckCircle2 size={14} className="text-emerald-300" />
                ) : null}
              </div>
              <p className="mt-3 text-xs font-semibold text-slate-100">{stage.name}</p>
              <p
                className={`mt-1 text-[11px] font-mono ${
                  current === "done"
                    ? "text-emerald-300"
                    : current === "running"
                    ? "text-cyan-300"
                    : "text-slate-500"
                }`}
              >
                {current === "done" ? "Verified ✓" : current === "running" ? "Running…" : "Ready"}
              </p>
            </div>
          );
        })}
      </div>

      <div className="mt-4 rounded-lg border border-cyan-400/10 bg-slate-950/60 p-3 font-mono text-xs text-slate-300">
        <span className="text-cyan-300">$ </span>
        <span>{log}</span>
      </div>
    </div>
  );
}
