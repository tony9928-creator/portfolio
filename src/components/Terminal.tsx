"use client";

import { useEffect, useState, type CSSProperties } from "react";

const LINES = [
  { text: "whoami", prompt: true },
  { text: "tomas-acosta" },
  { text: "cat role.txt", prompt: true },
  { text: "Full Stack Developer" },
  { text: "stack --list", prompt: true },
  { text: "node · express · typescript" },
  { text: "mongodb · react · next.js" },
];

const MS_PER_CHAR = 18;
const PAUSE_MS = 150;

const timeline = (() => {
  let at = 0;
  const lines = LINES.map((line) => {
    const n = line.text.length + (line.prompt ? 2 : 0);
    const item = { ...line, n, d: n * MS_PER_CHAR, delay: at };
    at += item.d + PAUSE_MS;
    return item;
  });
  return { lines, total: at };
})();

const KEY = "terminal-seen";

export function Terminal() {
  const [typing, setTyping] = useState<"on" | "off">("on");

  useEffect(() => {
    try {
      sessionStorage.setItem(KEY, "1");
    } catch {}
    const timer = setTimeout(() => setTyping("off"), timeline.total + 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="term cursor-pointer overflow-hidden rounded-xl border border-line bg-[var(--term-bg)] shadow-lg"
      data-typing={typing}
      style={{ "--end": `${timeline.total}ms` } as CSSProperties}
      onClick={() => setTyping("off")}
      title="Click to skip"
    >
      <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-2.5">
        <span className="size-2.5 rounded-full bg-white/20" />
        <span className="size-2.5 rounded-full bg-white/20" />
        <span className="size-2.5 rounded-full bg-white/20" />
        <span className="ml-3 font-mono text-xs text-white/40">~/portfolio</span>
      </div>
      <div
        className="min-h-[11.5rem] px-4 py-4 font-mono text-[0.8rem] leading-6 text-[var(--term-fg)] sm:text-sm"
        aria-label="Terminal intro: Tomás Acosta, Full Stack Developer. Node, Express, TypeScript, MongoDB, React, Next.js."
      >
        {timeline.lines.map((line, i) => (
          <div
            key={i}
            className="tl"
            style={
              {
                "--n": line.n,
                "--d": `${line.d}ms`,
                "--delay": `${line.delay}ms`,
              } as CSSProperties
            }
          >
            {line.prompt ? (
              <span className="text-[var(--term-accent)]">$ </span>
            ) : null}
            <span className={line.prompt ? "" : "text-white/70"}>{line.text}</span>
          </div>
        ))}
        <span className="cursor inline-block h-4 w-2 translate-y-0.5 bg-[var(--term-accent)]" />
      </div>
    </div>
  );
}
