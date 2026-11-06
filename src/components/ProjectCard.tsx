import Image from "next/image";
import type { Project } from "@/data/site";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-line bg-card">
      {project.image ? (
        <Image
          src={project.image}
          alt={`${project.title} screenshot`}
          width={1200}
          height={675}
          className="aspect-video w-full object-cover"
        />
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
          <a
            href={project.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-accent px-4 py-2 text-accent-fg transition-opacity hover:opacity-90"
          >
            View code
          </a>
          {project.demo ? (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-line px-4 py-2 transition-colors hover:border-accent"
            >
              Live demo
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
