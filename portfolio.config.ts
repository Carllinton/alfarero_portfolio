/**
 * THE KEYNOTE — SINGLE CONTENT SOURCE
 * Switch activeProfession to preview a different complete portfolio.
 * The healthcare and designer profiles are illustrative, not real people.
 * Never add performance metrics or testimonials that cannot be verified.
 */
export type VisualKind = "interface" | "document" | "mobile" | "editorial";
export type HeroVisualStyle = "technical" | "human" | "editorial";

export interface Project {
  title: string;
  role: string;
  summary: string;
  problem: string;
  process: string;
  result: string;
  outcome: string;
  caption: string;
  metrics: string[];
  visual: {
    kind: VisualKind;
    kicker: string;
    title: string;
    rows: string[];
    tag: string;
  };
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
  positioning: string;
  problem: string;
  heroVisual: HeroVisualStyle;
  accent: string;
  projects: Project[];
  numbers: { value: number; suffix: string; label: string; detail: string }[];
  experience: { date: string; title: string; detail: string }[];
  credentials: { title: string; issuer: string; status: string }[];
  skills: { group: string; items: string[] }[];
  testimonials: { quote: string; author: string; role: string }[];
  surprise: { headline: string; detail: string; signoff: string };
  contact: {
    email: string;
    endpoint: string;
    links: { label: string; url: string }[];
  };
  sample: boolean;
}
const makeProject = (
  title: string,
  role: string,
  summary: string,
  problem: string,
  process: string,
  result: string,
  outcome: string,
  caption: string,
  metrics: string[],
  visual: Project["visual"],
  links: Project["links"] = [],
): Project => ({
  title, role, summary, problem, process, result, outcome, caption,
  metrics, visual, links, media: [],
});

const developer: Profile = {
  name: "Carl Luis B. Alfarero",
  firstName: "Carl",
  headline: "IT student & web developer",
  location: "Valenzuela, Philippines",
  pitch: "I turn everyday problems into useful systems.",
  summary: "I'm Carl, an Information Technology student at Pamantasan ng Lungsod ng Valenzuela. I design and build web applications around the people who use them.",
  story: "A checkout counter. An enrollment form. A classroom activity. My work begins with the real task in front of someone, then removes the friction between them and the result.",
  positioning: "I make complex systems feel simple.",
  problem: "The next step should always feel obvious.",
  heroVisual: "technical",
  accent: "#9BE9BB",
  projects: [
    makeProject(
      "Meljune Pet Shop POS",
      "Student web developer · Group project",
      "Checkout, catalog and inventory for a pet supplies shop.",
      "Cashiers need to find products quickly and print only the receipt.",
      "Connected product-code input to the cart, separated inventory adjustment from editing, and refined the receipt-only print layout.",
      "Cashiers can use typed product codes and print a receipt without the rest of the transaction page.",
      "Checkout, simplified.",
      "Find the right item. Enter its code. Print exactly the receipt.",
      ["2 product lookup methods"],
      { kind: "interface", kicker: "POINT OF SALE / INTERFACE STUDY", title: "Meljune.", rows: ["Product code search", "Product catalog", "Your order", "Receipt preview"], tag: "POS · INVENTORY" }
    ),
    makeProject(
      "BAR College Enrollment",
      "Student developer · Academic modernization",
      "A modern interface for a 2014 enrollment system.",
      "The entire experience needed a refresh, but the provided database schema could not change.",
      "Mapped the legacy PHP flow and reorganized frontend interactions around the existing MySQL data structure.",
      "The reference implementation preserves the original database schema.",
      "Modernized. Not rewritten.",
      "A cleaner way to enroll. Without changing what already works underneath.",
      ["0 schema changes"],
      { kind: "document", kicker: "SYSTEM DESIGN / REFERENCE BUILD", title: "BAR College", rows: ["Student enrollment", "Subjects & schedules", "Protected pages", "Original database"], tag: "LEGACY → MODERN" }
    ),
    makeProject(
      "SortIt",
      "Student researcher · Team proposal",
      "A proposed learning game about correct waste segregation.",
      "Young learners need a memorable, interactive way to practice sorting waste.",
      "Designed a reflex-based sorting concept and a pre-test/post-test assessment plan.",
      "The research proposal is prepared; participant results have not yet been measured.",
      "Learning, through play.",
      "An everyday habit becomes a game. The learning outcome will be tested.",
      ["2 planned assessments"],
      { kind: "mobile", kicker: "LEARNING GAME / PROTOTYPE CONCEPT", title: "SortIt", rows: ["PAPER", "PLASTIC", "ORGANIC"], tag: "SORT · LEARN · REPEAT" }
    )
  ],
  numbers: [
    { value: 3, suffix: "", label: "Selected case studies", detail: "Academic work and practical systems." },
    { value: 2, suffix: "", label: "POS lookup methods", detail: "Product search and typed product codes." },
    { value: 2, suffix: "", label: "Planned assessments", detail: "SortIt pre-test and post-test evaluation." }
  ],
  experience: [
    { date: "2026 — present", title: "Web & database projects", detail: "Building academic systems using PHP, JavaScript, React and MySQL, with attention to real workflows." },
    { date: "2025", title: "IT research", detail: "Researched how first-year IT students use ChatGPT in Filipino-language research writing." }
  ],
  credentials: [
    { title: "BS in Information Technology", issuer: "Pamantasan ng Lungsod ng Valenzuela", status: "In progress" }
  ],
  skills: [
    { group: "Build", items: ["HTML & CSS", "JavaScript", "PHP", "React", "Angular"] },
    { group: "Data", items: ["MySQL", "MariaDB", "SQL", "Database design"] },
    { group: "Practice", items: ["Git", "XAMPP", "VS Code", "Packet Tracer"] }
  ],
  testimonials: [],
  surprise: {
    headline: "I also believe in making people feel something.",
    detail: "Outside of code, I spend time with a guitar and dream of playing saxophone for a crowd. For me, great technology and great music have something in common: people remember how they felt.",
    signoff: "One more thing."
  },
  contact: {
    email: "",
    endpoint: "https://formspree.io/f/xyezrrre",
    links: [{ label: "GitHub", url: "https://github.com/Carllinton" }]
  },
  sample: false
};

