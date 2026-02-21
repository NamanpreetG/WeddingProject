import Hero from "@/components/Hero";
import Countdown from "@/components/Countdown";
import Schedule from "@/components/Schedule";
import Venue from "@/components/Venue";
import Gallery from "@/components/Gallery";
import RSVP from "@/components/RSVP";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Countdown />
      <Schedule />
      <Venue />
      <Gallery />
      <RSVP />
      <Footer />
    </main>
  );
}

function Footer() {
  return (
    <footer className="py-12 bg-charcoal text-ivory/60 text-center">
      <p className="font-script text-3xl text-blush mb-2">
        Karminder &amp; Simranjit
      </p>
      <p className="font-serif text-xs tracking-widest uppercase mb-6">
        2nd April 2027 · Punjab, India
      </p>
      <div className="flex items-center justify-center gap-3 mb-6">
        <div className="w-16 h-px bg-gold/30" />
        <span className="text-gold/60 text-sm">✦</span>
        <div className="w-16 h-px bg-gold/30" />
      </div>
      <p className="font-sans text-xs text-ivory/30">
        Made with love ♥
      </p>
    </footer>
  );
}
