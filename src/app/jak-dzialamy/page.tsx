"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import PageHeader from "@/components/PageHeader";
import { SITE_CONTAINER, SITE_X_PADDING } from "@/lib/layout";

// ── ANIMATIONS ────────────────────────────────────────────────
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const VP = { once: true, margin: "-100px" } as const;

// ── DATA ──────────────────────────────────────────────────────
const phases = [
  {
    num: "01",
    phase: "Konsultacja",
    title: "Bezpłatna analiza i wycena",
    desc: "Przyjeżdżamy do Ciebie. Oglądamy mieszkanie, rozmawiamy o Twoich oczekiwaniach i szacujemy potencjalne miesięczne przychody. Bez zobowiązań.",
    tag: "Czas: 1–3 dni robocze",
  },
  {
    num: "02",
    phase: "Umowa",
    title: "Przejrzyste warunki współpracy",
    desc: "Podpisujemy umowę na czas nieokreślony z 3-miesięcznym wypowiedzeniem bez podania przyczyny. Prowizja naliczana tylko od faktycznych przychodów — nie płacisz, gdy mieszkanie stoi puste.",
    tag: "",
  },
  {
    num: "03",
    phase: "Przygotowanie",
    title: "Robimy z mieszkania produkt",
    desc: "Home staging, drobne odświeżenie, profesjonalna sesja zdjęciowa, konfiguracja ogłoszeń na Airbnb i Booking.com. Twoje mieszkanie jest gotowe na pierwszych gości — Ty nie musisz przy tym być.",
    tag: "Czas: 1–3 tygodnie",
  },
  {
    num: "04",
    phase: "Zarządzanie",
    title: "Przejmujemy całą operację",
    desc: "Rezerwacje, zameldowania, sprzątanie, zmiana pościeli, naprawy, kontakt z gośćmi 24/7. Dynamiczne ceny ustawiane przez nasze autorskie oprogramowanie. Szkody spowodowane przez gości pokrywamy z własnej kieszeni.",
    tag: "",
  },
  {
    num: "05",
    phase: "Rozliczenia",
    title: "Comiesięczny przelew i raport",
    desc: "Do 10. dnia każdego miesiąca przelewamy Twoje zarobki i wysyłamy szczegółowy raport z przychodów, obłożenia i wykonanych prac. Zawsze wiesz, co dzieje się z Twoim mieszkaniem.",
    tag: "",
  },
];

const faq = [
  {
    q: "Co jeśli gość zniszczy mieszkanie?",
    a: "Szkody pokrywamy z własnych środków. Naprawiamy i rozliczamy wewnętrznie — bez Twojej interwencji.",
  },
  {
    q: "Czy mogę zrezygnować ze współpracy?",
    a: "Umowa na czas nieokreślony z 3-miesięcznym wypowiedzeniem, bez podania przyczyny.",
  },
  {
    q: "Kiedy dostanę pierwsze pieniądze?",
    a: "Przelewy do 10. dnia każdego miesiąca za miesiąc poprzedni.",
  },
  {
    q: "Ile trwa przygotowanie mieszkania?",
    a: "Od podpisania umowy do pierwszej rezerwacji — zazwyczaj 1 do 3 tygodni.",
  },
  {
    q: "Czy mogę sam korzystać z mieszkania?",
    a: "Tak. Blokujesz wybrane terminy z wyprzedzeniem. Ustalamy zasady przy podpisaniu umowy.",
  },
  {
    q: "Jak ustalana jest prowizja?",
    a: "Pobieramy prowizję od faktycznych przychodów z rezerwacji. Nie ma opłat stałych ani ukrytych kosztów.",
  },
];

