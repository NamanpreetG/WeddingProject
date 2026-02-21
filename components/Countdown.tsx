"use client";

import { useEffect, useState } from "react";

const WEDDING_DATE = new Date("2027-04-02T10:00:00+05:30");

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateTimeLeft(): TimeLeft {
  const now = new Date();
  const diff = WEDDING_DATE.getTime() - now.getTime();

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / 1000 / 60) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        {/* Card */}
        <div className="w-14 h-14 sm:w-20 sm:h-20 md:w-28 md:h-28 bg-white/80 backdrop-blur-sm border border-gold/20 rounded-sm flex items-center justify-center shadow-sm">
          <span className="font-serif text-2xl sm:text-4xl md:text-5xl text-charcoal tabular-nums">
            {String(value).padStart(2, "0")}
          </span>
        </div>
        {/* Corner accents */}
        <div className="absolute -top-1 -left-1 w-2 h-2 sm:w-3 sm:h-3 border-t border-l border-gold/50" />
        <div className="absolute -top-1 -right-1 w-2 h-2 sm:w-3 sm:h-3 border-t border-r border-gold/50" />
        <div className="absolute -bottom-1 -left-1 w-2 h-2 sm:w-3 sm:h-3 border-b border-l border-gold/50" />
        <div className="absolute -bottom-1 -right-1 w-2 h-2 sm:w-3 sm:h-3 border-b border-r border-gold/50" />
      </div>
      <span className="mt-2 sm:mt-3 font-serif text-[10px] sm:text-xs tracking-widest uppercase text-charcoal/50">
        {label}
      </span>
    </div>
  );
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-blush/10 to-ivory">
      <div className="max-w-4xl mx-auto text-center">
        <p className="section-subtitle mb-3">The Big Day Is Coming</p>
        <h2 className="section-title mb-2">Count&shy;down</h2>

        <div className="ornament-divider my-8 max-w-xs mx-auto">
          <span className="text-gold text-sm">✦</span>
        </div>

        <p className="font-serif text-charcoal/60 mb-12">
          Until we say &ldquo;I do&rdquo; on 2nd April 2027
        </p>

        {mounted ? (
          <div className="flex items-center justify-center gap-2 sm:gap-6 md:gap-10">
            <CountdownUnit value={timeLeft.days} label="Days" />
            <div className="text-gold/60 text-xl sm:text-3xl font-serif pb-6 sm:pb-8">:</div>
            <CountdownUnit value={timeLeft.hours} label="Hours" />
            <div className="text-gold/60 text-xl sm:text-3xl font-serif pb-6 sm:pb-8">:</div>
            <CountdownUnit value={timeLeft.minutes} label="Minutes" />
            <div className="text-gold/60 text-xl sm:text-3xl font-serif pb-6 sm:pb-8">:</div>
            <CountdownUnit value={timeLeft.seconds} label="Seconds" />
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2 sm:gap-6 md:gap-10">
            {["Days", "Hours", "Minutes", "Seconds"].map((label) => (
              <div key={label} className="flex flex-col items-center">
                <div className="w-14 h-14 sm:w-20 sm:h-20 md:w-28 md:h-28 shimmer rounded-sm" />
                <span className="mt-2 sm:mt-3 font-serif text-[10px] sm:text-xs tracking-widest uppercase text-charcoal/50">
                  {label}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
