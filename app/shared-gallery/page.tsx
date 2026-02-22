import SharedGallery from "@/components/SharedGallery";
import Link from "next/link";

export const metadata = {
  title: "Shared Gallery — Karminder & Simranjit",
  description: "Share and view photos from our celebration.",
};

export default function SharedGalleryPage() {
  return (
    <main className="min-h-screen bg-ivory">
      {/* Nav */}
      <nav className="bg-ivory/95 backdrop-blur-sm shadow-sm py-4 px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="font-serif text-sm tracking-widest uppercase text-charcoal/70 hover:text-gold transition-colors duration-300"
          >
            ← Back
          </Link>
          <p className="font-script text-2xl text-charcoal">
            Karminder &amp; Simranjit
          </p>
          <div className="w-16" />
        </div>
      </nav>

      <SharedGallery />

      {/* Footer */}
      <footer className="py-12 bg-charcoal text-ivory/60 text-center">
        <p className="font-script text-3xl text-blush mb-2">
          Karminder &amp; Simranjit
        </p>
        <p className="font-serif text-xs tracking-widest uppercase mb-6">
          2nd April 2027 · Jalandhar, Punjab
        </p>
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-16 h-px bg-gold/30" />
          <span className="text-gold/60 text-sm">✦</span>
          <div className="w-16 h-px bg-gold/30" />
        </div>
        <p className="font-sans text-xs text-ivory/30">
          Made with love ♥ by Naman
        </p>
      </footer>
    </main>
  );
}
