"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import DodatkoweUslugi from "@/components/DodatkoweUslugi";
import PageHeader from "@/components/PageHeader";

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

const steps = [
  {
    num: "01",
    title: "Konsultacja i analiza",
    desc: "Odwiedzamy mieszkanie, szacujemy przychody i omawiamy szczegóły. Bezpłatnie i bez zobowiązań.",
  },
  {
    num: "02",
    title: "Przygotowanie i start",
    desc: "Homestaging, sesja zdjęciowa, stworzenie ogłoszeń na Airbnb, Booking.com i pozostałych platformach.",
  },
  {
    num: "03",
    title: "Zarządzanie i wypłaty",
    desc: "Obsługa gości 24/7, sprzątanie, naprawy, miesięczne raporty i terminowe przelewy na Twoje konto.",
  },
];

export default function Oferta() {
  return (
    <>
      <PageHeader
        imageSrc="/assets/4image.png"
        imageAlt="Squarestate — oferta zarządzania najmem"
        className="border-b border-muted"
        pageLabel="Oferta"
        heading="Kompleksowe zaplecze operacyjne"
        description="Pełna obsługa Twojego mieszkania — od zarządzania rezerwacjami i obsługi gości, przez sprzątanie, naprawy i pralnię, po miesięczne raporty i rozliczenia. Przejmujemy całą operację — Ty czerpiesz zyski bez zaangażowania."
      />

      {/* ── 6-SERVICE GRID ───────────────────────────────────────── */}
      <section className="border-b border-muted">
        <div className="max-w-layout mx-auto px-6 md:px-[48px] lg:px-[64px] py-20 md:py-28">
          <motion.h2
            initial="hidden"
            whileInView="show"
            viewport={VP}
            variants={fadeUp}
            className="text-[32px] md:text-[48px] leading-none tracking-tight uppercase font-medium text-ink mb-14"
          >
            Zakres usług
          </motion.h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-muted items-stretch">
            {/* Left: 2×3 service cards */}
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={VP}
              variants={stagger}
              className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-muted"
            >
              {services.map(({ num, title, desc }) => (
                <motion.div
                  key={num}
                  variants={fadeUp}
                  className="bg-bg p-8 group"
                >
                  <div className="inline-flex items-center justify-center w-8 h-8 bg-ink mb-5">
                    <span className="text-[11px] font-normal text-bg leading-none">{num}</span>
                  </div>
                  <h3 className="tracking-tight text-ink mb-3 group-hover:text-sage transition-colors">
                    {title}
                  </h3>
                  <p className="text-[14px] leading-relaxed font-medium" style={{ color: "#5A5A5A" }}>
                    {desc}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            {/* Right: building image — full height, no crop, transparent PNG */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={VP}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-stretch justify-center min-h-[360px] bg-bg"
            >
              <img
                src="/assets/5image.png"
                alt=""
                className="w-[80%] object-contain object-top block"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── USŁUGI DODATKOWE ─────────────────────────────────────── */}
      <section className="border-b border-muted">
        <div className="max-w-layout mx-auto px-6 md:px-[48px] lg:px-[64px] py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
            <DodatkoweUslugi compact />
            <motion.h2
              initial="hidden"
              whileInView="show"
              viewport={VP}
              variants={fadeUp}
              className="text-[40px] md:text-[56px] lg:text-[72px] leading-none tracking-tight uppercase font-medium text-ink"
            >
              Usługi dodatkowe
            </motion.h2>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <section className="border-b border-muted">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={VP}
          variants={stagger}
          className="max-w-layout mx-auto px-6 md:px-[48px] lg:px-[64px] py-24 md:py-32 flex flex-col md:flex-row items-start md:items-end justify-between gap-8"
        >
          <motion.h2
            variants={fadeUp}
            className="text-[48px] md:text-[72px] lg:text-[96px] leading-none tracking-tight uppercase font-medium text-ink"
          >
            Gotowy, żeby zacząć zarabiać?
          </motion.h2>
          <motion.div variants={fadeUp} className="shrink-0">
            <Link
              href="/kontakt"
              className="inline-block px-8 py-3.5 bg-ink text-bg text-[13px] leading-none uppercase tracking-widest font-normal hover:bg-sage transition-colors whitespace-nowrap"
            >
              Dodaj mieszkanie
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* ── JAK PRACUJEMY ────────────────────────────────────────── */}
      <section className="bg-sage border-b border-bg/20">
        <div className="max-w-layout mx-auto px-6 md:px-[48px] lg:px-[64px] py-20 md:py-28">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={VP}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-px bg-bg/15"
          >
            {steps.map(({ num, title, desc }) => (
              <motion.div
                key={num}
                variants={fadeUp}
                className="bg-sage p-8 md:p-10"
              >
                <p
                  className="font-medium tracking-tight text-bg/20 mb-4 leading-none"
                  style={{ fontSize: "clamp(96px, 12vw, 180px)" }}
                >
                  {num}
                </p>
                <h3 className="text-[20px] md:text-[26px] leading-snug font-medium text-bg mb-4">
                  {title}
                </h3>
                <p className="text-[15px] leading-snug font-normal text-bg/65">{desc}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={VP}
            variants={fadeUp}
            className="mt-12 flex justify-center"
          >
            <Link
              href="/jak-dzialamy"
              className="inline-flex items-center gap-3 px-8 py-3.5 bg-bg text-sage text-[13px] leading-none uppercase tracking-widest font-normal hover:bg-ink hover:text-bg transition-colors"
            >
              Poznaj cały proces współpracy
              <span>→</span>
            </Link>
          </motion.div>
        </div>
      </section>

    </>
  );
}
