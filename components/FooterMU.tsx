import { APPLY_URL } from "@/lib/content";
import FooterLogo from "./FooterLogo";
import DotHover from "./mu/DotHover";

/* MU's footer: four link columns with a coloured rule, a giant logo over a dot field, badges and
   the legal line. MU's rules are gradient strokes; Tetr's are its seven blocks. Links from tetr.com. */
const COLS: [string, [string, string][]][] = [
  ["Programmes", [["Bachelor's", "https://tetr.com/bachelors-management-technology"], ["BS in Artificial Intelligence", "https://tetr.com/bs-artificial-intelligence"], ["Finance & AI", "https://tetr.com/bachelor-finance-ai"], ["Integrated Bachelors & Masters", "https://tetr.com/asu"], ["Launchpad", "https://tetr.com/launchpad"]]],
  ["Outcomes", [["Career Labs", "https://tetr.com/careers"], ["Career Labs report", "https://online.flippingbook.com/view/706350447/"], ["Dropshipping report", "https://online.flippingbook.com/view/302562882/"], ["D2C report", "https://online.flippingbook.com/view/1009456202/"], ["Student entrepreneurship", "https://tetr.com/entrepreneurship"]]],
  ["Tetr", [["About", "https://tetr.com/about"], ["Faculty", "https://tetr.com/faculty"], ["Student life", "https://tetr.com/student-life"], ["Experiences at Tetr", "https://tetr.com/experiences-at-tetr"], ["Events", "https://tetr.com/events"]]],
  ["More", [["Blog", "https://tetr.com/blog"], ["Resources", "https://tetr.com/resources"], ["UG brochure", "https://online.flippingbook.com/view/874446259/2/"], ["PG brochure", "https://online.flippingbook.com/view/633252028/"], ["Contact us", "https://tetr.com/contact-us"]]],
];
const PRINTS: [string, string][] = [["dubai", "Dubai"], ["india", "India"], ["china", "China"], ["ghana", "Ghana"], ["usa", "USA"], ["argentina", "Argentina"], ["europe", "Europe"]];

export default function FooterMU() {
  return (
    <footer className="ft" aria-labelledby="ft-title" data-tone="dark">
      <DotHover size={7} alpha={0.07} />
      <h2 id="ft-title" className="sr-only">Tetr College of Business</h2>
      <div className="container">
        <div className="ft__cols">
          {COLS.map(([h, links], i) => (
            <nav key={h} aria-label={h} className="ft__col" style={{ "--i": i } as React.CSSProperties}>
              <p className="ft__h">{h}<span className="ft__rule" aria-hidden="true"><i /><i /><i /><i /><i /><i /><i /></span></p>
              <ul role="list">{links.map(([t, href]) => <li key={t}><a href={href} target="_blank" rel="noopener noreferrer">{t}</a></li>)}</ul>
            </nav>
          ))}
          <div className="ft__apply">
            <a href={APPLY_URL} className="btn btn--primary btn--light"><span className="btn__label">Apply</span></a>
            <a className="ft__mail" href="mailto:info@tetr.org">info@tetr.org</a>
          </div>
        </div>
        <div className="ft__logo-wrap"><FooterLogo /></div>
        {/* the route, as its seven prints: every country's riso art in one band */}
        <ul className="ft__prints" aria-label="The seven countries on the route">
          {PRINTS.map(([key, name], i) => (
            <li key={key} className={`ft__print ft__print--${key}`} style={{ "--i": i } as React.CSSProperties}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/art/giant/${key}-color.webp`} alt="" loading="lazy" />
              <span>{name}</span>
            </li>
          ))}
        </ul>
        <ul className="ft__badges" role="list">
          <li>QS Reimagine Education, Gold Winner 2025</li>
          <li>Most Innovative Business School of 2025</li>
        </ul>
        <div className="ft__legal">
          <p>© 2026 Tetr College of Business. All rights reserved.</p>
          <p className="ft__legal-links"><a href="https://tetr.com/privacy-policy">Privacy policy</a><a href="https://tetr.com/terms-conditions">Terms &amp; conditions</a><a href="https://tetr.com/refund-policy">Refund policy</a></p>
        </div>
      </div>
    </footer>
  );
}
