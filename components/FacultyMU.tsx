import FrameBox from "./mu/FrameBox";
import { FACULTY } from "@/lib/content";

/* MU's dark "Half your teachers still have a company to run.": the mix on the left, a staggered
   wall of portraits with an organisation badge on the right. Tetr's 40 / 30 / 30 and its faculty. */

const BADGE: Record<string, string> = {
  faverie: "logo-estee", lanma: "logo-nyu", rogers: "logo-nasa", zal: "logo-harvard", nitin: "logo-stanford",
  daniel: "logo-cornell", zvi: "logo-chicago", hayton: "logo-warwick", shad: "logo-mit",
};
// MU's staggered wall: [column, row] on a 3 x 4 grid
const SLOT: [number, number][] = [[1, 1], [2, 1], [3, 1], [1, 2], [2, 3], [3, 2], [1, 4], [2, 4], [3, 4]];

export default function FacultyMU() {
  const people = FACULTY.flatMap((g) => g.people);
  return (
    <section id="faculty" className="section fac2" aria-labelledby="fac2-title" data-tone="dark">
      <div className="container">
        <header className="fac2__head">
          <FrameBox dark className="fac2__title"><h2 id="fac2-title" className="t-h2" data-reveal="lines">The people teaching you have run NASA&rsquo;s knowledge office, Estée Lauder and SoftBank India.</h2></FrameBox>
          <p className="t-body fac2__intro" data-reveal>Every class at Tetr is a &ldquo;how to&rdquo;, taught by someone who has made those calls in real companies. When you&rsquo;re stuck on pricing in Dubai or fundraising in the US, 100+ mentors are a message away.</p>
        </header>
        <div className="fac2__body">
          <ol className="fac2__mix">
            {FACULTY.map((g, i) => (
              <li key={g.title} className="fac2__share" style={{ "--i": i } as React.CSSProperties}>
                <b>{g.share}<small>%</small></b>
                <span className="fac2__share-t">{g.title}</span>
                <span className="fac2__share-l">{g.line}</span>
              </li>
            ))}
          </ol>
          <ul className="fac2__wall">
            {people.map((p, i) => (
              <li key={p.img} className="fac2__card" style={{ gridColumn: SLOT[i][0], gridRow: SLOT[i][1] }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="fac2__photo" src={`/img/faculty/${p.img}.webp`} alt={p.name} loading="lazy" />
                <span className="fac2__badge">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`/img/x/${BADGE[p.img]}.webp`} alt="" loading="lazy" />
                </span>
                <span className="fac2__who"><b>{p.name}</b><span>{p.role}</span></span>
              </li>
            ))}
          </ul>
        </div>
        <a className="fac2__more" href="https://tetr.com/faculty" target="_blank" rel="noopener noreferrer">Meet the faculty<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6" /></svg></a>
      </div>
    </section>
  );
}
