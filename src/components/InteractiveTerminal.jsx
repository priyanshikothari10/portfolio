import { useEffect, useRef, useState } from "react";

const COMMANDS = {
  whoami: "Priyanshi Kothari\nRHCSA-certified B.Tech student and aspiring Cloud & DevOps Engineer.",
  skills: "AWS · Docker · Kubernetes · Linux · Ansible\nJenkins · GitHub Actions · CI/CD · Shell",
  projects: "DevOps-enabled portfolio deployment\nLAMP stack on AWS · Docker voting app · WordPress on Kubernetes",
  certs: "RHCSA · Oracle Fusion Cloud · MongoDB GenAI\nDocker for the Absolute Beginner (KodeKloud)",
  help: "Available commands: whoami, skills, projects, certs, clear, help",
};

export default function InteractiveTerminal({ theme }) {
  const [entries, setEntries] = useState([]);
  const [input, setInput] = useState("");
  const outputRef = useRef(null);
  const didRunDemo = useRef(false);
  const aurora = theme === "aurora";

  useEffect(() => {
    if (didRunDemo.current) return;
    didRunDemo.current = true;
    runCommand("whoami");
  }, []);

  useEffect(() => {
    outputRef.current?.scrollTo({ top: outputRef.current.scrollHeight, behavior: "smooth" });
  }, [entries]);

  function runCommand(rawCommand) {
    const command = rawCommand.trim().toLowerCase();
    if (!command) return;
    if (command === "clear") {
      setEntries([]);
      return;
    }
    const response = COMMANDS[command] || `command not found: ${command} (try 'help')`;
    setEntries((current) => [...current, { command, response }]);
  }

  function submit(event) {
    event.preventDefault();
    runCommand(input);
    setInput("");
  }

  return (
    <section id="terminal" className={`relative mx-auto w-full max-w-6xl scroll-mt-24 px-4 py-14 sm:px-6 lg:px-8 dark:py-24 ${aurora ? "aurora-reveal-section" : ""}`}>
      <div className="glass card-hover rounded-2xl border border-white/50 p-6 shadow-sm shadow-indigo-100/30 dark:rounded-xl dark:border-white/[0.06] dark:bg-black/25 dark:shadow-none sm:p-12 lg:p-14">
        <p className={`mb-2 text-xs font-semibold uppercase tracking-[0.2em] ${aurora ? "text-cyan-400/80" : "text-indigo-600 dark:text-neutral-500"}`}>Interactive console</p>
        <h2 className="font-poppins text-2xl font-bold tracking-tight text-slate-900 dark:text-neutral-100 sm:text-3xl">Explore my work from the terminal</h2>
        <p className={`mt-2 max-w-2xl text-sm ${aurora ? "text-slate-400" : "text-slate-600 dark:text-neutral-500"}`}>Try a command or use a quick shortcut below.</p>

        <div className={`mt-10 overflow-hidden rounded-xl border ${aurora ? "border-cyan-400/20 bg-slate-950/75 shadow-[0_0_34px_-18px_rgba(34,211,238,0.3)]" : "border-slate-200 bg-slate-950"}`}>
          <div className="flex items-center gap-2 border-b border-white/[0.08] bg-white/[0.04] px-4 py-3">
            <span className="h-3 w-3 rounded-full bg-rose-400/90" /><span className="h-3 w-3 rounded-full bg-amber-300/90" /><span className="h-3 w-3 rounded-full bg-emerald-400/90" />
            <span className="ml-2 font-mono text-xs text-slate-500">priyanshi@portfolio: ~</span>
          </div>
          <div ref={outputRef} className="h-60 overflow-y-auto p-5 font-mono text-sm leading-6 sm:h-64">
            {entries.length === 0 ? <p className="text-slate-500">Loading profile…</p> : entries.map((entry, index) => (
              <div key={`${entry.command}-${index}`} className="mb-4">
                <p><span className="text-cyan-300">➜</span> <span className="text-violet-300">~</span> <span className="text-slate-200">{entry.command}</span></p>
                <p className="whitespace-pre-line text-slate-400">{entry.response}</p>
              </div>
            ))}
          </div>
          <form onSubmit={submit} className="flex items-center gap-2 border-t border-white/[0.08] px-5 py-3 font-mono text-sm">
            <span className="text-cyan-300">➜</span><span className="text-violet-300">~</span>
            <input value={input} onChange={(event) => setInput(event.target.value)} aria-label="Terminal command" autoComplete="off" spellCheck="false" placeholder="type 'help'" className="min-w-0 flex-1 bg-transparent text-slate-200 outline-none placeholder:text-slate-600" />
          </form>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {Object.keys(COMMANDS).map((command) => <button key={command} type="button" onClick={() => runCommand(command)} className={`rounded-md border px-3 py-1.5 font-mono text-xs transition ${aurora ? "border-cyan-400/20 bg-cyan-500/[0.05] text-cyan-100 hover:border-violet-400/35 hover:bg-violet-500/10" : "border-indigo-200 bg-white text-indigo-700 hover:bg-indigo-50 dark:border-white/[0.08] dark:bg-transparent dark:text-neutral-300"}`}>{command}</button>)}
        </div>
      </div>
    </section>
  );
}
