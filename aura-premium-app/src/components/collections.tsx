'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { collections } from './aura-data';

function getCollectionHref(id: string) {
  return `/shop?collection=${id}`;
}

export function Collections() {
  return (
    <section id="collections" className="section-space">
      <div className="container-shell">
        <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-[720px]">
            <p className="text-xs uppercase tracking-[0.28em] text-[var(--text-soft)]">
              Seasonal architecture
            </p>
            <h2 className="display-font mt-3 text-5xl leading-none md:text-6xl">
              Collections with a premium visual rhythm
            </h2>
          </div>

          <p className="max-w-[42ch] text-[var(--text-muted)]">
            The Aura brand is strongest when the product world is grouped by
            season, mood, and visual character, so the interface merchandises
            flavors as curated collections rather than a flat catalog.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {collections.map((item, index) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: index * 0.06 }}
              className="group premium-card overflow-hidden rounded-[30px] p-0 transition duration-300 hover:-translate-y-1"
            >
              <Link
                href={getCollectionHref(item.id)}
                aria-label={`View ${item.title}`}
                className="block h-full focus-visible:outline-none"
              >
                {item.image ? (
                  <div className="relative h-[320px] w-full overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/22 via-black/8 to-transparent" />
                  </div>
                ) : (
                  <div
                    className={`h-[320px] w-full bg-gradient-to-br ${item.accent}`}
                  />
                )}

                <div className="flex min-h-[250px] flex-col p-6 md:p-7">
                  <div className="text-xs uppercase tracking-[0.28em] text-[var(--text-soft)]">
                    {item.subtitle}
                  </div>

                  <div className="mt-4 flex items-start justify-between gap-4">
                    <h3 className="display-font text-4xl leading-tight">
                      {item.title}
                    </h3>

                    <span className="mt-1 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--surface-line)] bg-white/55 text-[var(--text)] backdrop-blur-sm transition group-hover:bg-white/80">
                      <ArrowUpRight size={18} />
                    </span>
                  </div>

                  <p className="mt-4 text-sm leading-7 text-[var(--text-muted)]">
                    {item.description}
                  </p>

                  <div className="mt-auto pt-6 text-sm font-medium text-[var(--text)]">
                    View collection
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
