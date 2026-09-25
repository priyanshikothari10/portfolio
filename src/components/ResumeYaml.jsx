import { useState } from "react";
import { Download } from "lucide-react";

const RESUME_URL = "/Resume.pdf";

const rows = [
  ["name", "Priyanshi Kothari"], ["role", "Aspiring Cloud & DevOps Engineer"], ["certifications", "[RHCSA, Oracle Fusion Cloud, MongoDB GenAI, Docker]"],
  ["skills.cloud_devops", "[AWS, Docker, Ansible, Jenkins]"], ["skills.kubernetes", "[Deployments, Services, Ingress, RBAC, HPA]"],
  ["education", "B.Tech, Artificial Intelligence & Data Science"], ["contact", "priyanshi.pro10@gmail.com"],
];

export default function ResumeYaml({ theme }) {
  const [downloaded, setDownloaded] = useState(false);
  const aurora = theme === "aurora";
  return (
    <section id="resume-yaml" className={`relative mx-auto w-full max-w-6xl scroll-mt-24 px-4 py-14 sm:px-6 lg:px-8 dark:py-24 ${aurora ? "aurora-reveal-section" : ""}`}>
      <div className="glass card-hover rounded-2xl border border-white/50 p-6 shadow-sm shadow-indigo-100/30 dark:rounded-xl dark:border-white/[0.06] dark:bg-black/25 dark:shadow-none sm:p-12 lg:p-14"><p className={`mb-2 text-xs font-semibold uppercase tracking-[0.2em] ${aurora ? "text-cyan-400/80" : "text-indigo-600 dark:text-neutral-500"}`}>Configuration as code</p><h2 className="font-poppins text-2xl font-bold tracking-tight text-slate-900 dark:text-neutral-100 sm:text-3xl">My resume, declaratively</h2>
        <div className="mt-10 overflow-hidden rounded-xl border border-cyan-400/20 bg-slate-950/75"><div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.08] bg-white/[0.04] px-4 py-3"><span className="font-mono text-xs text-slate-400">resume.yaml</span><a href={RESUME_URL} download="Priyanshi_Kothari_Resume.pdf" onClick={() => setDownloaded(true)} className="inline-flex items-center gap-2 rounded-md border border-cyan-400/20 bg-cyan-500/10 px-3 py-1.5 font-mono text-xs text-cyan-100 transition hover:border-violet-400/35 hover:bg-violet-500/10"><Download size={14} /> kubectl apply -f resume.yaml</a></div><pre className="overflow-x-auto p-5 font-mono text-sm leading-7">{rows.map(([key, value]) => <div key={key}><span className="text-cyan-300">{key}:</span> <span className="text-violet-300">{value}</span></div>)}</pre></div>
        {downloaded ? <p className="mt-4 font-mono text-xs text-emerald-300">$ kubectl apply -f resume.yaml → downloading Priyanshi_Kothari_Resume.pdf…</p> : null}
      </div>
    </section>
  );
}
