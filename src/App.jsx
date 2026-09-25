import { useEffect, useState } from "react";
import profile from "./assets/professional-portrait.png";
import SoftGradientBackground from "./components/SoftGradientBackground.jsx";
import TypingHero from "./components/TypingHero.jsx";
import InteractiveTerminal from "./components/InteractiveTerminal.jsx";
import DeployPipeline from "./components/DeployPipeline.jsx";
import CommandPalette from "./components/CommandPalette.jsx";
import LiveStatusBadge from "./components/LiveStatusBadge.jsx";
import ResumeYaml from "./components/ResumeYaml.jsx";
import InteractiveProjectArchitecture from "./components/InteractiveProjectArchitecture.jsx";
import CertificationTimeline from "./components/CertificationTimeline.jsx";
import {
  ArrowRight,
  Award,
  Cloud,
  Code2,
  Download,
  ExternalLink,
  GraduationCap,
  Mail,
  Send,
  Terminal,
  Cpu,
  Layers,
  Server,
  CheckCircle2,
} from "lucide-react";

const THEME_STORAGE_KEY = "portfolio-theme";

const HERO_TYPING_PHRASES = [
  "Cloud & DevOps Engineer",
  "Building & Automating Cloud Deployments",
  "Kubernetes & AWS Specialist",
];

const CONTACT_EMAIL = "priyanshi.pro10@gmail.com";
const LINKEDIN_URL = "https://www.linkedin.com/in/priyanshi-kothari-93975932a/";
const GITHUB_URL = "https://github.com/priyanshikothari10";
const LAMP_STACK_URL = "https://github.com/priyanshikothari10/LAMP-stack-project";
const DOCKER_VOTING_URL = "https://github.com/priyanshikothari10/docker-voting-app";
const K8S_WORDPRESS_URL =
  "https://github.com/priyanshikothari10/Containerized-WordPress-Application-on-Kubernetes";
const PORTFOLIO_URL = "https://github.com/priyanshikothari10/portfolio";
const RESUME_URL = "/Resume.pdf";

const navItems = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "certifications", label: "Certifications" },
  { id: "contact", label: "Contact" },
];

const skillCategories = [
  {
    title: "CLOUD",
    items: ["AWS", "EC2", "S3", "IAM", "RDS", "Security Groups"],
  },
  {
    title: "CONTAINERS & ORCHESTRATION",
    items: ["Docker", "Docker Compose", "Kubernetes", "Deployments", "Services", "Ingress", "RBAC", "ConfigMaps", "Secrets", "HPA"],
  },
  {
    title: "CI/CD & AUTOMATION",
    items: ["Jenkins", "Ansible", "Git", "GitHub"],
  },
  {
    title: "LINUX & SYSTEMS",
    items: ["RHEL 9", "Ubuntu", "Bash / Shell", "Apache", "System Administration"],
  },
  {
    title: "NETWORKING",
    items: ["DNS", "HTTP/HTTPS", "Load Balancing", "Ingress Controller", "ClusterIP / NodePort"],
  },
  {
    title: "PROGRAMMING",
    items: ["C++", "SQL"],
  },
];

const featuredProject = {
  id: "portfolio",
  name: "DevOps-Enabled Portfolio Deployment",
  badge: "React + Docker + Kubernetes + AWS EC2",
  description:
    "Transformed a React + Vite portfolio from a standard web build into a containerized application managed with Kubernetes and hosted on AWS EC2, featuring Docker Hub registry integration, Services, NGINX Ingress, ConfigMaps, Secrets, replica sets, and Horizontal Pod Autoscaling (HPA).",
  stack: [
    "React + Vite",
    "Docker",
    "Docker Hub",
    "Kubernetes",
    "AWS EC2",
    "NGINX Ingress",
    "HPA",
  ],
  github: PORTFOLIO_URL,
  live: "https://priyanshi-kothari-portfolio.netlify.app/",
  highlights: [
    "Containerized React application and published image to Docker Hub.",
    "Configured Kubernetes Deployments, replicas, Services, ConfigMaps, and Secrets.",
    "Set up NGINX Ingress for traffic routing and added Horizontal Pod Autoscaler.",
    "Deployed on AWS EC2 instance with custom domain configuration.",
  ],
};

