"use client";

import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import clsx from "clsx";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};
const stagger: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const VP = { once: true, margin: "-100px" } as const;

type Article = {
  date: string;
  tag: string;
  title: string;
  excerpt: string;
};

const articles: Article[] = [
  {
    date: "12 maja 2025",
    tag: "Zarządzanie",
    title: "Jak przygotować mieszkanie pod wynajem krótkoterminowy",
    excerpt: "Poznaj 7 kroków, które sprawią, że Twoje mieszkanie będzie generować wyższe przychody już od pierwszego miesiąca.",
  },
  {
    date: "5 maja 2025",
    tag: "Rynek",
    title: "Sezon letni 2025: co przyniesie krakowskiemu rynkowi?",
    excerpt: "Analizujemy dane rezerwacyjne i prognozy popytu turystycznego na kolejne miesiące.",
  },
  {
    date: "28 kwietnia 2025",
    tag: "Homestaging",
    title: "Homestaging krok po kroku: efekt premium bez dużych nakładów",
    excerpt: "Kilka prostych zmian, które znacząco podnoszą oceny gości i wypełniają kalendarz rezerwacji.",
  },
  {
    date: "20 kwietnia 2025",
    tag: "Zarządzanie",
    title: "Dynamic pricing w praktyce: jak zwiększyć przychody o 30%",
    excerpt: "Jak dynamiczne ceny i dane rynkowe przekładają się na realne wyniki w naszym portfelu.",
  },
  {
    date: "12 kwietnia 2025",
    tag: "Inwestycje",
    title: "Inwestycja w apartament na wynajem: czy warto w 2025?",
    excerpt: "Obliczamy ROI dla mieszkań w Krakowie i porównujemy z innymi formami lokowania kapitału.",
  },
  {
    date: "3 kwietnia 2025",
    tag: "Rynek",
    title: "5 powodów, dla których Kraków jest najlepszym miastem do STR",
    excerpt: "Turystyka, akademicy, konferencje — dlaczego Kraków bije rekordy w krótkoterminowym najmie.",
  },
];

const tags = ["Wszystkie", "Zarządzanie", "Rynek", "Homestaging", "Inwestycje"];

export default function Blog() {
  const [active, setActive] = useState("Wszystkie");

  const filtered =
    active === "Wszystkie" ? articles : articles.filter((a) => a.tag === active);

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
            Wiedza
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="font-serif tracking-tight text-ink leading-[1.04]"
            style={{ fontSize: "clamp(44px, 5.5vw, 80px)" }}
          >
            Blog
          </motion.h1>
          <motion.p variants={fadeUp} className="mt-5 text-lg text-muted max-w-xl leading-relaxed">
            Analizy, porady i komentarze ekspertów Squarestate o rynku nieruchomości w Krakowie.
          </motion.p>
        </motion.div>
      </section>

      {/* ── TAG FILTER ───────────────────────────────────────────── */}
      <section className="border-b border-muted sticky top-[68px] z-40 bg-bg">
        <div className="max-w-layout mx-auto px-8 md:px-16">
          <div className="flex items-center gap-0 overflow-x-auto">
            {tags.map((t) => (
              <button
                key={t}
                onClick={() => setActive(t)}
                className={clsx(
                  "relative px-5 py-4 text-[11px] uppercase tracking-[0.2em] whitespace-nowrap transition-colors",
                  active === t ? "text-ink" : "text-muted hover:text-ink"
                )}
              >
                {t}
                {active === t && (
                  <motion.span
                    layoutId="blog-filter"
                    className="absolute bottom-0 left-0 right-0 h-px bg-ink"
                    transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── ARTICLE GRID ─────────────────────────────────────────── */}
      <section className="border-b border-muted">
        <div className="max-w-layout mx-auto px-8 md:px-16 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-muted">
            {filtered.map(({ date, tag, title, excerpt }) => (
              <article key={title} className="bg-bg group cursor-pointer">
                <div className="aspect-[4/3] overflow-hidden bg-sage/15">
                  <div className="w-full h-full bg-sage/10 group-hover:scale-[1.04] transition-transform duration-700" />
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-3">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-muted">{date}</p>
                    <span className="text-muted">·</span>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-sage">{tag}</p>
                  </div>
                  <h3 className="font-serif text-xl tracking-tight text-ink mb-3 group-hover:text-sage transition-colors leading-snug">
                    {title}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed mb-5">{excerpt}</p>
                  <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-ink group-hover:gap-3 transition-all duration-300">
                    Czytaj dalej
                    <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── WKRÓTCE — TABLICA INFORMACYJNA ──────────────────────── */}
      <section>
        <div className="max-w-layout mx-auto px-8 md:px-16 py-20 md:py-28">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={VP}
            variants={stagger}
            className="border border-muted p-8 md:p-16 max-w-2xl mx-auto text-center"
          >
            <motion.p variants={fadeUp} className="text-[10px] uppercase tracking-[0.2em] text-muted mb-6">
              Wkrótce
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-serif tracking-tight text-ink mb-4"
              style={{ fontSize: "clamp(28px, 3.5vw, 44px)" }}
            >
              Tablica informacyjna dla SQUARE
            </motion.h2>
            <motion.p variants={fadeUp} className="text-muted leading-relaxed mb-8">
              Pracujemy nad wewnętrzną tablicą informacyjną dla całego zespołu Squarestate —
              dedykowaną przestrzenią do komunikacji, ogłoszeń i wiedzy operacyjnej.
              Dostęp będzie wymagał logowania.
            </motion.p>
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-6 py-2.5 border border-muted text-[11px] uppercase tracking-[0.2em] text-muted">
              <span className="w-1.5 h-1.5 rounded-full bg-sage animate-pulse" />
              W przygotowaniu
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
