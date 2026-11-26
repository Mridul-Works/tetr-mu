import FrameBox from "./mu/FrameBox";
import BlockTrail from "./mu/BlockTrail";

/* MU's "Terms abroad that actually count." with its wall of partner logos and two counts.
   Tetr's partner universities on the route, and the companies students go inside or intern at.
   MU's gradient stat edge is Tetr's seven blocks, stacked. */

const LOGOS: { src: string; alt: string; white?: boolean }[] = [
  { src: "/img/x/cornell.webp", alt: "Cornell University", white: true },
  { src: "/img/x/insead.webp", alt: "INSEAD", white: true },
  { src: "/img/unis/IMPERIAL.webp", alt: "Imperial College London", white: true },
  { src: "/img/x/fiit.webp", alt: "FITT, IIT Delhi", white: true },
  { src: "/img/x/illinois.webp", alt: "Illinois Tech", white: true },
  { src: "/img/x/ubi.webp", alt: "UBI Business School", white: true },
  { src: "/img/x/adelphi.webp", alt: "Adelphi University", white: true },
  { src: "/img/x/itc.svg", alt: "ITC" },
  { src: "/img/x/linkedin.svg", alt: "LinkedIn" },
  { src: "/img/x/nivia.svg", alt: "Nivia Sports" },
  { src: "/img/x/mckinsey.svg", alt: "McKinsey & Company" },
  { src: "/img/x/goldmansachs.svg", alt: "Goldman Sachs" },
  { src: "/img/x/deloitte.svg", alt: "Deloitte" },
  { src: "/img/x/siemens.svg", alt: "Siemens" },
  { src: "/img/x/toyota.svg", alt: "Toyota" },
  { src: "/img/x/nestle.svg", alt: "Nestlé" },
  { src: "/img/x/uber.svg", alt: "Uber" },
  { src: "/img/x/hp.svg", alt: "HP" },
  { src: "/img/x/reckitt.svg", alt: "Reckitt" },
  { src: "/img/x/pepsi.svg", alt: "PepsiCo" },
];
const ROWS = [6, 8, 6];

export default function Partners() {
  let k = 0;
  return (
    <section id="partners" className="section bg-grid partners" aria-labelledby="partners-title">
      <BlockTrail />
      <div className="container">
        <header className="partners__head">
          <FrameBox className="partners__title"><h2 id="partners-title" className="t-h2" data-reveal="lines">Some of the world&rsquo;s leading universities are on your route.</h2></FrameBox>
          <p className="t-body partners__intro" data-reveal>As you move across Tetr&rsquo;s base camps, you study at partner universities like Cornell, INSEAD and IIT. You learn from their faculty and walk their campuses, so the academic depth travels with the building. In every country, the companies come into the classroom too.</p>
        </header>
        <div className="partners__body">
          <p className="partners__stat partners__stat--l"><span className="partners__bar" aria-hidden="true"><i /><i /><i /><i /><i /><i /><i /></span><b>9</b><span>Partner universities</span></p>
          <div className="partners__wall">
            {ROWS.map((n, r) => (
              <ul key={r} className="partners__row" aria-label={r === 0 ? "Partner universities and companies" : undefined}>
                {Array.from({ length: n }, () => LOGOS[k++ % LOGOS.length]).map((l, i) => (
                  <li key={`${r}-${i}`} className="partners__tile">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={l.src} alt={l.alt} loading="lazy" className={l.white ? "is-white" : ""} />
                  </li>
                ))}
              </ul>
            ))}
          </div>
          <p className="partners__stat partners__stat--r"><span className="partners__bar" aria-hidden="true"><i /><i /><i /><i /><i /><i /><i /></span><b>7</b><span>Countries</span></p>
        </div>
      </div>
    </section>
  );
}
