import { useEffect, useState } from "react";
import profile from "./assets/profile.png";
import SoftGradientBackground from "./components/SoftGradientBackground.jsx";
import TypingHero from "./components/TypingHero.jsx";
import {
  ArrowRight,
  Award,
  Brain,
  Building2,
  Cloud,
  Code2,
  Download,
  ExternalLink,
  GraduationCap,
  Link,
  Mail,
  Send,
  Sparkles,
  Target,
  Wand2,
  XIcon,
} from "lucide-react";

const THEME_STORAGE_KEY = "portfolio-theme";

const HERO_TYPING_PHRASES = [
  "Building Scalable Cloud Systems",
  "Exploring AI & DevOps",
  "Turning Ideas into Reliable Solutions",
];

const CONTACT_EMAIL = "priyanshi.pro10@gmail.com";
const LINKEDIN_URL = "https://www.linkedin.com/in/priyanshi-kothari-93975932a/";
const GITHUB_URL = "https://github.com/priyanshikothari10";
const TWITTER_URL = "https://x.com/Priyanshi1004";
/** Replace with hosted PDF URL for production */
const RESUME_URL = "#";

const navItems = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "featured", label: "Featured" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "certifications", label: "Certs" },
  { id: "education", label: "Education" },
  { id: "focus", label: "Focus" },
  { id: "contact", label: "Contact" },
];

const skills = [
  { title: "Programming", items: "C, C++, Java, Python", level: 85 },
  { title: "Web", items: "HTML, CSS, JavaScript", level: 88 },
  {
    title: "Cloud & DevOps",
    items: "AWS, Docker, Kubernetes (learning), CI/CD (learning)",
    level: 72,
  },
  { title: "Tools", items: "Linux (RHEL 9), Git, VS Code", level: 82 },
];

const featuredProject = {
  name: "PortfoGen",
  badge: "AI · Productivity",
  description:
    "An AI-powered portfolio generator that helps users turn experience and skills into a polished, structured site in minutes—ideal for iterating quickly and staying recruiter-ready.",
  stack: ["React", "Tailwind CSS", "AI / LLM integration", "Responsive UI"],
  github: GITHUB_URL,
  live: "#",
};

const projects = [
  {
    name: "Docker Voting App",
    description:
      "Multi-container app deployed on AWS EC2 with Docker Compose. Container networking with Redis, PostgreSQL, and workers for real-time vote processing.",
    stack: ["AWS EC2", "Docker", "Docker Compose", "Redis", "PostgreSQL"],
    github: GITHUB_URL,
    live: "#",
  },
  {
    name: "JustNeedMotivation",
    description:
      "Next.js 14 productivity app with task management, daily goals, and progress visualization using Chart.js and Framer Motion.",
    stack: ["Next.js 14", "Chart.js", "Framer Motion", "Tailwind CSS"],
    github: GITHUB_URL,
    live: "#",
  },
  {
    name: "Little Love Studio",
    description:
      "Interactive web app to create and share personalized digital bouquets with animated UI and light storytelling.",
    stack: ["Next.js", "Tailwind CSS", "Animation"],
    github: GITHUB_URL,
    live: "#",
  },
  {
    name: "CitySamadhan",
    description:
      "Civic complaint management and issue reporting platform for structured urban problem tracking and resolution.",
    stack: ["Web stack", "CRUD", "Reporting"],
    github: GITHUB_URL,
    live: "#",
  },
  {
    name: "Enterprise Asset Tracker",
    description:
      "Backend-oriented system to manage and track organizational assets with practical, real-world workflows.",
    stack: ["Backend APIs", "Data modeling"],
    github: GITHUB_URL,
    live: "#",
  },
];

const experience = {
  role: "Salesforce Programming Architect Intern",
  org: "TechForce Academy Australia",
  period: "Internship",
  bullets: [
    "Built and refined Salesforce solutions while learning platform limits, security models, and declarative vs. programmatic patterns.",
    "Collaborated on architecture-minded tasks and documentation to align technical decisions with business requirements.",
    "Strengthened fundamentals in Apex-adjacent concepts, automation, and cloud delivery in a remote, mentor-led environment.",
  ],
};

const certifications = [
  { name: "RHCSA", detail: "Red Hat Certified System Administrator" },
  { name: "Oracle Fusion Cloud", detail: "Oracle Cloud certification" },
  { name: "MongoDB", detail: "GenAI certification" },
];

const currentFocus = [
  "Kubernetes and container orchestration",
  "CI/CD pipelines and release automation",
  "Data Structures & Algorithms",
  "Scalable system design patterns",
];

