"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import clsx from "clsx";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};
const stagger: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const VP = { once: true, margin: "-100px" } as const;

type Property = {
  name: string;
  district: string;
  occupancy: number;
  growth: number;
};

const properties: Property[] = [
  { name: "Apartament Mariacki", district: "Stare Miasto", occupancy: 97, growth: 42 },
  { name: "Loft Kazimierz No. 4", district: "Kazimierz", occupancy: 94, growth: 38 },
  { name: "Apartament Dietla", district: "Kazimierz", occupancy: 91, growth: 35 },
  { name: "Willa Podgórze", district: "Podgórze", occupancy: 89, growth: 29 },
  { name: "Nowe Miasto Suite", district: "Stare Miasto", occupancy: 95, growth: 44 },
  { name: "Studio Nowa Huta", district: "Nowa Huta", occupancy: 87, growth: 31 },
];

const filters = ["wszystkie", "Kazimierz", "Stare Miasto", "Podgórze", "Nowa Huta"];

const caseStudies = [
  {
    title: "Kazimierz · 80 m²",
    beforeLabel: "Najem długoterminowy",
    beforeValue: "2 800 PLN/mies.",
    afterLabel: "Najem krótkoterminowy",
    afterValue: "7 400 PLN/mies.",
    growth: "+164%",
  },
  {
    title: "Stare Miasto · 35 m²",
    beforeLabel: "Puste mieszkanie",
    beforeValue: "0 PLN/mies.",
    afterLabel: "Najem krótkoterminowy",
    afterValue: "4 200 PLN/mies.",
    growth: "+∞",
  },
  {
    title: "Podgórze · 65 m²",
    beforeLabel: "Najem długoterminowy",
    beforeValue: "3 500 PLN/mies.",
    afterLabel: "Najem krótkoterminowy",
    afterValue: "5 800 PLN/mies.",
    growth: "+66%",
  },
];