const secondaryProjects = [
  {
    id: "lamp",
    name: "LAMP Stack Deployment on AWS",
    description:
      "Deployed a production-grade LAMP stack on AWS EC2 with RDS for MySQL data management, S3 for storage, IAM access control, and Ansible playbooks for automated server setup.",
    stack: ["AWS EC2", "RDS", "S3", "IAM", "Ansible", "Apache", "Linux"],
    github: LAMP_STACK_URL,
  },
  {
    id: "voting",
    name: "Docker Voting App",
    description:
      "Multi-container voting application deployed on AWS EC2 using Docker Compose, orchestrating Redis message queues, PostgreSQL databases, worker services, and voting UIs.",
    stack: ["AWS EC2", "Docker", "Docker Compose", "Redis", "PostgreSQL"],
    github: DOCKER_VOTING_URL,
  },
  {
    id: "wordpress",
    name: "WordPress on Kubernetes",
    description:
      "Containerized WordPress architecture running on Kubernetes with persistent volume claims (PV/PVC), MySQL database pods, Secrets management, zero-downtime rolling updates, and HPA.",
    stack: ["Kubernetes", "Docker", "MySQL", "PV/PVC", "Secrets", "Services"],
    github: K8S_WORDPRESS_URL,
  },
];

const experienceData = [
  {
    role: "Kubernetes Administrator Intern",
    org: "GRRAS Solutions Pvt. Ltd.",
    period: "May 2026 – Jul 2026",
    bullets: [
      "Managed Kubernetes workloads using Deployments, Services, Ingress, ConfigMaps, Secrets, RBAC, and Persistent Volumes.",
      "Performed rolling updates, pod scaling, node troubleshooting, and cluster administration tasks.",
      "Worked extensively with Linux system administration (RHEL 9 / Ubuntu) and containerized workflows.",
      "Deployed cloud-native applications using Docker, Kubernetes, and NGINX Ingress controllers.",
    ],
  },
  {
    role: "Salesforce Programming Architect Intern",
    org: "TechForce Academy Australia",
    period: "Jun 2025 – Aug 2025",
    bullets: [
      "Built and refined Salesforce solutions while learning platform limits, security models, and cloud delivery patterns.",
      "Collaborated on architecture-minded tasks and documentation to align technical decisions with business requirements.",
      "Strengthened fundamentals in Apex concepts, automation, and cloud delivery in a mentor-led environment.",
    ],
  },
];

const certificationsData = [
  { name: "RHCSA", issuer: "Red Hat", detail: "Red Hat Certified System Administrator (RHEL 9)" },
  { name: "Oracle Fusion Cloud", issuer: "Oracle", detail: "Oracle Cloud Platform Infrastructure" },
  { name: "Docker Specialist", issuer: "KodeKloud", detail: "Docker for the Absolute Beginner" },
  { name: "MongoDB GenAI", issuer: "MongoDB", detail: "GenAI & Modern Database Fundamentals" },
];

function Section({ id, eyebrow, title, subtitle, children, className = "", theme = "aurora" }) {
  const aurora = theme === "aurora";
  return (
    <section
      id={id}
      className={`relative mx-auto w-full max-w-6xl scroll-mt-24 px-4 py-12 sm:px-6 lg:px-8 dark:py-20 ${
        aurora ? "aurora-reveal-section" : ""
      } ${className}`}
    >
      <div className="glass card-hover rounded-2xl border border-white/50 p-6 shadow-sm shadow-indigo-100/30 transition-all duration-300 dark:rounded-xl dark:border-white/[0.06] dark:bg-black/25 dark:shadow-none sm:p-10 lg:p-12">
        <p
          className={`mb-1.5 text-xs font-semibold uppercase tracking-[0.2em] ${
            aurora ? "text-cyan-400/80" : "text-indigo-600 dark:text-neutral-500"
          }`}
        >
          {eyebrow}
        </p>
        <h2 className="font-poppins text-2xl font-bold tracking-tight text-slate-900 dark:text-neutral-100 sm:text-3xl">
          {title}
        </h2>
        {subtitle ? (
          <p
            className={`mt-2 max-w-2xl text-sm ${
              aurora ? "text-slate-400" : "text-slate-600 dark:text-neutral-500"
            }`}
          >
            {subtitle}
          </p>
        ) : null}
        <div className="mt-8 dark:mt-10">{children}</div>
      </div>
    </section>
  );
}

