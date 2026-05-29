"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};
const stagger: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const VP = { once: true, margin: "-100px" } as const;

const jobs = [
  {
    title: "Head of Reservations",
    type: "Pełny etat",
    location: "Kraków, Małopolska",
    desc: "Szukamy doświadczonego managera do zarządzania działem rezerwacji. Odpowiedzialność za strategię cenową, optymalizację kalendarzy na Airbnb i Booking.com oraz koordynację z zespołem operacyjnym.",
    requirements: ["Minimum 2 lata doświadczenia w OTA / revenue management", "Znajomość channel managerów (PMS)", "Angielski B2+"],
  },
  {
    title: "Apartment Manager",
    type: "Pełny etat",
    location: "Kraków, Małopolska",
    desc: "Opiekun nieruchomości odpowiedzialny za utrzymanie standardów, komunikację z właścicielami i koordynację ekip sprzątających. Kluczowa rola w naszym modelu operacyjnym.",
    requirements: ["Doświadczenie w property management lub hotelarstwie", "Prawo jazdy kat. B", "Komunikatywność i samodzielność"],
  },
  {
    title: "Marketing Specialist",
    type: "Pełny etat",
    location: "Kraków, Małopolska",
    desc: "Odpowiedzialność za komunikację marki Squarestate: social media, content, kampanie płatne i relacje z mediami. Praca w małym, sprawnym zespole z dużą autonomią.",
    requirements: ["Portfolio projektów marketingowych", "Znajomość Meta Ads i Google Ads", "Zmysł estetyczny i copywriting"],
  },
];

const cultureValues = [
  {
    num: "01",
    title: "Transparentność",
    desc: "Komunikujemy się otwarcie — z właścicielami, gośćmi i między sobą. Nie ma tu miejsca na niejasności.",
  },
  {
    num: "02",
    title: "Jakość",
    desc: "Każde mieszkanie, każda rezerwacja, każdy kontakt z gościem — robimy to na poziomie, z którego jesteśmy dumni.",
  },
  {
    num: "03",
    title: "Innowacja",
    desc: "Własne oprogramowanie, dynamic pricing, data-driven decisions. Nie czekamy na branżę — wyprzedzamy ją.",
  },
];

export default function Kariera() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="border-b border-muted">
        <motion.div
          className="max-w-layout mx-auto px-6 md:px-[48px] lg:px-[64px] pt-20 md:pt-28 pb-14"
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.09 } } }}
        >
          <motion.p variants={fadeUp} className="text-[13px] leading-none uppercase tracking-widest font-normal text-muted mb-6">
            Dołącz do nas
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="tracking-tight text-ink leading-[1.04] max-w-2xl"
          >
            Dołącz do zespołu
          </motion.h1>
          <motion.p variants={fadeUp} className="mt-5 text-lg text-muted max-w-xl leading-relaxed">
            Budujemy jeden z największych ekosystemów zarządzania nieruchomościami w Krakowie.
            Szukamy ludzi, którzy chcą tworzyć coś trwałego.
          </motion.p>
        </motion.div>
      </section>

      {/* ── JOB LISTINGS ─────────────────────────────────────────── */}
      <section className="border-b border-muted">
        <div className="max-w-layout mx-auto px-6 md:px-[48px] lg:px-[64px] py-20 md:py-28">
          <motion.div initial="hidden" whileInView="show" viewport={VP} variants={stagger} className="mb-14">
            <motion.p variants={fadeUp} className="text-[13px] leading-none uppercase tracking-widest font-normal text-muted mb-4">
              Otwarte rekrutacje
            </motion.p>
            <motion.h2 variants={fadeUp} className="tracking-tight text-ink">
              Aktualne oferty pracy
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={VP}
            variants={stagger}
            className="flex flex-col gap-px bg-muted"
          >
            {jobs.map(({ title, type, location, desc, requirements }) => (
              <motion.div key={title} variants={fadeUp} className="bg-bg p-8 md:p-10 group">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                  <div>
                    <h3 className="tracking-tight text-ink mb-2">
                      {title}
                    </h3>
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="text-[13px] leading-none uppercase tracking-widest font-normal text-muted border border-muted px-2 py-0.5">
                        {type}
                      </span>
                      <span className="text-[13px] leading-none uppercase tracking-widest font-normal text-muted">
                        {location}
                      </span>
                    </div>
                  </div>
                  <Link
                    href="/kontakt"
                    className="shrink-0 inline-block px-6 py-2.5 border border-ink text-ink text-[13px] leading-none uppercase tracking-widest font-normal hover:bg-ink hover:text-bg transition-colors"
                  >
                    Aplikuj
                  </Link>
                </div>

                <p className="text-sm text-muted leading-relaxed mb-5">{desc}</p>

                <ul className="flex flex-col gap-1.5">
                  {requirements.map((r) => (
                    <li key={r} className="flex items-start gap-2 text-sm text-muted">
                      <span className="text-sage mt-0.5 shrink-0">—</span>
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── KULTURA FIRMY ────────────────────────────────────────── */}
      <section className="border-b border-muted">
        <div className="max-w-layout mx-auto px-6 md:px-[48px] lg:px-[64px] py-20 md:py-28">
          <motion.div initial="hidden" whileInView="show" viewport={VP} variants={stagger} className="mb-14">
            <motion.p variants={fadeUp} className="text-[13px] leading-none uppercase tracking-widest font-normal text-muted mb-4">
              Kultura
            </motion.p>
            <motion.h2 variants={fadeUp} className="tracking-tight text-ink">
              Jak pracujemy
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={VP}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-px bg-muted"
          >
            {cultureValues.map(({ num, title, desc }) => (
              <motion.div key={num} variants={fadeUp} className="bg-bg p-8 md:p-10">
                <p className="tracking-tight text-muted/50 leading-none mb-6">
                  {num}
                </p>
                <h3 className="tracking-tight text-ink mb-3">
                  {title}
                </h3>
                <p className="text-sm text-muted leading-relaxed">{desc}</p>
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
          className="max-w-layout mx-auto px-6 md:px-[48px] lg:px-[64px] py-24 flex flex-col md:flex-row items-start md:items-end justify-between gap-8"
        >
          <motion.h2 variants={fadeUp} className="tracking-tight text-ink max-w-lg">
            Nie widzisz odpowiedniej oferty?
          </motion.h2>
          <motion.div variants={fadeUp}>
            <Link href="/kontakt" className="inline-block px-8 py-3.5 bg-ink text-bg text-[13px] leading-none uppercase tracking-widest font-normal hover:bg-sage transition-colors whitespace-nowrap">
              Napisz do nas
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}
