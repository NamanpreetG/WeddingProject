export default function Venue() {
  return (
    <section id="venue" className="py-24 px-6 bg-gradient-to-b from-blush/10 to-ivory">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="section-subtitle mb-3">Where We Celebrate</p>
          <h2 className="section-title mb-2">The Venue</h2>
          <div className="ornament-divider my-8 max-w-xs mx-auto">
            <span className="text-gold text-sm">✦</span>
          </div>
          <p className="font-serif text-charcoal/60">
            Join us in Jalandhar, Punjab
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* Map */}
          <div className="relative rounded-sm overflow-hidden shadow-lg border border-gold/15">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d905885.9498817693!2d74.86120475!3d31.1471305!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391964abc6f34e71%3A0xee86af99c82cd695!2sPunjab%2C%20India!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="380"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Punjab, India — Wedding Venue"
            />
            {/* Gold frame overlay */}
            <div className="absolute inset-0 pointer-events-none border-2 border-gold/20 rounded-sm" />
          </div>

          {/* Details */}
          <div className="space-y-8">
            {/* Venue card */}
            <div className="bg-white/70 backdrop-blur-sm border border-gold/15 rounded-sm p-8 shadow-sm">
              <div className="flex items-start gap-4 mb-5">
                <div className="w-10 h-10 rounded-full bg-blush/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-lg">📍</span>
                </div>
                <div>
                  <h3 className="font-serif text-xl text-charcoal mb-1">
                    Punjab, India
                  </h3>
                  <p className="font-sans text-sm text-charcoal/60 leading-relaxed">
                    Venue to be decided — details will be shared with confirmed guests closer to the date.
                  </p>
                </div>
              </div>

              <div className="border-t border-gold/15 pt-5 space-y-3">
                <div className="flex items-center gap-3 text-sm font-sans text-charcoal/70">
                  <span className="text-gold">✦</span>
                  <span>2nd April 2027 — Friday</span>
                </div>
                <div className="flex items-center gap-3 text-sm font-sans text-charcoal/70">
                  <span className="text-gold">✦</span>
                  <span>Jalandhar, Punjab</span>
                </div>
                <div className="flex items-center gap-3 text-sm font-sans text-charcoal/70">
                  <span className="text-gold">✦</span>
                  <span>Exact location TBC</span>
                </div>
              </div>
            </div>

            {/* Travel note */}
            <div className="bg-blush/10 border border-blush/30 rounded-sm p-6">
              <h4 className="font-serif text-base text-charcoal mb-3 flex items-center gap-2">
                <span>✈️</span> Getting Here
              </h4>
              <p className="font-sans text-sm text-charcoal/60 leading-relaxed mb-4">
                Punjab is well-connected by air, rail, and road. The nearest
                major airport is Sri Guru Ram Dass Jee International Airport in
                Amritsar (ATQ). Chandigarh Airport (IXC) is also a convenient
                option.
              </p>
              <a
                href="https://www.google.com/maps/search/Punjab,+India"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-serif text-sm text-gold hover:text-gold-dark tracking-wide border-b border-gold/30 hover:border-gold transition-colors pb-px"
              >
                Open in Google Maps →
              </a>
            </div>

            {/* Accommodation note */}
            <div className="bg-white/50 border border-gold/15 rounded-sm p-6">
              <h4 className="font-serif text-base text-charcoal mb-2 flex items-center gap-2">
                <span>🏨</span> Accommodation
              </h4>
              <p className="font-sans text-sm text-charcoal/60 leading-relaxed">
                We will share recommended hotels and guest house options with
                confirmed RSVP guests. Please reach out if you need any
                assistance with travel arrangements.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
