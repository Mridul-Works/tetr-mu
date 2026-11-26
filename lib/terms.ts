// The seven Tetr terms, written for the MU-style term card.
// Every figure and partner comes from tetr.com (route section + chapter reports), checked 26 Nov 2026.
import type { CultureKind } from "@/components/Culture";

export type Sticker = {
  /** MU sticker coordinates: centre x/y and size in "sticker units", rotation in deg */
  x: number; y: number; w: number; h: number; r?: number;
  src?: string;
  /** a paper note with words on it (MU's tstk__note) */
  note?: string;
  /** our own postage stamp: the term photo inside MU's perforated stamp edge */
  stamp?: string;
  /** our own postmark: city name on a cancel ring */
  postmark?: { city: string; line: string };
  /** stickers sit on the photo's bottom-left corner (MU); "tr" pins them to the top-right, where a postcard's stamp goes */
  corner?: "tr";
  /** MU's "paper" note is rotated 90deg; the torn notes are not */
  paper?: "orange" | "torn" | "pad";
  /** a real-world object from that country (components/Culture.tsx) */
  culture?: CultureKind;
};

export type TermCard = {
  n: number;
  country: string;
  label: string;
  tint: string;
  title: string;
  copy: string;
  chips: string[];
  source?: { label: string; href: string };
  img: string;
  alt: string;
  focus: string;
  /** Argentina and Europe are still ahead: the photo is shown as a postcard */
  postcard?: { place: string };
  overhang: number;
  stickers: Sticker[];
};

