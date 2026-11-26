import type { Metadata } from "next";
import { Instrument_Sans, Newsreader } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";
import "./sections.css";
import "./mu.css";
import "./mu2.css";
import "./mu3.css";
import "./mu4.css";
import "./mobile.css";

// MU's own pairing: Newsreader stands in for Season Serif (MU's declared fallback), Instrument Sans for body and UI
const serif = Newsreader({ variable: "--font-serif", subsets: ["latin"], axes: ["opsz"], display: "swap" });
const plex = Instrument_Sans({ variable: "--font-plex", subsets: ["latin"], axes: ["wdth"], display: "swap" });

export const metadata: Metadata = {
  title: "Tetr College of Business: learn business by doing business, across the globe",
  description: "Global Bachelor's and Master's programs in Management & Technology. Every term, a new country and a real business.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${serif.variable} ${plex.variable}`}>
      <body>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
