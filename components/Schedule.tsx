import React from "react";

const EVENTS = [
  {
    time: "Time TBC",
    title: "Anand Karaj Ceremony",
    description:
      "The sacred Sikh wedding ceremony takes place at the Gurudwara, blessed by the holy scripture and four rounds around the Guru Granth Sahib.",
    icon: "🕊️",
  },
  {
    time: "Time TBC",
    title: "Wedding Luncheon",
    description:
      "A traditional Punjabi feast with family and friends. Enjoy an elaborate spread of authentic dishes in celebration.",
    icon: "🍽️",
  },
];

export default function Schedule() {
  return (
    <section id="schedule" className="py-24 px-6 bg-ivory">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <p className="section-subtitle mb-3">Wedding Day</p>
          <h2 className="section-title mb-2">The Schedule</h2>
          <div className="ornament-divider my-8 max-w-xs mx-auto">
            <span className="text-gold text-sm">✦</span>
          </div>
          <p className="font-serif text-charcoal/60">
            2nd April 2027 · Jalandhar, Punjab
          </p>
        </div>

        <div className="relative">
          {/* Vertical timeline line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold/30 to-transparent hidden md:block" />

          <div className="space-y-12">
            {EVENTS.map((event, index) => (
              <div
                key={index}
                className={`flex flex-col md:flex-row items-center gap-6 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Content card */}
                <div
                  className={`flex-1 ${
                    index % 2 === 0 ? "md:text-right" : "md:text-left"
                  }`}
                >
                  <div
                    className={`inline-block bg-white/70 backdrop-blur-sm border border-gold/15 rounded-sm p-6 shadow-sm hover:shadow-md transition-shadow duration-300 ${
                      index % 2 === 0 ? "md:ml-auto" : ""
                    }`}
                  >
                    <p className="font-serif text-xs tracking-widest uppercase text-gold mb-2">
                      {event.time}
                    </p>
                    <h3 className="font-serif text-xl text-charcoal mb-2">
                      {event.title}
                    </h3>
                    <p className="font-sans text-sm text-charcoal/60 leading-relaxed">
                      {event.description}
                    </p>
                  </div>
                </div>

                {/* Center icon */}
                <div className="relative z-10 flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-ivory border-2 border-gold/40 flex items-center justify-center shadow-sm">
                    <span className="text-lg">{event.icon}</span>
                  </div>
                </div>

                {/* Spacer for alternating layout */}
                <div className="flex-1 hidden md:block" />
              </div>
            ))}
          </div>
        </div>

        {/* Note */}
        <div className="mt-16 text-center">
          <div className="inline-block border border-blush/40 rounded-sm px-8 py-4 bg-blush/5">
            <p className="font-serif text-sm text-charcoal/60 italic">
              ✦ Times are approximate and may be adjusted closer to the event ✦
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