function Section({ id, eyebrow, title, subtitle, children, className = "", theme = "light" }) {
  const isAurora = theme === "aurora";
  return (
    <section
      id={id}
      className={`relative mx-auto w-full max-w-6xl scroll-mt-24 px-4 py-14 sm:px-6 lg:px-8 dark:py-24 ${isAurora ? "aurora-reveal-section" : ""} ${className}`}
    >
      <div className="glass card-hover rounded-2xl border border-white/50 p-6 shadow-sm shadow-indigo-100/30 transition-all duration-300 dark:rounded-xl dark:border-white/[0.06] dark:bg-black/25 dark:shadow-none sm:p-12 lg:p-14">
        <p
          className={`mb-2 text-xs font-semibold uppercase tracking-[0.2em] ${
            isAurora ? "text-cyan-400/80" : "text-indigo-600 dark:text-neutral-500"
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
              isAurora ? "text-slate-400" : "text-slate-600 dark:text-neutral-500"
            }`}
          >
            {subtitle}
          </p>
        ) : null}
        <div className="mt-10 dark:mt-12">{children}</div>
      </div>
    </section>
  );
}

function TechStack({ items, theme }) {
  const aurora = theme === "aurora";
  return (
    <ul className="mt-4 flex flex-wrap gap-2">
      {items.map((t) => (
        <li
          key={t}
          className={
            aurora
              ? "rounded-md border border-cyan-400/20 bg-slate-950/45 px-2.5 py-1 text-xs font-medium text-slate-300 backdrop-blur-sm"
              : "rounded-md border border-indigo-200/80 bg-white/80 px-2.5 py-1 text-xs font-medium text-indigo-900 dark:border-white/[0.08] dark:bg-transparent dark:text-neutral-400"
          }
        >
          {t}
        </li>
      ))}
    </ul>
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

  useEffect(() => {
    const root = document.documentElement;
    const isDark = true;
    root.classList.toggle("dark", isDark);
    root.classList.toggle("theme-aurora", theme === "aurora");
    root.classList.toggle("theme-midnight", theme === "midnight");
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      /* ignore */
    }
  }, [theme]);

  const [activeSection, setActiveSection] = useState("hero");

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
        { threshold: 0.08, rootMargin: "0px 0px -8% 0px" },
      );
      sections.forEach((el) => io.observe(el));
    });
    return () => {
      cancelAnimationFrame(frame);
      io?.disconnect();
    };
  }, [theme]);

  useEffect(() => {
    if (theme !== "aurora") return;
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
      { rootMargin: "-10% 0px -55% 0px", threshold: [0, 0.12, 0.25, 0.4] },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [theme]);

  return (
    <div className="relative z-10 min-h-screen overflow-x-hidden text-slate-800 dark:text-neutral-300">
      <SoftGradientBackground theme={theme} />

      <header className="site-header sticky top-0 z-40 border-b border-slate-200/60 bg-white/75 backdrop-blur-md dark:border-white/[0.08] dark:bg-black/70 dark:backdrop-blur-xl">
        <nav className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <a
              href="#hero"
              className="font-poppins shrink-0 text-sm font-semibold tracking-tight text-slate-900 dark:text-neutral-100"
            >
              Priyanshi Kothari
            </a>
            <label className="flex items-center gap-2">
              {theme === "aurora" ? (
                <Sparkles size={16} className="text-cyan-400/90" aria-hidden />
              ) : null}
              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className="max-w-[min(100%,14rem)] rounded-lg border border-slate-200 bg-white py-2 pl-2.5 pr-8 text-xs font-medium text-slate-800 shadow-sm outline-none ring-indigo-200/50 focus:ring-2 dark:border-white/[0.12] dark:bg-white/[0.06] dark:text-neutral-200 dark:ring-cyan-500/30"
                aria-label="Visual theme"
              >
                <option value="aurora">Aurora Borealis</option>
                <option value="midnight">Midnight Minimal</option>
              </select>
            </label>
          </div>
          <div className="-mx-1 flex gap-1 overflow-x-auto pb-1 lg:mx-0 lg:flex-wrap lg:justify-center lg:gap-x-5 lg:gap-y-1 lg:overflow-visible">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`shrink-0 rounded-md px-2.5 py-1.5 text-xs font-medium tracking-wide text-slate-600 transition duration-300 hover:bg-indigo-50 hover:text-indigo-700 dark:text-neutral-500 dark:hover:bg-transparent dark:hover:text-neutral-200 ${
                  theme === "aurora" && activeSection === item.id
                    ? "aurora-nav-active !text-slate-100"
                    : ""
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>
      </header>

      <main>
        {/* Hero */}
        <section
          id="hero"
          className="relative mx-auto w-full max-w-6xl px-4 pb-24 pt-20 sm:px-6 lg:px-8 lg:pb-32 lg:pt-28 dark:pb-32 dark:pt-28"
        >
          <div className="fade-in-up flex flex-col-reverse items-center justify-between gap-12 lg:flex-row lg:items-center lg:gap-8">
            <div className="flex-1 w-full max-w-2xl dark:max-w-3xl">
              <p
              className={`mb-8 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] ${
                theme === "aurora"
                  ? "border-cyan-400/35 bg-cyan-500/10 text-cyan-100/95"
                  : "border-indigo-200/80 bg-white/80 text-indigo-700 dark:border-white/[0.08] dark:bg-transparent dark:text-neutral-500"
              }`}
            >
              <Brain size={14} aria-hidden /> AI & Data Science · Cloud & DevOps
            </p>
            <h1
              className={`font-poppins text-4xl font-bold tracking-tight sm:text-5xl ${
                theme === "aurora"
                  ? "aurora-hero-title bg-gradient-to-r from-[#22d3ee] via-[#8b5cf6] to-[#a855f7] bg-clip-text text-transparent"
                  : theme === "midnight"
                    ? "text-slate-900 text-outline-display dark:font-semibold dark:tracking-[0.02em]"
                    : "text-slate-900"
              }`}
            >
              Priyanshi Kothari
            </h1>
            {theme === "aurora" ? (
              <TypingHero
                phrases={HERO_TYPING_PHRASES}
                className="mt-8 min-h-[2rem] text-lg text-slate-400 sm:min-h-[2.25rem] sm:text-xl"
              />
            ) : (
              <p className="mt-8 text-lg font-medium text-indigo-700 sm:text-xl dark:font-normal dark:text-neutral-400">
                AI & Data Science Student | Aspiring Cloud & DevOps Engineer
              </p>
            )}
            <p
              className={`mt-6 text-base leading-[1.75] ${
                theme === "aurora" ? "text-slate-400" : "text-slate-600 dark:text-neutral-500"
              }`}
            >
              I focus on building scalable, reliable systems—bridging AI, data, Linux, and cloud
              infrastructure so applications deploy, automate, and scale with clarity.
            </p>
            <div className="mt-12 flex flex-wrap gap-3 dark:gap-4">
              <a
                href="#projects"
                className={`inline-flex items-center gap-2 rounded-lg border px-5 py-2.5 text-sm font-semibold shadow-md transition duration-300 ease-out ${
                  theme === "aurora"
                    ? "border-transparent bg-gradient-to-r from-sky-600 via-violet-600 to-purple-600 text-white shadow-[0_0_28px_-4px_rgba(34,211,238,0.45)] hover:scale-[1.03] hover:shadow-[0_0_40px_-4px_rgba(139,92,246,0.45)] active:scale-[1.01]"
                    : "border-indigo-600 bg-indigo-600 text-white shadow-indigo-500/20 hover:-translate-y-0.5 hover:bg-indigo-700 dark:border-white dark:bg-transparent dark:shadow-none dark:hover:bg-white/[0.06]"
                }`}
              >
                View Projects <ArrowRight size={16} />
              </a>
              <a
                href={RESUME_URL}
                className={`inline-flex items-center gap-2 rounded-lg border px-5 py-2.5 text-sm font-semibold transition duration-300 ease-out ${
                  theme === "aurora"
                    ? "border-cyan-400/25 bg-white/[0.06] text-slate-100 backdrop-blur-md hover:border-violet-400/35 hover:bg-white/[0.1] hover:shadow-[0_0_24px_-8px_rgba(34,211,238,0.22)]"
                    : "border-slate-200 bg-white text-slate-800 hover:-translate-y-0.5 hover:bg-slate-50 dark:border-white/[0.1] dark:bg-transparent dark:text-neutral-200 dark:hover:bg-white/[0.04]"
                }`}
              >
                <Download size={16} /> Download Resume
              </a>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noreferrer"
                className={`inline-flex items-center gap-2 rounded-lg border px-5 py-2.5 text-sm font-semibold transition duration-300 ease-out ${
                  theme === "aurora"
                    ? "border-cyan-400/25 bg-white/[0.06] text-slate-100 backdrop-blur-md hover:border-violet-400/35 hover:bg-white/[0.1] hover:shadow-[0_0_24px_-8px_rgba(34,211,238,0.22)]"
                    : "border-slate-200 bg-white text-slate-800 hover:-translate-y-0.5 hover:bg-slate-50 dark:border-white/[0.1] dark:bg-transparent dark:text-neutral-200 dark:hover:bg-white/[0.04]"
                }`}
              >
                <Link size={16} /> LinkedIn
              </a>
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noreferrer"
                className={`inline-flex items-center gap-2 rounded-lg border px-5 py-2.5 text-sm font-semibold transition duration-300 ease-out ${
                  theme === "aurora"
                    ? "border-cyan-400/25 bg-white/[0.06] text-slate-100 backdrop-blur-md hover:border-violet-400/35 hover:bg-white/[0.1] hover:shadow-[0_0_24px_-8px_rgba(34,211,238,0.22)]"
                    : "border-slate-200 bg-white text-slate-800 hover:-translate-y-0.5 hover:bg-slate-50 dark:border-white/[0.1] dark:bg-transparent dark:text-neutral-200 dark:hover:bg-white/[0.04]"
                }`}
              >
                <Code2 size={16} /> GitHub
              </a>
            </div>
            </div>

            {theme === "aurora" ? (
              <div className="animate-float-photo relative shrink-0 w-48 h-48 sm:w-56 sm:h-56 lg:w-[280px] lg:h-[280px] lg:ml-8 group">
                {/* Blurred background glow */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-500 via-purple-500 to-pink-500 blur-2xl opacity-40 transition duration-300 group-hover:opacity-60 dark:opacity-50"></div>
                {/* Glowing neon ring (via gradient border and padding) */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-400 via-violet-500 to-purple-600 p-[3px] shadow-[0_8px_32px_-4px_rgba(139,92,246,0.3)] transition duration-300 group-hover:shadow-[0_8px_40px_-4px_rgba(139,92,246,0.5)]">
                  <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-slate-900">
                    <img
                      src={profile}
                      alt="Priyanshi Kothari"
                      className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.04]"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="relative shrink-0 w-48 h-48 sm:w-56 sm:h-56 lg:w-[280px] lg:h-[280px] lg:ml-8 rounded-full border border-slate-200 bg-white p-[3px] shadow-lg dark:border-white/[0.08] dark:bg-black/50">
                <div className="h-full w-full rounded-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <img
                    src={profile}
                    alt="Priyanshi Kothari"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            )}
          </div>
        </section>

        <Section
          theme={theme}
          id="about"
          eyebrow="About"
          title="Professional summary"
          subtitle="Cloud, DevOps, Linux, and system design—in focus."
        >
          <div
            className={`space-y-6 text-base leading-relaxed ${
              theme === "aurora"
                ? "text-slate-400"
                : "text-slate-700 dark:text-neutral-400"
            }`}
          >
            <p>
              B.Tech student in Artificial Intelligence and Data Science at Arya College of
              Engineering & IT, Jaipur, with a clear focus on{" "}
              <strong
                className={`font-semibold ${
                  theme === "aurora" ? "text-slate-100" : "text-slate-900 dark:text-neutral-100"
                }`}
              >
                cloud platforms, DevOps, and systems that stay reliable at scale
              </strong>
              .
            </p>
            <p>
              RHCSA-certified with hands-on Linux (RHEL 9), system administration, and shell
              workflows. I am building practical experience in{" "}
              <strong
                className={`font-semibold ${
                  theme === "aurora" ? "text-slate-100" : "text-slate-900 dark:text-neutral-100"
                }`}
              >
                AWS, containers, and CI/CD
              </strong>{" "}
              and care about how modern apps are deployed, automated, and observed in production.
            </p>
            <p
              className={
                theme === "aurora" ? "text-slate-500" : "text-slate-600 dark:text-neutral-500"
              }
            >
              Goal: ship maintainable systems—strong fundamentals, clear documentation, and
              alignment between code and infrastructure.
            </p>
          </div>
        </Section>

        <Section
          theme={theme}
          id="skills"
          eyebrow="Skills"
          title="Technical skills"
          subtitle="Stack and tooling I use and continue to deepen."
        >
          <div className="grid gap-4 sm:grid-cols-2">
            {skills.map((skill) => (
              <article
                key={skill.title}
                className={
                  theme === "aurora"
                    ? "aurora-surface rounded-lg border p-6"
                    : "rounded-lg border border-slate-200/80 bg-white/60 p-6 dark:border-white/[0.06] dark:bg-transparent"
                }
              >
                <div className="mb-3 flex items-center justify-between gap-2">
                  <h3
                    className={`font-poppins text-base font-semibold ${
                      theme === "aurora" ? "text-slate-100" : "text-slate-900 dark:text-neutral-100"
                    }`}
                  >
                    {skill.title}
                  </h3>
                  <span
                    className={`text-xs font-semibold tabular-nums ${
                      theme === "aurora" ? "text-cyan-400/85" : "text-indigo-600 dark:text-neutral-500"
                    }`}
                  >
                    {skill.level}%
                  </span>
                </div>
                <p
                  className={`text-sm ${
                    theme === "aurora" ? "text-slate-400" : "text-slate-600 dark:text-neutral-500"
                  }`}
                >
                  {skill.items}
                </p>
                <div className="mt-4 h-0.5 overflow-hidden rounded-full bg-slate-200/80 dark:bg-white/[0.06]">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${
                      theme === "aurora"
                        ? "skill-bar-fill"
                        : "bg-gradient-to-r from-indigo-500 to-sky-400 dark:from-neutral-500 dark:to-neutral-400"
                    }`}
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </article>
            ))}
          </div>
        </Section>

        {/* Featured — PortfoGen */}
        <section
          id="featured"
          className={`relative mx-auto w-full max-w-6xl scroll-mt-24 px-4 py-14 sm:px-6 lg:px-8 dark:py-24 ${
            theme === "aurora" ? "aurora-reveal-section" : ""
          }`}
        >
          <div
            className={`featured-glow relative overflow-hidden rounded-2xl border p-6 shadow-lg sm:p-12 lg:p-14 ${
              theme === "aurora"
                ? "border-cyan-500/15 shadow-[0_0_60px_-20px_rgba(99,102,241,0.2)]"
                : "border-indigo-200/60 bg-gradient-to-br from-white via-indigo-50/50 to-violet-50/40 shadow-indigo-100/40 dark:rounded-xl dark:border-white/[0.06] dark:bg-black dark:bg-none dark:shadow-none"
            }`}
          >
            <div
              className={`absolute right-6 top-6 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] ${
                theme === "aurora"
                  ? "border-cyan-400/25 bg-cyan-500/10 text-cyan-200/90"
                  : "border-indigo-200/60 bg-indigo-600/10 text-indigo-700 dark:border-white/[0.08] dark:bg-transparent dark:text-neutral-500"
              }`}
            >
              Featured project
            </div>
            <div className="mt-10 flex flex-col gap-10 lg:flex-row lg:items-start">
              <div
                className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border text-white shadow-lg ${
                  theme === "aurora"
                    ? "border-cyan-400/30 bg-gradient-to-br from-cyan-500/25 to-violet-600/35 shadow-cyan-500/15"
                    : "border-indigo-200/80 bg-indigo-600 shadow-indigo-500/30 dark:border-white/[0.1] dark:bg-transparent dark:shadow-none"
                }`}
              >
                <Wand2
                  size={28}
                  aria-hidden
                  className={theme === "aurora" ? "text-cyan-100" : "dark:text-neutral-200"}
                />
              </div>
              <div className="min-w-0 flex-1">
                <p
                  className={`text-sm font-medium ${
                    theme === "aurora" ? "text-violet-300/90" : "text-indigo-600 dark:text-neutral-500"
                  }`}
                >
                  {featuredProject.badge}
                </p>
                <h2
                  className={`font-poppins mt-2 text-3xl font-bold tracking-tight sm:text-4xl ${
                    theme === "aurora" ? "text-slate-100" : "text-slate-900 dark:text-neutral-100"
                  }`}
                >
                  {featuredProject.name}
                </h2>
                <p
                  className={`mt-6 max-w-2xl text-base leading-relaxed ${
                    theme === "aurora" ? "text-slate-400" : "text-slate-700 dark:text-neutral-400"
                  }`}
                >
                  {featuredProject.description}
                </p>
                <TechStack theme={theme} items={featuredProject.stack} />
                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href={featuredProject.github}
                    target="_blank"
                    rel="noreferrer"
                    className={`inline-flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-semibold text-white transition duration-300 ${
                      theme === "aurora"
                        ? "border-transparent bg-gradient-to-r from-sky-600 to-violet-600 shadow-[0_0_20px_-4px_rgba(34,211,238,0.35)] hover:scale-[1.02] hover:shadow-[0_0_28px_-4px_rgba(139,92,246,0.35)]"
                        : "border-slate-900 bg-slate-900 hover:bg-indigo-700 dark:border-white dark:bg-transparent dark:hover:bg-white/[0.06]"
                    }`}
                  >
                    <Code2 size={16} /> GitHub
                  </a>
                  <a
                    href={featuredProject.live}
                    className={`inline-flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-semibold transition duration-300 ${
                      theme === "aurora"
                        ? "border-cyan-400/25 bg-white/[0.06] text-slate-100 backdrop-blur-md hover:border-violet-400/35 hover:bg-white/[0.1]"
                        : "border-slate-200 bg-white text-slate-800 hover:bg-slate-50 dark:border-white/[0.1] dark:bg-transparent dark:text-neutral-200 dark:hover:bg-white/[0.04]"
                    }`}
                  >
                    <ExternalLink size={16} /> Live demo
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Section
          theme={theme}
          id="projects"
          eyebrow="Projects"
          title="Selected work"
          subtitle="Real deployments, full-stack apps, and civic-tech style builds."
        >
          <div className="grid gap-5 sm:grid-cols-2">
            {projects.map((project) => (
              <article
                key={project.name}
                className={
                  theme === "aurora"
                    ? "aurora-surface group flex flex-col rounded-lg border p-6 transition duration-300"
                    : "group flex flex-col rounded-lg border border-slate-200/80 bg-white/60 p-6 transition hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md dark:border-white/[0.06] dark:bg-transparent dark:hover:border-white/[0.1] dark:hover:shadow-none"
                }
              >
                <h3
                  className={`font-poppins text-lg font-semibold ${
                    theme === "aurora" ? "text-slate-100" : "text-slate-900 dark:text-neutral-100"
                  }`}
                >
                  {project.name}
                </h3>
                <p
                  className={`mt-3 flex-1 text-sm leading-relaxed ${
                    theme === "aurora" ? "text-slate-400" : "text-slate-600 dark:text-neutral-500"
                  }`}
                >
                  {project.description}
                </p>
                <TechStack theme={theme} items={project.stack} />
                <div className="mt-5 flex flex-wrap gap-2">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className={`inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-xs font-semibold text-white transition duration-300 ${
                      theme === "aurora"
                        ? "border-transparent bg-gradient-to-r from-sky-600 to-violet-600 hover:scale-[1.02] hover:shadow-[0_0_16px_-4px_rgba(34,211,238,0.35)]"
                        : "border-slate-900 bg-slate-900 group-hover:bg-indigo-700 dark:border-white dark:bg-transparent dark:group-hover:bg-white/[0.06]"
                    }`}
                  >
                    <Code2 size={13} /> GitHub
                  </a>
                  <a
                    href={project.live}
                    className={`inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-xs font-semibold transition duration-300 ${
                      theme === "aurora"
                        ? "border-cyan-400/25 bg-white/[0.06] text-slate-200 backdrop-blur-sm hover:border-violet-400/30"
                        : "border-slate-200 bg-white text-slate-700 dark:border-white/[0.1] dark:bg-transparent dark:text-neutral-300"
                    }`}
                  >
                    <ExternalLink size={13} /> Demo
                  </a>
                </div>
              </article>
            ))}
          </div>
        </Section>

        <Section
          theme={theme}
          id="experience"
          eyebrow="Experience"
          title="Internship"
          subtitle="Enterprise cloud platform exposure."
        >
          <div
            className={`flex gap-4 rounded-lg border p-5 sm:p-6 ${
              theme === "aurora"
                ? "aurora-surface border-cyan-500/10"
                : "border-slate-200/80 bg-white/60 dark:border-white/[0.06] dark:bg-transparent"
            }`}
          >
            <div className="hidden shrink-0 sm:block">
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-lg border ${
                  theme === "aurora"
                    ? "border-cyan-400/20 bg-cyan-500/10 text-cyan-300"
                    : "border-indigo-100 bg-indigo-100 text-indigo-700 dark:border-white/[0.08] dark:bg-transparent dark:text-neutral-400"
                }`}
              >
                <Building2 size={22} />
              </div>
            </div>
            <div>
              <h3
                className={`font-poppins text-lg font-semibold ${
                  theme === "aurora" ? "text-slate-100" : "text-slate-900 dark:text-neutral-100"
                }`}
              >
                {experience.role}
              </h3>
              <p
                className={`text-sm font-medium ${
                  theme === "aurora" ? "text-violet-300/85" : "text-indigo-600 dark:text-neutral-500"
                }`}
              >
                {experience.org} · {experience.period}
              </p>
              <ul
                className={`mt-4 list-inside list-disc space-y-2 text-sm leading-relaxed ${
                  theme === "aurora" ? "text-slate-400" : "text-slate-700 dark:text-neutral-400"
                }`}
              >
                {experience.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
          </div>
        </Section>

        <Section
          theme={theme}
          id="certifications"
          eyebrow="Certifications"
          title="Credentials"
          subtitle="Industry-recognized validation of core skills."
        >
          <div className="grid gap-4 sm:grid-cols-3">
            {certifications.map((c) => (
              <article
                key={c.name}
                className={
                  theme === "aurora"
                    ? "aurora-surface flex flex-col rounded-lg border p-6 text-center transition duration-300"
                    : "flex flex-col rounded-lg border border-slate-200/80 bg-white/60 p-6 text-center transition hover:-translate-y-0.5 dark:border-white/[0.06] dark:bg-transparent"
                }
              >
                <Award
                  className={`mx-auto mb-3 ${theme === "aurora" ? "text-cyan-400/80" : "text-indigo-600 dark:text-neutral-500"}`}
                  size={28}
                />
                <h3
                  className={`font-poppins font-semibold ${
                    theme === "aurora" ? "text-slate-100" : "text-slate-900 dark:text-neutral-100"
                  }`}
                >
                  {c.name}
                </h3>
                <p
                  className={`mt-2 text-xs ${
                    theme === "aurora" ? "text-slate-500" : "text-slate-600 dark:text-neutral-500"
                  }`}
                >
                  {c.detail}
                </p>
              </article>
            ))}
          </div>
        </Section>

        <Section
          theme={theme}
          id="education"
          eyebrow="Education"
          title="Academic background"
        >
          <div
            className={`flex gap-4 rounded-lg border p-5 sm:p-6 ${
              theme === "aurora"
                ? "aurora-surface border-violet-500/10"
                : "border-slate-200/80 bg-white/60 dark:border-white/[0.06] dark:bg-transparent"
            }`}
          >
            <div className="hidden shrink-0 sm:block">
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-lg border ${
                  theme === "aurora"
                    ? "border-violet-400/25 bg-violet-500/10 text-violet-200"
                    : "border-violet-100 bg-violet-100 text-violet-700 dark:border-white/[0.08] dark:bg-transparent dark:text-neutral-400"
                }`}
              >
                <GraduationCap size={24} />
              </div>
            </div>
            <div>
              <h3
                className={`font-poppins text-lg font-semibold ${
                  theme === "aurora" ? "text-slate-100" : "text-slate-900 dark:text-neutral-100"
                }`}
              >
                B.Tech — Artificial Intelligence & Data Science
              </h3>
              <p
                className={`text-sm ${
                  theme === "aurora" ? "text-slate-500" : "text-slate-600 dark:text-neutral-500"
                }`}
              >
                Arya College of Engineering & IT, Jaipur
              </p>
              <p
                className={`mt-3 text-sm font-semibold ${
                  theme === "aurora" ? "text-cyan-400/90" : "text-indigo-700 dark:text-neutral-400"
                }`}
              >
                CGPA: 8.82
              </p>
            </div>
          </div>
        </Section>

        <Section
          theme={theme}
          id="focus"
          eyebrow="Current focus"
          title="Learning priorities"
          subtitle="Kubernetes, CI/CD, DSA, and scalable systems."
        >
          <ul className="grid gap-3 sm:grid-cols-2">
            {currentFocus.map((line) => (
              <li
                key={line}
                className={
                  theme === "aurora"
                    ? "aurora-surface flex gap-3 rounded-lg border p-4 text-sm text-slate-400"
                    : "flex gap-3 rounded-lg border border-slate-200/80 bg-white/60 p-4 text-sm text-slate-700 dark:border-white/[0.06] dark:bg-transparent dark:text-neutral-400"
                }
              >
                <Target
                  className={`mt-0.5 shrink-0 ${theme === "aurora" ? "text-violet-400/80" : "text-indigo-600 dark:text-neutral-500"}`}
                  size={18}
                />
                {line}
              </li>
            ))}
          </ul>
        </Section>

        <Section
          theme={theme}
          id="contact"
          eyebrow="Contact"
          title="Get in touch"
          subtitle="Email or socials—responses for opportunities and collaborations."
        >
          <form className="grid gap-4 sm:grid-cols-2">
            <label className="sm:col-span-1">
              <span
                className={`mb-2 block text-sm font-medium ${
                  theme === "aurora" ? "text-slate-400" : "text-slate-700 dark:text-neutral-400"
                }`}
              >
                Name
              </span>
              <input
                type="text"
                placeholder="Your name"
                className={`w-full rounded-lg border px-4 py-3 text-sm outline-none transition duration-300 focus:ring-2 ${
                  theme === "aurora"
                    ? "border-cyan-400/20 bg-slate-950/50 text-slate-200 placeholder:text-slate-500 backdrop-blur-sm focus:border-violet-400/30 focus:ring-cyan-500/15"
                    : "border-slate-200 bg-white/80 ring-indigo-200 dark:border-white/[0.08] dark:bg-transparent dark:ring-white/20"
                }`}
              />
            </label>
            <label className="sm:col-span-1">
              <span
                className={`mb-2 block text-sm font-medium ${
                  theme === "aurora" ? "text-slate-400" : "text-slate-700 dark:text-neutral-400"
                }`}
              >
                Email
              </span>
              <input
                type="email"
                placeholder={CONTACT_EMAIL}
                className={`w-full rounded-lg border px-4 py-3 text-sm outline-none transition duration-300 focus:ring-2 ${
                  theme === "aurora"
                    ? "border-cyan-400/20 bg-slate-950/50 text-slate-200 placeholder:text-slate-500 backdrop-blur-sm focus:border-violet-400/30 focus:ring-cyan-500/15"
                    : "border-slate-200 bg-white/80 ring-indigo-200 dark:border-white/[0.08] dark:bg-transparent dark:ring-white/20"
                }`}
              />
            </label>
            <label className="sm:col-span-2">
              <span
                className={`mb-2 block text-sm font-medium ${
                  theme === "aurora" ? "text-slate-400" : "text-slate-700 dark:text-neutral-400"
                }`}
              >
                Message
              </span>
              <textarea
                rows={4}
                placeholder="Brief message…"
                className={`w-full rounded-lg border px-4 py-3 text-sm outline-none transition duration-300 focus:ring-2 ${
                  theme === "aurora"
                    ? "border-cyan-400/20 bg-slate-950/50 text-slate-200 placeholder:text-slate-500 backdrop-blur-sm focus:border-violet-400/30 focus:ring-cyan-500/15"
                    : "border-slate-200 bg-white/80 ring-indigo-200 dark:border-white/[0.08] dark:bg-transparent dark:ring-white/20"
                }`}
              />
            </label>
            <button
              type="button"
              className={`inline-flex w-fit items-center gap-2 rounded-lg border px-5 py-3 text-sm font-semibold text-white transition duration-300 ${
                theme === "aurora"
                  ? "border-transparent bg-gradient-to-r from-sky-600 via-violet-600 to-purple-600 shadow-[0_0_24px_-4px_rgba(34,211,238,0.35)] hover:scale-[1.03] hover:shadow-[0_0_32px_-4px_rgba(139,92,246,0.35)] active:scale-[1.01]"
                  : "border-indigo-600 bg-indigo-600 hover:bg-indigo-700 dark:border-white dark:bg-transparent dark:hover:bg-white/[0.06]"
              }`}
            >
              <Send size={16} /> Send message
            </button>
          </form>

          <div
            className={`mt-10 flex flex-wrap gap-3 border-t pt-10 ${
              theme === "aurora" ? "border-cyan-500/10" : "border-slate-200/80 dark:border-white/[0.06]"
            }`}
          >
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className={`inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition duration-300 ${
                theme === "aurora"
                  ? "border-cyan-400/20 bg-white/[0.05] text-slate-200 backdrop-blur-md hover:border-violet-400/30 hover:shadow-[0_0_20px_-8px_rgba(34,211,238,0.15)]"
                  : "border-transparent bg-white text-slate-800 shadow-sm dark:border-white/[0.08] dark:bg-transparent dark:text-neutral-300 dark:shadow-none"
              }`}
            >
              <Mail size={16} /> {CONTACT_EMAIL}
            </a>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noreferrer"
              className={`inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition duration-300 ${
                theme === "aurora"
                  ? "border-cyan-400/20 bg-white/[0.05] text-slate-200 backdrop-blur-md hover:border-violet-400/30 hover:shadow-[0_0_20px_-8px_rgba(34,211,238,0.15)]"
                  : "border-transparent bg-white text-slate-800 shadow-sm dark:border-white/[0.08] dark:bg-transparent dark:text-neutral-300 dark:shadow-none"
              }`}
            >
              <Link size={16} /> LinkedIn
            </a>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              className={`inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition duration-300 ${
                theme === "aurora"
                  ? "border-cyan-400/20 bg-white/[0.05] text-slate-200 backdrop-blur-md hover:border-violet-400/30 hover:shadow-[0_0_20px_-8px_rgba(34,211,238,0.15)]"
                  : "border-transparent bg-white text-slate-800 shadow-sm dark:border-white/[0.08] dark:bg-transparent dark:text-neutral-300 dark:shadow-none"
              }`}
            >
              <Code2 size={16} /> GitHub
            </a>
            <a
              href={TWITTER_URL}
              target="_blank"
              rel="noreferrer"
              className={`inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition duration-300 ${
                theme === "aurora"
                  ? "border-cyan-400/20 bg-white/[0.05] text-slate-200 backdrop-blur-md hover:border-violet-400/30 hover:shadow-[0_0_20px_-8px_rgba(34,211,238,0.15)]"
                  : "border-transparent bg-white text-slate-800 shadow-sm dark:border-white/[0.08] dark:bg-transparent dark:text-neutral-300 dark:shadow-none"
              }`}
            >
              <XIcon size={16} aria-hidden /> X (Twitter)
            </a>
          </div>
        </Section>
      </main>

      <footer
        className={`mx-auto max-w-6xl px-4 pb-12 pt-6 text-center text-xs sm:px-6 lg:px-8 ${
          theme === "aurora" ? "text-slate-500" : "text-slate-500 dark:text-neutral-600"
        }`}
      >
        <p className="inline-flex items-center justify-center gap-1">
          <Cloud size={14} aria-hidden />© {new Date().getFullYear()} Priyanshi Kothari · Portfolio
        </p>
      </footer>
    </div>
  );
}
