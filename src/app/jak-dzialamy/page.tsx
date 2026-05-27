"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import DodatkoweUslugi from "@/components/DodatkoweUslugi";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const VP = { once: true, margin: "-100px" } as const;

type Step = {
  num: string;
  title: string;
  desc: string;
};

const steps: Step[] = [
  {
    num: "01",
    title: "Konsultacja",
    desc: "Umawiamy się na bezpłatną wizytę w Twoim mieszkaniu. Poznajemy nieruchomość, rozmawiamy o oczekiwaniach i odpowiadamy na pytania.",
  },
  {
    num: "02",
    title: "Analiza i ocena",
    desc: "Na podstawie lokalizacji, metrażu, standardu i sezonu szacujemy potencjalne przychody. Porównujemy z aktualną ofertą rynkową.",
  },
  {
    num: "03",
    title: "Przedstawienie oferty",
    desc: "Przygotowujemy szczegółową ofertę współpracy: zakres usług, prowizję, harmonogram i plan działania.",
  },
  {
    num: "04",
    title: "Podpisanie umowy",
    desc: "Podpisujemy umowę o zarządzaniu najmem. Każdy klient otrzymuje dedykowanego opiekuna nieruchomości.",
  },
  {
    num: "05",
    title: "Przygotowanie nieruchomości",
    desc: "Homestaging, odświeżenie, doposażenie, profesjonalna sesja fotograficzna. Mieszkanie trafia na platformy gotowe na gości.",
  },
  {
    num: "06",
    title: "Promocja",
    desc: "Optymalizujemy ogłoszenia na Airbnb i Booking.com. Ustalamy strategię cenową i dostosowujemy ją do sezonu.",
  },
  {
    num: "07",
    title: "Obsługa gości",
    desc: "Całodobowa obsługa: od check-in po check-out. Sprzątanie, zmiana pościeli, powitanie każdego gościa wg ustalonych standardów.",
  },
  {
    num: "08",
    title: "Naprawa usterek",
    desc: "Własne ekipy techniczne reagują na usterki w ciągu 24h. Drobne naprawy bez angażowania właściciela.",
  },
  {
    num: "09",
    title: "Monitorowanie",
    desc: "Stale monitorujemy wyniki: obłożenie, przychody, oceny gości. Dynamicznie dostosowujemy ceny do popytu.",
  },
  {
    num: "10",
    title: "Raportowanie",
    desc: "Co miesiąc przesyłamy szczegółowy raport i przelew na Twoje konto. Pełna transparentność — masz wgląd w każdą rezerwację.",
  },
];

function QuoteSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden border-b border-muted"
    >
      {/* Parallax background */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-[-10%] bg-sage/[0.08]"
      />

      <div className="relative max-w-layout mx-auto px-8 md:px-16 py-[80px] md:py-[120px]">
        <motion.p
          initial="hidden"
          whileInView="show"
          viewport={VP}
          variants={fadeUp}
          className="font-serif tracking-tight text-ink leading-snug max-w-3xl mb-12 md:mb-16"
          style={{ fontSize: "clamp(20px, 2.2vw, 26px)" }}
        >
          &ldquo;W biznesie wynajmu krótkoterminowego kluczowe jest
          zrozumienie, że gość nie szuka pokoju — szuka przeżycia. Naszą rolą
          jest tworzyć przeżycia, a właścicielowi dawać spokój.&rdquo;
        </motion.p>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={VP}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
        >
          <motion.p
            variants={fadeUp}
            className="font-serif tracking-tight text-ink leading-none"
            style={{ fontSize: "clamp(36px, 4vw, 48px)" }}
          >
            Andrzej Wranik
          </motion.p>
          <motion.p
            variants={fadeUp}
            className="text-[11px] uppercase tracking-[0.2em] text-muted mt-3"
          >
            Założyciel, Squarestate
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

export default function JakDzialamy() {
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
            className="font-serif tracking-tight text-ink leading-[1.02]"
            style={{ fontSize: "clamp(52px, 6.5vw, 88px)" }}
          >
            Jak działamy.
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mt-5 text-lg text-muted leading-relaxed"
          >
            Proces współpracy krok po kroku
          </motion.p>
          <motion.div variants={fadeUp} className="mt-8">
            <Link
              href="/kontakt"
              className="text-[11px] uppercase tracking-[0.2em] text-ink underline underline-offset-4 hover:text-sage transition-colors"
            >
              Bezpłatna wycena
            </Link>
          </motion.div>
        </motion.div>

        {/* Hero image */}
        <motion.div
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          className="w-full bg-sage/20 overflow-hidden"
          style={{ height: "clamp(260px, 38vw, 548px)" }}
        >
          <div className="w-full h-full bg-gradient-to-br from-sage/10 to-sage/30" />
        </motion.div>
      </section>

      {/* ── PROCESS STEPS ────────────────────────────────────────── */}
      <section className="border-b border-muted">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.15 } } }}
        >
          {steps.map((step, i) => (
            <>
              <motion.div
                key={step.num}
                variants={fadeUp}
                className="border-b border-muted last:border-b-0"
              >
                <div className="max-w-layout mx-auto px-8 md:px-16 py-10 md:py-12 grid grid-cols-1 md:grid-cols-[120px_1fr_2fr] gap-6 md:gap-10 items-start">
                  <p
                    className="font-serif tracking-tight text-muted/50 leading-none"
                    style={{ fontSize: "clamp(44px, 5vw, 68px)" }}
                  >
                    {step.num}
                  </p>
                  <h3
                    className="font-serif tracking-tight text-ink"
                    style={{ fontSize: "clamp(20px, 2vw, 26px)", lineHeight: 1.2 }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="text-muted leading-[1.6] mt-0.5"
                    style={{ fontSize: "clamp(15px, 1.4vw, 20px)" }}
                  >
                    {step.desc}
                  </p>
                </div>
              </motion.div>

              {/* Full-width image after step 5 */}
              {i === 4 && (
                <div
                  key="midimage"
                  className="w-full bg-sage/15 border-b border-muted overflow-hidden"
                  style={{ height: "clamp(220px, 30vw, 460px)" }}
                >
                  <div className="w-full h-full bg-gradient-to-r from-sage/10 to-sage/25" />
                </div>
              )}
            </>
          ))}
        </motion.div>
      </section>

      {/* ── PULL QUOTE (parallax) ─────────────────────────────────── */}
      <QuoteSection />

      {/* ── USŁUGI DODATKOWE ─────────────────────────────────────── */}
      <section className="border-b border-muted">
        <div className="max-w-layout mx-auto px-8 md:px-16 py-16 md:py-24 mb-0">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={VP}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
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

      {/* ── CONTACT CTA ──────────────────────────────────────────── */}
      <section>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={VP}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
          className="max-w-layout mx-auto px-8 md:px-16 py-24 flex flex-col md:flex-row items-start md:items-end justify-between gap-8"
        >
          <motion.h2
            variants={fadeUp}
            className="font-serif tracking-tight text-ink max-w-lg"
            style={{ fontSize: "clamp(34px, 4vw, 52px)" }}
          >
            Zacznijmy od bezpłatnej konsultacji.
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
