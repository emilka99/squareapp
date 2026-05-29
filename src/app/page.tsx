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

const standardOptions = [
  { key: "podstawowy", label: "Podstawowy", desc: "Czyste, funkcjonalne mieszkanie bez designu", mul: 0.8 },
  { key: "dobry",      label: "Dobry",       desc: "Urządzone ze smakiem, gotowe na Airbnb",   mul: 1.0 },
  { key: "premium",    label: "Premium",     desc: "Luksusowy design, zdjęcia pro, top oferta", mul: 1.35 },
];

function calcIncome(size: number, loc: string, std: string) {
  const mul = standardOptions.find((o) => o.key === std)?.mul ?? 1;
  return Math.round(85 * size * (locationMul[loc] ?? 1) * mul);
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
        className="max-w-layout mx-auto px-6 md:px-[48px] lg:px-[64px]"
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
                <div className="flex flex-wrap md:flex-nowrap items-end gap-3 mb-2">
                  <span
                    className="font-medium tracking-tight text-ink leading-none"
                    style={{ fontSize: "clamp(40px, 4.5vw, 68px)" }}
                  >
                    {value}
                  </span>
                  {superhost && (
                    <img
                      src="/assets/superhostlabel.png"
                      alt="Airbnb Superhost"
                      className="mb-1 shrink-0"
                      style={{ height: "clamp(22px, 2vw, 30px)", width: "auto" }}
                    />
                  )}
                </div>
                <p className="text-[13px] leading-none uppercase tracking-widest font-normal text-ink/50 max-w-[160px]">
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
        <span className="text-[16px] md:text-[20px] leading-[1.6] font-light text-ink group-hover:text-sage transition-colors">
          {q}
        </span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0 text-[32px] font-thin text-ink leading-none mt-0.5 select-none"
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
            <p className="pb-5 text-[18px] leading-[1.55] font-light text-ink/80 max-w-2xl">
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
  const [perPage, setPerPage] = useState(1);
  const paused = useRef(false);
  const n = testimonials.length;
  const maxActive = n - perPage;

  useEffect(() => {
    const update = () => setPerPage(window.innerWidth >= 768 ? 2 : 1);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    setActive((v) => Math.min(v, n - perPage));
  }, [perPage, n]);

  useEffect(() => {
    const id = setInterval(() => {
      if (!paused.current) setActive((v) => (v >= maxActive ? 0 : v + 1));
    }, 4200);
    return () => clearInterval(id);
  }, [maxActive]);

  const cardPct = 100 / perPage;

  return (
    <div
      onMouseEnter={() => { paused.current = true; }}
      onMouseLeave={() => { paused.current = false; }}
    >
      <div className="overflow-hidden">
        <motion.div
          className="flex"
          animate={{ x: `-${active * cardPct}%` }}
          transition={{ duration: 0.65, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="shrink-0 px-6 md:px-[48px] lg:px-[64px] py-10 md:py-14"
              style={{ width: `${cardPct}%` }}
            >
              <p className="flex gap-1 mb-6">
                {Array.from({ length: t.stars }).map((_, j) => (
                  <span key={j} className="text-sage text-xl leading-none">★</span>
                ))}
              </p>
              <p className="text-[20px] md:text-[26px] leading-snug font-light text-ink mb-8">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-muted/50 shrink-0" />
                <div>
                  <p className="text-[13px] leading-none uppercase tracking-widest font-normal text-ink mb-1">
                    {t.author}
                  </p>
                  <p className="text-[13px] leading-none uppercase tracking-widest font-normal text-muted">
                    {t.apartment}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="px-6 md:px-[48px] lg:px-[64px] flex gap-2.5 pb-2">
        {Array.from({ length: maxActive + 1 }).map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={clsx(
              "w-2.5 h-2.5 transition-colors",
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
    <section>
      <div className="max-w-layout mx-auto px-6 md:px-[48px] lg:px-[64px] py-14">
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
            <p className="text-[15px] leading-snug font-normal text-muted">
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
            className="mt-3 text-[13px] leading-none uppercase tracking-widest font-normal text-muted hover:text-ink transition-colors"
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
  const heroLines = ["TWÓJ PARTNER", "W NAJMIE."];

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
          className="flex flex-col justify-center px-6 md:px-[48px] lg:px-[64px] lg:pr-16 py-16 lg:py-24 bg-bg"
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
        >
          <h1 className="text-[40px] md:text-[64px] leading-none tracking-tight uppercase font-medium text-ink mb-8">
            {heroLines.map((line, i) => (
              <motion.span key={i} variants={fadeUp} className="block">
                {line}
              </motion.span>
            ))}
          </h1>

          <motion.p
            variants={fadeUp}
            className="text-[16px] md:text-[20px] leading-[1.6] font-light text-ink/75 max-w-lg mb-10"
          >
            Zamieniamy krakowskie mieszkania w dochodowe inwestycje
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
            <Link
              href="/kontakt"
              className="inline-block px-8 py-3.5 bg-ink text-bg text-[13px] leading-none uppercase tracking-widest font-normal font-medium hover:bg-sage transition-colors"
            >
              Dodaj mieszkanie
            </Link>
            <Link
              href="/kontakt"
              className="inline-block px-8 py-3.5 text-ink text-[13px] leading-none uppercase tracking-widest font-normal font-medium underline underline-offset-4 hover:text-sage transition-colors"
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
        <div className="max-w-layout mx-auto px-6 md:px-[48px] lg:px-[64px] pt-20 md:pt-28 pb-0">
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
              className="text-[32px] md:text-[48px] leading-none tracking-tight uppercase font-medium text-ink max-w-2xl"
            >
              Co zyskasz współpracując z nami.
            </motion.h2>
            <motion.div variants={fadeUp} className="shrink-0 hidden md:block">
              <Link
                href="/oferta"
                className="inline-block px-6 py-3 bg-sage text-bg text-[13px] leading-none uppercase tracking-widest font-normal font-medium hover:bg-ink transition-colors"
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
            className="text-[16px] md:text-[20px] leading-[1.6] font-light text-ink/60 max-w-2xl mb-16"
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
                <p className="text-[13px] leading-none uppercase tracking-widest font-normal text-ink/40 mb-4">
                  {String(i + 1).padStart(2, "0")}. {label}
                </p>
                <h3 className="text-[20px] md:text-[26px] leading-snug font-medium text-ink mb-4">
                  {title}
                </h3>
                <p className="text-[18px] leading-[1.55] font-light text-ink/55">{body}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Full-width image below */}
        <div className="relative w-full" style={{ height: "clamp(260px, 35vw, 520px)" }}>
          <Image
            src="/assets/3IMAGE.png"
            alt=""
            fill
            className="object-cover object-center"
          />
        </div>
      </section>

      {/* ── 4. JAK PRACUJEMY ────────────────────────────────────── */}
      <section className="bg-sage border-b border-bg/20">
        <div className="max-w-layout mx-auto px-6 md:px-[48px] lg:px-[64px] py-20 md:py-28">
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
              className="inline-flex items-center gap-3 px-8 py-3.5 bg-bg text-sage text-[13px] leading-none uppercase tracking-widest font-normal font-medium hover:bg-ink hover:text-bg transition-colors"
            >
              Poznaj cały proces współpracy
              <span>→</span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── 5. KALKULATOR ───────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        {/* Background image — blurred */}
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="/assets/2image.png"
            alt=""
            fill
            className="object-cover object-center scale-110 blur-md"
          />
        </div>

        <div className="relative z-10 max-w-layout mx-auto px-6 md:px-[48px] lg:px-[64px] py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            {/* Left */}
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={VP}
              variants={staggerChildren}
            >
              <motion.h2
                variants={fadeUp}
                className="text-[32px] md:text-[48px] leading-none tracking-tight uppercase font-medium text-ink mb-6"
              >
                Dodaj mieszkanie
              </motion.h2>
              <motion.p
                variants={fadeUp}
                className="text-[16px] md:text-[20px] leading-[1.6] font-normal text-ink/70 max-w-sm"
              >
                Sprawdź, ile możesz zarabiać na krótkoterminowym wynajmie w
                Krakowie. Bezpłatna wycena i konsultacja bez zobowiązań.
              </motion.p>
            </motion.div>

            {/* Right: calculator — no border */}
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={VP}
              variants={fadeUp}
              className="p-8 md:p-10 bg-white"
            >
              <p className="text-[13px] leading-none uppercase tracking-widest font-normal text-ink/50 mb-8">
                Kalkulator przychodów
              </p>

              <div className="space-y-7">
                {/* Location */}
                <div>
                  <label className="block text-[13px] leading-none uppercase tracking-widest font-normal text-ink/50 mb-2">
                    Lokalizacja
                  </label>
                  <div className="relative">
                    <select
                      value={loc}
                      onChange={(e) => setLoc(e.target.value)}
                      className="w-full border border-muted bg-bg text-ink text-[15px] leading-snug font-normal px-4 py-2.5 pr-8 appearance-none focus:outline-none focus:border-ink transition-colors cursor-pointer"
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
                  <label className="block text-[13px] leading-none uppercase tracking-widest font-normal text-ink/50 mb-2">
                    Metraż —{" "}
                    <span className="text-ink">{size} m²</span>
                  </label>
                  <input
                    type="range"
                    min={20}
                    max={120}
                    value={size}
                    onChange={(e) => setSize(Number(e.target.value))}
                    className="w-full appearance-none cursor-pointer bg-transparent"
                  />
                  <div className="flex justify-between text-[10px] text-muted mt-1.5">
                    <span>20 m²</span>
                    <span>120 m²</span>
                  </div>
                </div>

                {/* Standard */}
                <div>
                  <label className="block text-[13px] leading-none uppercase tracking-widest font-normal text-ink/50 mb-3">
                    Standard wykończenia
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {standardOptions.map(({ key, label, desc }) => (
                      <button
                        key={key}
                        onClick={() => setStd(key)}
                        className={clsx(
                          "py-3 px-2 text-left border transition-colors",
                          std === key
                            ? "border-sage bg-sage text-bg"
                            : "border-muted text-ink hover:border-sage hover:text-sage"
                        )}
                      >
                        <span className="block text-[11px] uppercase tracking-[0.12em] font-medium mb-1">
                          {label}
                        </span>
                        <span className={clsx(
                          "block text-[10px] leading-snug font-normal",
                          std === key ? "text-bg/70" : "text-ink/40"
                        )}>
                          {desc}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Output */}
              <div className="mt-8 pt-8 border-t border-ink/10">
                <p className="text-[13px] leading-none uppercase tracking-widest font-normal text-ink/50 mb-3">
                  Szacunkowy przychód miesięcznie
                </p>
                <p
                  className="font-medium tracking-tight text-ink leading-none"
                  style={{ fontSize: "clamp(56px, 6vw, 88px)" }}
                >
                  {displayIncome.toLocaleString("pl-PL")}
                  <span
                    className="text-ink/40 ml-2"
                    style={{ fontSize: "clamp(20px, 2vw, 28px)" }}
                  >
                    PLN
                  </span>
                </p>
                <p className="text-[13px] leading-snug font-normal text-ink/40 mt-2 mb-8">
                  * szacunek orientacyjny przy 90% obłożeniu
                </p>
                <Link
                  href="/kontakt"
                  className="block w-full text-center px-8 py-4 bg-ink text-bg text-[13px] leading-none uppercase tracking-widest font-normal hover:bg-sage transition-colors"
                >
                  Umów bezpłatną konsultację
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 6. OPINIE ───────────────────────────────────────────── */}
      <section className="overflow-hidden">
        <div className="max-w-layout mx-auto py-20 md:py-28">
          <div className="px-6 md:px-[48px] lg:px-[64px] mb-10">
            <motion.h2
              initial="hidden"
              whileInView="show"
              viewport={VP}
              variants={fadeUp}
              className="text-[32px] md:text-[48px] leading-none tracking-tight uppercase font-medium text-ink"
            >
              Co mówią<br />nasi klienci
            </motion.h2>
          </div>
          <Carousel />
        </div>
      </section>

      {/* ── 7. Z ŻYCIA FIRMY ────────────────────────────────────── */}
      <section>
        <div className="max-w-layout mx-auto px-6 md:px-[48px] lg:px-[64px] py-20 md:py-28">
          <div className="flex items-end justify-between gap-8 mb-12 flex-wrap">
            <div>
              <motion.h2
                initial="hidden"
                whileInView="show"
                viewport={VP}
                variants={fadeUp}
                className="text-[32px] md:text-[48px] leading-none tracking-tight uppercase font-medium text-ink"
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
                className="group inline-flex items-center gap-2 text-[13px] leading-none uppercase tracking-widest font-normal text-ink/60 hover:text-ink transition-colors"
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
                  <p className="text-[13px] leading-none uppercase tracking-widest font-normal text-muted mb-3">
                    {date}
                  </p>
                  <h3 className="text-[16px] md:text-[20px] leading-snug font-medium text-ink mb-3 group-hover:text-sage transition-colors">
                    {title}
                  </h3>
                  <p className="text-[18px] leading-[1.55] font-light text-muted mb-5">
                    {excerpt}
                  </p>
                  <span className="inline-flex items-center gap-2 text-[13px] leading-none uppercase tracking-widest font-normal text-ink group-hover:gap-3 transition-all duration-300">
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
              className="text-[13px] leading-none uppercase tracking-widest font-normal text-ink/60 hover:text-ink transition-colors"
            >
              Zobacz wszystkie wpisy →
            </Link>
          </div>
        </div>
      </section>

      {/* ── 8. FAQ ──────────────────────────────────────────────── */}
      <section>
        <div className="max-w-layout mx-auto px-6 md:px-[48px] lg:px-[64px] py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16">
            <div>
              <motion.h2
                initial="hidden"
                whileInView="show"
                viewport={VP}
                variants={fadeUp}
                className="text-[32px] md:text-[48px] leading-none tracking-tight uppercase font-medium text-ink"
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
