import { LogoBlocks } from "./mu/FrameBox";

/* MU's "We're not the ones you should be listening to." wall, as a mixed-size grid: two big portraits
   anchor it, the smaller cards and the numbers fill around them. Classmates and figures from Tetr's homepage. */

/* Each number is drawn in blocks too: lit blocks out of a grid of 100 (or one block per ten students). */
type Cell = { p: string; name: string; from: string; big?: boolean; hd?: string } | { v: string; l: string; lit: number; of: number; key: string };
const CELLS: Cell[] = [
  { p: "tribe-andrea-2", hd: "tribe-andrea-hd", name: "Andrea", from: "Venezuela", big: true },
  { v: "800+", l: "students", lit: 80, of: 80, key: "one block, ten students" },
  { p: "tribe-diya-2", name: "Diya", from: "India" },
  { v: "70+", l: "nationalities", lit: 70, of: 100, key: "one block, one nationality" },
  { p: "tribe-steve-2", name: "Steve", from: "Costa Rica" },
  { p: "tribe-kayla-2", hd: "tribe-kayla-hd", name: "Kayla", from: "Indonesia", big: true },
  { v: "45+", l: "languages", lit: 45, of: 100, key: "one block, one language" },
  { p: "tribe-brandon-2", name: "Brandon", from: "USA" },
  { v: "30%", l: "ran a business before Tetr", lit: 30, of: 100, key: "one block, one percent" },
  { p: "tribe-fathiyya-2", name: "Fathiyya", from: "Indonesia" },
  { p: "tribe-isaac-2", name: "Isaac", from: "USA" },
  { v: "10%", l: "national-level athletes", lit: 10, of: 100, key: "one block, one percent" },
  { p: "tribe-shaurya-2", name: "Shaurya", from: "India" },
  { v: "1490", l: "average score", lit: 93, of: 100, key: "out of 1600" },
];

export default function Tribe() {
  return (
    <section id="tribe" className="section tribe" aria-labelledby="tribe-title">
      <div className="container">
        <header className="tribe__head">
          <h2 id="tribe-title" className="t-h2" data-reveal="lines">The people you travel with are half the reason to go.</h2>
          <p className="t-body tribe__intro" data-reveal>Everything changes every term except the people beside you: founders who have already raised money, TEDx speakers and national-level athletes. Every pitch, project and 2am idea gets sharper because of who is in the room.</p>
        </header>
        <ul className="tribe__grid">
          {CELLS.map((c, i) =>
            "p" in c ? (
              <li key={i} className={`tribe__card tribe__card--p${c.big ? " is-big" : ""}`}>
                <span className="tribe__ph">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`/img/x/${c.hd ?? c.p}.webp`} alt={`${c.name}, a Tetr student from ${c.from}`} loading="lazy" />
                </span>
                <span className="tribe__who"><b>{c.name}</b><span>{c.from}</span></span>
              </li>
            ) : (
              <li key={i} className={`tribe__card tribe__card--s tribe__card--t${i % 3}`}>
                <LogoBlocks className="tribe__logo" />
                <b>{c.v}</b>
                <span>{c.l}</span>
                <span className="tribe__dots" style={{ "--cols": c.of === 80 ? 10 : 10 } as React.CSSProperties} aria-hidden="true">
                  {Array.from({ length: c.of }, (_, k) => <i key={k} className={k < c.lit ? "on" : ""} style={{ "--k": k } as React.CSSProperties} />)}
                </span>
                <small className="tribe__key">{c.key}</small>
              </li>
            ),
          )}
        </ul>
      </div>
    </section>
  );
}
