import { useEffect, useState } from "react";
import { CheckCircle2 } from "lucide-react";

const COMMITS_URL = "https://api.github.com/repos/priyanshikothari10/portfolio/commits?per_page=5";

function relativeTime(timestamp) {
  const seconds = Math.max(0, Math.floor((Date.now() - new Date(timestamp).getTime()) / 1000));
  if (seconds < 60) return "just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
  return `${Math.floor(seconds / 604800)}w ago`;
}

export default function DeployHistory({ theme }) {
  const [commits, setCommits] = useState([]);
  const [state, setState] = useState("loading");
  const aurora = theme === "aurora";

  useEffect(() => {
    const controller = new AbortController();
    fetch(COMMITS_URL, { signal: controller.signal })
      .then((response) => { if (!response.ok) throw new Error("GitHub API unavailable"); return response.json(); })
      .then((data) => { setCommits(data.slice(0, 5)); setState("ready"); })
      .catch((error) => { if (error.name !== "AbortError") setState("error"); });
    return () => controller.abort();
  }, []);

  return (
    <section id="deploy-history" className={`relative mx-auto w-full max-w-6xl scroll-mt-24 px-4 py-14 sm:px-6 lg:px-8 dark:py-24 ${aurora ? "aurora-reveal-section" : ""}`}>
      <div className="glass card-hover rounded-2xl border border-white/50 p-6 shadow-sm shadow-indigo-100/30 dark:rounded-xl dark:border-white/[0.06] dark:bg-black/25 dark:shadow-none sm:p-12 lg:p-14"><p className={`mb-2 text-xs font-semibold uppercase tracking-[0.2em] ${aurora ? "text-cyan-400/80" : "text-indigo-600 dark:text-neutral-500"}`}>Release log</p><h2 className="font-poppins text-2xl font-bold tracking-tight text-slate-900 dark:text-neutral-100 sm:text-3xl">Deployment history</h2>
        <div className="mt-10 divide-y divide-cyan-400/10 rounded-xl border border-cyan-400/10 bg-slate-950/25">
          {state === "loading" ? <p className="px-5 py-6 text-sm text-slate-500">Loading recent commits from GitHub…</p> : null}
          {state === "error" ? <p className="px-5 py-6 text-sm text-slate-500">Recent commits are temporarily unavailable. Please try again later.</p> : null}
          {state === "ready" && commits.map((commit) => <div key={commit.sha} className="flex items-start gap-3 px-5 py-4"><CheckCircle2 size={18} className="mt-0.5 shrink-0 text-emerald-300" /><div className="min-w-0 flex-1"><p className={`truncate text-sm font-medium ${aurora ? "text-slate-200" : "text-slate-800 dark:text-neutral-200"}`}>{commit.commit.message.split("\n")[0]}</p><p className="mt-1 font-mono text-xs text-slate-500">{commit.sha.slice(0, 7)} · {relativeTime(commit.commit.author.date)}</p></div></div>)}
        </div>
      </div>
    </section>
  );
}