export const TERMS: TermCard[] = [
  {
    n: 1, country: "Dubai", label: "Sell to the world", tint: "#f5c942",
    title: "Week one, you have nothing. By term's end, strangers are paying you.",
    copy: "Build an eCommerce brand for a global audience: five products, $25,000 in revenue and a 30% margin. Last cohort, 59 student businesses earned $172K+ between them.",
    chips: ["eCommerce", "$25,000 target", "30% margin"],
    source: { label: "Dropshipping report", href: "https://online.flippingbook.com/view/631102570/" },
    img: "/img/terms/dropshipping-video.webp", focus: "50% 40%",
    alt: "Two Tetr students on stage at Tetr Tank, the dropshipping challenge, in front of a green screen.",
    overhang: 165.9,
    stickers: [
      { x: -65.4, y: -89.2, w: 200.9, h: 118.3, r: -1.5, note: "“Five products,<br>one real P&amp;L”", paper: "orange" },
      { x: 176, y: -36, w: 250, h: 150, r: 6, culture: "souk-tag" },
    ],
  },
  {
    n: 2, country: "India", label: "Build a brand", tint: "#fdc484",
    title: "You build a brand for buyers who weigh every rupee.",
    copy: "Launch a direct-to-consumer brand: find your customer, test your pricing and build a route to market, with a $10,000 revenue target. Last cohort, 21 student brands earned $186,862.",
    chips: ["D2C brand", "$10,000 target", "Pee Safe"],
    source: { label: "D2C report", href: "https://online.flippingbook.com/view/1009456202/" },
    img: "/img/terms/d2c-brand-stall.webp", focus: "50% 45%",
    alt: "Tetr students at Startup Bazaar holding a cheque for ten thousand.",
    overhang: 197.8,
    stickers: [
      { x: 196, y: -40, w: 250, h: 124, r: -5, culture: "rail-india" },
      { x: -61.8, y: -24.5, w: 140, h: 140, r: -8, src: "/art/stamp-green.webp" },
    ],
  },
  {
    n: 3, country: "China", label: "Launch hardware", tint: "#f6b0a6",
    title: "You design a product, then get a hundred strangers to back it.",
    copy: "Make a hardware product in the world's workshop and launch it on Kickstarter, aiming for $20,000 from at least 100 backers. Last cohort, 17 campaigns raised $79,532.",
    chips: ["Hardware", "Kickstarter", "100+ backers"],
    source: { label: "Kickstarter report", href: "https://online.flippingbook.com/view/918723207/" },
    img: "/img/terms/kickstarter-showdown-products.webp", focus: "50% 55%",
    alt: "Products made by Tetr students for their Kickstarter campaigns, laid out on a table.",
    overhang: 168.7,
    stickers: [
      { x: -56.4, y: -40, w: 224.6, h: 162.5, r: -3, note: "$20,000 from<br>100 backers", paper: "torn" },
      { x: 108, y: -96, w: 150, h: 150, r: 7, culture: "seal-china" },
    ],
  },
  {
    n: 4, country: "Ghana", label: "Run an NGO", tint: "#b7e0c7",
    title: "Here, your grade is how many lives you change.",
    copy: "Run an NGO pilot for a local cause, build partnerships and mobilise support to positively impact at least 200 lives. Last cohort, 17 ventures touched 11,530 lives.",
    chips: ["NGO pilot", "200+ lives", "Meltwater"],
    source: { label: "NGO report", href: "https://online.flippingbook.com/view/111707919/" },
    img: "/img/terms/nsuo_nkwah.webp", focus: "50% 50%",
    alt: "Tetr students drawing with children at a school in Ghana.",
    overhang: 168,
    stickers: [
      { corner: "tr", x: -40, y: 34, w: 300, h: 50, r: 32, culture: "kente" },
      { x: 62, y: -40, w: 132, h: 132, r: 7, note: "200+<br>lives", paper: "pad" },
    ],
  },
  {
    n: 5, country: "USA", label: "Ship a startup", tint: "#b4c8f2",
    title: "You ship a tech product and chase venture-scale growth.",
    copy: "Based at Cornell University. Ship a product, win early users and learn how capital backs ambitious companies, with visits to The New York Times, Spotify and JPMorgan Chase.",
    chips: ["Cornell University", "Tech startup", "Early users"],
    img: "/img/terms/USA_Met_Group.webp", focus: "50% 40%",
    alt: "The Tetr cohort on the steps of the Metropolitan Museum of Art in New York.",
    overhang: 160,
    stickers: [
      { x: -30, y: -70, w: 200, h: 214, r: -6, src: "/art/plane.webp" },
      { x: 150, y: -40, w: 250, h: 158, r: 5, culture: "transit-usa" },
    ],
  },
  {
    n: 6, country: "Argentina", label: "Go green", tint: "#b0e4f3",
    title: "You build a green venture in an economy that never sits still.",
    copy: "Argentina pairs vast farmland with some of the strongest wind and solar in the Americas. Build a green venture with sustainable cash flow, where every assumption gets tested.",
    chips: ["Green venture", "Cash flow", "Grupo Los Grobo"],
    img: "/img/terms/argentina-bg.webp", focus: "50% 50%",
    alt: "Postcard of Buenos Aires: the Obelisco and the purple jacaranda trees along Avenida 9 de Julio.",
    postcard: { place: "Buenos Aires" },
    overhang: 162,
    stickers: [
      { corner: "tr", x: -78, y: 92, w: 112, h: 150, r: 4, stamp: "/img/terms/argentina-bg.webp" },
      { corner: "tr", x: -150, y: 118, w: 150, h: 150, r: -12, postmark: { city: "BUENOS AIRES", line: "TERM 6" } },
      { x: 70, y: -52, w: 300, h: 126, r: -4, culture: "filete" },
    ],
  },
  {
    n: 7, country: "Europe", label: "Grow an audience", tint: "#f4d5de",
    title: "You grow an audience that brands want to reach.",
    copy: "Based in Madrid. Find your creative niche, turn local stories into content and grow a social channel people follow, with Iberdrola, La Nave and El Corte Inglés.",
    chips: ["Madrid", "Social channel", "La Nave"],
    img: "/img/terms/europe-bg.webp", focus: "50% 50%",
    alt: "Postcard of Madrid: the Metrópolis building on Gran Vía.",
    postcard: { place: "Madrid" },
    overhang: 162,
    stickers: [
      { corner: "tr", x: -78, y: 92, w: 112, h: 150, r: -3, stamp: "/img/terms/europe-bg.webp" },
      { corner: "tr", x: -150, y: 120, w: 150, h: 150, r: 10, postmark: { city: "MADRID · ESPAÑA", line: "TERM 7" } },
      { x: -24, y: -190, w: 132, h: 132, r: -7, culture: "azulejo" },
    ],
  },
];