function PropertyCard({ name, district, occupancy, growth }: Property) {
  return (
    <motion.div
      className="bg-bg group cursor-default"
      initial="rest"
      animate="rest"
      whileHover="hover"
    >
      {/* Image */}
      <div className="overflow-hidden" style={{ height: "clamp(180px, 18vw, 260px)" }}>
        <motion.div
          variants={{ rest: { scale: 1 }, hover: { scale: 1.03, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } } }}
          className="w-full h-full bg-sage/25"
        />
      </div>

      {/* Info */}
      <div className="p-8">
        <div className="flex items-start justify-between gap-4 mb-4">
          <h3 className="font-serif tracking-tight text-ink" style={{ fontSize: "clamp(20px, 1.8vw, 26px)" }}>
            {name}
          </h3>
          <span className="shrink-0 text-[10px] uppercase tracking-[0.2em] text-muted border border-muted px-2 py-0.5 mt-1">
            {district}
          </span>
        </div>

        {/* Metrics — slide up on hover */}
        <motion.div
          variants={{
            rest: { y: 16, opacity: 0 },
            hover: { y: 0, opacity: 1, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: 0.04 } },
          }}
          className="flex gap-8"
        >
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-muted mb-1">Obłożenie</p>
            <p className="font-serif text-3xl tracking-tight text-ink">{occupancy}%</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-muted mb-1">Wzrost przychodu</p>
            <p className="font-serif text-3xl tracking-tight text-sage">+{growth}%</p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function Realizacje() {
  const [active, setActive] = useState("wszystkie");

  const filtered =
    active === "wszystkie"
      ? properties
      : properties.filter((p) => p.district === active);

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="border-b border-muted">
        <motion.div
          className="max-w-layout mx-auto px-8 md:px-16 pt-20 md:pt-28 pb-14"
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.09 } } }}
        >
          <motion.p variants={fadeUp} className="text-[11px] uppercase tracking-[0.2em] text-muted mb-6">
            Portfolio
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="font-serif tracking-tight text-ink leading-[1.04]"
            style={{ fontSize: "clamp(44px, 5.5vw, 80px)" }}
          >
            Nasze realizacje
          </motion.h1>
          <motion.p variants={fadeUp} className="mt-5 text-lg text-muted max-w-xl leading-relaxed">
            Ponad 200 mieszkań przekształconych w dochodowe apartamenty. Oto wybrane przykłady.
          </motion.p>
        </motion.div>
      </section>

      {/* ── FILTER BAR ───────────────────────────────────────────── */}
      <section className="border-b border-muted sticky top-[68px] z-40 bg-bg">
        <div className="max-w-layout mx-auto px-8 md:px-16">
          <div className="flex items-center gap-0 overflow-x-auto scrollbar-none">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActive(f)}
                className={clsx(
                  "relative px-5 py-4 text-[11px] uppercase tracking-[0.2em] whitespace-nowrap transition-colors",
                  active === f ? "text-ink" : "text-muted hover:text-ink"
                )}
              >
                {f}
                {active === f && (
                  <motion.span
                    layoutId="filter-bar"
                    className="absolute bottom-0 left-0 right-0 h-px bg-ink"
                    transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROPERTY GRID ────────────────────────────────────────── */}
      <section className="border-b border-muted">
        <div className="max-w-layout mx-auto px-8 md:px-16 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-muted min-h-[400px]">
            <AnimatePresence mode="popLayout">
              {filtered.map((p) => (
                <motion.div
                  key={p.name}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.3 }}
                >
                  <PropertyCard {...p} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ── CASE STUDIES ─────────────────────────────────────────── */}
      <section className="border-b border-muted">
        <div className="max-w-layout mx-auto px-8 md:px-16 py-20 md:py-28">
          <motion.div initial="hidden" whileInView="show" viewport={VP} variants={stagger} className="mb-14">
            <motion.p variants={fadeUp} className="text-[11px] uppercase tracking-[0.2em] text-muted mb-4">
              Przed i po
            </motion.p>
            <motion.h2 variants={fadeUp} className="font-serif tracking-tight text-ink" style={{ fontSize: "clamp(34px, 4vw, 52px)" }}>
              Studia przypadków
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={VP}
            variants={stagger}
            className="flex flex-col gap-px bg-muted"
          >
            {caseStudies.map(({ title, beforeLabel, beforeValue, afterLabel, afterValue, growth }) => (
              <motion.div key={title} variants={fadeUp} className="bg-bg p-8 md:p-10">
                <p className="text-[10px] uppercase tracking-[0.2em] text-muted mb-6">{title}</p>

                {/* Before/after visual */}
                <div className="relative overflow-hidden mb-8" style={{ height: "clamp(140px, 16vw, 200px)" }}>
                  {/* Before half */}
                  <div className="absolute inset-0 right-1/2 bg-muted/40 flex flex-col items-center justify-center">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-muted mb-2">Przed</p>
                    <p className="font-serif text-xl tracking-tight text-muted">{beforeValue}</p>
                    <p className="text-[10px] text-muted mt-1">{beforeLabel}</p>
                  </div>
                  {/* After half */}
                  <div className="absolute inset-0 left-1/2 bg-sage/20 flex flex-col items-center justify-center">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-sage mb-2">Po</p>
                    <p className="font-serif text-xl tracking-tight text-ink">{afterValue}</p>
                    <p className="text-[10px] text-muted mt-1">{afterLabel}</p>
                  </div>
                  {/* Divider handle */}
                  <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-px bg-muted flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-bg border border-muted flex items-center justify-center z-10">
                      <span className="text-muted text-xs">⟷</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <p className="font-serif tracking-tight text-sage" style={{ fontSize: "clamp(28px, 3vw, 40px)" }}>
                    {growth}
                  </p>
                  <p className="text-sm text-muted">wzrost miesięcznych przychodów</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <section>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={VP}
          variants={stagger}
          className="max-w-layout mx-auto px-8 md:px-16 py-24 flex flex-col md:flex-row items-start md:items-end justify-between gap-8"
        >
          <motion.h2 variants={fadeUp} className="font-serif tracking-tight text-ink max-w-lg" style={{ fontSize: "clamp(34px, 4vw, 52px)" }}>
            Twoje mieszkanie może być następne.
          </motion.h2>
          <motion.div variants={fadeUp}>
            <Link href="/kontakt" className="inline-block px-8 py-3.5 bg-ink text-bg text-[11px] uppercase tracking-[0.2em] hover:bg-sage transition-colors whitespace-nowrap">
              Dodaj swoje mieszkanie
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}
