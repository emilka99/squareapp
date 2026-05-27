"use client";

import { useState, useEffect, useRef } from "react";
import { motion, type Variants } from "framer-motion";
import clsx from "clsx";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};
const stagger: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const VP = { once: true, margin: "-100px" } as const;

const apartments = [
  { name: "Apartament Mariacki", district: "Stare Miasto", guests: 2, price: 450, rating: 4.97, reviews: 312 },
  { name: "Loft Kazimierz", district: "Kazimierz", guests: 4, price: 380, rating: 4.93, reviews: 274 },
  { name: "Studio Nowe Miasto", district: "Stare Miasto", guests: 2, price: 320, rating: 4.89, reviews: 198 },
];

const pins = [
  { name: "Stare Miasto", x: "48%", y: "35%" },
  { name: "Kazimierz", x: "55%", y: "58%" },
  { name: "Podgórze", x: "60%", y: "72%" },
  { name: "Nowa Huta", x: "82%", y: "28%" },
];

const discounts = [
  { code: "SQUARE10", label: "Stały gość", desc: "10% zniżki przy każdej kolejnej rezerwacji u nas.", discount: "−10%" },
  { code: "EARLY15", label: "Wczesna rezerwacja", desc: "15% zniżki przy rezerwacji minimum 30 dni wcześniej.", discount: "−15%" },
];

const restaurants = ["BENNO", "Filthy Burger", "Pora", "Auro", "Kropka"];

const services = [
  { icon: "→", title: "Transfer lotniskowy", desc: "Odbiór i dowóz na Lotnisko Kraków-Balice w każdych godzinach." },
  { icon: "→", title: "Przechowanie bagażu", desc: "Zostawisz walizki przed check-in lub po check-out." },
  { icon: "→", title: "Dekoracje specjalne", desc: "Urodziny, rocznica, romantyczny wieczór — przygotujemy wszystko." },
];

const reviews = [
  { quote: "Fantastyczna lokalizacja, idealna czystość, doskonała komunikacja z ekipą. Wrócimy na pewno!", author: "Maria K.", source: "Airbnb", stars: 5 },
  { quote: "Mieszkanie dokładnie takie jak na zdjęciach — a nawet lepsze. Kraków z tego miejsca to prawdziwa przyjemność.", author: "Thomas G.", source: "Booking.com", stars: 5 },
  { quote: "Super lokalizacja w centrum, sprawny check-in i zawsze pomocna obsługa. Polecam każdemu.", author: "Anna P.", source: "Google", stars: 5 },
  { quote: "Pościel świeża, kuchnia dobrze wyposażona, widok na ulicę Kazimierza — wszystko na piątkę.", author: "Jakub W.", source: "Airbnb", stars: 5 },
];

