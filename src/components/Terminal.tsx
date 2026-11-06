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
      className="term relative mt-8 cursor-pointer md:mt-0"
      data-typing={typing}
      style={{ "--end": `${timeline.total}ms` } as CSSProperties}
      onClick={() => setTyping("off")}
      title="Click to skip"
    >
      <CodingCat />
      <div className="overflow-hidden rounded-xl border border-line bg-[var(--term-bg)] shadow-lg">
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
              {line.prompt ? <span className="text-[var(--term-accent)]">$ </span> : null}
              <span className={line.prompt ? "" : "text-white/70"}>{line.text}</span>
            </div>
          ))}
          <span className="cursor inline-block h-4 w-2 translate-y-0.5 bg-[var(--term-accent)]" />
        </div>
      </div>
    </div>
  );
}

function CodingCat() {
  return (
    <svg
      viewBox="0 0 64 40"
      className="pointer-events-none absolute right-8 bottom-[calc(100%-3px)] z-10 w-16"
      aria-hidden="true"
    >
      <path d="M15 26 L18 5 L30 16 Z" fill="var(--cat)" />
      <path d="M49 26 L46 5 L34 16 Z" fill="var(--cat)" />
      <path d="M19 19 L20 10 L26 16 Z" fill="var(--cat-inner)" />
      <path d="M45 19 L44 10 L38 16 Z" fill="var(--cat-inner)" />
      <ellipse cx="32" cy="30" rx="18" ry="15" fill="var(--cat)" />
      <ellipse className="cat-eye" cx="25" cy="27" rx="2.4" ry="3" fill="var(--accent)" />
      <ellipse className="cat-eye" cx="39" cy="27" rx="2.4" ry="3" fill="var(--accent)" />
      <path d="M30.5 32 L33.5 32 L32 33.6 Z" fill="var(--cat-inner)" />
      <g stroke="var(--cat-inner)" strokeWidth="0.8" strokeLinecap="round">
        <path d="M22 33 L11 31.5" />
        <path d="M22 35 L11 36" />
        <path d="M42 33 L53 31.5" />
        <path d="M42 35 L53 36" />
      </g>
      <ellipse className="paw" cx="22" cy="38.5" rx="5" ry="3" fill="var(--cat)" />
      <ellipse className="paw paw-r" cx="42" cy="38.5" rx="5" ry="3" fill="var(--cat)" />
    </svg>
  );
}
