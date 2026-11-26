import FrameBox, { LogoBlocks } from "./mu/FrameBox";
import BlockTrail from "./mu/BlockTrail";

/* MU's "Where student ideas become companies": a sticky intro on the left (MU's globe becomes
   Tetr's logo blocks) and a stack of cards that pile up as you scroll. Tetr's pitch series and
   ventures, from its homepage and venture posters. */

const CARDS = [
  { name: "Tetr Tank", kind: "series", metric: "3 episodes · Dubai", sub: "Dubai's dropshipping teams pitch Shark-Tank style for real investment.", img: "/img/x/tetr-tank-trailer.webp", foot: "Watch the series", href: "https://tetr.com" },
  { name: "Brand Wars", kind: "series", metric: "3 episodes · India", sub: "The top 7 D2C brands pitch to the founders of Tetr, Rare Rabbit and The Moms Co.", img: "/img/x/launchpad-pitch.webp", foot: "Watch the series", href: "https://tetr.com" },
  { name: "Pitch Please", kind: "series", metric: "6 episodes · India", sub: "Founders from 45 nations build D2C brands in India, on camera.", img: "/img/x/pitch-please-trailer.webp", foot: "Watch the series", href: "https://tetr.com" },
  { name: "Serve Club", kind: "venture", metric: "$5,286 revenue", sub: "Carbon-fiber pickleball rackets. Raised outside funding.", img: "/img/x/serve.webp", foot: "Built in the India D2C term", href: "" },
  { name: "Cossmoss", kind: "venture", metric: "$1,709 revenue", sub: "India's first sea moss brand, by student founders.", img: "/img/x/cossmoss-thumbnail.webp", foot: "Built in the India D2C term", href: "" },
];

export default function Pitches() {
  return (
    <section id="pitches" className="section bg-grid pitch" aria-labelledby="pitch-title">
      <BlockTrail />
      <div className="container pitch__grid">
        <div className="pitch__side">
          <FrameBox className="pitch__title"><h2 id="pitch-title" className="t-h2" data-reveal="lines">Your final exam? Convincing investors your business is worth backing.</h2></FrameBox>
          <p className="t-body pitch__intro" data-reveal>No multiple choice and no second attempts. Just you, your numbers, and a room of people who write real cheques. Tetr students have already raised over $300K this way.</p>
          <div className="pitch__obj" aria-hidden="true">
            <LogoBlocks className="pitch__logo" />
          </div>
        </div>
        <ol className="pitch__stack">
          {CARDS.map((c, i) => (
            <li key={c.name} className="pitch__card" style={{ "--i": i } as React.CSSProperties}>
              <div className="pitch__top">
                <span className={`pitch__name pitch__name--${c.kind}`}>{c.name}</span>
                <span className="pitch__rule" aria-hidden="true" />
                <span className="pitch__metric"><b>{c.metric}</b><span>{c.sub}</span></span>
              </div>
              <figure className={`pitch__fig pitch__fig--${c.kind}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={c.img} alt={`${c.name}`} loading="lazy" />
              </figure>
              {c.href ? <a className="pitch__foot" href={c.href} target="_blank" rel="noopener noreferrer">{c.foot}<span aria-hidden="true"> →</span></a> : <p className="pitch__foot">{c.foot}</p>}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
