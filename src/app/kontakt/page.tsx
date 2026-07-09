"use client";

import { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import clsx from "clsx";
import { asset } from "@/lib/asset";

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

const contactPersons = [
  {
    role: "Head of Business Development",
    name: "Sara Wabik",
    phone: "+48 720 830 314",
    email: "sara.wabik@squareapartments.pl",
  },
  {
    role: "Head Manager",
    name: "Aleksandra Masłowska",
    phone: "+48 533 378 420",
    email: "aleksandra@squarestate.pl",
  },
  {
    role: "Rola do uzupełnienia",
    name: "Aleksandra Plewa",
    phone: "+48 000 000 000",
    email: "aleksandra.plewa@squarestate.pl",
  },
];

const miniFaq = [
  {
    q: "Ile zarobię na moim mieszkaniu?",
    a: "Przychód zależy od lokalizacji, metrażu i standardu. Dla typowego 50m² na Kazimierzu szacujemy 5–8 tys. PLN miesięcznie. Wypełnij formularz lub zadzwoń po indywidualną wycenę.",
  },
  {
    q: "Jak szybko mogę zacząć zarabiać?",
    a: "Od podpisania umowy do pierwszych rezerwacji mijają średnio 2–3 tygodnie. Tyle czasu zajmuje homestaging, fotografia i publikacja ogłoszeń.",
  },
  {
    q: "Co się stanie, jeśli gość zniszczy mieszkanie?",
    a: "Pobieramy kaucje od gości, posiadamy ubezpieczenie operatorskie i prowadzimy postępowania reklamacyjne z platformami. Właściciel jest chroniony na każdym etapie.",
  },
  {
    q: "Czy muszę być dostępny dla gości?",
    a: "Nie — to jest właśnie nasz zakres. Obsługujemy gości 24/7, zarządzamy check-in, check-out i wszelką komunikacją. Ty otrzymujesz przelew co miesiąc.",
  },
];

type Field = "name" | "email" | "phone" | "address" | "size" | "message";

function FaqMiniItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-muted last:border-b-0">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-start justify-between gap-8 py-4 text-left group"
      >
        <span className="text-sm text-ink group-hover:text-sage transition-colors leading-snug">
          {q}
        </span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0 text-xl text-ink leading-none mt-0.5 select-none"
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
            transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-4 text-sm text-ink leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Kontakt() {
  const [form, setForm] = useState<Record<Field, string>>({
    name: "",
    email: "",
    phone: "",
    address: "",
    size: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState<Field | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  function field(key: Field) {
    return {
      value: form[key],
      onChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      ) => setForm((prev) => ({ ...prev, [key]: e.target.value })),
      onFocus: () => setFocused(key),
      onBlur: () => setFocused(null),
    };
  }

  return (
    <>
      {/* ── TWO-COLUMN HERO ──────────────────────────────────────── */}
      <section className="border-b border-muted">
        <div className="max-w-layout mx-auto px-6 md:px-[48px] lg:px-[64px] py-12 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            {/* Left: headings */}
            <motion.div
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.09 } } }}
            >
              <motion.h1
                variants={fadeUp}
                className="text-[40px] md:text-[64px] leading-none tracking-tight uppercase font-medium text-ink"
              >
                Skontaktuj się
              </motion.h1>
              <motion.p
                variants={fadeUp}
                className="mt-6 text-[18px] font-light leading-[1.6] text-ink max-w-sm"
              >
                Bezpłatna konsultacja i wycena potencjału Twojego mieszkania.
                Odpiszemy w ciągu 24 godzin.
              </motion.p>

              {/* Quick contact actions — high visibility */}
              <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-3">
                <a
                  href={`tel:${contactPersons[0].phone.replace(/\s/g, "")}`}
                  className="inline-block px-8 py-3.5 bg-ink text-bg text-[13px] leading-none uppercase tracking-widest font-normal hover:bg-sage transition-colors"
                >
                  Zadzwoń teraz
                </a>
                <a
                  href="mailto:hello@squarestate.pl"
                  className="inline-block px-8 py-3.5 border border-ink text-ink text-[13px] leading-none uppercase tracking-widest font-normal hover:bg-ink hover:text-bg transition-colors"
                >
                  Napisz email
                </a>
              </motion.div>
            </motion.div>

            {/* Right: contact details */}
            <motion.div
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } } }}
              className="flex flex-col gap-6"
            >
              <motion.div variants={fadeUp}>
                <p className="text-[13px] leading-none uppercase tracking-widest font-normal text-ink mb-3">
                  Email
                </p>
                <a
                  href="mailto:hello@squarestate.pl"
                  className="text-[22px] md:text-[26px] leading-snug font-medium tracking-tight text-ink hover:text-sage transition-colors"
                >
                  hello@squarestate.pl
                </a>
              </motion.div>

              <motion.div variants={fadeUp} className="pt-6 border-t border-muted">
                <p className="text-[13px] leading-none uppercase tracking-widest font-normal text-ink mb-3">
                  Biuro
                </p>
                <p className="text-sm text-ink leading-relaxed">
                  ul. Dietla 80/5<br />
                  31-031 Kraków<br />
                  Małopolska, Polska
                </p>
              </motion.div>

              <motion.div variants={fadeUp} className="pt-6 border-t border-muted">
                <p className="text-[13px] leading-none uppercase tracking-widest font-normal text-ink mb-4">
                  Kontakt bezpośredni
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {contactPersons.map(({ role, name, phone, email }) => (
                    <div key={name}>
                      <p className="text-[13px] leading-none uppercase tracking-widest font-normal text-ink mb-1">
                        {role}
                      </p>
                      <p className="text-sm text-ink font-medium mb-0.5">{name}</p>
                      <a
                        href={`tel:${phone.replace(/\s/g, "")}`}
                        className="block text-[16px] font-medium text-ink hover:text-sage transition-colors"
                      >
                        {phone}
                      </a>
                      <a
                        href={`mailto:${email}`}
                        className="block text-sm text-ink hover:text-sage transition-colors break-all"
                      >
                        {email}
                      </a>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CONTACT FORM ─────────────────────────────────────────── */}
      <section className="border-b border-muted">
        <div className="max-w-layout mx-auto px-6 md:px-[48px] lg:px-[64px] py-12 md:py-16">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={VP}
            variants={stagger}
            className="max-w-2xl"
          >
            <motion.p
              variants={fadeUp}
              className="text-[13px] leading-none uppercase tracking-widest font-normal text-ink mb-3"
            >
              Formularz
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="tracking-tight text-ink mb-8"

            >
              Napisz do nas
            </motion.h2>

            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="py-16 border border-muted text-center px-8"
                >
                  <p className="text-[20px] md:text-[26px] leading-snug font-medium text-ink mb-3">
                    Dziękujemy!
                  </p>
                  <p className="text-ink/70">
                    Odezwiemy się w ciągu 24 godzin.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -10 }}
                  onSubmit={handleSubmit}
                  className="space-y-0"
                >
                  {(
                    [
                      { key: "name" as Field, label: "Imię i nazwisko", type: "text", required: true },
                      { key: "email" as Field, label: "Email", type: "email", required: true },
                      { key: "phone" as Field, label: "Telefon", type: "tel", required: false },
                      { key: "address" as Field, label: "Adres nieruchomości", type: "text", required: false },
                      { key: "size" as Field, label: "Metraż (m²)", type: "number", required: false },
                    ] as { key: Field; label: string; type: string; required: boolean }[]
                  ).map(({ key, label, type, required }) => (
                    <div key={key} className="border-b border-muted py-3">
                      <label
                        className={clsx(
                          "block text-[13px] leading-none uppercase tracking-widest font-normal mb-2 transition-colors",
                          focused === key ? "text-ink" : "text-ink/60"
                        )}
                      >
                        {label}
                        {required && <span className="text-sage ml-1">*</span>}
                      </label>
                      <input
                        type={type}
                        required={required}
                        {...field(key)}
                        className="w-full bg-transparent text-ink text-[18px] leading-[1.55] font-light placeholder:text-muted focus:outline-none"
                        placeholder="—"
                      />
                    </div>
                  ))}

                  {/* Message */}
                  <div className="border-b border-muted py-3">
                    <label
                      className={clsx(
                        "block text-[13px] leading-none uppercase tracking-widest font-normal mb-2 transition-colors",
                        focused === "message" ? "text-ink" : "text-ink/60"
                      )}
                    >
                      Wiadomość
                    </label>
                    <textarea
                      rows={3}
                      {...field("message")}
                      className="w-full bg-transparent text-ink text-[18px] leading-[1.55] font-light placeholder:text-muted focus:outline-none resize-none"
                      placeholder="—"
                    />
                  </div>

                  <div className="pt-6">
                    <button
                      type="submit"
                      className="px-8 py-3.5 bg-ink text-bg text-[13px] leading-none uppercase tracking-widest font-normal hover:bg-sage transition-colors"
                    >
                      Wyślij wiadomość
                    </button>
                    <p className="mt-4 text-[10px] text-ink/60">
                      * Pola obowiązkowe
                    </p>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ── MAP IMAGE ────────────────────────────────────────────── */}
      <section className="border-b border-muted">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={VP}
          transition={{ duration: 0.8 }}
          className="w-full overflow-hidden"
          style={{ aspectRatio: "21/5" }}
        >
          <img
            src={asset("/assets/map-krakow.png")}
            alt="Mapa Kraków — ul. Dietla 80/5"
            className="w-full h-full object-cover object-center"
          />
        </motion.div>
      </section>

      {/* ── FAQ MINI ─────────────────────────────────────────────── */}
      <section className="border-b border-muted">
        <div className="max-w-layout mx-auto px-6 md:px-[48px] lg:px-[64px] py-12 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12">
            <div>
              <motion.p
                initial="hidden"
                whileInView="show"
                viewport={VP}
                variants={fadeUp}
                className="text-[13px] leading-none uppercase tracking-widest font-normal text-ink mb-4"
              >
                FAQ
              </motion.p>
              <motion.h2
                initial="hidden"
                whileInView="show"
                viewport={VP}
                variants={fadeUp}
                className="tracking-tight text-ink"
              >
                Najczęstsze pytania
              </motion.h2>
            </div>

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={VP}
              variants={fadeUp}
              className="border-t border-muted"
            >
              {miniFaq.map((item) => (
                <FaqMiniItem key={item.q} q={item.q} a={item.a} />
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
