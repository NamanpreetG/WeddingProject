"use client";

import { useState, useCallback } from "react";
import Image from "next/image";

// Placeholder gallery items — swap src for real photos
// Add new photos to public/images/ and list them here
const GALLERY_ITEMS = [
  { id: 1,  src: "/images/IMG_8645.jpeg", alt: "Family celebration",  span: "col-span-1 row-span-2" },
  { id: 2,  src: "/images/IMG_9428.JPG",  alt: "Family gathering",    span: "col-span-1 row-span-1" },
  { id: 3,  src: "/images/IMG_9439.JPG",  alt: "Family portrait",     span: "col-span-1 row-span-2" },
  { id: 4,  src: "/images/IMG_9442.JPG",  alt: "Celebration together", span: "col-span-1 row-span-1" },
  { id: 5,  src: "/images/IMG_9443.JPG",  alt: "Together",            span: "col-span-1 row-span-1" },
  { id: 6,  src: "/images/IMG_9444.JPG",  alt: "Celebration",         span: "col-span-1 row-span-2" },
  { id: 7,  src: "/images/IMG_9445.JPG",  alt: "Family moment",       span: "col-span-1 row-span-1" },
  { id: 8,  src: "/images/IMG_9449.JPG",  alt: "Together",            span: "col-span-1 row-span-1" },
  { id: 9,  src: "/images/IMG_9450.JPG",  alt: "Family",              span: "col-span-1 row-span-1" },
  { id: 10, src: "/images/IMG_9453.JPG",  alt: "Celebration",         span: "col-span-1 row-span-2" },
  { id: 11, src: "/images/IMG_9455.JPG",  alt: "Family portrait",     span: "col-span-1 row-span-1" },
  { id: 12, src: "/images/IMG_9457.JPG",  alt: "Together",            span: "col-span-1 row-span-1" },
  { id: 13, src: "/images/IMG_9458.JPG",  alt: "Family gathering",    span: "col-span-1 row-span-1" },
];

export default function Gallery() {
  const [lightboxImg, setLightboxImg] = useState<{
    src: string;
    alt: string;
  } | null>(null);

  const openLightbox = useCallback((src: string, alt: string) => {
    setLightboxImg({ src, alt });
    document.body.style.overflow = "hidden";
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxImg(null);
    document.body.style.overflow = "";
  }, []);

  return (
    <section id="gallery" className="py-24 px-6 bg-ivory">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="section-subtitle mb-3">Captured Moments</p>
          <h2 className="section-title mb-2">Gallery</h2>
          <div className="ornament-divider my-8 max-w-xs mx-auto">
            <span className="text-gold text-sm">✦</span>
          </div>
          <p className="font-serif text-charcoal/60">
            Photos coming soon ✦
          </p>
        </div>

        {/* Masonry-style grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 auto-rows-[200px]">
          {GALLERY_ITEMS.map((item) => (
            <div
              key={item.id}
              className={`relative overflow-hidden rounded-sm cursor-pointer group ${item.span}`}
              onClick={() => openLightbox(item.src, item.alt)}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/20 transition-colors duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-ivory/90 rounded-full p-3">
                  <svg
                    className="w-5 h-5 text-gold"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                    />
                  </svg>
                </div>
              </div>
              {/* Border overlay */}
              <div className="absolute inset-0 border border-white/10 rounded-sm pointer-events-none" />
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox */}
      {lightboxImg && (
        <div
          className="fixed inset-0 z-50 bg-charcoal/90 backdrop-blur-sm flex items-center justify-center p-4 lightbox-overlay"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-ivory/80 hover:text-ivory transition-colors bg-charcoal/50 rounded-full p-2"
            aria-label="Close"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div
            className="relative max-w-4xl w-full max-h-[85vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-[85vh]">
              <Image
                src={lightboxImg.src}
                alt={lightboxImg.alt}
                fill
                className="object-contain"
                sizes="100vw"
              />
            </div>
            {/* Gold border frame */}
            <div className="absolute inset-0 border border-gold/30 pointer-events-none" />
          </div>
        </div>
      )}
    </section>
  );
}
