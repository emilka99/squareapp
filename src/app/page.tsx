"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  type Variants,
} from "framer-motion";
import clsx from "clsx";

/* ─── animation defaults ──────────────────────────────────────── */

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const staggerChildren: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const VP = { once: true, margin: "-100px" } as const;

/* ─── hooks ───────────────────────────────────────────────────── */

function useAnimatedNumber(target: number) {
  const [display, setDisplay] = useState(target);
  const prev = useRef(target);
  const rafId = useRef(0);
  useEffect(() => {
    const from = prev.current;
    const to = target;
    const dur = 700;
    let t0: number | null = null;
    function step(now: number) {
      if (t0 === null) t0 = now;
      const p = Math.min((now - t0) / dur, 1);
      const e = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
      setDisplay(Math.round(from + (to - from) * e));
      if (p < 1) rafId.current = requestAnimationFrame(step);
    }
    rafId.current = requestAnimationFrame(step);
    prev.current = target;
    return () => cancelAnimationFrame(rafId.current);
  }, [target]);
  return display;
}

/* ─── data ────────────────────────────────────────────────────── */

const statsStrip = [
  { value: "10", label: "LAT DOŚWIADCZENIA" },
  { value: "200k+", label: "OBSŁUŻONYCH GOŚCI" },
  { value: "200+", label: "MIESZKAŃ W ZARZĄDZANIU" },
  { value: "4,77", label: "ŚREDNIA OCENA AIRBNB I STATUS SUPERHOSTA", superhost: true as const },
];