const extras = [
  {
    name: "Własna pralnia wodna",
    detail: "Świeże ręczniki i pościel na każdy pobyt — bez outsourcingu, bez opóźnień.",
  },
  {
    name: "Własne ekipy remontowe",
    detail: "Szybka reakcja na usterki w ciągu 24 godzin. Drobne naprawy bez angażowania właściciela.",
  },
  {
    name: "Własne biuro projektowe i homestaging",
    detail: "Homestaging i aranżacja wnętrz, które podnoszą oceny gości i zwiększają obłożenie.",
  },
  {
    name: "Przygotowanie mieszkania do sprzedaży",
    detail: "Kompleksowe przygotowanie nieruchomości do sprzedaży — od odświeżenia po profesjonalną wycenę.",
  },
  {
    name: "Zespół techniczny 24/7",
    detail: "Całodobowa gotowość na zgłoszenia techniczne od gości i właścicieli nieruchomości.",
  },
];

// ── EXTRA SERVICES ACCORDION ──────────────────────────────────
function ExtraItem({
  name,
  detail,
  isOpen,
  onToggle,
}: {
  name: string;
  detail: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-muted">
      <div className={SITE_CONTAINER}>
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-between gap-8 py-5 md:py-7 text-left group"
        >
          <span
            className="font-light tracking-tight text-ink group-hover:text-sage transition-colors leading-snug"
            style={{ fontSize: "clamp(20px, 3.2vw, 48px)" }}
          >
            {name}
          </span>
          <motion.span
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.2 }}
            className="shrink-0 text-[28px] font-thin text-ink leading-none select-none"
          >
            +
          </motion.span>
        </button>
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
              className="overflow-hidden"
            >
              <p className="pb-6 text-[15px] leading-[1.6] font-normal text-ink/60 max-w-sm">
                {detail}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ── PAGE ──────────────────────────────────────────────────────
