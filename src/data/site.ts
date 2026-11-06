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
  repo: string;
  demo?: string;
  image?: string;
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
  },
];

export const stack = [
  { group: "Back-End", items: ["Node.js", "Express", "TypeScript", "MongoDB", "REST APIs", "JWT"] },
  { group: "Front-End", items: ["React", "Next.js", "JavaScript (ES6+)", "HTML5", "CSS3", "Tailwind CSS"] },
  { group: "Workflow", items: ["Git", "GitHub", "Vercel", "VS Code"] },
];
