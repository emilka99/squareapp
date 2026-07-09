"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { SITE_CONTAINER } from "@/lib/layout";
import { asset } from "@/lib/asset";

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};
const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};
const VP = { once: true, margin: "-80px" } as const;

const timeline = [
  { year: "2016", title: "Pierwsze mieszkanie", desc: "Start na Kazimierzu. Jeden apartament, jedno marzenie — zrodzić z Krakowa coś trwałego." },
  { year: "2018", title: "50 mieszkań", desc: "Własna ekipa sprzątająca i pierwsze standardy operacyjne, które obowiązują do dziś." },
  { year: "2020", title: "100 mieszkań", desc: "Otwarcie własnej pralni i rozbudowa zaplecza technicznego. Skala wymagała systemu." },
  { year: "2022", title: "Benno Aparthotel", desc: "Uruchomienie Benno — własnego aparthotelu w centrum Krakowa. Nasz flagowy obiekt." },
  { year: "2024", title: "200+ mieszkań", desc: "Autorskie oprogramowanie PMS i rozbudowany ekosystem usług pod jednym szyldem." },
];

const ecosystem = [
  { name: "BENNO", type: "Aparthotel · Kazimierz", address: "ul. Augustiańska 1", instagram: "benno_krakow", bg: "#7d7d6e" },
  { name: "BĀR", type: "Kuchnia azjatycka", address: "ul. Augustiańska 1", instagram: "bar_krakow", bg: "#5a4a42" },
  { name: "PORA", type: "Śniadaniownia", address: "ul. Dietla 31", instagram: "pora.krakow", bg: "#2e3a45" },
  { name: "AURO", type: "Restauracja", address: "ul. Szewska 7", instagram: "auro_krakow", bg: "#4a3d30" },
  { name: "KROPKA", type: "Restauracja", address: "ul. Starowiślna 14", instagram: "kropka_krakow", bg: "#3d4a3d" },
];

const team = [
  { name: "Andrzej Wranik", role: "Partner", desc: "Założyciel i główny strateg. Rynek nieruchomości Krakowa od 2010 roku.", contact: null },
  { name: "Sara Wabik", role: "Head of Business Development", desc: "Odpowiada za pozyskiwanie nowych nieruchomości i relacje z właścicielami.", contact: "sara.wabik@squareapartments.pl" },
  { name: "Aleksandra Masłowska", role: "Head Manager", desc: "Zarządza operacjami — od obsługi gości po koordynację zespołów terenowych.", contact: "aleksandra@squarestate.pl" },
];

const positions = [
  {
    title: "Specjalista ds. marketingu",
    desc: "Prowadzenie kanałów social media i kampanii dla naszych apartamentów oraz marek ekosystemu.",
    requirements: "Doświadczenie w social media, dobre pióro, znajomość Meta Ads i Canva/Figma.",
  },
  {
    title: "Content Creator",
    desc: "Tworzenie zdjęć i wideo z naszych obiektów oraz materiałów na Instagram i Reels.",
    requirements: "Umiejętność fotografii i montażu mobile, oko do estetyki, samodzielność.",
  },
];

function InstagramIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

function TimelineSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 85%", "end 45%"],
  });
  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section ref={sectionRef} className="border-b border-muted">
      <div className={`${SITE_CONTAINER} py-20 md:py-28`}>
        <motion.p
          initial="hidden"
          whileInView="show"
          viewport={VP}
          variants={fadeUp}
          className="text-[13px] leading-none uppercase tracking-widest font-normal text-muted mb-16"
        >
          Historia firmy
        </motion.p>

        {/* Two-column grid: year | content, line at centre */}
        <div className="relative">
          {/* Animated vertical line — runs full height, centred between columns */}
          <div
            className="absolute top-0 bottom-0 w-px bg-muted/30"
            style={{ left: "50%" }}
          >
            <motion.div
              className="w-full bg-ink origin-top"
              style={{ height: "100%", scaleY: lineScaleY }}
            />
          </div>

          {timeline.map(({ year, title, desc }, i) => (
            <motion.div
              key={year}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, ease, delay: 0.05 * i }}
              className="grid grid-cols-2 relative border-b border-muted/30 last:border-b-0"
            >
              {/* Square dot on the centre line */}
              <div
                className="absolute bg-ink"
                style={{
                  left: "50%",
                  top: "2.75rem",
                  width: 10,
                  height: 10,
                  transform: "translate(-50%, -50%)",
                }}
              />

              {/* Left — year */}
              <div className="py-12 pr-16 text-right flex items-start justify-end">
                <p
                  className="font-display font-normal leading-none text-ink"
                  style={{ fontSize: "clamp(28px, 3vw, 44px)" }}
                >
                  {year}
                </p>
              </div>

              {/* Right — content */}
              <div className="py-12 pl-16">
                <p className="text-[18px] md:text-[22px] font-normal leading-snug text-ink mb-2">
                  {title}
                </p>
                <p className="text-[15px] font-normal leading-relaxed text-muted">
                  {desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function ONas() {
  return (
    <>
      {/* HERO: O NAS */}
      <section className="border-b border-muted">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Left: text */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={stagger}
            className="py-20 md:py-28 px-6 md:px-[48px] lg:px-[64px] flex flex-col justify-center lg:max-w-[720px] lg:ml-auto lg:mr-0 lg:pl-[64px] lg:pr-20"
          >
            <motion.h1
              variants={fadeUp}
              className="leading-none tracking-tight uppercase font-medium text-ink mb-8"
              style={{ fontSize: "clamp(52px, 7vw, 96px)" }}
            >
              O nas
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="text-[18px] md:text-[20px] font-light leading-[1.6] text-muted max-w-[440px]"
            >
              Od 2016 roku zamieniamy krakowskie mieszkania w dochodowe inwestycje.
              Dziś zarządzamy ponad 200 apartamentami i tworzymy jeden z największych
              ekosystemów gościnności w Krakowie.
            </motion.p>
          </motion.div>

          {/* Right: square image */}
          <motion.div
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.0, ease, delay: 0.15 }}
            className="overflow-hidden"
            style={{ aspectRatio: "1/1" }}
          >
            <img
              src={asset("/assets/10image.png")}
              alt="Kraków — Rynek Główny"
              className="w-full h-full object-cover object-center"
            />
          </motion.div>
        </div>
      </section>

      {/* TIMELINE */}
      <TimelineSection />

      {/* EKOSYSTEM — full-bleed horizontal carousel */}
      <section className="border-b border-muted overflow-hidden">
        <div className={`${SITE_CONTAINER} pt-20 md:pt-28 pb-10`}>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={VP}
            variants={stagger}
          >
            <motion.p
              variants={fadeUp}
              className="text-[13px] leading-none uppercase tracking-widest font-normal text-muted mb-4"
            >
              Ekosystem
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-[32px] md:text-[48px] leading-none tracking-tight uppercase font-medium text-ink"
            >
              Zaprzyjaźnione miejsca
            </motion.h2>
          </motion.div>
        </div>

        {/* Cards — start at container left edge, bleed right */}
        <div
          className="flex gap-8 overflow-x-auto no-scrollbar pb-16 px-6 md:px-[48px] lg:px-[64px]"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {ecosystem.map(({ name, type, address, instagram, bg }, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, x: 32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, ease, delay: i * 0.07 }}
              className="shrink-0 flex flex-col group cursor-pointer"
              style={{
                width: "clamp(240px, 28vw, 380px)",
                scrollSnapAlign: "start",
              }}
            >
              {/* Photo placeholder — will be replaced with real photos */}
              <div
                className="w-full"
                style={{ aspectRatio: "3/4", background: bg }}
              />

              {/* Info bar */}
              <div className="flex items-start justify-between gap-3 pt-4">
                <div>
                  <p
                    className="font-display font-normal leading-none tracking-tight text-ink uppercase"
                    style={{ fontSize: "clamp(20px, 2vw, 30px)" }}
                  >
                    {name}
                  </p>
                  <p className="text-[12px] leading-none uppercase tracking-widest font-normal text-muted mt-2">
                    {type}
                  </p>
                  <p className="text-[13px] font-normal leading-none text-muted mt-1.5">
                    {address}
                  </p>
                </div>
                <a
                  href={`https://instagram.com/${instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 flex items-center justify-center w-9 h-9 bg-ink text-bg hover:bg-sage transition-colors duration-200"
                  aria-label={`Instagram ${name}`}
                >
                  <InstagramIcon />
                </a>
              </div>
            </motion.div>
          ))}
          {/* Trailing spacer so last card isn't flush against edge on snap */}
          <div className="shrink-0 w-6 md:w-12" />
        </div>
      </section>

      {/* TEAM */}
      <section className="border-b border-muted">
        <div className={`${SITE_CONTAINER} py-20 md:py-28`}>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={VP}
            variants={stagger}
            className="mb-14"
          >
            <motion.p
              variants={fadeUp}
              className="text-[13px] leading-none uppercase tracking-widest font-normal text-muted mb-4"
            >
              Ludzie
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-[32px] md:text-[48px] leading-none tracking-tight uppercase font-medium text-ink"
            >
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
                <div className="w-full aspect-square bg-sage/20 mb-6 overflow-hidden max-w-[200px]">
                  <div className="w-full h-full bg-gradient-to-br from-sage/10 to-sage/25" />
                </div>
                <p className="text-[13px] leading-none uppercase tracking-widest font-normal text-muted mb-2">
                  {role}
                </p>
                <h3 className="text-[20px] md:text-[26px] leading-snug font-medium text-ink mb-3">
                  {name}
                </h3>
                <p className="text-sm text-muted leading-relaxed mb-4">{desc}</p>
                {contact && (
                  <a
                    href={`mailto:${contact}`}
                    className="text-xs text-muted hover:text-ink transition-colors break-all"
                  >
                    {contact}
                  </a>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA + OTWARTE REKRUTACJE */}
      <section id="kariera">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={VP}
          variants={stagger}
          className={`${SITE_CONTAINER} pt-24 pb-14 flex flex-col md:flex-row items-start md:items-end justify-between gap-8`}
        >
          <motion.h2
            variants={fadeUp}
            className="text-[32px] md:text-[48px] leading-none tracking-tight uppercase font-medium text-ink max-w-lg"
          >
            Chcesz dołączyć do ekosystemu?
          </motion.h2>
          <motion.div variants={fadeUp}>
            <Link
              href="/kontakt"
              className="inline-block px-8 py-3.5 bg-ink text-bg text-[13px] leading-none uppercase tracking-widest font-normal hover:bg-sage transition-colors whitespace-nowrap"
            >
              Skontaktuj się
            </Link>
          </motion.div>
        </motion.div>

        <div className={`${SITE_CONTAINER} pb-24`}>
          <motion.p
            initial="hidden"
            whileInView="show"
            viewport={VP}
            variants={fadeUp}
            className="text-[20px] md:text-[26px] leading-snug font-medium text-ink mb-6"
          >
            Otwarte rekrutacje
          </motion.p>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={VP}
            variants={stagger}
          >
            {positions.map(({ title, desc, requirements }) => (
              <motion.div
                key={title}
                variants={fadeUp}
                className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-4 md:gap-16 py-10 border-b border-muted first:border-t"
              >
                <h3 className="text-[20px] md:text-[26px] leading-snug font-medium text-ink">
                  {title}
                </h3>
                <div>
                  <p className="text-[18px] leading-[1.55] font-light text-ink mb-4">
                    {desc}
                  </p>
                  <p className="text-[13px] leading-none uppercase tracking-widest font-normal text-muted mb-2">
                    Wymagania
                  </p>
                  <p className="text-[15px] leading-snug font-normal text-muted">
                    {requirements}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
