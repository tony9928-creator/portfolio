export const site = {
  name: "Tomás Acosta",
  role: "Full Stack Developer",
  tagline:
    "I build RESTful APIs, sustainable backend architecture and dynamic React interfaces.",
  about: [
    "I'm a full stack developer in advanced training and a digital creator. I focus on clean, maintainable backends with Node.js and Express, and on interfaces that feel fast and clear with React and Next.js.",
    "I like projects where the details matter: consistent data, predictable APIs and UIs people can actually use. I'm currently building real-world projects for Devlights and looking for my next challenge.",
  ],
  github: "https://github.com/tony9928-creator",
  instagram: "https://www.instagram.com/tomasaocst/",
  email: "tomasacosta1990@gmail.com",
} as const;

export type Project = {
  title: string;
  kind: string;
  description: string;
  highlights: string[];
  stack: string[];
  repo?: string;
  demo?: string;
  images?: { src: string; alt: string }[];
  routes?: string[];
};

export const projects: Project[] = [
  {
    title: "Ticketing App",
    kind: "Team project · Devlights",
    description:
      "Full stack platform to publish events, reserve tickets and validate them with a QR code at the door.",
    highlights: [
      "Atomic stock control: concurrent purchases never oversell",
      "5-minute reservations that expire and release stock automatically",
      "Role-based access, interactive map and camera QR validator",
    ],
    stack: ["Next.js", "React", "TypeScript", "Express", "MongoDB", "Tailwind CSS"],
    repo: "https://github.com/tony9928-creator/Ticketing-app",
    images: [
      { src: "/projects/ticketing-home.jpg", alt: "Ticketing App home page with upcoming events" },
      { src: "/projects/ticketing-event.jpg", alt: "Event detail with map and ticket reservation panel" },
    ],
  },
  {
    title: "SAGA Catering & Eventos",
    kind: "Client project · In development",
    description:
      "Marketing website for a premium catering and event-production company, with an Art Déco identity and a direct quote flow.",
    highlights: [
      "Art Déco design system: custom Tailwind theme, serif/sans type pairing",
      "Quote request form that sends the lead straight to WhatsApp or email",
      "Responsive gallery, services section and QR contact card",
    ],
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Vercel"],
    demo: "https://saga-henna.vercel.app",
    images: [
      { src: "/projects/saga-home.jpg", alt: "SAGA Catering & Eventos home page with hero and quote button" },
      { src: "/projects/saga-gallery.jpg", alt: "SAGA gallery section showing event styling and catering photos" },
    ],
  },
  {
    title: "Velocore API",
    kind: "Solo project · Devlights",
    description:
      "REST API to manage a gym: users with roles, classes with limited capacity and bookings.",
    highlights: [
      "JWT authentication with admin, trainer and client roles",
      "Business rules in the service layer, validation with Zod",
      "35-request test collection covering every HTTP case",
    ],
    stack: ["Node.js", "Express", "TypeScript", "MongoDB", "JWT", "Zod"],
    repo: "https://github.com/tony9928-creator/velocore-api",
    routes: [
      "POST /api/auth/login",
      "GET  /api/users/me",
      "GET  /api/classes",
      "POST /api/bookings",
    ],
  },
];

export const stack = [
  { group: "Back-End", items: ["Node.js", "Express", "TypeScript", "MongoDB", "REST APIs", "JWT"] },
  { group: "Front-End", items: ["React", "Next.js", "JavaScript (ES6+)", "HTML5", "CSS3", "Tailwind CSS"] },
  { group: "Workflow", items: ["Git", "GitHub", "Vercel", "VS Code"] },
];
