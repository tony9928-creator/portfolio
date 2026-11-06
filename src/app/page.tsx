import Image from "next/image";
import { ProjectCard } from "@/components/ProjectCard";
import { Terminal } from "@/components/Terminal";
import { ThemeToggle } from "@/components/ThemeToggle";
import { projects, site, stack } from "@/data/site";

const nav = [
  { href: "#projects", label: "Projects" },
  { href: "#stack", label: "Stack" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

const linkBtn =
  "rounded-lg border border-line px-5 py-2.5 text-sm font-medium transition-colors hover:border-accent";

function SectionTitle({ children }: { children: string }) {
  return <h2 className="mb-8 font-mono text-sm uppercase tracking-widest text-accent">{children}</h2>;
}

export default function Home() {
  return (
    <>
      <header className="sticky top-0 z-10 border-b border-line bg-bg/80 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-6">
          <a href="#top" className="font-mono text-sm font-semibold">
            tony<span className="text-accent">.dev</span>
          </a>
          <nav className="flex items-center gap-6 text-sm text-muted">
            <ul className="hidden gap-6 sm:flex">
              {nav.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="transition-colors hover:text-fg">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
            <ThemeToggle />
          </nav>
        </div>
      </header>

      <main id="top" className="mx-auto w-full max-w-5xl flex-1 px-4 sm:px-6">
        <section className="grid items-center gap-10 py-16 sm:py-24 md:grid-cols-2">
          <div>
            <Image
              src="/profile/tomas.jpg"
              alt={`Photo of ${site.name}`}
              width={80}
              height={80}
              loading="eager"
              className="mb-6 size-20 rounded-full object-cover ring-2 ring-accent/60 ring-offset-4 ring-offset-bg"
            />
            <p className="font-mono text-sm text-accent">Hi, I&apos;m</p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">{site.name}</h1>
            <p className="mt-2 text-2xl text-muted sm:text-3xl">{site.role}</p>
            <p className="mt-6 max-w-md text-muted">{site.tagline}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={site.github}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-accent-fg transition-opacity hover:opacity-90"
              >
                GitHub
              </a>
              <a href={site.instagram} target="_blank" rel="noopener noreferrer" className={linkBtn}>
                Instagram
              </a>
              <a href="#projects" className={linkBtn}>
                See my work
              </a>
            </div>
          </div>
          <Terminal />
        </section>

        <section id="projects" className="py-16">
          <SectionTitle>Projects</SectionTitle>
          <div className="grid gap-6 md:grid-cols-2">
            {projects.map((p) => (
              <ProjectCard key={p.title} project={p} />
            ))}
          </div>
        </section>

        <section id="stack" className="py-16">
          <SectionTitle>Stack</SectionTitle>
          <div className="grid gap-8 sm:grid-cols-3">
            {stack.map((g) => (
              <div key={g.group}>
                <h3 className="mb-3 font-semibold">{g.group}</h3>
                <ul className="flex flex-wrap gap-2">
                  {g.items.map((i) => (
                    <li key={i} className="rounded-md border border-line bg-card px-2.5 py-1 text-sm text-muted">
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section id="about" className="py-16">
          <SectionTitle>About</SectionTitle>
          <div className="max-w-2xl space-y-4 text-lg text-muted">
            {site.about.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </section>

        <section id="contact" className="py-16">
          <SectionTitle>Contact</SectionTitle>
          <p className="max-w-xl text-lg text-muted">
            Want to talk about a project or an opportunity? You can find me on GitHub and Instagram.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-accent-fg transition-opacity hover:opacity-90"
            >
              GitHub
            </a>
            <a href={site.instagram} target="_blank" rel="noopener noreferrer" className={linkBtn}>
              Instagram
            </a>
          </div>
        </section>
      </main>

      <footer className="border-t border-line py-8 text-sm text-muted">
        <div className="mx-auto flex max-w-5xl flex-col gap-2 px-4 sm:flex-row sm:justify-between sm:px-6">
          <p>© {site.name}</p>
          <a href={`mailto:${site.email}`} className="transition-colors hover:text-fg">
            {site.email}
          </a>
        </div>
      </footer>
    </>
  );
}
