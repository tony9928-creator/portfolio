import Image from "next/image";
import type { Project } from "@/data/site";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="flex w-full flex-col overflow-hidden rounded-2xl border border-line bg-card">
      {project.images?.length ? (
        <div className={`relative aspect-video ${project.images.length > 1 ? "shots" : ""}`}>
          {project.images.slice(0, 2).map((img, i) => (
            <Image
              key={img.src}
              src={img.src}
              alt={img.alt}
              width={1008}
              height={567}
              sizes="(min-width: 768px) 480px, 100vw"
              className={`shot-${i + 1} absolute inset-0 size-full object-cover object-top`}
            />
          ))}
        </div>
      ) : project.routes?.length ? (
        <div className="flex aspect-video flex-col justify-center gap-2 bg-[var(--term-bg)] px-6 font-mono text-xs sm:text-sm" aria-hidden="true">
          {project.routes.map((r) => {
            const [method, path] = r.split(/\s+/);
            return (
              <p key={r} className="whitespace-pre text-[var(--term-fg)]">
                <span className="text-[var(--term-accent)]">{method.padEnd(5)}</span>
                {path}
              </p>
            );
          })}
        </div>
      ) : (
        <div
          className="grid aspect-video place-items-center bg-gradient-to-br from-accent/25 via-accent/5 to-transparent"
          aria-hidden="true"
        >
          <span className="font-mono text-lg text-accent">{`<${project.title.replace(/\s/g, "")} />`}</span>
        </div>
      )}
      <div className="flex flex-1 flex-col gap-4 p-6">
        <div>
          <p className="font-mono text-xs text-muted">{project.kind}</p>
          <h3 className="mt-1 text-xl font-semibold">{project.title}</h3>
          <p className="mt-2 text-muted">{project.description}</p>
        </div>
        <ul className="space-y-1.5 text-sm text-muted">
          {project.highlights.map((h) => (
            <li key={h} className="flex gap-2">
              <span className="text-accent" aria-hidden="true">›</span>
              {h}
            </li>
          ))}
        </ul>
        <ul className="flex flex-wrap gap-2">
          {project.stack.map((s) => (
            <li key={s} className="rounded-md border border-line px-2 py-1 font-mono text-xs text-muted">
              {s}
            </li>
          ))}
        </ul>
        <div className="mt-auto flex gap-3 pt-2 text-sm font-medium">
          {project.repo ? (
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-accent px-4 py-2 text-accent-fg transition-opacity hover:opacity-90"
            >
              View code
            </a>
          ) : null}
          {project.demo ? (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className={
                project.repo
                  ? "rounded-lg border border-line px-4 py-2 transition-colors hover:border-accent"
                  : "rounded-lg bg-accent px-4 py-2 text-accent-fg transition-opacity hover:opacity-90"
              }
            >
              Live demo
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
