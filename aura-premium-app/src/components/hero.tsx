'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="absolute inset-0 -z-20">
        <video
          className="hero-video h-full w-full object-cover"
          src="/Aura-video.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
      </div>

      <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(20,18,16,0.45)_0%,rgba(20,18,16,0.38)_35%,rgba(20,18,16,0.52)_100%)]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.16),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(201,166,92,0.14),transparent_26%)]" />

      <div className="container-shell section-space relative flex min-h-[88svh] items-center pt-24 pb-20 md:min-h-[92svh]">
        <div className="grid w-full items-end gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)]">
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-[760px]"
          >
            <div className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[11px] uppercase tracking-[0.28em] text-white/88 backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-[#f0d28a]" />
              Seasonal collections • Premium hydration
            </div>

            <h1 className="display-font mt-6 max-w-[12ch] text-5xl leading-[0.95] text-white drop-shadow-[0_8px_32px_rgba(0,0,0,0.18)] md:text-7xl">
              Soda reimagined for wellness and health.
            </h1>

            <p className="mt-6 max-w-[58ch] text-base leading-8 text-white/82 md:text-lg">
              A premium electrolyte soda experience shaped by flavor design,
              botanical elegance, and everyday refreshment. Discover seasonal
              collections with a cleaner, more elevated identity.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/shop"
                className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-stone-900 transition hover:bg-[#f7f2e8]"
              >
                Shop the collection
              </Link>

              <a
                href="#collections"
                className="rounded-full border border-white/22 bg-white/10 px-6 py-3 text-sm font-medium text-white backdrop-blur-md transition hover:bg-white/16"
              >
                Explore seasons
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.85,
              delay: 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="justify-self-start lg:justify-self-end"
          >
            <div className="premium-card max-w-[360px] rounded-[32px] border border-white/16 bg-white/10 p-6 text-white shadow-[0_24px_80px_rgba(0,0,0,0.18)] backdrop-blur-xl">
              <div className="text-[11px] uppercase tracking-[0.28em] text-[#6b4d39]">
                
              </div>
              <h2 className="display-font mt-3 text-3xl leading-tight text-[#6b4d39]">
                A refined lifestyle for modern hydration
              </h2>
              <p className="mt-4 text-sm leading-7 text-[#332421]">
                Seasonal flavor worlds, premium ingredients, and a softer visual
                language that feels more like luxury hospitality than
                conventional soda.
              </p>

              <div className="mt-6 grid gap-3">
                <div className="rounded-[22px] border border-white/12 bg-black/10 px-4 py-3">
                  <div className="text-[11px] uppercase tracking-[0.22em] text-[#332421]">
                    Positioning
                  </div>
                  <div className="mt-1 text-sm font-medium text-[#332421]">
                    Premium electrolyte soda
                  </div>
                </div>

                <div className="rounded-[22px] border border-white/12 bg-black/10 px-4 py-3">
                  <div className="text-[11px] uppercase tracking-[0.22em] text-[#332421]">
                    Experience
                  </div>
                  <div className="mt-1 text-sm font-medium text-[#332421]">
                    Botanical, sparkling, elevated
                  </div>
                </div>

                <div className="rounded-[22px] border border-white/12 bg-black/10 px-4 py-3">
                  <div className="text-[11px] uppercase tracking-[0.22em] text-[#332421]">
                    Collections
                  </div>
                  <div className="mt-1 text-sm font-medium text-[#332421]">
                    Winter, Spring, Summer, Autumn
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
