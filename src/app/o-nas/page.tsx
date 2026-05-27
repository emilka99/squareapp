"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};
const stagger: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const VP = { once: true, margin: "-100px" } as const;

const timeline = [
  { year: "2016", title: "Pierwsze mieszkanie", desc: "Start na Kazimierzu. Jeden apartament, jedno marzenie." },
  { year: "2018", title: "50 mieszkań", desc: "Własna ekipa sprzątająca, pierwsze standardy operacyjne." },
  { year: "2020", title: "100 mieszkań", desc: "Otwarcie własnej pralni i rozbudowa zaplecza technicznego." },
  { year: "2022", title: "Benno Aparthotel", desc: "Uruchomienie Benno — własnego aparthotelu w centrum Krakowa." },
  { year: "2024", title: "200+ mieszkań", desc: "Autorskie oprogramowanie PMS i rozbudowany ekosystem usług." },
];

const team = [
  {
    name: "Andrzej Wranik",
    role: "Partner",
    desc: "Założyciel i główny strateg. Rynek nieruchomości Krakowa od 2010 roku.",
    contact: null,
  },
  {
    name: "Sara Wabik",
    role: "Head of Business Development",
    desc: "Odpowiada za pozyskiwanie nowych nieruchomości i relacje z właścicielami.",
    contact: "sara.wabik@squareapartments.pl",
  },
  {
    name: "Aleksandra Masłowska",
    role: "Head Manager",
    desc: "Zarządza operacjami — od obsługi gości po koordinację zespołów terenowych.",
    contact: "aleksandra@squarestate.pl",
  },
];

const values = [
  { num: "200+", label: "zarządzanych mieszkań", desc: "Jeden z największych portfeli krótkoterminowych w Krakowie." },
  { num: "97%", label: "maksymalne obłożenie", desc: "Szczytowe wyniki sezonu dzięki dynamic pricing i optymalizacji ofert." },
  { num: "45 000+", label: "pozytywnych opinii", desc: "Ocena 4.77★ w Airbnb i Booking.com na przestrzeni lat." },
];

const ecosystem = [
  { name: "Benno Aparthotel", type: "Aparthotel" },
  { name: "Filthy Burger", type: "Restauracja" },
  { name: "Pora", type: "Restauracja" },
  { name: "Auro", type: "Restauracja" },
  { name: "Kropka", type: "Restauracja" },
];