const healthcare: Profile = {
  name: "Mara Santos",
  firstName: "Mara",
  headline: "Community healthcare professional",
  location: "Manila, Philippines",
  pitch: "Care begins with being understood.",
  summary: "An illustrative healthcare portfolio centered on patient education, care coordination and accessible communication.",
  story: "In every patient journey, clarity can make the difference between uncertainty and confidence.",
  positioning: "I make care easier to understand.",
  problem: "Good care should never get lost in translation.",
  heroVisual: "human",
  accent: "#9CCFD0",
  projects: [
    makeProject("Discharge companion", "Sample education lead", "A bilingual care guide.", "Discharge instructions are easy to forget.", "Organized them into simple, action-oriented steps.", "Created a sample bilingual guide.", "Clarity after care.", "Practical next steps, easy to take home.", ["2 sample languages"], { kind: "document", kicker: "PATIENT EDUCATION / SAMPLE", title: "Your next steps", rows: ["Medication schedule", "Warning signs", "Follow-up visit"], tag: "CARE GUIDE" }),
    makeProject("Clinic handoff", "Sample coordinator", "A concise patient handoff sheet.", "Care tasks often change hands.", "Mapped the handoff to a short, shared checklist.", "Produced an illustrative workflow.", "Nothing gets lost.", "A simpler handoff for a better next shift.", ["1 sample checklist"], { kind: "interface", kicker: "CARE COORDINATION / SAMPLE", title: "Handoff", rows: ["Patient overview", "Today's priorities", "Follow-up tasks"], tag: "CARE TEAM" }),
    makeProject("Community sessions", "Sample facilitator", "Learning sessions for local groups.", "People need room to ask questions.", "Designed compact sessions around one health topic at a time.", "Prepared a reusable sample teaching kit.", "Learn it. Share it.", "A more welcoming way to talk about health.", ["3 sample sessions"], { kind: "editorial", kicker: "COMMUNITY OUTREACH / SAMPLE", title: "Care is shared.", rows: ["01 Listen", "02 Explain", "03 Follow up"], tag: "COMMUNITY" })
  ],
  numbers: [
    { value: 3, suffix: "", label: "Sample initiatives", detail: "Illustrative projects, not verified outcomes." },
    { value: 2, suffix: "", label: "Sample languages", detail: "Discharge education concept." },
    { value: 1, suffix: "", label: "Shared goal", detail: "Clearer communication." }
  ],
  experience: [{ date: "Example", title: "Community education coordinator", detail: "Illustrative work supporting patient education and outreach." }],
  credentials: [{ title: "Bachelor of Science in Nursing", issuer: "Illustrative institution", status: "Sample credential" }],
  skills: [{ group: "Practice", items: ["Patient education", "Care coordination", "Health literacy", "Facilitation"] }, { group: "Approach", items: ["Empathy", "Follow-through", "Clear documentation"] }],
  testimonials: [],
  surprise: { headline: "Listening is the beginning of care.", detail: "This is a fictional portfolio profile provided to demonstrate a different profession.", signoff: "One more thing." },
  contact: { email: "", endpoint: "", links: [] },
  sample: true
};

