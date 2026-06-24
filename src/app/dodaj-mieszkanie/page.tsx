"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  motion,
  useInView,
  type Variants,
} from "framer-motion";
import clsx from "clsx";
import { SITE_CONTAINER } from "@/lib/layout";
import { asset } from "@/lib/asset";
import PageHeader from "@/components/PageHeader";

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

const proofPoints = [
  { target: 96, suffix: "%", label: "średnie obłożenie naszych mieszkań" },
  { target: 200, suffix: "+", label: "mieszkań w zarządzaniu w Krakowie" },
  { target: 10, suffix: " lat", label: "doświadczenia w najmie krótkoterminowym" },
];

const locationOptions = ["Stare Miasto", "Kazimierz", "Podgórze", "inne"];

const standardOptions = [
  { key: "podstawowy", label: "Podstawowy", desc: "Czyste, funkcjonalne mieszkanie bez designu" },
  { key: "dobry",      label: "Dobry",       desc: "Urządzone ze smakiem, gotowe na Airbnb" },
  { key: "premium",    label: "Premium",     desc: "Luksusowy design, zdjęcia pro, top oferta" },
];

const directContacts = [
  { name: "Sara Wabik", role: "Dla klientów — oferta, wyceny", phone: "+48 720 830 314", email: "sara.wabik@squareapartments.pl" },
  { name: "Aleksandra Masłowska", role: "Dla gości — rezerwacje", phone: "+48 533 378 420", email: "aleksandra@squarestate.pl" },
];

function useCountUp(target: number, duration = 1400) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target, duration]);

  return { count, ref };
}

function CountStat({ target, suffix, label }: { target: number; suffix: string; label: string }) {
  const { count, ref } = useCountUp(target);
  return (
    <div className="py-8 border-b border-ink/10 last:border-b-0 first:border-t border-t border-ink/10">
      <p className="font-display font-normal leading-none text-ink mb-2"
        style={{ fontSize: "clamp(26px, 2.8vw, 40px)" }}>
        <span ref={ref}>{count}</span>{suffix}
      </p>
      <p className="text-[11px] font-normal uppercase tracking-widest leading-none text-ink/50">
        {label}
      </p>
    </div>
  );
}

