"use client";
import { useEffect, useRef } from "react";
import { OPEN_DAYS } from "@/lib/content";

/* The three open days on Saturday, as admission tickets. Each shows the local time and, quietly,
   the same moment in the visitor's own time zone. */
export default function OpenDays() {
  const root = useRef<HTMLElement>(null);
  // written straight into the page after load, so the server render and the visitor's clock never disagree
  useEffect(() => {
    const sec = root.current!;
    const fmt = new Intl.DateTimeFormat(undefined, { weekday: "short", hour: "numeric", minute: "2-digit", timeZoneName: "short" });
    sec.querySelectorAll<HTMLElement>("[data-yours]").forEach((el) => {
      const d = OPEN_DAYS[Number(el.dataset.yours)];
      el.innerHTML = `Your time: <b>${fmt.format(new Date(d.start))}</b>`;
    });
    // whole calendar days from today to Saturday 28 November, in the visitor's own calendar
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const n = Math.round((new Date(2026, 10, 28).getTime() - today.getTime()) / 86400000);
    const when = n > 1 ? `in ${n} days` : n === 1 ? "tomorrow" : n === 0 ? "today" : "";
    const h = sec.querySelector<HTMLElement>("[data-when]");
    if (h && when) h.textContent = `, ${when}.`;
  }, []);
  return (
    <section id="events" className="section bg-grid opend" aria-labelledby="opend-title" ref={root}>
      <div className="container">
        <header className="sec-head">
          <div className="frame-box">
            <span className="frame-box__corner frame-box__corner--tl" aria-hidden="true" /><span className="frame-box__corner frame-box__corner--tr" aria-hidden="true" />
            <span className="frame-box__corner frame-box__corner--bl" aria-hidden="true" /><span className="frame-box__corner frame-box__corner--br" aria-hidden="true" />
            <h2 id="opend-title" className="t-h2">Can&rsquo;t wait to see it for yourself? Come meet us<span data-when>.</span></h2>
          </div>
          <p className="t-body sec-head__intro">Tetr Connect open days run in three cities on Saturday 28 November. Meet the team, hear about the seven-country programme and meet future classmates.</p>
        </header>
        <ul role="list" className="opend__row">
          {OPEN_DAYS.map((d, i) => (
            <li key={d.city} className="ticket">
              <div className="ticket__main">
                <p className="t-xs ticket__kick">Tetr Connect · Open day</p>
                <h3 className="ticket__city">{d.city}</h3>
                <p className="t-small ticket__when">Sat 28 Nov · {d.local}</p>
                <p className="t-xs ticket__venue">{d.venue}</p>
                <p className="t-xs ticket__yours" data-yours={i}> </p>
              </div>
              <div className="ticket__stub" aria-hidden="true">
                <span className="ticket__code">{d.code}</span>
                <span className="ticket__admit">Admit one</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
