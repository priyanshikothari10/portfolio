import { useState } from "react";
import { Download, Terminal, X } from "lucide-react";

const RESUME_URL = "/Resume.pdf";

const yamlData = [
  { key: "apiVersion", value: "portfolio.devops/v1" },
  { key: "kind", value: "CloudEngineerResume" },
  { key: "metadata.name", value: "priyanshi-kothari" },
  { key: "spec.candidate.name", value: "Priyanshi Kothari" },
  { key: "spec.candidate.role", value: "Cloud & DevOps Engineer" },
  { key: "spec.candidate.education", value: "B.Tech — AI & Data Science (CGPA: 8.78)" },
  { key: "spec.certifications", value: "[RHCSA, Oracle Fusion Cloud, MongoDB GenAI, Docker]" },
  { key: "spec.internships", value: "[Kubernetes Administrator Intern @ GRRAS Solutions, Salesforce Arch Intern @ TechForce]" },
  { key: "spec.skills.cloud", value: "[AWS EC2, RDS, S3, IAM, Security Groups]" },
  { key: "spec.skills.orchestration", value: "[Kubernetes, Docker, Docker Compose, NGINX Ingress, HPA]" },
  { key: "spec.skills.automation", value: "[Ansible, Jenkins, GitHub Actions, Linux System Admin]" },
  { key: "spec.contact.email", value: "priyanshi.pro10@gmail.com" },
];

export default function ResumeYaml({ theme, onClose }) {
  const [downloaded, setDownloaded] = useState(false);

  return (
    <div className="rounded-xl border border-cyan-400/20 bg-slate-950/85 p-5 shadow-[0_0_40px_-10px_rgba(34,211,238,0.25)] backdrop-blur-xl text-left">
      <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
        <div className="flex items-center gap-2">
          <Terminal size={16} className="text-cyan-400" />
          <span className="font-mono text-xs font-semibold text-slate-200">resume.yaml — Declarative Configuration</span>
        </div>
        <div className="flex items-center gap-2">
          <a
            href={RESUME_URL}
            download="Priyanshi_Kothari_Resume.pdf"
            onClick={() => setDownloaded(true)}
            className="inline-flex items-center gap-1.5 rounded border border-cyan-400/30 bg-cyan-500/10 px-2.5 py-1 font-mono text-[11px] font-semibold text-cyan-200 transition hover:bg-cyan-500/20"
          >
            <Download size={13} /> kubectl apply -f resume.yaml
          </a>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="rounded p-1 text-slate-400 hover:text-slate-100"
              aria-label="Close YAML view"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      <pre className="mt-4 overflow-x-auto p-3 font-mono text-xs leading-6 text-slate-300">
        {yamlData.map((item) => (
          <div key={item.key}>
            <span className="text-cyan-300">{item.key}:</span>{" "}
            <span className="text-violet-300">{item.value}</span>
          </div>
        ))}
      </pre>

      {downloaded ? (
        <div className="mt-3 rounded border border-emerald-400/20 bg-emerald-500/10 p-2 font-mono text-[11px] text-emerald-300">
          $ kubectl apply -f resume.yaml → Downloaded Priyanshi_Kothari_Resume.pdf ✓
        </div>
      ) : null}
    </div>
  );
}
