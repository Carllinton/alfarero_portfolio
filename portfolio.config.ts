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
export type WorkVisual = "systems" | "design" | "network" | "editorial";
export interface WorkImage {
  url: string;
  alt: string;
  caption: string;
}
export interface WorkEntry {
  title: string;
  label: string;
  description: string;
  images: WorkImage[];
  links?: { label: string; url: string }[];
  /** Connects back to a case study already defined in this file. */
  projectTitle?: string;
}
export interface WorkCategory {
  slug: string;
  title: string;
  statement: string;
  description: string;
  eyebrow: string;
  visual: WorkVisual;
  entries: WorkEntry[];
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
  workCategories: WorkCategory[];
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

// Existing public student work, linked as images in its original repository.
// Gallery media is lazy-loaded. To make it independent of that source repository,
// move optimized copies into public/works/ and change only these URLs.
const developerCategories: WorkCategory[] = [
  {
    "slug": "web-systems",
    "title": "Web Systems & Apps",
    "statement": "Built to make life easier.",
    "description": "Interfaces, web applications, and interactive prototypes—selected from practical and academic projects.",
    "eyebrow": "01 / SOFTWARE & SYSTEMS",
    "visual": "systems",
    "entries": [
      {
        "title": "Meljune Pet Shop POS",
        "label": "POINT OF SALE · INVENTORY",
        "description": "Checkout, product catalog, stock management, and receipt handling for a pet-supplies store.",
        "images": [],
        "projectTitle": "Meljune Pet Shop POS",
        "links": [
          {
            "label": "Source repository",
            "url": "https://github.com/Carllinton/Meljune-Pet-Shop-Supplies"
          }
        ]
      },
      {
        "title": "BAR College Enrollment",
        "label": "PHP · MYSQL · MODERNIZATION",
        "description": "Modernizing a legacy college enrollment interface while preserving its original database structure.",
        "images": [],
        "projectTitle": "BAR College Enrollment",
        "links": [
          {
            "label": "Source repository",
            "url": "https://github.com/Carllinton/winbar_school"
          }
        ]
      },
      {
        "title": "Flories Flower Shop",
        "label": "WEB SYSTEMS · CLIENT PROJECT",
        "description": "A student client-based flower shop website, including collections, occasions, and ordering views.",
        "images": [
          {
            "url": "https://raw.githubusercontent.com/Carllinton/Portfolio/main/works/web%20development/flories_project/Screenshot%202026-05-24%20172116.png",
            "alt": "Home page",
            "caption": "Home page"
          },
          {
            "url": "https://raw.githubusercontent.com/Carllinton/Portfolio/main/works/web%20development/flories_project/Screenshot%202026-05-24%20172429.png",
            "alt": "Collections page",
            "caption": "Collections page"
          },
          {
            "url": "https://raw.githubusercontent.com/Carllinton/Portfolio/main/works/web%20development/flories_project/Screenshot%202026-05-24%20172534.png",
            "alt": "Occasions page",
            "caption": "Occasions page"
          },
          {
            "url": "https://raw.githubusercontent.com/Carllinton/Portfolio/main/works/web%20development/flories_project/Screenshot%202026-05-24%20172544.png",
            "alt": "Orders interface",
            "caption": "Orders interface"
          },
          {
            "url": "https://raw.githubusercontent.com/Carllinton/Portfolio/main/works/web%20development/flories_project/Screenshot%202026-05-24%20172600.png",
            "alt": "Contact page",
            "caption": "Contact page"
          },
          {
            "url": "https://raw.githubusercontent.com/Carllinton/Portfolio/main/works/web%20development/flories_project/Screenshot%202026-05-24%20172610.png",
            "alt": "Shopping cart",
            "caption": "Shopping cart"
          }
        ]
      },
      {
        "title": "House of Origami",
        "label": "WEB DEVELOPMENT · CREATIVE INTERFACE",
        "description": "An interactive web experience dedicated to origami art and its gallery.",
        "images": [
          {
            "url": "https://raw.githubusercontent.com/Carllinton/Portfolio/main/works/web%20development/house_of_origami/Screenshot%202026-04-06%20221812.png",
            "alt": "Landing page",
            "caption": "Landing page"
          },
          {
            "url": "https://raw.githubusercontent.com/Carllinton/Portfolio/main/works/web%20development/house_of_origami/Screenshot%202026-04-06%20221906.png",
            "alt": "Gallery",
            "caption": "Gallery"
          },
          {
            "url": "https://raw.githubusercontent.com/Carllinton/Portfolio/main/works/web%20development/house_of_origami/Screenshot%202026-04-06%20221933.png",
            "alt": "Origami detail",
            "caption": "Origami detail"
          },
          {
            "url": "https://raw.githubusercontent.com/Carllinton/Portfolio/main/works/web%20development/house_of_origami/Screenshot%202026-04-06%20221947.png",
            "alt": "Interactive section",
            "caption": "Interactive section"
          }
        ]
      },
      {
        "title": "Autobiography Website",
        "label": "WEB DEVELOPMENT · STORYTELLING",
        "description": "A personal-story website built around different chapters of a life and learning journey.",
        "images": [
          {
            "url": "https://raw.githubusercontent.com/Carllinton/Portfolio/main/works/web%20development/autobiography/Screenshot%202026-04-06%20222813.png",
            "alt": "Introduction",
            "caption": "Introduction"
          },
          {
            "url": "https://raw.githubusercontent.com/Carllinton/Portfolio/main/works/web%20development/autobiography/Screenshot%202026-04-06%20222828.png",
            "alt": "Early life",
            "caption": "Early life"
          },
          {
            "url": "https://raw.githubusercontent.com/Carllinton/Portfolio/main/works/web%20development/autobiography/Screenshot%202026-04-06%20222844.png",
            "alt": "Education",
            "caption": "Education"
          },
          {
            "url": "https://raw.githubusercontent.com/Carllinton/Portfolio/main/works/web%20development/autobiography/Screenshot%202026-04-06%20222856.png",
            "alt": "Career start",
            "caption": "Career start"
          },
          {
            "url": "https://raw.githubusercontent.com/Carllinton/Portfolio/main/works/web%20development/autobiography/Screenshot%202026-04-06%20222908.png",
            "alt": "Skills development",
            "caption": "Skills development"
          },
          {
            "url": "https://raw.githubusercontent.com/Carllinton/Portfolio/main/works/web%20development/autobiography/Screenshot%202026-04-06%20222920.png",
            "alt": "Future goals",
            "caption": "Future goals"
          }
        ]
      },
      {
        "title": "iPhone UI Design",
        "label": "MOBILE UI · INTERACTION",
        "description": "Screen design, navigation patterns, and responsive interface exploration.",
        "images": [
          {
            "url": "https://raw.githubusercontent.com/Carllinton/Portfolio/main/works/web%20development/iphoneui/Screenshot%202026-04-06%20223056.png",
            "alt": "App concept",
            "caption": "App concept"
          },
          {
            "url": "https://raw.githubusercontent.com/Carllinton/Portfolio/main/works/web%20development/iphoneui/Screenshot%202026-04-06%20223115.png",
            "alt": "Wireframes",
            "caption": "Wireframes"
          },
          {
            "url": "https://raw.githubusercontent.com/Carllinton/Portfolio/main/works/web%20development/iphoneui/Screenshot%202026-04-06%20223130.png",
            "alt": "Home screen",
            "caption": "Home screen"
          },
          {
            "url": "https://raw.githubusercontent.com/Carllinton/Portfolio/main/works/web%20development/iphoneui/Screenshot%202026-04-06%20223140.png",
            "alt": "Navigation",
            "caption": "Navigation"
          },
          {
            "url": "https://raw.githubusercontent.com/Carllinton/Portfolio/main/works/web%20development/iphoneui/Screenshot%202026-04-06%20223222.png",
            "alt": "User profile",
            "caption": "User profile"
          },
          {
            "url": "https://raw.githubusercontent.com/Carllinton/Portfolio/main/works/web%20development/iphoneui/Screenshot%202026-04-06%20223234.png",
            "alt": "Interactive elements",
            "caption": "Interactive elements"
          },
          {
            "url": "https://raw.githubusercontent.com/Carllinton/Portfolio/main/works/web%20development/iphoneui/Screenshot%202026-04-06%20223253.png",
            "alt": "Color system",
            "caption": "Color system"
          },
          {
            "url": "https://raw.githubusercontent.com/Carllinton/Portfolio/main/works/web%20development/iphoneui/Screenshot%202026-04-06%20223308.png",
            "alt": "Final prototype",
            "caption": "Final prototype"
          }
        ]
      },
      {
        "title": "SortIt",
        "label": "PROPOSED LEARNING GAME · RESEARCH",
        "description": "A proposed educational mobile game for teaching waste segregation; learning outcomes are not yet measured.",
        "images": [],
        "projectTitle": "SortIt"
      }
    ]
  },
  {
    "slug": "graphic-design",
    "title": "Graphic Arts & Design",
    "statement": "Ideas worth looking at.",
    "description": "Brand concepts, campaigns, editorial graphics, and personal identity design. Actual artwork from my earlier creative portfolio.",
    "eyebrow": "02 / VISUAL COMMUNICATION",
    "visual": "design",
    "entries": [
      {
        "title": "Respresso — Brand Campaign",
        "label": "BRANDING · ADVERTISING",
        "description": "A coordinated Respresso campaign across outdoor advertising, flyers, and social media.",
        "images": [
          {
            "url": "https://raw.githubusercontent.com/Carllinton/Portfolio/main/works/multimedia/Respresso_billboard.png",
            "alt": "Respresso billboard design",
            "caption": "Billboard design"
          },
          {
            "url": "https://raw.githubusercontent.com/Carllinton/Portfolio/main/works/multimedia/Respresso_Flyers.png",
            "alt": "Respresso promotional flyer design",
            "caption": "Flyers and print"
          },
          {
            "url": "https://raw.githubusercontent.com/Carllinton/Portfolio/main/works/multimedia/Respresso_Social_Media.png",
            "alt": "Respresso social media graphic design",
            "caption": "Social media graphics"
          }
        ]
      },
      {
        "title": "CTT — Corporate Identity",
        "label": "LOGO · VISUAL IDENTITY",
        "description": "Brand identity studies and supporting visual materials for CTT.",
        "images": [
          {
            "url": "https://raw.githubusercontent.com/Carllinton/Portfolio/main/works/multimedia/CTT%20logo.png",
            "alt": "CTT corporate logo design",
            "caption": "CTT logo"
          },
          {
            "url": "https://raw.githubusercontent.com/Carllinton/Portfolio/main/works/multimedia/image.png",
            "alt": "CTT identity design sheet",
            "caption": "Identity exploration"
          },
          {
            "url": "https://raw.githubusercontent.com/Carllinton/Portfolio/main/works/multimedia/image%20(1).png",
            "alt": "Additional CTT corporate identity art",
            "caption": "Visual identity application"
          }
        ]
      },
      {
        "title": "Personal Branding & Multimedia",
        "label": "PERSONAL IDENTITY · CREATIVE WORK",
        "description": "Personal identity marks and a multimedia class design project.",
        "images": [
          {
            "url": "https://raw.githubusercontent.com/Carllinton/Portfolio/main/works/multimedia/carl_logo.png",
            "alt": "Carl personal logo",
            "caption": "Personal wordmark"
          },
          {
            "url": "https://raw.githubusercontent.com/Carllinton/Portfolio/main/works/multimedia/ca_logo.png",
            "alt": "CA monogram logo",
            "caption": "CA monogram"
          },
          {
            "url": "https://raw.githubusercontent.com/Carllinton/Portfolio/main/works/multimedia/Alfarero_MultiMedia%20PT2.png",
            "alt": "Alfarero multimedia performance task artwork",
            "caption": "Multimedia performance task"
          }
        ]
      }
    ]
  },
  {
    "slug": "networking",
    "title": "Networking & Infrastructure",
    "statement": "Every connection counts.",
    "description": "Packet Tracer network setups, routing exercises, DHCP relay simulations, and network documentation.",
    "eyebrow": "03 / NETWORK ENGINEERING",
    "visual": "network",
    "entries": [
      {
        "title": "MISV Network Infrastructure",
        "label": "NETWORK PLANNING · CONFIGURATION",
        "description": "Documented network setup, device configurations, and validation work.",
        "images": [
          {
            "url": "https://raw.githubusercontent.com/Carllinton/Portfolio/main/works/networking/MISV%20network/Screenshot%202026-04-06%20112357.png",
            "alt": "Network overview",
            "caption": "Network overview"
          },
          {
            "url": "https://raw.githubusercontent.com/Carllinton/Portfolio/main/works/networking/MISV%20network/Screenshot%202026-04-06%20112412.png",
            "alt": "Device configuration",
            "caption": "Device configuration"
          },
          {
            "url": "https://raw.githubusercontent.com/Carllinton/Portfolio/main/works/networking/MISV%20network/Screenshot%202026-04-06%20112434.png",
            "alt": "Access configuration",
            "caption": "Access configuration"
          },
          {
            "url": "https://raw.githubusercontent.com/Carllinton/Portfolio/main/works/networking/MISV%20network/Screenshot%202026-04-06%20112454.png",
            "alt": "Network testing",
            "caption": "Network testing"
          },
          {
            "url": "https://raw.githubusercontent.com/Carllinton/Portfolio/main/works/networking/MISV%20network/Screenshot%202026-04-06%20121837.png",
            "alt": "Final documentation",
            "caption": "Final documentation"
          }
        ]
      },
      {
        "title": "DHCP Relay Configuration",
        "label": "PACKET TRACER · DHCP",
        "description": "DHCP relay setup, route information, and a recorded network simulation.",
        "images": [
          {
            "url": "https://raw.githubusercontent.com/Carllinton/Portfolio/main/works/networking/dhcp_relay/Screenshot%202026-04-06%20214220.png",
            "alt": "DHCP relay topology",
            "caption": "DHCP relay topology"
          },
          {
            "url": "https://raw.githubusercontent.com/Carllinton/Portfolio/main/works/networking/dhcp_relay/showiproute.png",
            "alt": "Routing table",
            "caption": "Routing table"
          },
          {
            "url": "https://raw.githubusercontent.com/Carllinton/Portfolio/main/works/networking/dhcp_relay/showiproute1.png",
            "alt": "Route details",
            "caption": "Route details"
          },
          {
            "url": "https://raw.githubusercontent.com/Carllinton/Portfolio/main/works/networking/dhcp_relay/showiproute2.png",
            "alt": "Route verification",
            "caption": "Route verification"
          }
        ],
        "links": [
          {
            "label": "Watch DHCP relay simulation",
            "url": "https://drive.google.com/file/d/1P_4-F7lK5T7CvpyM3cRHqBwYDNNo3fWM/view"
          },
          {
            "label": "Packet Tracer file",
            "url": "https://github.com/Carllinton/Portfolio/blob/main/works/networking/dhcp_relay/AlfareroBarros_DHCPRelay.pkt"
          }
        ]
      },
      {
        "title": "Static Routing",
        "label": "CISCO · ROUTING",
        "description": "A static routing exercise with routing-table inspection and verification.",
        "images": [
          {
            "url": "https://raw.githubusercontent.com/Carllinton/Portfolio/main/works/networking/static_routing/Screenshot%202026-04-06%20214031.png",
            "alt": "Routing topology",
            "caption": "Routing topology"
          },
          {
            "url": "https://raw.githubusercontent.com/Carllinton/Portfolio/main/works/networking/static_routing/showiproute.png",
            "alt": "Configured routes",
            "caption": "Configured routes"
          },
          {
            "url": "https://raw.githubusercontent.com/Carllinton/Portfolio/main/works/networking/static_routing/showiproute1.png",
            "alt": "Route details",
            "caption": "Route details"
          },
          {
            "url": "https://raw.githubusercontent.com/Carllinton/Portfolio/main/works/networking/static_routing/showiproute2.png",
            "alt": "Routing verification",
            "caption": "Routing verification"
          }
        ],
        "links": [
          {
            "label": "Packet Tracer file",
            "url": "https://github.com/Carllinton/Portfolio/blob/main/works/networking/static_routing/PairedAct.pkt"
          }
        ]
      },
      {
        "title": "Physical Network Simulation",
        "label": "PHYSICAL WORKSPACE · PACKET TRACER",
        "description": "Network infrastructure illustrated through multiple site-level physical workspace views.",
        "images": [
          {
            "url": "https://raw.githubusercontent.com/Carllinton/Portfolio/main/works/networking/Physical/Physical%20Workspace/Gen%20T.png",
            "alt": "Gen T site",
            "caption": "Gen T site"
          },
          {
            "url": "https://raw.githubusercontent.com/Carllinton/Portfolio/main/works/networking/Physical/Physical%20Workspace/Malinta.png",
            "alt": "Malinta site",
            "caption": "Malinta site"
          },
          {
            "url": "https://raw.githubusercontent.com/Carllinton/Portfolio/main/works/networking/Physical/Physical%20Workspace/Mapulang%20Lupa.png",
            "alt": "Mapulang Lupa site",
            "caption": "Mapulang Lupa site"
          },
          {
            "url": "https://raw.githubusercontent.com/Carllinton/Portfolio/main/works/networking/Physical/Physical%20Workspace/Marulas.png",
            "alt": "Marulas site",
            "caption": "Marulas site"
          },
          {
            "url": "https://raw.githubusercontent.com/Carllinton/Portfolio/main/works/networking/Physical/Physical%20Workspace/Ugong.png",
            "alt": "Ugong site",
            "caption": "Ugong site"
          }
        ],
        "links": [
          {
            "label": "Watch physical network simulation",
            "url": "https://drive.google.com/file/d/1Ek8qGTE9vQf5UPqMDF6_7X1HJ7_QgiaA/view"
          },
          {
            "label": "Packet Tracer file",
            "url": "https://github.com/Carllinton/Portfolio/blob/main/works/networking/Physical/Alfarero_Physical.pkt"
          }
        ]
      },
      {
        "title": "VLSM & Network Addressing",
        "label": "SUBNETTING · DHCP POOLS",
        "description": "Variable-length subnet planning, address calculations, router configuration, and DHCP pool documentation.",
        "images": [
          {
            "url": "https://raw.githubusercontent.com/Carllinton/Portfolio/main/works/networking/VLSM/Screenshot%202026-04-06%20213944.png",
            "alt": "Network design overview",
            "caption": "Network design overview"
          },
          {
            "url": "https://raw.githubusercontent.com/Carllinton/Portfolio/main/works/networking/VLSM/Computations/Screenshot%202025-11-28%20222858.png",
            "alt": "Subnet calculations A",
            "caption": "Subnet calculations A"
          },
          {
            "url": "https://raw.githubusercontent.com/Carllinton/Portfolio/main/works/networking/VLSM/Computations/Screenshot%202025-11-28%20222907.png",
            "alt": "Subnet calculations B",
            "caption": "Subnet calculations B"
          },
          {
            "url": "https://raw.githubusercontent.com/Carllinton/Portfolio/main/works/networking/VLSM/Computations/Screenshot%202025-11-28%20222913.png",
            "alt": "Subnet calculations C",
            "caption": "Subnet calculations C"
          },
          {
            "url": "https://raw.githubusercontent.com/Carllinton/Portfolio/main/works/networking/VLSM/DHCP%20pools/Main%20Router.png",
            "alt": "Main router DHCP pool",
            "caption": "Main router DHCP pool"
          },
          {
            "url": "https://raw.githubusercontent.com/Carllinton/Portfolio/main/works/networking/VLSM/DHCP%20pools/Annex%20Router.png",
            "alt": "Annex router DHCP pool",
            "caption": "Annex router DHCP pool"
          },
          {
            "url": "https://raw.githubusercontent.com/Carllinton/Portfolio/main/works/networking/VLSM/DHCP%20pools/CPAG%20Router.png",
            "alt": "CPAG router DHCP pool",
            "caption": "CPAG router DHCP pool"
          }
        ],
        "links": [
          {
            "label": "Packet Tracer file",
            "url": "https://github.com/Carllinton/Portfolio/blob/main/works/networking/VLSM/Alfarero_VLSM.pkt"
          }
        ]
      }
    ]
  }
];
const healthcareCategories: WorkCategory[] = [
  {
    "slug": "patient-education",
    "title": "Patient Education",
    "statement": "Patient Education.",
    "description": "Plain-language discharge education resources.",
    "eyebrow": "SAMPLE WORK",
    "visual": "editorial",
    "entries": [
      {
        "title": "Discharge companion",
        "label": "ILLUSTRATIVE EXAMPLE",
        "description": "Plain-language discharge education resources.",
        "images": [],
        "projectTitle": "Discharge companion"
      }
    ]
  },
  {
    "slug": "care-coordination",
    "title": "Care Coordination",
    "statement": "Care Coordination.",
    "description": "Practical coordination tools and checklists.",
    "eyebrow": "SAMPLE WORK",
    "visual": "systems",
    "entries": [
      {
        "title": "Clinic handoff",
        "label": "ILLUSTRATIVE EXAMPLE",
        "description": "Practical coordination tools and checklists.",
        "images": [],
        "projectTitle": "Clinic handoff"
      }
    ]
  },
  {
    "slug": "community-outreach",
    "title": "Community Outreach",
    "statement": "Community Outreach.",
    "description": "Small-group health education workshops.",
    "eyebrow": "SAMPLE WORK",
    "visual": "network",
    "entries": [
      {
        "title": "Community sessions",
        "label": "ILLUSTRATIVE EXAMPLE",
        "description": "Small-group health education workshops.",
        "images": [],
        "projectTitle": "Community sessions"
      }
    ]
  }
];
const designerCategories: WorkCategory[] = [
  {
    "slug": "editorial",
    "title": "Editorial Design",
    "statement": "Editorial Design.",
    "description": "An illustrative neighborhood pocket atlas.",
    "eyebrow": "SAMPLE WORK",
    "visual": "editorial",
    "entries": [
      {
        "title": "Neighborhood atlas",
        "label": "ILLUSTRATIVE EXAMPLE",
        "description": "An illustrative neighborhood pocket atlas.",
        "images": [],
        "projectTitle": "Neighborhood atlas"
      }
    ]
  },
  {
    "slug": "typography",
    "title": "Typography",
    "statement": "Typography.",
    "description": "Illustrative custom market lettering.",
    "eyebrow": "SAMPLE WORK",
    "visual": "design",
    "entries": [
      {
        "title": "Market letters",
        "label": "ILLUSTRATIVE EXAMPLE",
        "description": "Illustrative custom market lettering.",
        "images": [],
        "projectTitle": "Market letters"
      }
    ]
  },
  {
    "slug": "print",
    "title": "Print & Identity",
    "statement": "Print & Identity.",
    "description": "An illustrative small-press cover system.",
    "eyebrow": "SAMPLE WORK",
    "visual": "systems",
    "entries": [
      {
        "title": "Small press series",
        "label": "ILLUSTRATIVE EXAMPLE",
        "description": "An illustrative small-press cover system.",
        "images": [],
        "projectTitle": "Small press series"
      }
    ]
  }
];

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
  workCategories: developerCategories,
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
  workCategories: healthcareCategories,
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
  workCategories: designerCategories,
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
