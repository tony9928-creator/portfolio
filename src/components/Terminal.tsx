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
      viewBox="0 0 80 52"
      className="pointer-events-none absolute right-8 bottom-[calc(100%-10px)] z-10 w-20"
      aria-hidden="true"
    >
      <g className="cat-head">
        <path d="M22 24 L25 4 L36 16 Z" fill="var(--cat)" />
        <path d="M25.5 18 L27 9 L33 15 Z" fill="var(--cat-inner)" />
        <g className="cat-ear">
          <path d="M58 24 L55 4 L44 16 Z" fill="var(--cat)" />
          <path d="M54.5 18 L53 9 L47 15 Z" fill="var(--cat-inner)" />
        </g>
        <ellipse cx="40" cy="31" rx="19" ry="16" fill="var(--cat)" />
        <ellipse className="cat-eye" cx="33" cy="29" rx="2.6" ry="3.2" fill="var(--accent)" />
        <ellipse className="cat-eye" cx="47" cy="29" rx="2.6" ry="3.2" fill="var(--accent)" />
        <path d="M38.5 34 L41.5 34 L40 35.8 Z" fill="var(--cat-inner)" />
        <g stroke="var(--cat-inner)" strokeWidth="0.9" strokeLinecap="round" fill="none">
          <path d="M40 35.8 Q38.5 37.6 36.8 36.6" />
          <path d="M40 35.8 Q41.5 37.6 43.2 36.6" />
          <path d="M29 35 L17 33" />
          <path d="M29 37 L17 38.5" />
          <path d="M51 35 L63 33" />
          <path d="M51 37 L63 38.5" />
        </g>
      </g>
      <g className="paw">
        <ellipse cx="28" cy="46.5" rx="6.5" ry="4.5" fill="var(--cat)" stroke="var(--term-bg)" strokeWidth="1.2" />
        <path d="M25.5 43.5 V45.5 M28 43 V45 M30.5 43.5 V45.5" stroke="var(--cat-inner)" strokeWidth="0.9" strokeLinecap="round" />
      </g>
      <g className="paw paw-r">
        <ellipse cx="52" cy="46.5" rx="6.5" ry="4.5" fill="var(--cat)" stroke="var(--term-bg)" strokeWidth="1.2" />
        <path d="M49.5 43.5 V45.5 M52 43 V45 M54.5 43.5 V45.5" stroke="var(--cat-inner)" strokeWidth="0.9" strokeLinecap="round" />
      </g>
    </svg>
  );
}
