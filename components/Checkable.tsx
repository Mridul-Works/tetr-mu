import FrameBox from "./mu/FrameBox";
import BlockField from "./mu/BlockField";
import BlockTrail from "./mu/BlockTrail";

/* MU's "Everything on this page is checkable. Please check it.": text cards and photos that
   step down the page, tied together by a line. MU's line is a painted arc; Tetr's is a stepped
   block line. Facts: Career Labs Report 2025-26 and Tetr's term reports. */
export default function Checkable() {
  return (
    <section id="checkable" className="has-bfield section bg-grid chk" aria-labelledby="chk-title">
      <BlockTrail />
      <BlockField pieces={[{ c: -10, r: 2, shape: "logo", tone: "pink" }, { c: 7, r: 1, shape: "L", tone: "yellow" }, { c: -5, r: 7, shape: "O", tone: "blank" }, { c: -9, r: 10, shape: "T", tone: "mint" }, { c: 8, r: 9, shape: "S", tone: "pink" }, { c: 4, r: 14, shape: "I", tone: "blank" }, { c: -8, r: 16, shape: "J", tone: "yellow" }, { c: 6, r: 17, shape: "logo", tone: "mint" }, { c: -2, r: 21, shape: "O", tone: "blank" }]} />
      <div className="container">
        <FrameBox className="chk__title"><h2 id="chk-title" className="t-h2" data-reveal="lines">Everything on this page is checkable. Please check it.</h2></FrameBox>
        <div className="chk__flow">
          <figure className="chk__ph chk__ph--1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/img/x/event-ifg.webp" alt="Students presenting at the IFG x Tetr business competition" loading="lazy" />
          </figure>
          <p className="chk__card chk__card--1" data-reveal>Our Career Labs Report covers the full 2025&ndash;26 academic year: <b>314</b> internships placed across <b>23</b> countries and regions, <b>$204K+</b> in stipends earned by the cohort, <b>110+</b> recruiters, and <b>216</b> CXOs hosted on campus in the last two years.</p>
          <p className="chk__card chk__card--2" data-reveal>Terms publish their own reports, with the numbers behind each business: the Dropshipping report from Dubai, the D2C report from India, the Kickstarter report from China and the NGO report from Ghana.</p>
          <figure className="chk__ph chk__ph--2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/img/x/india-acad.webp" alt="A Tetr class in session" loading="lazy" />
          </figure>
          <figure className="chk__ph chk__ph--3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/img/x/event-persuasion.webp" alt="A Tetr session on stage" loading="lazy" />
          </figure>
          <p className="chk__card chk__card--3" data-reveal>Where a term&rsquo;s numbers are not in yet, we say so, as on the Argentina and Europe cards above. Programme locations can change from term to term, and we would rather you knew that now.</p>
        </div>
        <div className="chk__links">
          <a href="https://online.flippingbook.com/view/706350447/" target="_blank" rel="noopener noreferrer">Read the Career Labs report <span className="chk__pdf">PDF</span></a>
          <span className="proof__report-sep" aria-hidden="true" />
          <a href="https://online.flippingbook.com/view/313823554/" target="_blank" rel="noopener noreferrer">Download the handbook<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6" /></svg></a>
        </div>
      </div>
    </section>
  );
}