const designer: Profile = {
  name: "Jules Rivera",
  firstName: "Jules",
  headline: "Visual & editorial designer",
  location: "Cebu, Philippines",
  pitch: "I give meaningful ideas a shape.",
  summary: "An illustrative design portfolio about identity, typography and editorial systems.",
  story: "I start with a question, a blank page and many rough drafts. The result should look effortless, even when the process isn't.",
  positioning: "I turn complex ideas into clear visual stories.",
  problem: "People should feel the idea before they read the explanation.",
  heroVisual: "editorial",
  accent: "#EFAC8A",
  projects: [
    makeProject("Neighborhood atlas", "Sample art director", "A folded walking guide.", "A local route needed a more portable guide.", "Explored a compact editorial grid and accessible map symbols.", "Created a sample pocket-sized guide.", "A city, in your hands.", "A small format. A whole neighborhood.", ["1 sample map"], { kind: "editorial", kicker: "EDITORIAL DESIGN / SAMPLE", title: "Around here.", rows: ["Places to wander", "Little discoveries", "Issue Nº 01"], tag: "CITY ATLAS" }),
    makeProject("Market letters", "Sample lettering designer", "A lettering system for market signs.", "Individual signs needed a family resemblance.", "Sketched and digitized a small display alphabet.", "Prepared an illustrative specimen.", "Every letter matters.", "Character in every corner.", ["26 sample letters"], { kind: "document", kicker: "LETTERING / SAMPLE", title: "Aa Bb Cc", rows: ["A distinct voice", "A flexible system", "A local identity"], tag: "TYPE STUDY" }),
    makeProject("Small press series", "Sample editorial designer", "A cohesive set of covers.", "Different books needed one recognizable family.", "Designed a consistent grid that adapts across formats.", "Created three sample cover concepts.", "A series with a voice.", "Three books. One unmistakable system.", ["3 sample covers"], { kind: "editorial", kicker: "PRINT / SAMPLE", title: "The small press.", rows: ["Volume 01", "Volume 02", "Volume 03"], tag: "COVER SYSTEM" })
  ],
  numbers: [
    { value: 3, suffix: "", label: "Sample projects", detail: "Fictional portfolio demonstrations." },
    { value: 26, suffix: "", label: "Letterforms", detail: "Illustrative display alphabet." },
    { value: 1, suffix: "", label: "Design philosophy", detail: "Clarity above noise." }
  ],
  experience: [{ date: "Example", title: "Independent designer", detail: "Illustrative editorial, identity and print commissions." }],
  credentials: [{ title: "BA in Visual Communication", issuer: "Illustrative school", status: "Sample credential" }],
  skills: [{ group: "Design", items: ["Typography", "Art direction", "Figma", "Editorial systems"] }, { group: "Making", items: ["Print", "Sketching", "Visual identity"] }],
  testimonials: [],
  surprise: { headline: "The best ideas survive on paper.", detail: "This fictional sample shows how the same site can tell a designer's story by changing this file alone.", signoff: "One more thing." },
  contact: { email: "", endpoint: "", links: [] },
  sample: true
};

export const profiles = { developer, healthcare, designer } satisfies Record<string, Profile>;
export const activeProfession: keyof typeof profiles = "developer";
export default profiles[activeProfession];