export default function App() {
  const [theme, setTheme] = useState(() => {
    try {
      const t = localStorage.getItem(THEME_STORAGE_KEY);
      if (t === "aurora" || t === "midnight") return t;
    } catch {
      /* ignore */
    }
    return "aurora";
  });

  const [activeSection, setActiveSection] = useState("hero");
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [showYamlModal, setShowYamlModal] = useState(false);
  const [selectedArchProject, setSelectedArchProject] = useState("portfolio");

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("dark");
    root.classList.toggle("theme-aurora", theme === "aurora");
    root.classList.toggle("theme-midnight", theme === "midnight");
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      /* ignore */
    }
  }, [theme]);

  useEffect(() => {
    const onKeyDown = (event) => {
      const target = event.target;
      const isTextField =
        target instanceof HTMLElement &&
        (target.matches("input, textarea, select") || target.isContentEditable);
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setPaletteOpen(true);
      } else if (event.key === "/" && !isTextField) {
        event.preventDefault();
        setPaletteOpen(true);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (theme !== "aurora") return;
    let io;
    const frame = requestAnimationFrame(() => {
      const sections = document.querySelectorAll(".aurora-reveal-section");
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) entry.target.classList.add("is-visible");
          });
        },
        { threshold: 0.08, rootMargin: "0px 0px -8% 0px" }
      );
      sections.forEach((el) => io.observe(el));
    });
    return () => {
      cancelAnimationFrame(frame);
      io?.disconnect();
    };
  }, [theme]);

  useEffect(() => {
    const ids = ["hero", ...navItems.map((n) => n.id)];
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const id = visible[0]?.target?.id;
        if (id) setActiveSection(id);
      },
      { rootMargin: "-10% 0px -55% 0px", threshold: [0, 0.12, 0.25, 0.4] }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="relative z-10 min-h-screen overflow-x-hidden text-slate-800 dark:text-neutral-300">
      <SoftGradientBackground theme={theme} />

      {/* Header */}
      <header className="site-header sticky top-0 z-40 border-b border-slate-200/60 bg-white/75 backdrop-blur-md dark:border-white/[0.08] dark:bg-black/70 dark:backdrop-blur-xl">
        <nav className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-3.5 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <a
              href="#hero"
              className="font-poppins shrink-0 text-sm font-bold tracking-tight text-slate-900 dark:text-neutral-100 flex items-center gap-2"
            >
              <span className="h-2 w-2 rounded-full bg-cyan-400" />
              Priyanshi Kothari
            </a>

            <div className="flex items-center gap-2 ml-auto">
              <LiveStatusBadge theme={theme} compact={true} />

              <button
                type="button"
                onClick={() => setPaletteOpen(true)}
                className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-white/[0.05] px-3 py-1.5 text-xs font-medium text-slate-300 hover:border-violet-400/35 hover:bg-white/[0.1] transition"
                aria-label="Search portfolio"
              >
                Search <kbd className="rounded border border-current/20 px-1 text-[10px]">Ctrl+K</kbd>
              </button>

              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className="rounded-lg border border-white/[0.12] bg-white/[0.06] py-1.5 pl-2 pr-6 text-xs font-medium text-neutral-200 shadow-sm outline-none focus:ring-1 focus:ring-cyan-500/30"
                aria-label="Visual theme"
              >
                <option value="aurora">Aurora Borealis</option>
                <option value="midnight">Midnight Minimal</option>
              </select>
            </div>
          </div>

          {/* Nav Items */}
          <div className="-mx-1 flex gap-1 overflow-x-auto pb-1 lg:mx-0 lg:flex-wrap lg:justify-center lg:gap-x-6 lg:gap-y-1 lg:overflow-visible">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`shrink-0 rounded-md px-3 py-1.5 text-xs font-medium tracking-wide text-slate-400 transition duration-200 hover:text-slate-100 ${
                  activeSection === item.id ? "aurora-nav-active !text-cyan-200 font-semibold" : ""
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>
      </header>

      <main>
        {/* HERO SECTION */}
        <section
          id="hero"
          className="relative mx-auto w-full max-w-6xl px-4 pb-20 pt-16 sm:px-6 lg:px-8 lg:pb-28 lg:pt-24"
        >
          <div className="fade-in-up flex flex-col-reverse items-center justify-between gap-10 lg:flex-row lg:items-center lg:gap-8">
            <div className="flex-1 w-full max-w-2xl lg:max-w-3xl text-left">
              {/* Eyebrow */}
              <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/35 bg-cyan-500/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-cyan-200">
                <Cpu size={14} className="text-cyan-400" /> AI &amp; DATA SCIENCE • CLOUD &amp; DEVOPS
              </p>

              {/* Main Heading */}
              <h1 className="font-poppins text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-slate-100">
                Priyanshi Kothari
              </h1>

              {/* Role */}
              <div className="mt-3">
                <TypingHero
                  phrases={HERO_TYPING_PHRASES}
                  className="min-h-[2.25rem] text-xl font-semibold text-cyan-300 sm:text-2xl"
                />
              </div>

              {/* Supporting Text */}
              <p className="mt-4 text-base leading-relaxed text-slate-300 sm:text-lg">
                Building, automating, and deploying reliable cloud infrastructure. RHCSA-certified B.Tech student with hands-on experience in Linux, AWS, Docker, Ansible, and Kubernetes.
              </p>

              {/* Hero Action Buttons */}
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#projects"
                  className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-sky-600 via-violet-600 to-purple-600 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0_28px_-4px_rgba(34,211,238,0.45)] transition hover:scale-[1.03]"
                >
                  View Projects <ArrowRight size={16} />
                </a>

                <a
                  href={RESUME_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-cyan-400/35 bg-white/[0.06] px-4 py-2.5 text-sm font-semibold text-slate-100 backdrop-blur-md transition hover:border-violet-400/45 hover:bg-white/[0.1]"
                >
                  <Download size={16} /> Download Resume
                </a>

                <button
                  type="button"
                  onClick={() => setShowYamlModal(!showYamlModal)}
                  className="inline-flex items-center gap-2 rounded-lg border border-violet-400/35 bg-violet-500/10 px-3.5 py-2.5 text-sm font-semibold text-violet-200 backdrop-blur-md transition hover:bg-violet-500/20"
                >
                  <Terminal size={15} /> YAML View
                </button>

                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/[0.1] bg-white/[0.04] px-4 py-2.5 text-sm font-semibold text-slate-200 transition hover:bg-white/[0.08]"
                >
                  LinkedIn <ExternalLink size={14} />
                </a>

                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/[0.1] bg-white/[0.04] px-4 py-2.5 text-sm font-semibold text-slate-200 transition hover:bg-white/[0.08]"
                >
                  GitHub <Code2 size={15} />
                </a>
              </div>

              {/* Optional YAML Drawer */}
              {showYamlModal && (
                <div className="mt-6">
                  <ResumeYaml theme={theme} onClose={() => setShowYamlModal(false)} />
                </div>
              )}
            </div>

            {/* UNCLIPPED PROFILE PHOTO COMPOSITION */}
            <div className="relative shrink-0 w-64 h-64 sm:w-72 sm:h-72 lg:w-[320px] lg:h-[320px] lg:ml-6 group flex items-center justify-center">
              {/* Background ambient glow blob */}
              <div className="absolute inset-2 rounded-full bg-gradient-to-tr from-cyan-500/30 via-purple-500/30 to-pink-500/30 blur-2xl opacity-60 transition duration-500 group-hover:opacity-80" />

              {/* Decorative cyan/purple circular ring BEHIND portrait */}
              <div className="absolute inset-4 rounded-full border-2 border-cyan-400/40 bg-slate-900/60 p-2 shadow-[0_0_40px_rgba(34,211,238,0.25)] backdrop-blur-sm transition duration-300 group-hover:border-violet-400/60" />

              {/* Unclipped Portrait Image */}
              <div className="relative z-10 h-full w-full flex items-center justify-center p-2">
                <img
                  src={profile}
                  alt="Priyanshi Kothari"
                  className="max-h-full max-w-full object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.6)] transition duration-300 group-hover:scale-[1.03]"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Quick Technical Highlights Pill Bar */}
        <section className="relative mx-auto w-full max-w-6xl px-4 pb-8 sm:px-6 lg:px-8">
          <div className="grid gap-3 grid-cols-2 sm:grid-cols-4">
            <div className="rounded-xl border border-cyan-400/20 bg-slate-950/40 p-3.5 flex items-center gap-3">
              <Award className="text-cyan-400 shrink-0" size={22} />
              <div className="text-left">
                <p className="text-xs font-bold text-slate-100">RHCSA Certified</p>
                <p className="text-[11px] text-slate-400">Red Hat System Admin</p>
              </div>
            </div>
            <div className="rounded-xl border border-violet-400/20 bg-slate-950/40 p-3.5 flex items-center gap-3">
              <Server className="text-violet-400 shrink-0" size={22} />
              <div className="text-left">
                <p className="text-xs font-bold text-slate-100">Kubernetes</p>
                <p className="text-[11px] text-slate-400">Internship Completed</p>
              </div>
            </div>
            <div className="rounded-xl border border-sky-400/20 bg-slate-950/40 p-3.5 flex items-center gap-3">
              <Cloud className="text-sky-400 shrink-0" size={22} />
              <div className="text-left">
                <p className="text-xs font-bold text-slate-100">AWS Cloud</p>
                <p className="text-[11px] text-slate-400">EC2, RDS, S3, IAM</p>
              </div>
            </div>
            <div className="rounded-xl border border-emerald-400/20 bg-slate-950/40 p-3.5 flex items-center gap-3">
              <Layers className="text-emerald-400 shrink-0" size={22} />
              <div className="text-left">
                <p className="text-xs font-bold text-slate-100">Docker &amp; CI/CD</p>
                <p className="text-[11px] text-slate-400">Ansible &amp; Jenkins</p>
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT SECTION */}
        <Section
          theme={theme}
          id="about"
          eyebrow="Background"
          title="About Me"
          subtitle="Cloud & DevOps Engineer focusing on automation, containerization, and infrastructure."
        >
          <div className="space-y-4 text-sm sm:text-base leading-relaxed text-slate-300 text-left">
            <p>
              I am a B.Tech student in <strong className="font-semibold text-cyan-200">Artificial Intelligence &amp; Data Science</strong> at Arya College of Engineering &amp; IT with a strong focus on Cloud Computing, DevOps Engineering, and Kubernetes orchestration.
            </p>
            <p>
              I am <strong className="font-semibold text-slate-100">RHCSA-certified</strong> and have practical experience managing Linux environments (RHEL 9 / Ubuntu), configuring AWS cloud resources (EC2, RDS, S3, IAM, Security Groups), containerizing applications with Docker, automating server setups with Ansible, and orchestrating workloads with Kubernetes.
            </p>
            <p>
              Recently, I completed a <strong className="font-semibold text-slate-100">Kubernetes Administrator Internship at GRRAS Solutions Pvt. Ltd.</strong>, where I worked with cluster workloads, Services, NGINX Ingress controllers, ConfigMaps, Secrets, RBAC, persistent volumes, and troubleshooting pod states.
            </p>

            {/* Compact Technical Highlights */}
            <div className="pt-4 flex flex-wrap gap-2">
              <span className="rounded-md border border-cyan-400/30 bg-cyan-500/10 px-3 py-1.5 text-xs font-semibold text-cyan-200">
                RHCSA Certified
              </span>
              <span className="rounded-md border border-violet-400/30 bg-violet-500/10 px-3 py-1.5 text-xs font-semibold text-violet-200">
                Kubernetes Operations
              </span>
              <span className="rounded-md border border-sky-400/30 bg-sky-500/10 px-3 py-1.5 text-xs font-semibold text-sky-200">
                AWS Infrastructure
              </span>
              <span className="rounded-md border border-emerald-400/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-200">
                CI/CD &amp; Automation
              </span>
            </div>
          </div>
        </Section>

        {/* SKILLS SECTION */}
        <Section
          theme={theme}
          id="skills"
          eyebrow="Technical Inventory"
          title="Skills &amp; Technologies"
          subtitle="Grouped by Cloud &amp; DevOps domains based on demonstrated project experience."
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {skillCategories.map((cat) => (
              <article
                key={cat.title}
                className="rounded-xl border border-cyan-400/15 bg-slate-950/35 p-5 backdrop-blur-sm transition duration-300 hover:border-cyan-400/30 text-left"
              >
                <h3 className="font-poppins text-xs font-bold uppercase tracking-[0.16em] text-cyan-400">
                  {cat.title}
                </h3>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {cat.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-md border border-white/[0.08] bg-white/[0.04] px-2.5 py-1 text-xs font-medium text-slate-300"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </Section>

        {/* FEATURED PROJECTS SECTION */}
        <Section
          theme={theme}
          id="projects"
          eyebrow="Hands-on Infrastructure"
          title="Featured Projects"
          subtitle="Production-grade cloud deployments, Kubernetes architectures, containerization, and automation."
        >
          {/* Primary Featured Project Card */}
          <div className="rounded-xl border border-cyan-400/30 bg-slate-950/50 p-6 shadow-[0_0_30px_-10px_rgba(34,211,238,0.2)] sm:p-8 backdrop-blur-md text-left">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-cyan-300">
                {featuredProject.badge}
              </span>
              <span className="text-xs font-mono text-slate-400">Primary Featured</span>
            </div>

            <h3 className="font-poppins mt-3 text-2xl font-bold text-slate-100 sm:text-3xl">
              {featuredProject.name}
            </h3>

            <p className="mt-3 text-sm leading-relaxed text-slate-300">
              {featuredProject.description}
            </p>

            {/* Tech Tags */}
            <div className="mt-4 flex flex-wrap gap-2">
              {featuredProject.stack.map((t) => (
                <span
                  key={t}
                  className="rounded-md border border-cyan-400/20 bg-slate-900/60 px-2.5 py-1 text-xs font-medium text-slate-200"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Highlights */}
            <div className="mt-5 border-t border-white/[0.08] pt-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cyan-400">
                Key Technical Capabilities
              </p>
              <ul className="mt-2 grid gap-1.5 text-xs text-slate-300 sm:grid-cols-2">
                {featuredProject.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2">
                    <CheckCircle2 size={15} className="text-cyan-400 shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Actions */}
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={featuredProject.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-sky-600 to-violet-600 px-4 py-2 text-xs font-semibold text-white shadow-md transition hover:scale-[1.02]"
              >
                <Code2 size={15} /> GitHub Repository
              </a>
              {featuredProject.live && (
                <a
                  href={featuredProject.live}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-cyan-400/25 bg-white/[0.06] px-4 py-2 text-xs font-semibold text-slate-200 transition hover:bg-white/[0.1]"
                >
                  <ExternalLink size={15} /> Live Demo
                </a>
              )}
              <button
                type="button"
                onClick={() => setSelectedArchProject("portfolio")}
                className="inline-flex items-center gap-2 rounded-lg border border-violet-400/30 bg-violet-500/10 px-4 py-2 text-xs font-semibold text-violet-200 transition hover:bg-violet-500/20"
              >
                <Layers size={15} /> View Architecture Flow
              </button>
            </div>
          </div>

          {/* Secondary Projects Grid */}
          <div className="mt-6 grid gap-5 sm:grid-cols-3">
            {secondaryProjects.map((p) => (
              <article
                key={p.id}
                className="flex flex-col justify-between rounded-xl border border-cyan-400/15 bg-slate-950/35 p-5 backdrop-blur-sm transition duration-300 hover:border-cyan-400/30 text-left"
              >
                <div>
                  <h4 className="font-poppins text-lg font-semibold text-slate-100">{p.name}</h4>
                  <p className="mt-2 text-xs leading-relaxed text-slate-400">{p.description}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {p.stack.map((item) => (
                      <span
                        key={item}
                        className="rounded border border-white/[0.08] bg-white/[0.03] px-2 py-0.5 text-[11px] text-slate-300"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-white/[0.08] pt-3">
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-300 hover:underline"
                  >
                    <Code2 size={13} /> GitHub Repository
                  </a>
                  <button
                    type="button"
                    onClick={() => setSelectedArchProject(p.id)}
                    className="text-xs text-violet-300 hover:underline"
                  >
                    Architecture →
                  </button>
                </div>
              </article>
            ))}
          </div>

          {/* Embedded Interactive Architecture */}
          <InteractiveProjectArchitecture
            theme={theme}
            activeProjectId={selectedArchProject}
            onSelectProject={(id) => setSelectedArchProject(id)}
          />

          {/* Embedded Deploy Pipeline / History */}
          <DeployPipeline theme={theme} />
        </Section>

        {/* EXPERIENCE SECTION */}
        <Section
          theme={theme}
          id="experience"
          eyebrow="Hands-on Exposure"
          title="Work Experience"
          subtitle="Practical experience managing Kubernetes, Linux, and cloud environments."
        >
          <div className="space-y-6">
            {experienceData.map((exp) => (
              <div
                key={exp.role}
                className="rounded-xl border border-cyan-400/15 bg-slate-950/35 p-6 backdrop-blur-sm text-left"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <h3 className="font-poppins text-lg font-bold text-slate-100">{exp.role}</h3>
                    <p className="text-xs font-semibold text-cyan-300">{exp.org}</p>
                  </div>
                  <span className="rounded-md border border-white/[0.1] bg-white/[0.04] px-3 py-1 font-mono text-xs text-slate-400">
                    {exp.period}
                  </span>
                </div>
                <ul className="mt-4 space-y-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {exp.bullets.map((b, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shrink-0 mt-2" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        {/* CERTIFICATIONS & LEARNING JOURNEY SECTION */}
        <Section
          theme={theme}
          id="certifications"
          eyebrow="Validated Skills"
          title="Certifications &amp; Learning"
          subtitle="Industry credentials and active engineering development."
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {certificationsData.map((c) => (
              <article
                key={c.name}
                className="rounded-xl border border-cyan-400/15 bg-slate-950/35 p-5 backdrop-blur-sm text-center"
              >
                <Award className="mx-auto text-cyan-400" size={32} />
                <h3 className="font-poppins mt-3 font-bold text-slate-100 text-base">{c.name}</h3>
                <p className="mt-1 text-xs font-semibold text-violet-300">{c.issuer}</p>
                <p className="mt-2 text-xs text-slate-400">{c.detail}</p>
              </article>
            ))}
          </div>

          <div className="mt-6">
            <CertificationTimeline theme={theme} />
          </div>
        </Section>

        {/* EDUCATION SECTION */}
        <Section
          theme={theme}
          id="education"
          eyebrow="Academic Foundation"
          title="Education"
        >
          <div className="flex gap-4 rounded-xl border border-cyan-400/15 bg-slate-950/35 p-6 backdrop-blur-sm text-left">
            <div className="hidden shrink-0 sm:flex h-12 w-12 items-center justify-center rounded-lg border border-violet-400/30 bg-violet-500/10 text-violet-300">
              <GraduationCap size={24} />
            </div>
            <div>
              <h3 className="font-poppins text-lg font-bold text-slate-100">
                B.Tech — Artificial Intelligence &amp; Data Science
              </h3>
              <p className="text-xs sm:text-sm text-slate-400">
                Arya College of Engineering &amp; IT, Jaipur
              </p>
              <div className="mt-2 inline-flex items-center gap-2 rounded-md border border-cyan-400/30 bg-cyan-500/10 px-3 py-1 font-mono text-xs font-bold text-cyan-300">
                CGPA: 8.78
              </div>
            </div>
          </div>
        </Section>

        {/* INTERACTIVE TERMINAL SECTION */}
        <InteractiveTerminal theme={theme} />

        {/* CONTACT SECTION */}
        <Section
          theme={theme}
          id="contact"
          eyebrow="Get In Touch"
          title="Let's build something reliable."
          subtitle="Open to Cloud Engineering, DevOps, and Kubernetes opportunities."
        >
          <div className="rounded-xl border border-cyan-400/15 bg-slate-950/40 p-6 backdrop-blur-md text-left">
            <p className="text-sm leading-relaxed text-slate-300">
              I am actively seeking internship or entry-level opportunities in <strong className="font-semibold text-slate-100">Cloud &amp; DevOps Engineering, Infrastructure Automation, and Kubernetes Operations</strong>. Feel free to reach out directly via email or connect on LinkedIn.
            </p>

            <form className="mt-6 grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-400">Name</label>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full rounded-lg border border-cyan-400/20 bg-slate-950/50 px-4 py-2.5 text-xs text-slate-200 outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/30"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-400">Email</label>
                <input
                  type="email"
                  placeholder={CONTACT_EMAIL}
                  className="w-full rounded-lg border border-cyan-400/20 bg-slate-950/50 px-4 py-2.5 text-xs text-slate-200 outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/30"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-xs font-medium text-slate-400">Message</label>
                <textarea
                  rows={4}
                  placeholder="Your message..."
                  className="w-full rounded-lg border border-cyan-400/20 bg-slate-950/50 px-4 py-2.5 text-xs text-slate-200 outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/30"
                />
              </div>

              <div className="sm:col-span-2">
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-sky-600 via-violet-600 to-purple-600 px-6 py-2.5 text-xs font-semibold text-white shadow-md transition hover:scale-[1.02]"
                >
                  <Send size={14} /> Send Message
                </button>
              </div>
            </form>

            <div className="mt-8 flex flex-wrap gap-3 border-t border-white/[0.08] pt-6">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="inline-flex items-center gap-2 rounded-lg border border-cyan-400/20 bg-white/[0.05] px-4 py-2 text-xs font-medium text-slate-200 hover:border-cyan-400/40"
              >
                <Mail size={14} /> {CONTACT_EMAIL}
              </a>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-cyan-400/20 bg-white/[0.05] px-4 py-2 text-xs font-medium text-slate-200 hover:border-cyan-400/40"
              >
                LinkedIn <ExternalLink size={13} />
              </a>
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-cyan-400/20 bg-white/[0.05] px-4 py-2 text-xs font-medium text-slate-200 hover:border-cyan-400/40"
              >
                GitHub <Code2 size={14} />
              </a>
            </div>
          </div>
        </Section>
      </main>

      {/* FOOTER */}
      <footer className="mx-auto max-w-6xl px-4 pb-12 pt-8 text-center text-xs text-slate-500 sm:px-6 lg:px-8 border-t border-white/[0.06]">
        <p className="inline-flex items-center justify-center gap-2">
          <Cloud size={14} className="text-cyan-400" />
          <span>© 2026 Priyanshi Kothari · Cloud &amp; DevOps Engineer</span>
        </p>
      </footer>

      {/* Search / Command Palette Modal */}
      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
    </div>
  );
}
