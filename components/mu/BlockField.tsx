"use client";
import { useState } from "react";

/* Tetr's blocks laid into MU's grid paper: a few cells filled in soft pink, yellow and mint (tetris-like
   pieces, one of them the logo itself), and a few "blank" pieces in the paper colour that hide some of the
   grid lines. They blink now and then. Hover a piece and it warms a shade; click it and it turns a
   quarter, like a falling Tetris piece. Decoration only: it sits behind the content. */

type Tone = "pink" | "yellow" | "mint" | "blank";
export type Piece = { c: number; r: number; shape: keyof typeof SHAPES; tone: Tone };

export const SHAPES = {
  logo: [[0, 0], [1, 0], [2, 0], [3, 0], [1, 1], [2, 1], [3, 1]],
  L: [[0, 0], [0, 1], [0, 2], [1, 2]],
  J: [[1, 0], [1, 1], [1, 2], [0, 2]],
  T: [[0, 0], [1, 0], [2, 0], [1, 1]],
  S: [[1, 0], [2, 0], [0, 1], [1, 1]],
  O: [[0, 0], [1, 0], [0, 1], [1, 1]],
  I: [[0, 0], [1, 0], [2, 0], [3, 0]],
  one: [[0, 0]],
} as const;

export default function BlockField({ pieces }: { pieces: Piece[] }) {
  const [turns, setTurns] = useState<number[]>(() => pieces.map(() => 0));
  return (
    <div className="bfield" aria-hidden="true">
      {pieces.map((p, i) => {
        const cells = SHAPES[p.shape];
        const w = Math.max(...cells.map(([x]) => x)) + 1, h = Math.max(...cells.map(([, y]) => y)) + 1;
        const live = p.tone !== "blank";
        return (
          <span key={i} className={`bpiece bpiece--${p.tone}`}
            style={{ "--c": p.c, "--r": p.r, "--d": i, "--w": w, "--h": h, rotate: `${turns[i] * 90}deg` } as React.CSSProperties}
            onClick={live ? () => setTurns((t) => t.map((v, k) => (k === i ? v + 1 : v))) : undefined}>
            {cells.map(([x, y], k) => <i key={k} style={{ "--x": x, "--y": y, "--k": k } as React.CSSProperties} />)}
          </span>
        );
      })}
    </div>
  );
}
