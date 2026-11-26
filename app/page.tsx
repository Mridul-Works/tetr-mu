import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Proof from "@/components/Proof";
import Arch from "@/components/Arch";
import Terms from "@/components/Terms";
import Immersions from "@/components/Immersions";
import Partners from "@/components/Partners";
import Programmes from "@/components/Programmes";
import Launchpad from "@/components/Launchpad";
import Statement from "@/components/Statement";
import Pitches from "@/components/Pitches";
import FacultyMU from "@/components/FacultyMU";
import Radio from "@/components/Radio";
import Quote from "@/components/Quote";
import Tribe from "@/components/Tribe";
import Press from "@/components/Press";
import Checkable from "@/components/Checkable";
import ApplyCta from "@/components/ApplyCta";
import FooterMU from "@/components/FooterMU";
import RevealAll from "@/components/mu/RevealAll";

/* Masters' Union's homepage, section for section, carrying Tetr's content and Tetr's blocks. */
export default function Home() {
  return (
    <>
      <Header />
      <main id="top">
        <Hero />
        <Proof />
        <Arch />
        <Terms />
        <Immersions />
        <Partners />
        <Programmes />
        <Launchpad />
        <Statement />
        <Pitches />
        <FacultyMU />
        <Radio />
        <Quote />
        <Tribe />
        <Press />
        <Checkable />
        <ApplyCta />
      </main>
      <FooterMU />
      <RevealAll />
    </>
  );
}
