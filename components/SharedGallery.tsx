"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import PhotoUpload from "./PhotoUpload";

interface Photo {
  thumb: string;
  full: string;
  alt: string;
  width: number;
  height: number;
}

export default function SharedGallery() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [lightboxImg, setLightboxImg] = useState<Photo | null>(null);

  async function fetchPhotos() {
    try {
      const res = await fetch("/api/shared-gallery");
      const data = await res.json();
      setPhotos(data.photos ?? []);
    } catch {
      setPhotos([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPhotos();
  }, []);

  const openLightbox = useCallback((photo: Photo) => {
    setLightboxImg(photo);
    document.body.style.overflow = "hidden";
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxImg(null);
    document.body.style.overflow = "";
  }, []);

  return (
    <section id="shared-gallery" className="py-24 px-6 bg-gradient-to-b from-blush/10 to-ivory">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="section-subtitle mb-3">From Our Guests</p>
          <h2 className="section-title mb-2">Shared Gallery</h2>
          <div className="ornament-divider my-8 max-w-xs mx-auto">
            <span className="text-gold text-sm">✦</span>
          </div>
          <p className="font-serif text-charcoal/60">
            Share your favourite moments with us
          </p>
        </div>

        {/* Upload section */}
        <div className="mb-16">
          <PhotoUpload onUploaded={() => setTimeout(fetchPhotos, 2000)} />
        </div>

        {/* Divider */}
        {photos.length > 0 && (
          <div className="ornament-divider my-12 max-w-sm mx-auto">
            <span className="text-gold text-sm">✦</span>
          </div>
        )}

        {/* Guest photos */}
        {loading ? (
          <div className="columns-2 md:columns-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="shimmer rounded-sm w-full h-48 mb-4" />
            ))}
          </div>
        ) : photos.length === 0 ? (
          <div className="text-center py-8">
            <p className="font-serif text-charcoal/40 italic">
              No photos shared yet — be the first! ✦
            </p>
          </div>
        ) : (
          <div className="columns-2 md:columns-3 gap-3 md:gap-4">
            {photos.map((photo) => (
              <div
                key={photo.thumb}
                className="relative mb-3 md:mb-4 overflow-hidden rounded-sm cursor-pointer group break-inside-avoid"
                onClick={() => openLightbox(photo)}
              >
                <Image
                  src={photo.thumb}
                  alt={photo.alt}
                  width={photo.width}
                  height={photo.height}
                  className="w-full h-auto transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/20 transition-colors duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-ivory/90 rounded-full p-3">
                    <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

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
            className="relative max-w-4xl w-full max-h-[90vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={lightboxImg.full}
              alt={lightboxImg.alt}
              width={lightboxImg.width}
              height={lightboxImg.height}
              className="max-h-[90vh] w-auto h-auto object-contain border border-gold/30"
              sizes="100vw"
            />
          </div>
        </div>
      )}
    </section>
  );
}
