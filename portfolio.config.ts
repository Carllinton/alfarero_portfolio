export type Section =
  | "about"
  | "projects"
  | "credentials"
  | "experience"
  | "contact"
  | "skills"
  | "personal";
export interface DeskObject {
  id: string;
  label: string;
  illustration: string;
  alt: string;
  type: Section;
  position: { x: number; y: number; width: number; angle: number };
}
export interface Project {
  title: string;
  role: string;
  summary: string;
  problem: string;
  process: string;
  result: string;
  metrics: string[];
  media: { kind: "image" | "video"; url: string; alt: string }[];
  links: { label: string; url: string }[];
}
export interface Profile {
  name: string;
  firstName: string;
  headline: string;
  pitch: string;
  summary: string;
  story: string;
  location: string;
  accent: string;
  theme: {
    name: string;
    surface: string;
    mark: string;
    props: {
      art: string;
      x: number;
      y: number;
      width: number;
      angle: number;
    }[];
  };
  objects: DeskObject[];
  projects: Project[];
  experience: { date: string; title: string; detail: string }[];
  credentials: { title: string; issuer: string; status: string }[];
  skills: { group: string; items: string[] }[];
  hobbies: string;
  secret: { illustration: string; alt: string; note: string };
  contact: {
    email: string;
    endpoint: string;
    links: { label: string; url: string }[];
  };
  sample: boolean;
}
function object(
  id: Section,
  label: string,
  illustration: string,
  alt: string,
  x: number,
  y: number,
  width: number,
  angle: number,
): DeskObject {
  return {
    id,
    label,
    illustration,
    alt,
    type: id,
    position: { x, y, width, angle },
  };
}
const objects = [
  object(
    "about",
    "About me",
    "notebook",
    "Forest-green clothbound field notebook with a brass pen",
    39,
    4,
    22,
    -8,
  ),
  object(
    "projects",
    "Projects",
    "folders",
    "Stack of ochre tabbed project folders",
    69,
    7,
    25,
    7,
  ),
  object(
    "credentials",
    "Credentials",
    "frame",
    "A certificate in a mitered walnut picture frame",
    38,
    46,
    20,
    -5,
  ),
  object(
    "experience",
    "Experience",
    "ruler",
    "Numbered brass drafting ruler",
    6,
    80,
    29,
    -5,
  ),
  object(
    "contact",
    "Contact",
    "envelope",
    "Air mail envelope with a postage stamp",
    66,
    73,
    21,
    -7,
  ),
  object(
    "skills",
    "Skills & tools",
    "drawer",
    "Olive steel index drawer with a brass label holder",
    70,
    44,
    21,
    4,
  ),
  object(
    "personal",
    "Off the clock",
    "coffee",
    "Speckled ceramic coffee mug on a cork coaster",
    8,
    44,
    17,
    -8,
  ),
];
function project(
  title: string,
  role: string,
  summary: string,
  problem: string,
  process: string,
  result: string,
  metrics: string[],
): Project {
  return {
    title,
    role,
    summary,
    problem,
    process,
    result,
    metrics,
    media: [],
    links: [],
  };
}
const developer: Profile = {
  name: "Carl Luis B. Alfarero",
  firstName: "Carl",
  headline: "IT student & web developer",
  location: "Valenzuela, PH",
  pitch: "I turn everyday problems into useful little systems.",
  summary:
    "I’m Carl, an IT student at Pamantasan ng Lungsod ng Valenzuela. I build web applications around the people who use them.",
  story:
    "A checkout counter, an enrollment form, a classroom exercise. My projects start with ordinary tasks. I like tracing how information moves, then building an interface that makes the next step feel obvious.",
  accent: "#37553f",
  theme: {
    name: "Developer’s workbench",
    surface: "#e5cfac",
    mark: "terminal",
    props: [
      { art: "keyboard", x: 40, y: 85, width: 17, angle: 6 },
      { art: "pencil", x: 96, y: 43, width: 1.15, angle: 15 },
      { art: "clips", x: 58, y: 76, width: 3.5, angle: 20 },
    ],
  },
  objects,
  projects: [
    project(
      "Meljune Pet Shop POS",
      "Student web developer · Group project",
      "A checkout and inventory system for a pet supplies shop.",
      "Cashiers need to find products quickly and print a receipt without printing the entire transaction screen.",
      "Connected product-code search to the cart, separated inventory adjustments from product edits, and refined the receipt print layout.",
      "The checkout flow supports typed product codes and receipt-only printing.",
      ["2 product lookup methods"],
    ),
    project(
      "BAR College Enrollment",
      "Student developer · Academic project",
      "A modernization study of a 2014 college enrollment system.",
      "Modernize the student-facing experience while preserving the original database schema.",
      "Mapped the existing PHP entry points and moved enrollment workflows into a shared interface backed by MySQL.",
      "The reference implementation keeps the original schema and groups supporting application files outside the main directory.",
      ["0 schema changes"],
    ),
    project(
      "SortIt",
      "Student researcher · Team proposal",
      "A proposed mobile game for learning waste segregation.",
      "Elementary learners need a practical way to practice choosing the correct waste bin.",
      "Designed a reflex-based sorting game and a pre-test and post-test evaluation plan.",
      "The proposal defines how to compare sorting accuracy before and after gameplay. Participant results are pending.",
      ["2 planned assessments"],
    ),
  ],
  experience: [
    {
      date: "2026",
      title: "Web systems & database projects",
      detail:
        "Developing student applications in PHP, JavaScript and MySQL, from point-of-sale workflows to enrollment interfaces.",
    },
    {
      date: "2025",
      title: "First-year IT research",
      detail:
        "Worked on a Filipino-language study of how first-year IT students use ChatGPT in research writing.",
    },
  ],
  credentials: [
    {
      title: "BS in Information Technology",
      issuer: "Pamantasan ng Lungsod ng Valenzuela",
      status: "In progress",
    },
  ],
  skills: [
    { group: "Web", items: ["HTML & CSS", "JavaScript", "PHP", "React"] },
    {
      group: "Data",
      items: ["MySQL", "MariaDB", "SQL triggers", "Database design"],
    },
    { group: "Toolkit", items: ["Git", "XAMPP", "VS Code", "Packet Tracer"] },
  ],
  hobbies:
    "Away from the keyboard, I’m learning the guitar fretboard. I like the kind of music that gets a whole room moving.",
  secret: {
    illustration: "pick",
    alt: "A tiny guitar pick",
    note: "One instrument I’d love to play for a crowd? The saxophone. For now, I’m working my way along the guitar fretboard.",
  },
  contact: {
    email: "",
    endpoint: "https://formspree.io/f/xyezrrre",
    links: [
      { label: "GitHub · Carllinton", url: "https://github.com/Carllinton" },
    ],
  },
  sample: false,
};
function variantArt(
  source: DeskObject[],
  art: Record<string, [string, string]>,
): DeskObject[] {
  return source.map((o) =>
    art[o.id]
      ? { ...o, illustration: art[o.id][0], alt: art[o.id][1] }
      : { ...o },
  );
}
const healthcare: Profile = {
  ...developer,
  contact: { email: "", endpoint: "", links: [] },
  name: "Mara Santos",
  firstName: "Mara",
  headline: "Community health professional",
  location: "Manila, PH",
  sample: true,
  pitch: "I make health information easier to act on.",
  summary:
    "A fictional community health portfolio focused on accessible patient education and coordinated care.",
  story:
    "My practice brings clear language and careful follow-up into community health education.",
  accent: "#24595a",
  theme: {
    name: "Care station",
    surface: "#d4ded0",
    mark: "cross",
    props: [
      { art: "stethoscope", x: 41, y: 83, width: 18, angle: 8 },
      { art: "clips", x: 94, y: 61, width: 3.5, angle: 15 },
    ],
  },
  objects: variantArt(objects, {
    about: ["clipboard", "Mint clinical clipboard with a check sheet"],
    projects: ["charts", "Patient education folders"],
    personal: ["tea", "Ceramic tea cup"],
  }),
  projects: [
    project(
      "Discharge companion",
      "Education lead",
      "A plain-language take-home guide.",
      "Instructions were hard to scan.",
      "Grouped advice by the next action.",
      "Created a bilingual prototype.",
      ["2 sample languages"],
    ),
    project(
      "Clinic handoff",
      "Coordinator",
      "A shared handoff checklist.",
      "Care tasks changed hands repeatedly.",
      "Mapped a shift with staff.",
      "Drafted a concise handoff sheet.",
      ["1 sample checklist"],
    ),
    project(
      "Community sessions",
      "Facilitator",
      "Small-group health workshops.",
      "Participants needed time for questions.",
      "Designed modular workshops.",
      "Prepared a reusable teaching pack.",
      ["3 sample sessions"],
    ),
  ],
  experience: [
    {
      date: "2024–26",
      title: "Community education coordinator",
      detail: "Illustrative role developing patient education resources.",
    },
  ],
  credentials: [
    {
      title: "Bachelor of Science in Nursing",
      issuer: "Illustrative university",
      status: "Sample qualification",
    },
  ],
  skills: [
    {
      group: "Practice",
      items: [
        "Patient education",
        "Care coordination",
        "Workshop facilitation",
      ],
    },
  ],
  hobbies: "I collect loose-leaf teas and sketch plants on neighborhood walks.",
  secret: {
    illustration: "leaf",
    alt: "A pressed leaf",
    note: "I keep a pressed leaf from every garden I visit.",
  },
};
const designer: Profile = {
  ...developer,
  contact: { email: "", endpoint: "", links: [] },
  name: "Jules Rivera",
  firstName: "Jules",
  headline: "Graphic & editorial designer",
  location: "Cebu, PH",
  sample: true,
  pitch: "I give good stories a shape you can hold.",
  summary:
    "A fictional design practice working across print, identity and small editorial systems.",
  story:
    "I begin with paper, work through several rough sketches, and keep the useful accidents.",
  accent: "#7f4233",
  theme: {
    name: "Design studio",
    surface: "#e5cfbe",
    mark: "swatch",
    props: [
      { art: "pencil", x: 52, y: 78, width: 1.15, angle: 75 },
      { art: "clips", x: 94, y: 63, width: 3.5, angle: 20 },
    ],
  },
  objects: variantArt(objects, {
    about: ["sketchbook", "Clay-red sketchbook"],
    projects: ["proofs", "Stack of editorial proofs"],
    skills: ["swatches", "Fan of color swatches"],
  }),
  projects: [
    project(
      "Neighborhood atlas",
      "Art director",
      "A folded guide to a walking route.",
      "The route lacked a portable guide.",
      "Tested folds and wayfinding symbols.",
      "Produced a pocket-size proof.",
      ["1 sample map"],
    ),
    project(
      "Market letters",
      "Type designer",
      "Lettering inspired by market stalls.",
      "Vendor signs needed a shared system.",
      "Drew and digitized a small alphabet.",
      "Prepared a display specimen.",
      ["26 sample letters"],
    ),
    project(
      "Small press series",
      "Editorial designer",
      "A family of paperback covers.",
      "The editions needed a common identity.",
      "Tested grids across formats.",
      "Created a flexible cover system.",
      ["3 sample covers"],
    ),
  ],
  experience: [
    {
      date: "2023–26",
      title: "Independent designer",
      detail: "Illustrative print, identity and editorial commissions.",
    },
  ],
  credentials: [
    {
      title: "BA in Visual Communication",
      issuer: "Illustrative design school",
      status: "Sample qualification",
    },
  ],
  skills: [
    {
      group: "Studio",
      items: ["Typography", "Art direction", "Print production", "Figma"],
    },
  ],
  hobbies:
    "I collect old postage stamps and make little books out of print scraps.",
  secret: {
    illustration: "stamp",
    alt: "A loose postage stamp",
    note: "My smallest handmade book fits inside a matchbox.",
  },
};
// Change this one line to switch the entire production portfolio.
export const activeProfession: keyof typeof profiles = "developer";
export const profiles = { developer, healthcare, designer } satisfies Record<
  string,
  Profile
>;
export default profiles[activeProfession];