export default function DodajMieszkanie() {
  const [loc, setLoc] = useState("Stare Miasto");
  const [size, setSize] = useState(60);
  const [std, setStd] = useState("dobry");
  const [aptCount, setAptCount] = useState(1);
  const [calcPhone, setCalcPhone] = useState("");
  const [calcEmail, setCalcEmail] = useState("");

  return (
    <>
      {/* ── PAGE HEADER ───────────────────────────────────────────── */}
      <PageHeader
        imageSrc={asset("/assets/rozowy-salon.jpg")}
        imageAlt="Dodaj mieszkanie — Squarestate"
        className="border-b border-muted"
        pageLabel="Dla właścicieli"
        heading="Sprawdź, ile zarobi Twoje mieszkanie"
        headingSize="text-[28px] md:text-[38px] lg:text-[48px]"
        description="Wypełnij formularz — wrócimy do Ciebie w ciągu 24 godzin z bezpłatną wyceną potencjału Twojego apartamentu."
      />

      {/* ── SAGE BOX + FORM ───────────────────────────────────────── */}
      <section className="border-b border-muted">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-stretch">

          {/* Left — sage bg full height, kanapa at bottom */}
          <div className="bg-sage relative min-h-[400px] flex flex-col">
            <div className="flex-1" />
            <img
              src={asset("/assets/kanapa-transparent.png")}
              alt=""
              className="w-full object-contain object-right-bottom block"
              style={{ maxHeight: "420px" }}
            />
          </div>

          {/* Right — form */}
          <div className="px-8 md:px-14 py-14 bg-bg">
            <motion.div initial="hidden" whileInView="show" viewport={VP} variants={stagger}>
              <motion.p variants={fadeUp}
                className="text-[13px] leading-none uppercase tracking-widest font-normal text-ink/80 mb-8">
                Dodaj mieszkanie
              </motion.p>

              <div className="space-y-7">
                {/* Lokalizacja */}
                <motion.div variants={fadeUp}>
                  <label className="block text-[13px] leading-none uppercase tracking-widest font-normal text-ink/80 mb-2">
                    Lokalizacja
                  </label>
                  <div className="relative">
                    <select
                      value={loc}
                      onChange={(e) => setLoc(e.target.value)}
                      className="w-full border border-muted bg-bg text-ink text-[15px] leading-snug font-normal px-4 py-2.5 pr-8 appearance-none focus:outline-none focus:border-ink transition-colors cursor-pointer"
                    >
                      {locationOptions.map((l) => (
                        <option key={l} value={l}>{l}</option>
                      ))}
                    </select>
                    <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted text-xs">▾</span>
                  </div>
                </motion.div>

                {/* Liczba mieszkań */}
                <motion.div variants={fadeUp}>
                  <label className="block text-[13px] leading-none uppercase tracking-widest font-normal text-ink/80 mb-3">
                    Liczba mieszkań
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, "4+"].map((n) => (
                      <button
                        key={n}
                        type="button"
                        onClick={() => setAptCount(typeof n === "number" ? n : 4)}
                        className={clsx(
                          "flex-1 py-2.5 text-[13px] uppercase tracking-widest font-normal border transition-colors",
                          aptCount === (typeof n === "number" ? n : 4)
                            ? "border-sage bg-sage text-bg"
                            : "border-muted text-ink hover:border-sage hover:text-sage"
                        )}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                </motion.div>

                {/* Metraż */}
                <motion.div variants={fadeUp}>
                  <label className="block text-[13px] leading-none uppercase tracking-widest font-normal text-ink/80 mb-2">
                    Metraż — <span className="text-ink">{size} m²</span>
                  </label>
                  <input
                    type="range" min={20} max={120} value={size}
                    onChange={(e) => setSize(Number(e.target.value))}
                    className="w-full appearance-none cursor-pointer bg-transparent"
                  />
                  <div className="flex justify-between text-[10px] text-muted mt-1.5">
                    <span>20 m²</span>
                    <span>120 m²</span>
                  </div>
                </motion.div>

                {/* Standard */}
                <motion.div variants={fadeUp}>
                  <label className="block text-[13px] leading-none uppercase tracking-widest font-normal text-ink/80 mb-3">
                    Standard wykończenia
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {standardOptions.map(({ key, label, desc }) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setStd(key)}
                        className={clsx(
                          "py-3 px-2 text-left border transition-colors",
                          std === key
                            ? "border-sage bg-sage text-bg"
                            : "border-muted text-ink hover:border-sage hover:text-sage"
                        )}
                      >
                        <span className="block text-[11px] uppercase tracking-[0.12em] font-medium mb-1">{label}</span>
                        <span className={clsx("block text-[10px] leading-snug font-normal",
                          std === key ? "text-bg/70" : "text-ink/40")}>
                          {desc}
                        </span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Contact */}
              <motion.div variants={fadeUp} className="mt-8 pt-8 border-t border-ink/10">
                <div className="border-b border-ink/10 py-4">
                  <label className="block text-[11px] leading-none uppercase tracking-widest font-normal text-ink/80 mb-2.5">
                    Telefon
                  </label>
                  <input
                    type="tel" value={calcPhone}
                    onChange={(e) => setCalcPhone(e.target.value)}
                    placeholder="+48 000 000 000"
                    className="w-full bg-transparent text-[18px] font-light text-ink focus:outline-none placeholder:text-ink/20"
                  />
                </div>
                <div className="border-b border-ink/10 py-4 mb-8">
                  <label className="block text-[11px] leading-none uppercase tracking-widest font-normal text-ink/80 mb-2.5">
                    E-mail
                  </label>
                  <input
                    type="email" value={calcEmail}
                    onChange={(e) => setCalcEmail(e.target.value)}
                    placeholder="jan@example.com"
                    className="w-full bg-transparent text-[18px] font-light text-ink focus:outline-none placeholder:text-ink/20"
                  />
                </div>
                <Link
                  href="/kontakt"
                  className="block w-full text-center px-8 py-4 bg-ink text-bg text-[13px] leading-none uppercase tracking-widest font-normal hover:bg-sage transition-colors"
                >
                  Umów bezpłatną konsultację
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SOCIAL PROOF — white bg ───────────────────────────────── */}
      <section className="border-b border-muted bg-bg">
        <div className={`${SITE_CONTAINER} py-[80px]`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-20 items-center">
            <div>
              <p className="font-light leading-[1.55] max-w-[480px] text-ink"
                style={{ fontSize: "clamp(20px, 2.2vw, 28px)" }}>
                &ldquo;Oddałem mieszkanie Squarestate 3 lata temu.
                Od tamtej pory nie kiwnąłem palcem —
                a co miesiąc wpływa przelew.&rdquo;
              </p>
              <p className="mt-6 text-[15px] font-normal leading-snug text-ink/50">
                — Piotr M., właściciel z Krakowa
              </p>
            </div>
            <div>
              {proofPoints.map((p) => (
                <CountStat key={p.label} {...p} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── DIRECT CONTACT ───────────────────────────────────────── */}
      <section className="border-t border-muted">
        <div className={`${SITE_CONTAINER} py-[64px]`}>
          <motion.div initial="hidden" whileInView="show" viewport={VP} variants={stagger}>
            <motion.p variants={fadeUp}
              className="text-[13px] leading-none uppercase tracking-widest font-normal text-muted mb-10">
              Wolisz porozmawiać?
            </motion.p>
            <motion.div
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
              initial="hidden" whileInView="show" viewport={VP}
              className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16"
            >
              {directContacts.map(({ name, role, phone, email }) => (
                <motion.div key={name} variants={fadeUp}>
                  <p className="text-[13px] leading-none uppercase tracking-widest font-normal text-muted mb-3">{role}</p>
                  <p className="text-[18px] font-normal leading-none text-ink mb-4">{name}</p>
                  <a href={`tel:${phone.replace(/\s/g, "")}`}
                    className="block text-[18px] font-light leading-snug text-ink hover:underline decoration-muted underline-offset-2 mb-1">
                    {phone}
                  </a>
                  <a href={`mailto:${email}`}
                    className="block text-[18px] font-light leading-snug text-ink hover:underline decoration-muted underline-offset-2 break-all">
                    {email}
                  </a>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
