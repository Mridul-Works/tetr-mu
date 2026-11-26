// The seven terms of the Tetr route, in order. Copy and figures come from tetr.com
// (route section and the chapter reports), checked on 26 Nov 2026.

export type Term = {
  n: number;
  country: string;
  base: string;
  img: string;
  /** where the landmark sits in the photo, for square crops */
  focus: string;
  build: string;
  target: string;
  /** last cohort's published result, or the partners where no result is published */
  proof: { kind: "result"; value: string; of: string } | { kind: "partners"; value: string };
};

export const TERMS: Term[] = [
  {
    n: 1, country: "Dubai", base: "Tetr Base Camp, Dubai", img: "/img/route/dubai.webp", focus: "22% 50%",
    build: "An eCommerce brand for a global audience",
    target: "$25,000 revenue at a 30% margin",
    proof: { kind: "result", value: "$172K+", of: "earned by 59 student businesses" },
  },
  {
    n: 2, country: "India", base: "Tetr Base Camp, India", img: "/img/route/india.webp", focus: "50% 50%",
    build: "A direct-to-consumer brand",
    target: "$10,000 revenue",
    proof: { kind: "result", value: "$186,862", of: "earned by 21 student brands" },
  },
  {
    n: 3, country: "China", base: "Tetr Base Camp, China", img: "/img/route/china.webp", focus: "28% 50%",
    build: "A hardware product, launched on Kickstarter",
    target: "$20,000 from at least 100 backers",
    proof: { kind: "result", value: "$79,532", of: "raised by 17 campaigns" },
  },
  {
    n: 4, country: "Ghana", base: "Tetr Base Camp, Ghana", img: "/img/route/ghana.webp", focus: "38% 50%",
    build: "An NGO pilot for a local cause",
    target: "A positive impact on at least 200 lives",
    proof: { kind: "result", value: "11,530", of: "lives touched by 17 ventures" },
  },
  {
    n: 5, country: "USA", base: "Cornell University", img: "/img/route/usa.webp", focus: "24% 50%",
    build: "A tech startup chasing venture-scale growth",
    target: "Ship a product and win early users",
    proof: { kind: "partners", value: "The New York Times, Spotify, JPMorgan Chase" },
  },
  {
    n: 6, country: "Argentina", base: "Tetr Base Camp, Argentina", img: "/img/route/argentina.webp", focus: "24% 50%",
    build: "A green venture with sustainable cash flow",
    target: "Hold steady in a volatile economy",
    proof: { kind: "partners", value: "Grupo Los Grobo, Distrito Arcos" },
  },
  {
    n: 7, country: "Europe", base: "Tetr Base Camp, Madrid", img: "/img/route/europe.webp", focus: "32% 50%",
    build: "A social channel brands want to reach",
    target: "Grow an engaged audience",
    proof: { kind: "partners", value: "Iberdrola, La Nave, El Corte Inglés" },
  },
];

/** Tetr's logo is a 4 x 2 grid of blocks: three white on top with a fourth under the second,
 *  and a green block on the right. Term i sits in LOGO[i] = [column, row]. */
export const LOGO: [number, number][] = [[0, 0], [1, 0], [2, 0], [3, 0], [1, 1], [2, 1], [3, 1]];
/** terms that sit in the logo's green block */
export const GREEN = new Set([3, 5, 6]);
