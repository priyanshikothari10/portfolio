import { useState } from "react";
import { ArrowRight, ExternalLink } from "lucide-react";

export const ARCHITECTURE_PROJECTS = [
  {
    id: "portfolio",
    label: "Portfolio Infrastructure",
    title: "DevOps-Enabled Portfolio Deployment",
    github: "https://github.com/priyanshikothari10/portfolio",
    description: "Containerized React application orchestrated with Kubernetes, NGINX Ingress, and HPA on AWS EC2.",
    nodes: [
      { name: "1. GitHub Repository", detail: "Source code pushed to GitHub triggers build workflow and versioning." },
      { name: "2. Docker Image", detail: "React + Vite application built into a multi-stage NGINX container image." },
      { name: "3. Docker Hub", detail: "Published image stored in Docker Hub registry for deployment pulling." },
      { name: "4. K8s Deployment", detail: "Kubernetes manages 2 active pod replicas with ConfigMaps, Secrets, and HPA." },
      { name: "5. Service & Ingress", detail: "Kubernetes Service routes traffic internally; NGINX Ingress exposes public port 80/443." },
      { name: "6. AWS EC2", detail: "Hosted on AWS EC2 cloud instance linked to custom domain." },
    ],
  },
  {
    id: "lamp",
    label: "LAMP on AWS",
    title: "LAMP Stack Deployment on AWS",
    github: "https://github.com/priyanshikothari10/LAMP-stack-project",
    description: "Linux, Apache, MySQL (RDS), and PHP web application architecture automated with Ansible.",
    nodes: [
      { name: "1. User Browser", detail: "HTTP/HTTPS traffic routed through AWS Security Groups." },
      { name: "2. Apache + PHP", detail: "Apache web server on EC2 handles dynamic PHP requests." },
      { name: "3. AWS EC2 Instance", detail: "RHEL/Ubuntu compute server hosting application frontend and server logic." },
      { name: "4. AWS RDS + S3", detail: "AWS RDS manages MySQL relational data; S3 stores static assets." },
      { name: "5. Ansible Automation", detail: "Playbooks automate server setup, package management, and system configuration." },
    ],
  },
  {
    id: "voting",
    label: "Docker Voting App",
    title: "Multi-Container Voting App",
    github: "https://github.com/priyanshikothari10/docker-voting-app",
    description: "Microservices voting application orchestrated with Docker Compose across isolated container networks.",
    nodes: [
      { name: "1. Voting UI", detail: "Python frontend accepts user votes and pushes them to Redis queue." },
      { name: "2. Redis Queue", detail: "In-memory message broker buffers incoming votes for async processing." },
      { name: "3. .NET Worker", detail: "Worker service consumes votes from Redis and persists them into database." },
      { name: "4. PostgreSQL DB", detail: "Relational database stores persistent vote tally." },
      { name: "5. Node.js Result UI", detail: "Result app reads database to display real-time vote distribution." },
    ],
  },
  {
    id: "wordpress",
    label: "WordPress on K8s",
    title: "WordPress Application on Kubernetes",
    github: "https://github.com/priyanshikothari10/Containerized-WordPress-Application-on-Kubernetes",
    description: "Containerized WordPress workload backed by MySQL pods and persistent storage volumes.",
    nodes: [
      { name: "1. WordPress Pods", detail: "Containerized WordPress frontend scaled with Kubernetes Deployments." },
      { name: "2. MySQL Pod", detail: "Dedicated MySQL database container with credentials injected via K8s Secrets." },
      { name: "3. PV & PVC Storage", detail: "Persistent Volumes preserve uploads and database state across pod restarts." },
      { name: "4. K8s Service", detail: "ClusterIP and NodePort services handle internal pod communication." },
      { name: "5. Rolling Updates", detail: "Zero-downtime updates configured for seamless cluster maintenance." },
    ],
  },
];

function ArchitectureNode({ node, selected, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`min-w-0 flex-1 rounded-xl border p-4 text-left transition duration-300 ${
        selected
          ? "border-cyan-400/55 bg-cyan-500/10 text-cyan-100 shadow-[0_0_24px_-10px_rgba(34,211,238,0.5)]"
          : "border-cyan-400/15 bg-slate-950/40 text-slate-300 hover:border-violet-400/35 hover:bg-violet-500/[0.08]"
      }`}
    >
      <span className="block text-xs font-semibold text-cyan-300 sm:text-sm">{node.name}</span>
      <span className="mt-1 block text-[11px] text-slate-500">Click node for details</span>
    </button>
  );
}

export default function InteractiveProjectArchitecture({ theme, activeProjectId, onSelectProject }) {
  const [internalProjectId, setInternalProjectId] = useState(ARCHITECTURE_PROJECTS[0].id);
  const [nodeIndex, setNodeIndex] = useState(0);

  const selectedId = activeProjectId || internalProjectId;
  const project = ARCHITECTURE_PROJECTS.find((item) => item.id === selectedId) || ARCHITECTURE_PROJECTS[0];
  const selectedNode = project.nodes[nodeIndex] || project.nodes[0];

  function changeProject(id) {
    if (onSelectProject) onSelectProject(id);
    setInternalProjectId(id);
    setNodeIndex(0);
  }

  return (
    <div className="mt-8 rounded-xl border border-cyan-400/15 bg-slate-950/30 p-5 sm:p-6 backdrop-blur-md text-left">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-400">
            Deployment &amp; Cloud Topology
          </span>
          <h3 className="mt-1 font-poppins text-lg font-semibold text-slate-100">
            Interactive Architecture Flow
          </h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {ARCHITECTURE_PROJECTS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => changeProject(item.id)}
              className={`rounded-md border px-3 py-1.5 text-xs font-semibold transition ${
                item.id === selectedId
                  ? "border-cyan-400/50 bg-cyan-500/15 text-cyan-100 shadow-[0_0_16px_-4px_rgba(34,211,238,0.4)]"
                  : "border-white/[0.1] bg-white/[0.03] text-slate-400 hover:border-violet-400/35 hover:text-slate-200"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h4 className="font-poppins text-base font-semibold text-slate-100">{project.title}</h4>
            <p className="mt-1 text-xs text-slate-400">{project.description}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-md border border-cyan-400/20 bg-white/[0.05] px-3 py-1.5 text-xs font-semibold text-slate-200 transition hover:border-violet-400/35"
            >
              <ExternalLink size={13} /> View Repository
            </a>
          </div>
        </div>

        {/* Node Pipeline View */}
        <div className="mt-6 flex flex-col items-stretch gap-2 lg:flex-row lg:items-center lg:gap-3 overflow-x-auto pb-2">
          {project.nodes.map((node, index) => (
            <div
              key={node.name}
              className="flex min-w-0 flex-1 flex-col items-stretch gap-2 lg:flex-row lg:items-center lg:gap-3"
            >
              <ArchitectureNode
                node={node}
                selected={nodeIndex === index}
                onClick={() => setNodeIndex(index)}
              />
              {index < project.nodes.length - 1 ? (
                <span className="architecture-connection flex justify-center text-cyan-300/70 py-1 lg:py-0">
                  <ArrowRight size={18} className="hidden lg:block shrink-0" />
                  <span className="lg:hidden text-xs">↓</span>
                </span>
              ) : null}
            </div>
          ))}
        </div>

        {/* Selected Node Details Box */}
        <div className="mt-6 rounded-lg border border-violet-400/20 bg-violet-500/[0.06] p-4 text-left">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-violet-300">
            Node Details: {selectedNode.name}
          </p>
          <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-300">
            {selectedNode.detail}
          </p>
        </div>
      </div>
    </div>
  );
}
