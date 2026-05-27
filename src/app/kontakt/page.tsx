"use client";

import { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import clsx from "clsx";

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
];

const miniFaq = [
  {
    q: "Ile zarobię na moim mieszkaniu?",
    a: "Przychód zależy od lokalizacji, metrażu i standardu. Dla typowego 50m² na Kazimierzu szacujemy 5–8 tys. PLN miesięcznie. Użyj kalkulatora na stronie głównej lub zadzwoń po indywidualną wycenę.",
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
          className="shrink-0 text-xl text-muted leading-none mt-0.5 select-none"
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
            <p className="pb-4 text-sm text-muted leading-relaxed">{a}</p>
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
        <div className="max-w-layout mx-auto px-8 md:px-16 py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Left: headings */}
            <motion.div
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
                className="font-serif tracking-tight text-ink leading-[1.04]"
                style={{ fontSize: "clamp(44px, 5.5vw, 72px)" }}
              >
                Dodaj mieszkanie
              </motion.h1>
              <motion.p
                variants={fadeUp}
                className="mt-2 font-serif tracking-tight text-muted leading-none"
                style={{ fontSize: "clamp(32px, 3.5vw, 52px)" }}
              >
                Skontaktuj się
              </motion.p>
              <motion.p
                variants={fadeUp}
                className="mt-8 text-muted leading-relaxed max-w-sm"
              >
                Bezpłatna konsultacja i wycena potencjału Twojego mieszkania.
                Odpiszemy w ciągu 24 godzin.
              </motion.p>
            </motion.div>

            {/* Right: contact details */}
            <motion.div
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } } }}
              className="flex flex-col gap-8"
            >
              <motion.div variants={fadeUp}>
                <p className="text-[10px] uppercase tracking-[0.2em] text-muted mb-3">
                  Email
                </p>
                <a
                  href="mailto:hello@squarestate.pl"
                  className="font-serif tracking-tight text-ink hover:text-sage transition-colors"
                  style={{ fontSize: "clamp(20px, 2vw, 28px)" }}
                >
                  hello@squarestate.pl
                </a>
              </motion.div>

              <motion.div variants={fadeUp} className="pt-8 border-t border-muted">
                <p className="text-[10px] uppercase tracking-[0.2em] text-muted mb-3">
                  Biuro
                </p>
                <p className="text-sm text-ink leading-relaxed">
                  ul. Dietla 80/5<br />
                  31-031 Kraków<br />
                  Małopolska, Polska
                </p>
              </motion.div>

              <motion.div variants={fadeUp} className="pt-8 border-t border-muted">
                <p className="text-[10px] uppercase tracking-[0.2em] text-muted mb-5">
                  Kontakt bezpośredni
                </p>
                {contactPersons.map(({ role, name, phone, email }) => (
                  <div key={name} className="mb-6 last:mb-0">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-muted mb-1">
                      {role}
                    </p>
                    <p className="text-sm text-ink font-medium mb-0.5">{name}</p>
                    <a
                      href={`tel:${phone.replace(/\s/g, "")}`}
                      className="block text-sm text-muted hover:text-ink transition-colors"
                    >
                      {phone}
                    </a>
                    <a
                      href={`mailto:${email}`}
                      className="block text-sm text-muted hover:text-ink transition-colors break-all"
                    >
                      {email}
                    </a>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CONTACT FORM ─────────────────────────────────────────── */}
      <section className="border-b border-muted">
        <div className="max-w-layout mx-auto px-8 md:px-16 py-20 md:py-28">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={VP}
            variants={stagger}
            className="max-w-2xl"
          >
            <motion.p
              variants={fadeUp}
              className="text-[11px] uppercase tracking-[0.2em] text-muted mb-4"
            >
              Formularz
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-serif tracking-tight text-ink mb-12"
              style={{ fontSize: "clamp(30px, 3.5vw, 48px)" }}
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
                  <p className="font-serif text-3xl tracking-tight text-ink mb-3">
                    Dziękujemy!
                  </p>
                  <p className="text-muted">
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
                    <div key={key} className="border-b border-muted py-4">
                      <label
                        className={clsx(
                          "block text-[10px] uppercase tracking-[0.2em] mb-2 transition-colors",
                          focused === key ? "text-ink" : "text-muted"
                        )}
                      >
                        {label}
                        {required && <span className="text-sage ml-1">*</span>}
                      </label>
                      <input
                        type={type}
                        required={required}
                        {...field(key)}
                        className="w-full bg-transparent text-ink text-base placeholder:text-muted focus:outline-none"
                        placeholder="—"
                      />
                    </div>
                  ))}

                  {/* Message */}
                  <div className="border-b border-muted py-4">
                    <label
                      className={clsx(
                        "block text-[10px] uppercase tracking-[0.2em] mb-2 transition-colors",
                        focused === "message" ? "text-ink" : "text-muted"
                      )}
                    >
                      Wiadomość
                    </label>
                    <textarea
                      rows={4}
                      {...field("message")}
                      className="w-full bg-transparent text-ink text-base placeholder:text-muted focus:outline-none resize-none"
                      placeholder="—"
                    />
                  </div>

                  <div className="pt-8">
                    <button
                      type="submit"
                      className="px-8 py-3.5 bg-ink text-bg text-[11px] uppercase tracking-[0.2em] hover:bg-sage transition-colors"
                    >
                      Wyślij wiadomość
                    </button>
                    <p className="mt-4 text-[10px] text-muted">
                      * Pola obowiązkowe
                    </p>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ── MAP PLACEHOLDER ──────────────────────────────────────── */}
      <section className="border-b border-muted">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={VP}
          transition={{ duration: 0.8 }}
          className="w-full bg-sage/15 flex items-center justify-center"
          style={{ height: "clamp(240px, 28vw, 420px)" }}
        >
          <div className="text-center">
            <p
              className="font-serif tracking-tight text-muted/60"
              style={{ fontSize: "clamp(18px, 2vw, 24px)" }}
            >
              Kraków, Małopolska
            </p>
            <p className="text-[11px] uppercase tracking-[0.2em] text-muted/40 mt-2">
              ul. Dietla 80/5 · 31-031 Kraków
            </p>
          </div>
        </motion.div>
      </section>

      {/* ── FAQ MINI ─────────────────────────────────────────────── */}
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
                style={{ fontSize: "clamp(28px, 3vw, 42px)" }}
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
