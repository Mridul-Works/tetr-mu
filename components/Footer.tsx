import { APPLY_URL } from "@/lib/content";

const COLS: [string, [string, string][]][] = [
  ["Programmes", [["Bachelor's", "https://tetr.com"], ["Master's", "https://tetr.com"], ["Executive", "https://tetr.com"], ["Summer & Winter", "https://tetr.com"], ["Gap Year", "https://tetr.com"]]],
  ["Outcomes", [["Career Labs", "https://tetr.com"], ["Dropshipping report", "https://online.flippingbook.com/view/631102570/"], ["D2C report", "https://online.flippingbook.com/view/1009456202/"], ["Kickstarter report", "https://online.flippingbook.com/view/918723207/"], ["NGO report", "https://online.flippingbook.com/view/111707919/"]]],
  ["Tetr", [["About", "https://tetr.com"], ["Faculty", "https://tetr.com/faculty"], ["Events", "https://tetr.com"], ["News", "https://tetr.com"]]],
];

export default function Footer() {
  return (
    <footer className="foot" aria-labelledby="foot-title">
      <h2 id="foot-title" className="sr-only">Tetr College of Business</h2>
      <div className="container">
        <div className="foot__cols">
          {COLS.map(([h, links]) => (
            <nav key={h} aria-label={h}>
              <p className="foot__h">{h}</p>
              <ul role="list">{links.map(([t, href]) => <li key={t}><a href={href}>{t}</a></li>)}</ul>
            </nav>
          ))}
          <div className="foot__apply">
            <p className="foot__h">Applications</p>
            <a href={APPLY_URL} className="btn btn--primary btn--light"><span className="btn__label">Apply</span></a>
            <p className="t-xs foot__mail"><a href="mailto:info@tetr.org">info@tetr.org</a></p>
          </div>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="foot__logo" src="/img/tetr-logo.webp" width={510} height={255} alt="Tetr College of Business" loading="lazy" />
        <p className="t-xs foot__legal">© 2026 Tetr College of Business. Programme locations can change term to term.</p>
      </div>
    </footer>
  );
}