const benefits = [
  {
    label: "Przychody",
    title: "Maksymalne zyski",
    body: "Dynamic pricing w oparciu o dane rynkowe, 96% obłożenia w sezonie. Twoje mieszkanie zawsze pracuje z pełną wydajnością.",
  },
  {
    label: "Obsługa",
    title: "Pełna obsługa",
    body: "Od profesjonalnego homestagingu, przez fotografię i marketing na Airbnb i Booking.com, po rozliczenia i raporty.",
  },
  {
    label: "Spokój",
    title: "Bezpieczeństwo",
    body: "Weryfikacja gości, kaucje, ubezpieczenie, ekipy sprzątające, pralnia, biuro projektowe — wszystko pod jednym dachem.",
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

const locationMul: Record<string, number> = {
  "Stare Miasto": 1.4,
  Kazimierz: 1.2,
  Podgórze: 0.95,
  inne: 0.8,
};
const standardMul: Record<string, number> = {
  podstawowy: 0.8,
  dobry: 1.0,
  premium: 1.35,
};

function calcIncome(size: number, loc: string, std: string) {
  return Math.round(85 * size * (locationMul[loc] ?? 1) * (standardMul[std] ?? 1));
}

const testimonials = [
  {
    quote:
      "Squarestate zarządza moim mieszkaniem od 2 lat. Obłożenie na poziomie 96%, przychody przekroczyły moje oczekiwania.",
    author: "Monika K.",
    apartment: "Apartament Kazimierz",
    stars: 5,
  },
  {
    quote:
      "Oddałem mieszkanie pod zarządzanie i teraz nie martwię się o nic. Miesięczne raporty, terminowe płatności, zero stresu.",
    author: "Paweł W.",
    apartment: "Apartament Stare Miasto",
    stars: 5,
  },
  {
    quote:
      "Wzrost przychodów o 40% w porównaniu do poprzedniego operatora. Homestaging i fotografie na najwyższym poziomie.",
    author: "Anna M.",
    apartment: "Apartament Podgórze",
    stars: 5,
  },
  {
    quote:
      "Transparentność rozliczeń i zawsze dostępny opiekun. Polecam każdemu właścicielowi mieszkania w Krakowie.",
    author: "Tomasz B.",
    apartment: "Apartament Zabłocie",
    stars: 5,
  },
  {
    quote:
      "Już po pierwszym miesiącu widziałem różnicę. Doskonała komunikacja, profesjonalna obsługa gości, zero problemów.",
    author: "Katarzyna S.",
    apartment: "Apartament Stare Miasto",
    stars: 5,
  },
];

const blogPosts = [
  {
    date: "12 maja 2025",
    title: "Jak przygotować mieszkanie pod wynajem krótkoterminowy",
    excerpt:
      "Poznaj 7 kroków, które sprawią, że Twoje mieszkanie będzie generować wyższe przychody już od pierwszego miesiąca.",
  },
  {
    date: "5 maja 2025",
    title: "Sezon letni 2025: co przyniesie krakowskiemu rynkowi?",
    excerpt:
      "Analizujemy dane rezerwacyjne i prognozy popytu turystycznego na kolejne miesiące.",
  },
  {
    date: "28 kwietnia 2025",
    title: "Homestaging krok po kroku: efekt premium bez dużych nakładów",
    excerpt:
      "Kilka prostych zmian, które znacząco podnoszą oceny gości i wypełniają kalendarz rezerwacji.",
  },
];

const faqItems = [
  {
    q: "Jak wygląda procedura przekazania mieszkania pod zarządzanie?",
    a: "Zaczynamy od bezpłatnej konsultacji i wizyty w mieszkaniu. Po podpisaniu umowy przejmujemy pełną obsługę — homestaging, fotografie, wyposażenie, ogłoszenia. Cały proces trwa zazwyczaj 2–3 tygodnie.",
  },
  {
    q: "Ile kosztuje zarządzanie i jak wyglądają rozliczenia?",
    a: "Pobieramy prowizję procentową od przychodów, bez stałych opłat. Miesięcznie przesyłamy szczegółowy raport i przelew zarobków. Pełna transparentność — masz wgląd w każdą rezerwację.",
  },
  {
    q: "Czy muszę przygotować mieszkanie do współpracy?",
    a: "Nie — to nasza praca. Oferujemy kompleksowe przygotowanie: homestaging, aranżację wnętrz, doposażenie i profesjonalną sesję zdjęciową. Możemy zacząć od mieszkania w stanie surowym.",
  },
  {
    q: "Co dzieje się w przypadku zniszczeń przez gości?",
    a: "Weryfikujemy gości, pobieramy kaucje i posiadamy ubezpieczenie operatorskie. W przypadku szkód prowadzimy postępowanie reklamacyjne z platformami i gościem.",
  },
  {
    q: "Czy mogę korzystać z mieszkania w wybranych terminach?",
    a: "Oczywiście. Właściciel ma priorytetowy dostęp do kalendarza. Wystarczy zgłosić termin z wyprzedzeniem, a my blokujemy go w systemie.",
  },
  {
    q: "Jak długo trwa umowa i czy mogę ją rozwiązać?",
    a: "Umowa jest zawierana na czas nieokreślony z miesięcznym okresem wypowiedzenia. Nie stosujemy kar za wcześniejsze zakończenie współpracy.",
  },
];

/* ─── sub-components ──────────────────────────────────────────── */

function StatsStrip() {
  return (
    <section className="border-b border-muted">
      <motion.div
        className="max-w-layout mx-auto px-8 md:px-16"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
      >
        <div className="flex flex-col md:flex-row md:items-center">
          {statsStrip.flatMap(({ value, label, superhost }, i) => {
            const nodes = [];
            if (i > 0) {
              nodes.push(
                <motion.div
                  key={`sep-${i}`}
                  variants={fadeUp}
                  className="hidden md:block w-2.5 h-2.5 bg-ink shrink-0 mx-8 lg:mx-12"
                />
              );
            }
            nodes.push(
              <motion.div
                key={label}
                variants={fadeUp}
                className="flex-1 py-8 md:py-10 border-b border-muted last:border-b-0 md:border-b-0"
              >
                <div className="flex items-center gap-3 mb-2">
                  <span
                    className="font-bold tracking-tight text-ink leading-none"
                    style={{ fontSize: "clamp(48px, 5vw, 72px)" }}
                  >
                    {value}
                  </span>
                  {superhost && (
                    <div className="flex items-center gap-2 shrink-0">
                      <svg width="18" height="18" viewBox="0 0 32 32" fill="#FF385C" aria-hidden="true">
                        <path d="M16 1C9.373 1 4 6.373 4 13c0 8.5 11 19.5 11.4 19.9.17.16.38.1.6.1s.43.06.6-.1C17 32.5 28 21.5 28 13c0-6.627-5.373-12-12-12zm0 16.5A4.5 4.5 0 1 1 16 8.5a4.5 4.5 0 0 1 0 9z" />
                      </svg>
                      <span className="px-2 py-0.5 bg-[#FF385C] text-white text-[9px] uppercase tracking-[0.1em] font-bold">
                        superhost
                      </span>
                    </div>
                  )}
                </div>
                <p className="text-[10px] uppercase tracking-[0.18em] text-ink/50 leading-snug max-w-[160px]">
                  {label}
                </p>
              </motion.div>
            );
            return nodes;
          })}
        </div>
      </motion.div>
    </section>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-muted last:border-b-0">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-start justify-between gap-8 py-5 text-left group"
      >
        <span className="text-sm md:text-base text-ink group-hover:text-sage transition-colors leading-snug">
          {q}
        </span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0 text-2xl text-muted leading-none mt-0.5 select-none"
        >
          +
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm text-muted leading-relaxed max-w-2xl">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Carousel() {
  const [active, setActive] = useState(0);
  const paused = useRef(false);
  const n = testimonials.length;

  useEffect(() => {
    const id = setInterval(() => {
      if (!paused.current) setActive((v) => (v + 1) % n);
    }, 4200);
    return () => clearInterval(id);
  }, [n]);

  return (
    <div
      onMouseEnter={() => { paused.current = true; }}
      onMouseLeave={() => { paused.current = false; }}
    >
      <div className="overflow-hidden">
        <motion.div
          className="flex"
          animate={{ x: `-${active * 100}%` }}
          transition={{ duration: 0.65, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {testimonials.map((t, i) => (
            <div key={i} className="min-w-full">
              <div className="max-w-2xl mx-auto text-center px-8 md:px-16 py-12 md:py-16">
                <p className="flex justify-center gap-0.5 mb-8">
                  {Array.from({ length: t.stars }).map((_, j) => (
                    <span key={j} className="text-sage">★</span>
                  ))}
                </p>
                <p
                  className="font-serif tracking-tight text-ink leading-snug mb-8"
                  style={{ fontSize: "clamp(22px, 2.5vw, 32px)" }}
                >
                  &ldquo;{t.quote}&rdquo;
                </p>
                <p className="text-[11px] uppercase tracking-[0.2em] text-ink mb-1">
                  {t.author}
                </p>
                <p className="text-[11px] uppercase tracking-[0.2em] text-muted">
                  {t.apartment}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="flex justify-center gap-2 pb-2">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={clsx(
              "w-1.5 h-1.5 rounded-full transition-colors",
              i === active ? "bg-ink" : "bg-muted hover:bg-sage"
            )}
          />
        ))}
      </div>
    </div>
  );
}

function SeoBlock() {
  const [expanded, setExpanded] = useState(false);
  return (
    <section className="border-b border-muted">
      <div className="max-w-layout mx-auto px-8 md:px-16 py-14">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={VP}
          variants={fadeUp}
          className="max-w-[800px] mx-auto text-center"
        >
          <div
            className={clsx(
              "relative overflow-hidden transition-[max-height] duration-500 ease-in-out",
              expanded ? "max-h-[600px]" : "max-h-[76px]"
            )}
          >
            <p className="text-sm text-muted leading-[1.8]">
              Squarestate to krakowski operator najmu krótkoterminowego z ponad
              10-letnim doświadczeniem. Specjalizujemy się w zarządzaniu
              apartamentami w centrum Krakowa — na Starym Mieście, Kazimierzu i
              Podgórzu. Oferujemy właścicielom mieszkań kompleksową obsługę: od
              przygotowania nieruchomości i profesjonalnego homestagingu, przez
              marketing na platformach Airbnb i Booking.com, po codzienną
              obsługę gości, sprzątanie i rozliczenia. Dzięki zaawansowanemu
              systemowi dynamic pricing zapewniamy jedne z najwyższych
              wskaźników obłożenia w Krakowie — nawet do 96% w sezonie.
              Współpracujemy z właścicielami mieszkań, inwestorami i
              deweloperami. Każdemu klientowi dedykujemy opiekuna, który dba o
              mieszkanie jak o własne. Jeśli szukasz rzetelnego partnera do
              zarządzania najmem krótkoterminowym w Krakowie, jesteś we
              właściwym miejscu.
            </p>
            {!expanded && (
              <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-bg to-transparent" />
            )}
          </div>
          <button
            onClick={() => setExpanded((v) => !v)}
            className="mt-3 text-[11px] uppercase tracking-[0.2em] text-muted hover:text-ink transition-colors"
          >
            {expanded ? "Pokaż mniej" : "Pokaż więcej"}
          </button>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── page ────────────────────────────────────────────────────── */

export default function Home() {
  const heroLines = ["TWÓJ PARTNER", "W NAJMIE", "KRÓTKOTERMINOWYM."];

  const [loc, setLoc] = useState("Stare Miasto");
  const [size, setSize] = useState(60);
  const [std, setStd] = useState("dobry");
  const income = calcIncome(size, loc, std);
  const displayIncome = useAnimatedNumber(income);

  return (
    <>
      {/* ── 1. HERO ─────────────────────────────────────────────── */}
      <section className="grid grid-cols-1 lg:grid-cols-2 min-h-[calc(100vh-68px)] border-b border-muted overflow-hidden">
        {/* Left: text */}
        <motion.div
          className="flex flex-col justify-center px-8 md:px-16 lg:px-20 py-16 lg:py-24 bg-bg"
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
        >
          <h1
            className="font-black tracking-tight text-ink leading-[1.0] mb-8"
            style={{ fontSize: "clamp(42px, 5vw, 80px)" }}
          >
            {heroLines.map((line, i) => (
              <motion.span key={i} variants={fadeUp} className="block">
                {line}
              </motion.span>
            ))}
          </h1>

          <motion.p
            variants={fadeUp}
            className="mt-6 text-lg md:text-xl text-ink/75 max-w-lg leading-relaxed mb-10"
          >
            Zamieniamy krakowskie mieszkania w dochodowe inwestycje
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
            <Link
              href="/kontakt"
              className="inline-block px-8 py-3.5 bg-ink text-bg text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-sage transition-colors"
            >
              Dodaj mieszkanie
            </Link>
            <Link
              href="/kontakt"
              className="inline-block px-8 py-3.5 text-ink text-[11px] uppercase tracking-[0.2em] font-bold underline underline-offset-4 hover:text-sage transition-colors"
            >
              Bezpłatna wycena
            </Link>
          </motion.div>
        </motion.div>

        {/* Right: photo */}
        <div className="relative h-[65vw] lg:h-auto min-h-[400px]">
          <Image
            src="/assets/mainpagetop.png"
            alt=""
            fill
            className="object-cover object-center"
            priority
          />
        </div>
      </section>

      {/* ── 2. SQUARE W LICZBACH ────────────────────────────────── */}
      <StatsStrip />

      {/* ── 3. CO ZYSKASZ ───────────────────────────────────────── */}
      <section className="border-b border-muted overflow-hidden">
        <div className="max-w-layout mx-auto px-8 md:px-16 pt-20 md:pt-28 pb-0">
          {/* Heading row */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={VP}
            variants={staggerChildren}
            className="flex items-start justify-between gap-8 mb-4"
          >
            <motion.h2
              variants={fadeUp}
              className="font-black tracking-tight text-ink max-w-2xl"
              style={{ fontSize: "clamp(30px, 3.8vw, 52px)" }}
            >
              Co zyskasz współpracując z nami.
            </motion.h2>
            <motion.div variants={fadeUp} className="shrink-0 hidden md:block">
              <Link
                href="/oferta"
                className="inline-block px-6 py-3 bg-sage text-bg text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-ink transition-colors"
              >
                Nasza oferta
              </Link>
            </motion.div>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial="hidden"
            whileInView="show"
            viewport={VP}
            variants={fadeUp}
            className="text-base text-ink/60 max-w-2xl leading-relaxed mb-16"
          >
            Większość procesów realizujemy wewnętrznie — mamy pełną kontrolę nad jakością i minimalizujemy koszty operacyjne.
          </motion.p>

          {/* Benefits grid */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={VP}
            variants={staggerChildren}
            className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-12 mb-8"
          >
            {benefits.map(({ label, title, body }, i) => (
              <motion.div key={title} variants={fadeUp}>
                <p className="text-[11px] uppercase tracking-[0.2em] text-ink/40 mb-3">
                  {String(i + 1).padStart(2, "0")}. {label}
                </p>
                <h3
                  className="font-black tracking-tight text-ink mb-3 uppercase"
                  style={{ fontSize: "clamp(20px, 2vw, 28px)" }}
                >
                  {title}
                </h3>
                <p className="text-sm text-ink/55 leading-relaxed">{body}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Full-width image below */}
        <div className="relative w-full" style={{ height: "clamp(260px, 35vw, 520px)" }}>
          <Image
            src="/assets/tlosekcjimain.png"
            alt=""
            fill
            className="object-cover object-center"
          />
        </div>
      </section>

      {/* ── 4. JAK PRACUJEMY ────────────────────────────────────── */}
      <section className="bg-sage border-b border-bg/20">
        <div className="max-w-layout mx-auto px-8 md:px-16 py-20 md:py-28">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={VP}
            variants={staggerChildren}
            className="grid grid-cols-1 md:grid-cols-3 gap-px bg-bg/15"
          >
            {steps.map(({ num, title, desc }) => (
              <motion.div
                key={num}
                variants={fadeUp}
                className="bg-sage p-8 md:p-10"
              >
                <p
                  className="font-bold tracking-tight text-bg/25 mb-6 leading-none"
                  style={{ fontSize: "clamp(52px, 5vw, 68px)" }}
                >
                  {num}
                </p>
                <h3
                  className="font-bold tracking-tight text-bg mb-4"
                  style={{ fontSize: "clamp(20px, 2vw, 26px)" }}
                >
                  {title}
                </h3>
                <p className="text-sm text-bg/65 leading-relaxed">{desc}</p>
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
              className="inline-flex items-center gap-3 px-8 py-3.5 bg-bg text-sage text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-ink hover:text-bg transition-colors"
            >
              Poznaj cały proces współpracy
              <span>→</span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── 5. KALKULATOR ───────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        {/* Background image */}
        <Image
          src="/assets/2image.png"
          alt=""
          fill
          className="object-cover object-center"
        />

        <div className="relative z-10 max-w-layout mx-auto px-8 md:px-16 py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            {/* Left — frosted glass overlay */}
            <div className="relative">
              <div className="absolute -inset-10 bg-bg/72 backdrop-blur-xl" />
              <motion.div
                className="relative z-10"
                initial="hidden"
                whileInView="show"
                viewport={VP}
                variants={staggerChildren}
              >
                <motion.p
                  variants={fadeUp}
                  className="text-[11px] uppercase tracking-[0.2em] text-muted mb-4"
                >
                  Zarabiaj na mieszkaniu
                </motion.p>
                <motion.h2
                  variants={fadeUp}
                  className="font-serif tracking-tight text-ink mb-6"
                  style={{ fontSize: "clamp(34px, 4vw, 52px)" }}
                >
                  Dodaj mieszkanie
                </motion.h2>
                <motion.p
                  variants={fadeUp}
                  className="text-muted leading-relaxed mb-10 max-w-sm"
                >
                  Sprawdź, ile możesz zarabiać na krótkoterminowym wynajmie w
                  Krakowie. Bezpłatna wycena i konsultacja bez zobowiązań.
                </motion.p>
                <motion.div variants={fadeUp}>
                  <Link
                    href="/kontakt"
                    className="inline-block px-8 py-3.5 bg-ink text-bg text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-sage transition-colors"
                  >
                    Umów bezpłatną konsultację
                  </Link>
                </motion.div>
              </motion.div>
            </div>

            {/* Right: calculator — no border */}
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={VP}
              variants={fadeUp}
              className="p-8 md:p-10 bg-bg/80 backdrop-blur-md"
            >
              <p className="text-[11px] uppercase tracking-[0.2em] text-muted mb-8">
                Kalkulator przychodów
              </p>

              <div className="space-y-7">
                {/* Location */}
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-muted mb-2">
                    Lokalizacja
                  </label>
                  <div className="relative">
                    <select
                      value={loc}
                      onChange={(e) => setLoc(e.target.value)}
                      className="w-full border border-muted bg-bg text-ink text-sm px-4 py-2.5 pr-8 appearance-none focus:outline-none focus:border-ink transition-colors cursor-pointer"
                    >
                      {Object.keys(locationMul).map((l) => (
                        <option key={l} value={l}>
                          {l}
                        </option>
                      ))}
                    </select>
                    <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted text-xs">
                      ▾
                    </span>
                  </div>
                </div>

                {/* Size slider */}
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-muted mb-2">
                    Metraż —{" "}
                    <span className="text-ink">{size} m²</span>
                  </label>
                  <input
                    type="range"
                    min={20}
                    max={120}
                    value={size}
                    onChange={(e) => setSize(Number(e.target.value))}
                    className="w-full accent-ink h-px bg-muted appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-muted mt-1.5">
                    <span>20 m²</span>
                    <span>120 m²</span>
                  </div>
                </div>

                {/* Standard */}
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-muted mb-2">
                    Standard wykończenia
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {Object.keys(standardMul).map((s) => (
                      <button
                        key={s}
                        onClick={() => setStd(s)}
                        className={clsx(
                          "py-2.5 text-[11px] uppercase tracking-[0.14em] border transition-colors font-bold",
                          std === s
                            ? "border-ink bg-ink text-bg"
                            : "border-muted text-muted hover:border-ink hover:text-ink"
                        )}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Output */}
              <div className="mt-8 pt-8 border-t border-muted">
                <p className="text-[10px] uppercase tracking-[0.2em] text-muted mb-2">
                  Szacunkowy przychód miesięcznie
                </p>
                <p
                  className="font-serif tracking-tight text-ink leading-none"
                  style={{ fontSize: "clamp(44px, 4.5vw, 64px)" }}
                >
                  {displayIncome.toLocaleString("pl-PL")}
                  <span
                    className="text-muted ml-2"
                    style={{ fontSize: "clamp(18px, 1.8vw, 24px)" }}
                  >
                    PLN
                  </span>
                </p>
                <p className="text-[10px] text-muted mt-2">
                  * szacunek orientacyjny przy 90% obłożeniu
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 6. OPINIE ───────────────────────────────────────────── */}
      <section className="border-b border-muted">
        <div className="max-w-layout mx-auto py-20 md:py-28">
          <div className="px-8 md:px-16 mb-12">
            <motion.p
              initial="hidden"
              whileInView="show"
              viewport={VP}
              variants={fadeUp}
              className="text-[11px] uppercase tracking-[0.2em] text-muted mb-4"
            >
              Opinie właścicieli
            </motion.p>
            <motion.h2
              initial="hidden"
              whileInView="show"
              viewport={VP}
              variants={fadeUp}
              className="font-serif tracking-tight text-ink"
              style={{ fontSize: "clamp(34px, 4vw, 54px)" }}
            >
              Co mówią nasi klienci
            </motion.h2>
          </div>
          <Carousel />
        </div>
      </section>

      {/* ── 7. Z ŻYCIA FIRMY ────────────────────────────────────── */}
      <section className="border-b border-muted">
        <div className="max-w-layout mx-auto px-8 md:px-16 py-20 md:py-28">
          <div className="flex items-end justify-between gap-8 mb-12 flex-wrap">
            <div>
              <motion.p
                initial="hidden"
                whileInView="show"
                viewport={VP}
                variants={fadeUp}
                className="text-[11px] uppercase tracking-[0.2em] text-muted mb-4"
              >
                Blog
              </motion.p>
              <motion.h2
                initial="hidden"
                whileInView="show"
                viewport={VP}
                variants={fadeUp}
                className="font-serif tracking-tight text-ink"
                style={{ fontSize: "clamp(34px, 4vw, 54px)" }}
              >
                Z życia firmy
              </motion.h2>
            </div>
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={VP}
              variants={fadeUp}
              className="hidden md:block"
            >
              <Link
                href="/blog"
                className="group inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-muted hover:text-ink transition-colors font-bold"
              >
                <span>Zobacz wszystkie wpisy</span>
                <span className="group-hover:translate-x-1.5 transition-transform duration-300">
                  →
                </span>
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={VP}
            variants={staggerChildren}
            className="grid grid-cols-1 md:grid-cols-3 gap-px bg-muted"
          >
            {blogPosts.map(({ date, title, excerpt }) => (
              <motion.article
                key={title}
                variants={fadeUp}
                className="bg-bg group cursor-pointer"
              >
                <div className="aspect-[4/3] overflow-hidden bg-sage/15">
                  <div className="w-full h-full bg-sage/10 group-hover:scale-[1.04] transition-transform duration-700" />
                </div>
                <div className="p-8">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-muted mb-3">
                    {date}
                  </p>
                  <h3 className="font-serif text-xl md:text-2xl tracking-tight text-ink mb-3 group-hover:text-sage transition-colors">
                    {title}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed mb-5">
                    {excerpt}
                  </p>
                  <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-ink group-hover:gap-3 transition-all duration-300 font-bold">
                    Czytaj dalej
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      →
                    </span>
                  </span>
                </div>
              </motion.article>
            ))}
          </motion.div>

          <div className="mt-6 md:hidden text-center">
            <Link
              href="/blog"
              className="text-[11px] uppercase tracking-[0.2em] text-muted hover:text-ink transition-colors font-bold"
            >
              Zobacz wszystkie wpisy →
            </Link>
          </div>
        </div>
      </section>

      {/* ── 8. FAQ ──────────────────────────────────────────────── */}
      <section className="border-b border-muted">
        <div className="max-w-layout mx-auto px-8 md:px-16 py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16">
            <div>
              <motion.p
                initial="hidden"
                whileInView="show"
                viewport={VP}
                variants={fadeUp}
                className="text-[11px] uppercase tracking-[0.2em] text-muted mb-4"
              >
                FAQ
              </motion.p>
              <motion.h2
                initial="hidden"
                whileInView="show"
                viewport={VP}
                variants={fadeUp}
                className="font-serif tracking-tight text-ink"
                style={{ fontSize: "clamp(34px, 3.5vw, 48px)" }}
              >
                Często zadawane pytania
              </motion.h2>
            </div>

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={VP}
              variants={fadeUp}
              className="border-t border-muted"
            >
              {faqItems.map((item) => (
                <FaqItem key={item.q} q={item.q} a={item.a} />
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 9. OPIS SEO ─────────────────────────────────────────── */}
      <SeoBlock />
    </>
  );
}