function ReviewCarousel() {
  const [active, setActive] = useState(0);
  const paused = useRef(false);

  useEffect(() => {
    const id = setInterval(() => {
      if (!paused.current) setActive((v) => (v + 1) % reviews.length);
    }, 4500);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      onMouseEnter={() => { paused.current = true; }}
      onMouseLeave={() => { paused.current = false; }}
    >
      <div className="overflow-hidden">
        <motion.div
          className="flex"
          animate={{ x: `-${active * 100}%` }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {reviews.map((r, i) => (
            <div key={i} className="min-w-full">
              <div className="max-w-xl mx-auto text-center px-8 py-12">
                <p className="flex justify-center gap-0.5 mb-6">
                  {Array.from({ length: r.stars }).map((_, j) => (
                    <span key={j} className="text-sage">★</span>
                  ))}
                </p>
                <p className="font-serif tracking-tight text-ink leading-snug mb-6" style={{ fontSize: "clamp(18px, 2vw, 24px)" }}>
                  &ldquo;{r.quote}&rdquo;
                </p>
                <p className="text-[11px] uppercase tracking-[0.2em] text-ink">{r.author}</p>
                <p className="text-[10px] uppercase tracking-[0.2em] text-muted mt-1">{r.source}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
      <div className="flex justify-center gap-2 pb-2">
        {reviews.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={clsx("w-1.5 h-1.5 rounded-full transition-colors", i === active ? "bg-ink" : "bg-muted")}
          />
        ))}
      </div>
    </div>
  );
}

export default function StrefaGoscia() {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("2");

  return (
    <>
      {/* ── TWO-COLUMN HERO + BOOKING WIDGET ─────────────────────── */}
      <section className="border-b border-muted">
        <div className="max-w-layout mx-auto px-8 md:px-16 py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-start">
            {/* Left */}
            <motion.div
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.09 } } }}
            >
              <motion.p variants={fadeUp} className="text-[11px] uppercase tracking-[0.2em] text-muted mb-6">
                Strefa gościa
              </motion.p>
              <motion.h1
                variants={fadeUp}
                className="font-serif tracking-tight text-ink leading-[1.04]"
                style={{ fontSize: "clamp(44px, 5.5vw, 72px)" }}
              >
                Zarezerwuj apartament
              </motion.h1>
              <motion.p variants={fadeUp} className="mt-5 text-muted leading-relaxed max-w-sm">
                Ponad 200 apartamentów w centrum Krakowa. Zawsze czysto, zawsze na czas.
              </motion.p>
            </motion.div>

            {/* Right: booking widget */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="border border-muted p-8"
            >
              <p className="text-[10px] uppercase tracking-[0.2em] text-muted mb-6">Szukaj apartamentu</p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-muted mb-4">
                <div className="p-4 border-b md:border-b-0 md:border-r border-muted">
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-muted mb-2">Przyjazd</label>
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full bg-transparent text-sm text-ink focus:outline-none"
                  />
                </div>
                <div className="p-4 border-b md:border-b-0 md:border-r border-muted">
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-muted mb-2">Wyjazd</label>
                  <input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full bg-transparent text-sm text-ink focus:outline-none"
                  />
                </div>
                <div className="p-4">
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-muted mb-2">Goście</label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="w-full bg-transparent text-sm text-ink focus:outline-none appearance-none"
                  >
                    {["1", "2", "3", "4", "5", "6+"].map((g) => (
                      <option key={g} value={g}>{g} {g === "1" ? "osoba" : "osoby/osób"}</option>
                    ))}
                  </select>
                </div>
              </div>

              <button className="w-full py-3.5 bg-ink text-bg text-[11px] uppercase tracking-[0.2em] hover:bg-sage transition-colors">
                Szukaj apartamentu →
              </button>

              <p className="mt-4 text-[10px] uppercase tracking-[0.2em] text-muted text-center">
                Powered by Airbnb &amp; Booking.com
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── MAP PLACEHOLDER WITH PINS ────────────────────────────── */}
      <section className="border-b border-muted">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={VP}
          transition={{ duration: 0.8 }}
          className="relative w-full bg-sage/10 overflow-hidden"
          style={{ height: "clamp(300px, 32vw, 480px)" }}
        >
          {/* Grid lines suggestion */}
          <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
            {[...Array(10)].map((_, i) => (
              <line key={`h${i}`} x1="0" y1={`${i * 10}%`} x2="100%" y2={`${i * 10}%`} stroke="#777d70" strokeWidth="1" />
            ))}
            {[...Array(12)].map((_, i) => (
              <line key={`v${i}`} x1={`${i * 10}%`} y1="0" x2={`${i * 10}%`} y2="100%" stroke="#777d70" strokeWidth="1" />
            ))}
          </svg>

          {/* Pins */}
          {pins.map(({ name, x, y }) => (
            <div key={name} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: x, top: y }}>
              <div className="flex flex-col items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-ink border-2 border-bg shadow-sm" />
                <div className="bg-bg border border-muted px-2 py-0.5 whitespace-nowrap">
                  <p className="text-[9px] uppercase tracking-[0.15em] text-ink">{name}</p>
                </div>
              </div>
            </div>
          ))}

          <div className="absolute bottom-4 left-6">
            <p className="text-[10px] uppercase tracking-[0.2em] text-muted">Kraków, Małopolska</p>
          </div>
        </motion.div>
      </section>

      {/* ── FEATURED APARTMENTS ──────────────────────────────────── */}
      <section className="border-b border-muted">
        <div className="max-w-layout mx-auto px-8 md:px-16 py-20 md:py-28">
          <motion.div initial="hidden" whileInView="show" viewport={VP} variants={stagger} className="mb-12">
            <motion.p variants={fadeUp} className="text-[11px] uppercase tracking-[0.2em] text-muted mb-4">Polecamy</motion.p>
            <motion.h2 variants={fadeUp} className="font-serif tracking-tight text-ink" style={{ fontSize: "clamp(34px, 4vw, 52px)" }}>
              Wyróżnione apartamenty
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={VP}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-px bg-muted"
          >
            {apartments.map(({ name, district, guests: g, price, rating, reviews: rev }) => (
              <motion.div
                key={name}
                variants={fadeUp}
                className="bg-bg group cursor-pointer"
              >
                <div className="overflow-hidden" style={{ height: "clamp(180px, 18vw, 240px)" }}>
                  <div className="w-full h-full bg-sage/20 group-hover:scale-[1.04] transition-transform duration-700" />
                </div>
                <div className="p-8">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h3 className="font-serif text-xl tracking-tight text-ink">{name}</h3>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-muted border border-muted px-2 py-0.5 shrink-0 mt-1">
                      {district}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-[11px] uppercase tracking-[0.15em] text-muted mb-5">
                    <span>{g} {g === 1 ? "osoba" : "osoby"}</span>
                    <span>·</span>
                    <span className="text-sage">★ {rating}</span>
                    <span>({rev})</span>
                  </div>
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-muted">Od</p>
                      <p className="font-serif text-2xl tracking-tight text-ink">{price} PLN <span className="text-sm text-muted font-sans">/noc</span></p>
                    </div>
                    <span className="text-[11px] uppercase tracking-[0.2em] text-muted group-hover:text-ink group-hover:translate-x-1 transition-all duration-300 inline-block">
                      →
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── BOOKLET "JAK NIE ZGINĄĆ W KRAKOWIE" ─────────────────── */}
      <section className="border-b border-muted">
        <div className="max-w-layout mx-auto px-8 md:px-16 py-20 md:py-28">
          <motion.div initial="hidden" whileInView="show" viewport={VP} variants={stagger} className="mb-14">
            <motion.p variants={fadeUp} className="text-[11px] uppercase tracking-[0.2em] text-muted mb-4">Przewodnik gościa</motion.p>
            <motion.h2 variants={fadeUp} className="font-serif tracking-tight text-ink" style={{ fontSize: "clamp(34px, 4vw, 52px)" }}>
              Jak nie zginąć w Krakowie
            </motion.h2>
          </motion.div>

          {/* Discounts */}
          <motion.div initial="hidden" whileInView="show" viewport={VP} variants={stagger}>
            <motion.p variants={fadeUp} className="text-[10px] uppercase tracking-[0.2em] text-muted mb-6">Aktywne zniżki</motion.p>
            <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-2 gap-px bg-muted mb-16">
              {discounts.map(({ code, label, desc, discount }) => (
                <motion.div key={code} variants={fadeUp} className="bg-bg p-8 flex items-start justify-between gap-6">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-muted mb-2">{label}</p>
                    <p className="text-sm text-ink leading-relaxed mb-3">{desc}</p>
                    <div className="inline-flex items-center gap-2 border border-muted px-3 py-1">
                      <span className="text-[10px] uppercase tracking-[0.2em] text-muted">Kod:</span>
                      <span className="text-[11px] tracking-[0.15em] text-ink font-medium">{code}</span>
                    </div>
                  </div>
                  <p className="font-serif text-3xl tracking-tight text-sage shrink-0">{discount}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Restaurants */}
          <motion.div initial="hidden" whileInView="show" viewport={VP} variants={stagger}>
            <motion.p variants={fadeUp} className="text-[10px] uppercase tracking-[0.2em] text-muted mb-6">
              Polecamy nasze restauracje
            </motion.p>
            <motion.div
              variants={stagger}
              className="grid grid-cols-2 md:grid-cols-5 gap-px bg-muted mb-16"
            >
              {restaurants.map((name) => (
                <motion.div
                  key={name}
                  variants={fadeUp}
                  className="bg-bg p-6 flex flex-col items-center justify-center text-center group hover:bg-[#f5f5f2] transition-colors cursor-default"
                >
                  <div className="w-10 h-10 border border-muted flex items-center justify-center mb-3 group-hover:border-ink transition-colors">
                    <span className="text-[9px] uppercase text-muted">logo</span>
                  </div>
                  <p className="font-serif text-sm tracking-tight text-ink">{name}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Additional services */}
          <motion.div initial="hidden" whileInView="show" viewport={VP} variants={stagger}>
            <motion.p variants={fadeUp} className="text-[10px] uppercase tracking-[0.2em] text-muted mb-6">
              Dodatkowe usługi
            </motion.p>
            <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-3 gap-px bg-muted">
              {services.map(({ title, desc }) => (
                <motion.div key={title} variants={fadeUp} className="bg-bg p-8">
                  <h3 className="font-serif text-xl tracking-tight text-ink mb-3">{title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── REVIEWS CAROUSEL ─────────────────────────────────────── */}
      <section className="border-b border-muted">
        <div className="max-w-layout mx-auto py-20 md:py-28">
          <div className="px-8 md:px-16 mb-12">
            <motion.p initial="hidden" whileInView="show" viewport={VP} variants={fadeUp}
              className="text-[11px] uppercase tracking-[0.2em] text-muted mb-4">
              Opinie
            </motion.p>
            <motion.h2 initial="hidden" whileInView="show" viewport={VP} variants={fadeUp}
              className="font-serif tracking-tight text-ink" style={{ fontSize: "clamp(34px, 4vw, 52px)" }}>
              Co mówią goście
            </motion.h2>
          </div>
          <ReviewCarousel />
        </div>
      </section>

      {/* ── CTA: ZOSTAW OPINIĘ ───────────────────────────────────── */}
      <section>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={VP}
          variants={stagger}
          className="max-w-layout mx-auto px-8 md:px-16 py-24 flex flex-col md:flex-row items-start md:items-end justify-between gap-8"
        >
          <motion.h2 variants={fadeUp} className="font-serif tracking-tight text-ink max-w-lg" style={{ fontSize: "clamp(34px, 4vw, 52px)" }}>
            Byłeś naszym gościem?
          </motion.h2>
          <motion.div variants={fadeUp}>
            <a
              href="#"
              className="inline-flex items-center gap-2 px-8 py-3.5 border border-ink text-ink text-[11px] uppercase tracking-[0.2em] hover:bg-ink hover:text-bg transition-colors whitespace-nowrap"
            >
              Zostaw nam opinię
              <span>↗</span>
            </a>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}
