import { useState } from "react";
import { ArrowRight, ExternalLink } from "lucide-react";

const PROJECTS = [
  {
    id: "lamp",
    label: "LAMP on AWS",
    title: "LAMP Stack Deployment on AWS",
    github: "https://github.com/priyanshikothari10/LAMP-stack-project",
    nodes: [
      { name: "User", detail: "Visitors access the hosted LAMP application from a browser." },
      { name: "Apache + PHP", detail: "Apache serves the application on the Linux server." },
      { name: "AWS EC2", detail: "EC2 provides the compute environment for the application." },
      { name: "AWS RDS + S3", detail: "RDS stores application data while S3 is used for storage." },
    ],
  },
  {
    id: "voting",
    label: "Docker Voting App",
    title: "Docker Voting App",
    github: "https://github.com/priyanshikothari10/docker-voting-app",
    nodes: [
      { name: "User", detail: "Users submit votes through the voting application." },
      { name: "Voting + Result Apps", detail: "The voting and result services provide the application interfaces." },
      { name: "Docker Compose", detail: "Docker Compose coordinates the multi-container application and its networking." },
      { name: "Redis + PostgreSQL", detail: "Redis and PostgreSQL support the application's vote processing and persistent data." },
      { name: "AWS EC2", detail: "The containerized application is deployed on an AWS EC2 instance." },
    ],
  },
  {
    id: "wordpress",
    label: "WordPress on Kubernetes",
    title: "WordPress on Kubernetes",
    github: "https://github.com/priyanshikothari10/Containerized-WordPress-Application-on-Kubernetes",
    nodes: [
      { name: "Docker Image", detail: "Container images package the WordPress and database workloads." },
      { name: "Kubernetes Deployment", detail: "Deployments manage workload rollout, scaling, and desired pod state." },
      { name: "Pods", detail: "Pods run the WordPress and MySQL containers in the cluster." },
      { name: "Service", detail: "Kubernetes Services provide stable network access to the application workloads." },
      { name: "WordPress + Storage", detail: "WordPress uses MySQL and persistent volumes for durable application data." },
    ],
  },
];

function ArchitectureNode({ node, selected, onClick }) {
  return <button type="button" onClick={onClick} className={`min-w-0 flex-1 rounded-xl border p-4 text-left transition duration-300 ${selected ? "border-cyan-400/55 bg-cyan-500/10 text-cyan-100 shadow-[0_0_28px_-14px_rgba(34,211,238,0.6)]" : "border-cyan-400/15 bg-slate-950/40 text-slate-300 hover:border-violet-400/35 hover:bg-violet-500/[0.08]"}`}><span className="block text-sm font-semibold">{node.name}</span><span className="mt-1 block text-xs text-slate-500">Click for details</span></button>;
}

export default function InteractiveProjectArchitecture({ theme }) {
  const [projectId, setProjectId] = useState(PROJECTS[0].id);
  const [nodeIndex, setNodeIndex] = useState(0);
  const project = PROJECTS.find((item) => item.id === projectId);
  const selectedNode = project.nodes[nodeIndex] || project.nodes[0];
  const aurora = theme === "aurora";

  function selectProject(id) { setProjectId(id); setNodeIndex(0); }

  return (
    <section id="architecture" className={`relative mx-auto w-full max-w-6xl scroll-mt-24 px-4 py-14 sm:px-6 lg:px-8 dark:py-24 ${aurora ? "aurora-reveal-section" : ""}`}>
      <div className="glass card-hover rounded-2xl border border-white/50 p-6 shadow-sm shadow-indigo-100/30 dark:rounded-xl dark:border-white/[0.06] dark:bg-black/25 dark:shadow-none sm:p-12 lg:p-14">
        <p className={`mb-2 text-xs font-semibold uppercase tracking-[0.2em] ${aurora ? "text-cyan-400/80" : "text-indigo-600 dark:text-neutral-500"}`}>Project systems</p>
        <h2 className="font-poppins text-2xl font-bold tracking-tight text-slate-900 dark:text-neutral-100 sm:text-3xl">Interactive Project Architecture</h2>
        <p className={`mt-2 max-w-2xl text-sm ${aurora ? "text-slate-400" : "text-slate-600 dark:text-neutral-500"}`}>Explore how my projects are structured from application to infrastructure.</p>
        <div className="mt-8 flex flex-wrap gap-2">{PROJECTS.map((item) => <button key={item.id} type="button" onClick={() => selectProject(item.id)} className={`rounded-md border px-3 py-2 text-xs font-semibold transition ${item.id === projectId ? "border-cyan-400/45 bg-cyan-500/10 text-cyan-100" : aurora ? "border-cyan-400/15 bg-white/[0.04] text-slate-400 hover:border-violet-400/35" : "border-indigo-200 text-slate-600 dark:border-white/[0.08] dark:text-neutral-400"}`}>{item.label}</button>)}</div>
        <div key={project.id} className="mt-8 rounded-xl border border-cyan-400/10 bg-slate-950/30 p-4 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-4"><h3 className="font-poppins text-base font-semibold text-slate-100">{project.title}</h3><a href={project.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-md border border-cyan-400/20 bg-white/[0.05] px-3 py-1.5 text-xs font-semibold text-slate-200 transition hover:border-violet-400/35"><ExternalLink size={13} /> View GitHub</a></div>
          <div className="mt-7 flex flex-col items-stretch gap-2 lg:flex-row lg:items-center lg:gap-3">
            {project.nodes.map((node, index) => <div key={node.name} className="flex min-w-0 flex-1 flex-col items-stretch gap-2 lg:flex-row lg:items-center lg:gap-3"><ArchitectureNode node={node} selected={nodeIndex === index} onClick={() => setNodeIndex(index)} />{index < project.nodes.length - 1 ? <span className="architecture-connection flex justify-center text-cyan-300/70"><ArrowRight size={18} className="hidden lg:block" /><span className="lg:hidden">↓</span></span> : null}</div>)}
          </div>
          <div className="mt-7 rounded-lg border border-violet-400/15 bg-violet-500/[0.05] p-4"><p className="text-xs font-semibold uppercase tracking-[0.16em] text-violet-300/85">{selectedNode.name}</p><p className="mt-2 text-sm leading-relaxed text-slate-400">{selectedNode.detail}</p></div>
        </div>
      </div>
    </section>
  );
}