export default function JakDzialamy() {
  const [openExtra, setOpenExtra] = useState<string | null>(null);

  return (
    <>
      {/* 1. PAGE HEADER */}
      <PageHeader
        imageSrc="/assets/6image.png"
        imageAlt="Jak działamy — Squarestate"
        className="border-b border-muted"
      />

      {/* 3. HERO TEXT */}
      <section className="border-b border-muted">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={VP}
          variants={stagger}
          className={`${SITE_X_PADDING} max-w-[900px] mx-auto py-[80px] md:py-[120px]`}
        >
          <motion.h1
            variants={fadeUp}
            className="text-[40px] md:text-[64px] leading-none tracking-tight uppercase font-medium text-ink mb-10 md:mb-14"
          >
            Jak działamy
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="font-light leading-snug text-ink mb-8 md:mb-10"
            style={{ fontSize: "clamp(26px, 3.2vw, 48px)" }}
          >
            Przejmujemy Twoje mieszkanie w całości.
            Ty nie musisz robić nic — my zajmujemy się wszystkim,
            od przygotowania po comiesięczny przelew.
          </motion.p>
          <motion.p
            variants={fadeUp}
            className="text-[17px] md:text-[20px] leading-[1.6] font-light max-w-[640px]"
            style={{ color: "#6e7780" }}
          >
            Pracujemy z właścicielami mieszkań w Krakowie od ponad 10 lat.
            Wiemy, że najważniejsze są: spokój, przejrzystość i realne zyski.
            Dlatego nasz model współpracy jest prosty — i działa.
          </motion.p>
        </motion.div>
      </section>

      {/* 5. PROCESS — 5 ETAPÓW */}
      <section className="border-b border-muted">
        <div className={`${SITE_CONTAINER} py-[80px] md:py-[120px]`}>
          <motion.h2
            initial="hidden"
            whileInView="show"
            viewport={VP}
            variants={fadeUp}
            className="text-[32px] md:text-[48px] leading-none tracking-tight uppercase font-medium text-ink mb-12 md:mb-16"
          >
            5 etapów współpracy
          </motion.h2>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={VP}
            variants={stagger}
          >
            {phases.map(({ num, phase, title, desc, tag }) => (
              <motion.div
                key={num}
                variants={fadeUp}
                className="grid grid-cols-1 md:grid-cols-[15%_45%_40%] gap-4 md:gap-8 py-[40px] border-b border-[#b3bbbd] last:border-b-0 items-start"
              >
                {/* Col 1 — number + phase name */}
                <div>
                  <p
                    className="leading-none font-light"
                    style={{ fontSize: "52px", color: "#b3bbbd" }}
                  >
                    {num}
                  </p>
                  <p
                    className="text-[13px] uppercase tracking-widest font-normal mt-2 leading-none"
                    style={{ color: "#b3bbbd" }}
                  >
                    {phase}
                  </p>
                </div>

                {/* Col 2 — title + description */}
                <div>
                  <h3 className="text-[20px] md:text-[26px] leading-snug font-medium text-ink mb-3">
                    {title}
                  </h3>
                  <p
                    className="text-[16px] md:text-[18px] leading-[1.55] font-light"
                    style={{ color: "#6e7780" }}
                  >
                    {desc}
                  </p>
                </div>

                {/* Col 3 — optional tag */}
                <div className="md:pt-1.5">
                  {tag && (
                    <span className="inline-block border border-sage text-[11px] uppercase tracking-widest font-normal px-3 py-1.5 leading-none text-sage">
                      {tag}
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 7. USŁUGI DODATKOWE */}
      <section className="border-b border-muted">
        <div className={`${SITE_CONTAINER} py-[80px] md:py-[120px]`}>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={VP}
            variants={stagger}
            className="mb-12"
          >
            <motion.h2
              variants={fadeUp}
              className="text-[32px] md:text-[48px] leading-none tracking-tight uppercase font-medium text-ink mb-6"
            >
              Usługi dodatkowe
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-[18px] md:text-[20px] leading-[1.6] font-light max-w-[600px]"
              style={{ color: "#6e7780" }}
            >
              Poza standardowym zarządzaniem oferujemy usługi, które zwiększają
              wartość Twojej nieruchomości i przyspieszają jej wejście na rynek.
            </motion.p>
          </motion.div>
        </div>

        <div className="border-t border-muted">
          {extras.map(({ name, detail }) => (
            <ExtraItem
              key={name}
              name={name}
              detail={detail}
              isOpen={openExtra === name}
              onToggle={() => setOpenExtra(openExtra === name ? null : name)}
            />
          ))}
        </div>
      </section>

      {/* 8. FAQ */}
      <section className="bg-sage">
        <div className={`${SITE_CONTAINER} py-[80px] md:py-[120px]`}>
          <motion.p
            initial="hidden"
            whileInView="show"
            viewport={VP}
            variants={fadeUp}
            className="text-[13px] leading-none uppercase tracking-widest font-normal text-bg/60 mb-12 md:mb-16"
          >
            Najczęściej pytacie
          </motion.p>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={VP}
            variants={stagger}
          >
            {faq.map(({ q, a }) => (
              <motion.div
                key={q}
                variants={fadeUp}
                className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-16 py-[28px] border-b border-bg/20 last:border-b-0 items-start"
              >
                <p className="text-[16px] md:text-[18px] font-normal leading-[1.55] text-bg">
                  {q}
                </p>
                <p className="text-[16px] md:text-[18px] font-light leading-[1.55] text-bg/70">
                  {a}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 9. CTA BOTTOM */}
      <section>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={VP}
          variants={stagger}
          className={`${SITE_CONTAINER} py-[80px] md:py-[100px] flex flex-col items-center text-center gap-10`}
        >
          <motion.p
            variants={fadeUp}
            className="text-[20px] md:text-[26px] font-light leading-snug text-ink"
          >
            Skontaktuj się z nami i zapytaj o bezpłatną wycenę
          </motion.p>
          <motion.div variants={fadeUp}>
            <Link
              href="/kontakt"
              className="text-[20px] md:text-[24px] leading-none font-normal text-ink border-b border-[#b3bbbd] pb-1 hover:border-ink transition-colors duration-200"
            >
              Dodaj mieszkanie →
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}
