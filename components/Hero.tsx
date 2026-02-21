"use client";

import { useEffect, useState } from "react";

const NAV_LINKS = [
  { label: "Schedule", href: "#schedule" },
  { label: "Venue", href: "#venue" },
  { label: "Gallery", href: "#gallery" },
  { label: "RSVP", href: "#rsvp" },
];

// Decorative floral SVG elements
function FloralCorner({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Main stem */}
      <path
        d="M10 190 Q50 150 90 100 Q130 50 180 10"
        stroke="#C9A84C"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.6"
      />
      {/* Branch 1 */}
      <path
        d="M40 160 Q60 140 80 120"
        stroke="#C9A84C"
        strokeWidth="1"
        strokeLinecap="round"
        fill="none"
        opacity="0.5"
      />
      {/* Branch 2 */}
      <path
        d="M80 120 Q100 95 115 75"
        stroke="#C9A84C"
        strokeWidth="1"
        strokeLinecap="round"
        fill="none"
        opacity="0.5"
      />
      {/* Flowers */}
      <circle cx="80" cy="120" r="8" fill="#E8B4B8" opacity="0.7" />
      <circle cx="80" cy="112" r="5" fill="#F5D9DB" opacity="0.8" />
      <circle cx="88" cy="120" r="5" fill="#F5D9DB" opacity="0.8" />
      <circle cx="80" cy="128" r="5" fill="#F5D9DB" opacity="0.8" />
      <circle cx="72" cy="120" r="5" fill="#F5D9DB" opacity="0.8" />
      <circle cx="80" cy="120" r="3" fill="#C9A84C" opacity="0.9" />

      <circle cx="40" cy="160" r="6" fill="#E8B4B8" opacity="0.6" />
      <circle cx="40" cy="154" r="4" fill="#F5D9DB" opacity="0.7" />
      <circle cx="46" cy="160" r="4" fill="#F5D9DB" opacity="0.7" />
      <circle cx="40" cy="166" r="4" fill="#F5D9DB" opacity="0.7" />
      <circle cx="34" cy="160" r="4" fill="#F5D9DB" opacity="0.7" />
      <circle cx="40" cy="160" r="2.5" fill="#C9A84C" opacity="0.9" />

      <circle cx="130" cy="70" r="7" fill="#E8B4B8" opacity="0.65" />
      <circle cx="130" cy="63" r="4.5" fill="#F5D9DB" opacity="0.75" />
      <circle cx="137" cy="70" r="4.5" fill="#F5D9DB" opacity="0.75" />
      <circle cx="130" cy="77" r="4.5" fill="#F5D9DB" opacity="0.75" />
      <circle cx="123" cy="70" r="4.5" fill="#F5D9DB" opacity="0.75" />
      <circle cx="130" cy="70" r="2.5" fill="#C9A84C" opacity="0.9" />

      {/* Leaves */}
      <ellipse cx="60" cy="140" rx="10" ry="5" fill="#C9A84C" opacity="0.3" transform="rotate(-45 60 140)" />
      <ellipse cx="100" cy="95" rx="10" ry="5" fill="#C9A84C" opacity="0.3" transform="rotate(-45 100 95)" />
      <ellipse cx="155" cy="38" rx="8" ry="4" fill="#C9A84C" opacity="0.3" transform="rotate(-45 155 38)" />

      {/* Small dots */}
      <circle cx="115" cy="75" r="2" fill="#C9A84C" opacity="0.5" />
      <circle cx="150" cy="40" r="2" fill="#C9A84C" opacity="0.5" />
      <circle cx="170" cy="20" r="1.5" fill="#E8B4B8" opacity="0.6" />
    </svg>
  );
}

export default function Hero() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center bg-ivory overflow-hidden"
    >
      {/* Background texture */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, #C9A84C 1px, transparent 1px),
                            radial-gradient(circle at 75% 75%, #E8B4B8 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Corner florals */}
      <FloralCorner className="absolute top-0 left-0 w-48 md:w-64 opacity-80" />
      <FloralCorner className="absolute top-0 right-0 w-48 md:w-64 opacity-80 scale-x-[-1]" />
      <FloralCorner className="absolute bottom-0 left-0 w-48 md:w-64 opacity-80 scale-y-[-1]" />
      <FloralCorner className="absolute bottom-0 right-0 w-48 md:w-64 opacity-80 scale-x-[-1] scale-y-[-1]" />

      {/* Subtle center medallion */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[500px] h-[500px] rounded-full border border-gold/10 opacity-40" />
        <div className="absolute w-[400px] h-[400px] rounded-full border border-blush/20" />
      </div>

      {/* Nav */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-ivory/95 backdrop-blur-sm shadow-sm py-3"
            : "bg-transparent py-5"
        }`}
      >
        <ul className="flex items-center justify-center gap-6 md:gap-10">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-serif text-sm tracking-widest uppercase text-charcoal/70 hover:text-gold transition-colors duration-300"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 animate-fade-in">
        {/* Top ornament */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-px bg-gradient-to-r from-transparent to-gold/60" />
          <span className="text-gold text-xl">✦</span>
          <div className="w-16 h-px bg-gradient-to-l from-transparent to-gold/60" />
        </div>

        <p className="font-serif text-xs tracking-[0.4em] uppercase text-charcoal/50 mb-4">
          Together with their families
        </p>

        <h1 className="font-script text-7xl md:text-9xl text-charcoal leading-tight">
          Karminder
        </h1>

        <div className="flex items-center gap-4 my-2">
          <div className="w-24 h-px bg-gold/40" />
          <span className="font-serif text-gold text-2xl italic">&amp;</span>
          <div className="w-24 h-px bg-gold/40" />
        </div>

        <h1 className="font-script text-7xl md:text-9xl text-charcoal leading-tight">
          Simranjit
        </h1>

        <div className="flex items-center gap-4 mt-6 mb-2">
          <div className="w-16 h-px bg-gradient-to-r from-transparent to-gold/60" />
          <span className="text-gold text-xl">✦</span>
          <div className="w-16 h-px bg-gradient-to-l from-transparent to-gold/60" />
        </div>

        <p className="font-serif text-lg md:text-xl text-charcoal/60 tracking-widest mt-4">
          2nd April 2027
        </p>
        <p className="font-serif text-base md:text-lg text-charcoal/50 tracking-[0.2em] uppercase mt-1">
          Punjab, India
        </p>

        {/* CTA */}
        <a
          href="#rsvp"
          className="mt-10 px-10 py-3 border border-gold text-gold font-serif text-sm tracking-widest uppercase hover:bg-gold hover:text-ivory transition-all duration-300 rounded-sm"
        >
          Kindly RSVP
        </a>

        {/* Scroll indicator */}
        <div className="mt-16 flex flex-col items-center gap-2 animate-float">
          <span className="font-serif text-xs tracking-widest text-charcoal/40 uppercase">
            Scroll
          </span>
          <div className="w-px h-8 bg-gradient-to-b from-gold/50 to-transparent" />
        </div>
      </div>
    </section>
  );
}