export default function ONas() {
  return (
    <>
      {/* ── HERO SPLIT ───────────────────────────────────────────── */}
      <section className="border-b border-muted">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[480px] md:min-h-[580px]">
          {/* Left: text */}
          <motion.div
            className="px-8 md:px-16 py-20 md:py-28 flex flex-col justify-center lg:pl-[max(2rem,calc((100vw-1316px)/2+4rem))]"
            initial="hidden"
            animate="show"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.09 } } }}
          >
            <motion.p variants={fadeUp} className="text-[11px] uppercase tracking-[0.2em] text-muted mb-6">
              Firma
            </motion.p>
            <motion.h1
              variants={fadeUp}
              className="font-serif tracking-tight text-ink leading-[1.04]"
              style={{ fontSize: "clamp(52px, 6.5vw, 88px)" }}
            >
              O nas
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-6 text-muted leading-relaxed max-w-sm">
              Od 2016 roku zamieniamy krakowskie mieszkania w dochodowe inwestycje.
              Dziś zarządzamy ponad 200 apartamentami i tworzymy jeden z największych
              ekosystemów gościnności w Krakowie.
            </motion.p>
          </motion.div>

          {/* Right: image */}
          <motion.div
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="h-[360px] lg:h-auto bg-sage/20 overflow-hidden"
          >
            <div className="w-full h-full bg-gradient-to-br from-sage/10 to-sage/30" />
          </motion.div>
        </div>
      </section>

      {/* ── TIMELINE ─────────────────────────────────────────────── */}
      <section className="border-b border-muted overflow-hidden">
        <div className="max-w-layout mx-auto px-8 md:px-16 py-16 md:py-24">
          <motion.p
            initial="hidden"
            whileInView="show"
            viewport={VP}
            variants={fadeUp}
            className="text-[11px] uppercase tracking-[0.2em] text-muted mb-12"
          >
            Historia firmy
          </motion.p>

          {/* Horizontal scroll on mobile */}
          <div className="overflow-x-auto pb-4 -mx-8 px-8 md:mx-0 md:px-0">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={VP}
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
              className="flex gap-0 min-w-max md:min-w-0 md:grid md:grid-cols-5"
            >
              {timeline.map(({ year, title, desc }, i) => (
                <motion.div
                  key={year}
                  variants={fadeUp}
                  className="relative pr-10 md:pr-0 md:border-r last:border-r-0 border-muted md:pl-8 first:pl-0 w-56 md:w-auto shrink-0 md:shrink"
                >
                  {/* Dot + line */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-2 h-2 rounded-full bg-ink shrink-0" />
                    {i < timeline.length - 1 && (
                      <div className="hidden md:block absolute top-[3px] left-[calc(100%-1px)] right-0 h-px bg-muted" />
                    )}
                  </div>
                  <p className="font-serif text-2xl tracking-tight text-muted mb-2">{year}</p>
                  <p className="text-sm text-ink font-medium mb-1">{title}</p>
                  <p className="text-xs text-muted leading-relaxed">{desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── TEAM ─────────────────────────────────────────────────── */}
      <section className="border-b border-muted">
        <div className="max-w-layout mx-auto px-8 md:px-16 py-20 md:py-28">
          <motion.div initial="hidden" whileInView="show" viewport={VP} variants={stagger} className="mb-14">
            <motion.p variants={fadeUp} className="text-[11px] uppercase tracking-[0.2em] text-muted mb-4">Ludzie</motion.p>
            <motion.h2 variants={fadeUp} className="font-serif tracking-tight text-ink" style={{ fontSize: "clamp(34px, 4vw, 52px)" }}>
              Nasz zespół
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={VP}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-px bg-muted"
          >
            {team.map(({ name, role, desc, contact }) => (
              <motion.div key={name} variants={fadeUp} className="bg-bg p-8 md:p-10">
                {/* Image placeholder */}
                <div className="w-full aspect-square bg-sage/20 mb-6 overflow-hidden max-w-[200px]">
                  <div className="w-full h-full bg-gradient-to-br from-sage/10 to-sage/25" />
                </div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-muted mb-2">{role}</p>
                <h3 className="font-serif text-2xl tracking-tight text-ink mb-3">{name}</h3>
                <p className="text-sm text-muted leading-relaxed mb-4">{desc}</p>
                {contact && (
                  <a href={`mailto:${contact}`} className="text-xs text-muted hover:text-ink transition-colors break-all">
                    {contact}
                  </a>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── WYRÓŻNIKI / MISJA ────────────────────────────────────── */}
      <section className="border-b border-muted">
        <div className="max-w-layout mx-auto px-8 md:px-16 py-20 md:py-28">
          <motion.div initial="hidden" whileInView="show" viewport={VP} variants={stagger} className="mb-14">
            <motion.p variants={fadeUp} className="text-[11px] uppercase tracking-[0.2em] text-muted mb-4">Wyróżniki</motion.p>
            <motion.h2 variants={fadeUp} className="font-serif tracking-tight text-ink max-w-2xl" style={{ fontSize: "clamp(34px, 4vw, 52px)" }}>
              Squarestate w liczbach
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={VP}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-px bg-muted"
          >
            {values.map(({ num, label, desc }) => (
              <motion.div key={num} variants={fadeUp} className="bg-bg p-8 md:p-10">
                <p className="font-serif tracking-tight text-ink leading-none mb-4" style={{ fontSize: "clamp(48px, 5.5vw, 72px)" }}>
                  {num}
                </p>
                <p className="text-[10px] uppercase tracking-[0.2em] text-muted mb-3">{label}</p>
                <p className="text-sm text-muted leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── EKOSYSTEM ────────────────────────────────────────────── */}
      <section className="border-b border-muted">
        <div className="max-w-layout mx-auto px-8 md:px-16 py-20 md:py-28">
          <motion.div initial="hidden" whileInView="show" viewport={VP} variants={stagger} className="mb-14">
            <motion.p variants={fadeUp} className="text-[11px] uppercase tracking-[0.2em] text-muted mb-4">Ekosystem</motion.p>
            <motion.h2 variants={fadeUp} className="font-serif tracking-tight text-ink max-w-xl" style={{ fontSize: "clamp(34px, 4vw, 52px)" }}>
              Nasze restauracje i hotele
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-5 text-muted max-w-md leading-relaxed">
              Squarestate to część większego ekosystemu gościnności w Krakowie.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={VP}
            variants={stagger}
            className="grid grid-cols-2 md:grid-cols-5 gap-px bg-muted"
          >
            {ecosystem.map(({ name, type }) => (
              <motion.div
                key={name}
                variants={fadeUp}
                className="bg-bg p-6 md:p-8 flex flex-col items-center justify-center text-center group hover:bg-[#f5f5f2] transition-colors cursor-default"
              >
                <div className="w-12 h-12 border border-muted flex items-center justify-center mb-4 group-hover:border-ink transition-colors">
                  <span className="text-[10px] uppercase tracking-[0.15em] text-muted">logo</span>
                </div>
                <p className="font-serif text-base tracking-tight text-ink">{name}</p>
                <p className="text-[10px] uppercase tracking-[0.2em] text-muted mt-1">{type}</p>
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
            Chcesz dołączyć do ekosystemu?
          </motion.h2>
          <motion.div variants={fadeUp}>
            <Link href="/kontakt" className="inline-block px-8 py-3.5 bg-ink text-bg text-[11px] uppercase tracking-[0.2em] hover:bg-sage transition-colors whitespace-nowrap">
              Skontaktuj się
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}
