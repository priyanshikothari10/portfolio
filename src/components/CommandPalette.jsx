import { useEffect, useMemo, useRef, useState } from "react";
import { Command, CornerDownLeft, Search } from "lucide-react";

const COMMANDS = [
  { label: "Go to top", target: "hero" }, { label: "View projects", target: "projects" },
  { label: "Open terminal", target: "terminal" }, { label: "Watch a deploy", target: "deploy" },
  { label: "View certifications", target: "certifications" }, { label: "Get in touch", target: "contact" },
];

export default function CommandPalette({ open, onClose }) {
  const [query, setQuery] = useState(""); const [selected, setSelected] = useState(0); const inputRef = useRef(null);
  const results = useMemo(() => COMMANDS.filter((item) => item.label.toLowerCase().includes(query.toLowerCase())), [query]);
  useEffect(() => { if (open) { setQuery(""); setSelected(0); requestAnimationFrame(() => inputRef.current?.focus()); } }, [open]);
  function execute(item) { document.getElementById(item.target)?.scrollIntoView({ behavior: "smooth", block: "start" }); onClose(); }
  useEffect(() => { if (!open) return; const keydown = (event) => { if (event.key === "Escape") onClose(); if (event.key === "ArrowDown") { event.preventDefault(); setSelected((n) => Math.min(n + 1, results.length - 1)); } if (event.key === "ArrowUp") { event.preventDefault(); setSelected((n) => Math.max(n - 1, 0)); } if (event.key === "Enter" && results[selected]) { event.preventDefault(); execute(results[selected]); } }; window.addEventListener("keydown", keydown); return () => window.removeEventListener("keydown", keydown); }, [open, results, selected]);
  if (!open) return null;
  return <div role="dialog" aria-modal="true" aria-label="Command palette" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }} className="fixed inset-0 z-50 flex items-start justify-center bg-slate-950/70 px-4 pt-[18vh] backdrop-blur-sm"><div className="w-full max-w-xl overflow-hidden rounded-2xl border border-cyan-400/20 bg-slate-950/90 shadow-[0_0_60px_-12px_rgba(34,211,238,0.25)]"><div className="flex items-center gap-3 border-b border-white/[0.08] px-4"><Search size={18} className="text-cyan-300" /><input ref={inputRef} value={query} onChange={(event) => { setQuery(event.target.value); setSelected(0); }} placeholder="Search anything…" className="w-full bg-transparent py-4 text-sm text-slate-100 outline-none placeholder:text-slate-500" /><kbd className="rounded border border-white/[0.12] px-1.5 py-0.5 text-[10px] text-slate-400">ESC</kbd></div><div className="p-2">{results.length ? results.map((item, index) => <button key={item.target} type="button" onMouseEnter={() => setSelected(index)} onClick={() => execute(item)} className={`flex w-full items-center justify-between rounded-lg px-3 py-3 text-left text-sm transition ${index === selected ? "bg-cyan-500/10 text-cyan-100" : "text-slate-400 hover:bg-white/[0.05]"}`}><span>{item.label}</span>{index === selected ? <CornerDownLeft size={15} /> : null}</button>) : <p className="px-3 py-6 text-sm text-slate-500">No matching commands.</p>}</div><p className="border-t border-white/[0.08] px-4 py-2.5 text-xs text-slate-500"><Command size={12} className="mr-1 inline" /> Use ↑ ↓ to navigate and Enter to select</p></div></div>;
}
