/* MU's framed box with ringed corners (its "selection box" heading). */
export default function FrameBox({ className = "", dark = false, children }: { className?: string; dark?: boolean; children: React.ReactNode }) {
  return (
    <div className={`frame-box${dark ? " frame-box--dark" : ""} ${className}`}>
      <span className="frame-box__corner frame-box__corner--tl" aria-hidden="true" />
      <span className="frame-box__corner frame-box__corner--tr" aria-hidden="true" />
      <span className="frame-box__corner frame-box__corner--bl" aria-hidden="true" />
      <span className="frame-box__corner frame-box__corner--br" aria-hidden="true" />
      {children}
    </div>
  );
}

/* The Tetr logo as seven blocks on a 4 x 2 grid (bottom-left empty, three green). */
export function LogoBlocks({ className = "" }: { className?: string }) {
  return (
    <span className={`logo-blocks ${className}`} aria-hidden="true">
      <i /><i /><i /><i className="g" /><i className="x" /><i /><i className="g" /><i className="g" />
    </span>
  );
}
