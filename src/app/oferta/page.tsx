"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import DodatkoweUslugi from "@/components/DodatkoweUslugi";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const VP = { once: true, margin: "-100px" } as const;

const services = [
  {
    title: "Zarządzanie rezerwacjami",
    desc: "Multi-calendar management na Airbnb, Booking.com i 10+ platformach. Dynamic pricing i strategia cenowa w czasie rzeczywistym.",
    num: "01",
  },
  {
    title: "Obsługa gości 24/7",
    desc: "Check-in, check-out i komunikacja z gościem przez całą dobę. Wsparcie na każdym etapie pobytu.",
    num: "02",
  },
  {
    title: "Sprzątanie i pralnia",
    desc: "Własna ekipa sprzątająca po każdym gościu. Własna pralnia — świeże ręczniki i pościel na każdy pobyt.",
    num: "03",
  },
  {
    title: "Naprawy i usterki",
    desc: "Własny zespół techniczny reaguje w ciągu 24h. Drobne naprawy bez angażowania właściciela.",
    num: "04",
  },
  {
    title: "Monitoring i optymalizacja",
    desc: "Bieżące śledzenie wyników, analiza danych, optymalizacja cen i kalendarza dostępności.",
    num: "05",
  },
  {
    title: "Raportowanie i rozliczenia",
    desc: "Miesięczny raport przychodów i kosztów. Przelew na Twoje konto do 10. dnia każdego miesiąca.",
    num: "06",
  },
];

const processTeaserSteps = [
  {
    num: "1",
    title: "Konsultacja",
    desc: "Bezpłatna wizyta i wstępna wycena potencjału nieruchomości.",
  },
  {
    num: "2",
    title: "Analiza",
    desc: "Porównujemy Twoje mieszkanie z rynkiem i szacujemy przychody.",
  },
  {
    num: "3",
    title: "Oferta",
    desc: "Przedstawiamy zakres współpracy, prowizję i harmonogram działań.",
  },
];

export default function Oferta() {
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
          <motion.p
            variants={fadeUp}
            className="text-[11px] uppercase tracking-[0.2em] text-muted mb-6"
          >
            Strefa klienta
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="font-serif tracking-tight text-ink leading-[1.04] max-w-3xl"
            style={{ fontSize: "clamp(44px, 5.5vw, 80px)" }}
          >
            Kompleksowe zaplecze operacyjne
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mt-6 text-lg text-muted max-w-xl leading-relaxed"
          >
            Pełna obsługa Twojego mieszkania — od gościa po rozliczenie.
            Nie musisz robić nic.
          </motion.p>
        </motion.div>

        {/* Full-bleed image */}
        <motion.div
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="w-full h-[320px] md:h-[520px] bg-sage/20 overflow-hidden"
        >
          <div className="w-full h-full bg-gradient-to-b from-sage/10 to-sage/30" />
        </motion.div>
      </section>

      {/* ── 6-SERVICE GRID ───────────────────────────────────────── */}
      <section className="border-b border-muted">
        <div className="max-w-layout mx-auto px-8 md:px-16 py-20 md:py-28">
          <motion.p
            initial="hidden"
            whileInView="show"
            viewport={VP}
            variants={fadeUp}
            className="text-[11px] uppercase tracking-[0.2em] text-muted mb-16"
          >
            Zakres usług
          </motion.p>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={VP}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-px bg-muted"
          >
            {services.map(({ num, title, desc }) => (
              <motion.div
                key={num}
                variants={fadeUp}
                className="bg-bg p-8 md:p-10 group"
              >
                <p className="text-[10px] uppercase tracking-[0.2em] text-muted mb-6">
                  {num}
                </p>
                <h3
                  className="font-serif tracking-tight text-ink mb-4 group-hover:text-sage transition-colors"
                  style={{ fontSize: "clamp(22px, 2vw, 28px)" }}
                >
                  {title}
                </h3>
                <p className="text-sm text-muted leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── USŁUGI DODATKOWE ─────────────────────────────────────── */}
      <section className="border-b border-muted">
        <div className="max-w-layout mx-auto px-8 md:px-16 py-16 md:py-24">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={VP}
            variants={stagger}
            className="mb-12"
          >
            <motion.p
              variants={fadeUp}
              className="text-[11px] uppercase tracking-[0.2em] text-muted mb-4"
            >
              Wyróżnia nas
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-serif tracking-tight text-ink max-w-xl"
              style={{ fontSize: "clamp(34px, 4vw, 52px)" }}
            >
              Usługi dodatkowe
            </motion.h2>
          </motion.div>
        </div>

        <DodatkoweUslugi />
      </section>

      {/* ── PROCESS TEASER ───────────────────────────────────────── */}
      <section className="border-b border-muted">
        <div className="max-w-layout mx-auto px-8 md:px-16 py-20 md:py-28">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={VP}
            variants={stagger}
            className="mb-14"
          >
            <motion.p
              variants={fadeUp}
              className="text-[11px] uppercase tracking-[0.2em] text-muted mb-4"
            >
              Jak zacząć
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-serif tracking-tight text-ink"
              style={{ fontSize: "clamp(34px, 4vw, 52px)" }}
            >
              Trzy kroki do współpracy
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={VP}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-px bg-muted"
          >
            {processTeaserSteps.map(({ num, title, desc }) => (
              <motion.div
                key={num}
                variants={fadeUp}
                className="bg-bg p-8 md:p-10"
              >
                <p
                  className="font-serif tracking-tight text-muted/50 leading-none mb-6"
                  style={{ fontSize: "clamp(48px, 5vw, 64px)" }}
                >
                  {num}
                </p>
                <h3
                  className="font-serif tracking-tight text-ink mb-3"
                  style={{ fontSize: "clamp(20px, 2vw, 26px)" }}
                >
                  {title}
                </h3>
                <p className="text-sm text-muted leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={VP}
            variants={fadeUp}
            className="mt-10"
          >
            <Link
              href="/jak-dzialamy"
              className="group inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-muted hover:text-ink transition-colors"
            >
              <span>Poznaj pełny proces współpracy</span>
              <span className="group-hover:translate-x-1.5 transition-transform duration-300">
                →
              </span>
            </Link>
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
          <motion.h2
            variants={fadeUp}
            className="font-serif tracking-tight text-ink max-w-lg"
            style={{ fontSize: "clamp(34px, 4vw, 52px)" }}
          >
            Gotowy, żeby zacząć zarabiać?
          </motion.h2>
          <motion.div variants={fadeUp} className="shrink-0">
            <Link
              href="/kontakt"
              className="inline-block px-8 py-3.5 bg-ink text-bg text-[11px] uppercase tracking-[0.2em] hover:bg-sage transition-colors whitespace-nowrap"
            >
              Dodaj mieszkanie
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}
