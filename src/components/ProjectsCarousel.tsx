"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ProjectCard } from "@/components/ProjectCard";
import type { Project } from "@/data/site";

const GAP = 24; // gap-6

export function ProjectsCarousel({ projects }: { projects: Project[] }) {
  const scroller = useRef<HTMLDivElement>(null);
  const settle = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const [active, setActive] = useState(0);
  const n = projects.length;
  // Three copies: we always rest on the middle one and silently jump back to it.
  const items = [...projects, ...projects, ...projects];

  const step = () => {
    const first = scroller.current?.firstElementChild as HTMLElement | null;
    return first ? first.offsetWidth + GAP : 0;
  };

  const jump = useCallback((left: number) => {
    const el = scroller.current;
    if (!el) return;
    el.style.scrollSnapType = "none";
    el.scrollLeft = left;
    // restore snapping after the browser applied the new position
    requestAnimationFrame(() => {
      el.style.scrollSnapType = "";
    });
  }, []);

  const recenter = useCallback(() => {
    const el = scroller.current;
    const s = step();
    if (!el || !s || n === 0) return;
    const set = s * n;
    if (el.scrollLeft < set * 0.5) jump(el.scrollLeft + set);
    else if (el.scrollLeft >= set * 1.5) jump(el.scrollLeft - set);
  }, [jump, n]);

  const onScroll = useCallback(() => {
    const el = scroller.current;
    const s = step();
    if (!el || !s || n === 0) return;
    const idx = Math.round(el.scrollLeft / s);
    setActive(((idx % n) + n) % n);
    clearTimeout(settle.current);
    settle.current = setTimeout(recenter, 140);
  }, [n, recenter]);

  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    const start = () => {
      const s = step();
      if (s) jump(s * n);
    };
    start();
    const ro = new ResizeObserver(start);
    ro.observe(el);
    return () => {
      ro.disconnect();
      clearTimeout(settle.current);
    };
  }, [jump, n]);

  const go = (dir: 1 | -1) => {
    const el = scroller.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * step(), behavior: reduce ? "auto" : "smooth" });
  };

  const arrow =
    "absolute top-[28%] z-10 grid size-10 -translate-y-1/2 place-items-center rounded-full border border-line bg-card/90 text-2xl leading-none shadow-lg backdrop-blur transition hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-accent sm:top-1/2 sm:size-12";

  return (
    <div className="relative">
      <button type="button" aria-label="Previous project" onClick={() => go(-1)} className={`${arrow} left-1 sm:-left-5`}>
        <span aria-hidden="true">‹</span>
      </button>
      <button type="button" aria-label="Next project" onClick={() => go(1)} className={`${arrow} right-1 sm:-right-5`}>
        <span aria-hidden="true">›</span>
      </button>
      <div
        ref={scroller}
        onScroll={onScroll}
        role="region"
        aria-label="Projects"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") go(1);
          else if (e.key === "ArrowLeft") go(-1);
          else return;
          e.preventDefault();
        }}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-1 [scrollbar-width:none] focus-visible:outline-2 focus-visible:outline-accent [&::-webkit-scrollbar]:hidden"
      >
        {items.map((p, i) => {
          const clone = i < n || i >= n * 2;
          return (
            <div
              key={`${p.title}-${i}`}
              inert={clone}
              aria-hidden={clone || undefined}
              className="flex w-[85%] shrink-0 snap-start sm:w-[calc(50%-0.75rem)]"
            >
              <ProjectCard project={p} />
            </div>
          );
        })}
      </div>
      <div className="mt-4 flex justify-center gap-2" aria-hidden="true">
        {projects.map((p, i) => (
          <span
            key={p.title}
            className={`h-1.5 rounded-full transition-all ${i === active ? "w-6 bg-accent" : "w-1.5 bg-line"}`}
          />
        ))}
      </div>
    </div>
  );
}
