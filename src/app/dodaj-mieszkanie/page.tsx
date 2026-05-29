"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useInView,
  animate,
  type Variants,
} from "framer-motion";
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

type Field = "name" | "email" | "phone" | "address" | "size" | "standard" | "message";

const heroLines = ["ZARABIAJ", "NA SWOIM", "MIESZKANIU."];

const proofPoints = [
  { target: 96, suffix: "%", label: "średnie obłożenie naszych mieszkań" },
  { target: 200, suffix: "+", label: "mieszkań w zarządzaniu w Krakowie" },
  { target: 10, suffix: " lat", label: "doświadczenia w najmie krótkoterminowym" },
];

const benefits = [
  { num: "01", text: "Comiesięczny przelew bez żadnych niespodzianek. Prowizja tylko od faktycznych przychodów." },
  { num: "02", text: "Przejmujemy wszystko: rezerwacje, gości, sprzątanie, naprawy. Dosłownie wszystko." },
  { num: "03", text: "Szkody spowodowane przez gości pokrywamy z własnej kieszeni. Twoje mieszkanie jest bezpieczne." },
  { num: "04", text: "Wypowiedzenie umowy w każdej chwili — 3 miesiące, bez podania przyczyny." },
];

const directContacts = [
  { name: "Sara Wabik", role: "Head of Business Development", phone: "+48 720 830 314", email: "sara.wabik@squareapartments.pl" },
  { name: "Aleksandra Masłowska", role: "Head Manager", phone: "+48 533 378 420", email: "aleksandra@squarestate.pl" },
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
    <div className="flex items-center gap-6 py-5 border-b border-muted last:border-b-0 first:border-t border-t">
      <p
        className="font-display font-normal leading-none text-ink shrink-0"
        style={{ fontSize: "clamp(24px, 2.5vw, 32px)", minWidth: "5.5rem" }}
      >
        <span ref={ref}>{count}</span>{suffix}
      </p>
      <p className="text-[15px] font-normal leading-snug text-muted">
        {label}
      </p>
    </div>
  );
}

const SelectArrow = () => (
  <div className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2">
    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true">
      <path d="M1 1l4 4 4-4" stroke="#b3bbbd" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </div>
);

export default function DodajMieszkanie() {
  const [form, setForm] = useState<Record<Field, string>>({
    name: "", email: "", phone: "", address: "", size: "", standard: "", message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [invalidFields, setInvalidFields] = useState<Set<Field>>(new Set());

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (invalidFields.has(name as Field)) {
      setInvalidFields((prev) => { const s = new Set(prev); s.delete(name as Field); return s; });
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const required: Field[] = ["name", "email", "phone"];
    const newInvalid = new Set<Field>();
    required.forEach((key) => { if (!form[key].trim()) newInvalid.add(key); });

    if (newInvalid.size > 0) {
      setInvalidFields(newInvalid);
      newInvalid.forEach((fieldKey) => {
        const el = document.getElementById(`field-${fieldKey}`);
        if (el) animate(el, { x: [0, -8, 8, -8, 8, 0] }, { duration: 0.4 });
      });
      return;
    }

    // TODO: connect to form backend (e.g. Resend, Formspree)
    console.log("Form submit:", form);
    setSubmitted(true);
  }

  const inputCls = "w-full bg-transparent text-[18px] font-light text-ink focus:outline-none py-2 appearance-none placeholder:text-muted transition-colors duration-200";
  const labelCls = "block text-[11px] leading-none uppercase tracking-widest font-normal text-muted mb-2.5";
  const fieldCls = "border-b border-muted pt-5 pb-1";

  return (
    <>
      {/* ── HERO TEXT ─────────────────────────────────────────────── */}
      <section className="border-b border-muted">
        <div className={`${SITE_CONTAINER} py-[80px]`}>
          <div className="grid grid-cols-1 lg:grid-cols-[11fr_9fr] gap-12 lg:gap-20 items-end">

            {/* Left — headline */}
            <motion.div initial="hidden" animate="show" variants={stagger}>
              <motion.p
                variants={fadeUp}
                className="text-[13px] leading-none uppercase tracking-widest font-normal text-muted mb-6"
              >
                Dla właścicieli
              </motion.p>
              <h1 className="text-[40px] md:text-[64px] leading-none tracking-tight uppercase font-medium text-ink">
                {heroLines.map((line, i) => (
                  <motion.span
                    key={line}
                    className="block"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease, delay: 0.1 + i * 0.06 }}
                  >
                    {line}
                  </motion.span>
                ))}
              </h1>
              <motion.p
                variants={fadeUp}
                className="mt-8 text-[20px] font-light leading-[1.6] max-w-[480px]"
                style={{ color: "#6e7780" }}
              >
                Przejmujemy pełną obsługę Twojego apartamentu w Krakowie.
                Ty dostajesz comiesięczny przelew — my zajmujemy się wszystkim.
              </motion.p>
            </motion.div>

            {/* Right — proof points with count-up */}
            <motion.div
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.35 } } }}
            >
              {proofPoints.map((p) => (
                <motion.div key={p.label} variants={fadeUp}>
                  <CountStat {...p} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FULL-WIDTH IMAGE ─────────────────────────────────────── */}
      <div className="w-full overflow-hidden">
        <img
          src={asset("/assets/11image.png")}
          alt=""
          className="w-full object-cover"
          style={{ aspectRatio: "16/7" }}
        />
      </div>

      {/* ── BENEFITS + FORM ───────────────────────────────────────── */}
      <section className="border-b border-muted">
        <div className={`${SITE_CONTAINER} py-[80px]`}>
          <div className="grid grid-cols-1 lg:grid-cols-[9fr_11fr] gap-16 lg:gap-20">

            {/* Left — sticky benefits */}
            <div className="lg:sticky lg:top-[120px] lg:self-start">
              <motion.div initial="hidden" whileInView="show" viewport={VP} variants={stagger}>
                <motion.p
                  variants={fadeUp}
                  className="text-[13px] leading-none uppercase tracking-widest font-normal text-muted mb-4"
                >
                  Dlaczego warto
                </motion.p>
                <motion.h2
                  variants={fadeUp}
                  className="text-[32px] md:text-[48px] leading-none tracking-tight uppercase font-medium text-ink mb-10"
                >
                  Co dostajesz
                </motion.h2>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={VP}
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
              >
                {benefits.map(({ num, text }) => (
                  <motion.div
                    key={num}
                    variants={fadeUp}
                    className="flex items-start gap-5 py-6 border-b border-muted last:border-b-0"
                  >
                    <span className="text-[13px] font-normal leading-none text-muted shrink-0 pt-1">
                      {num}
                    </span>
                    <p className="text-[18px] font-light leading-[1.55] text-ink">
                      {text}
                    </p>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={VP}
                variants={fadeUp}
                className="mt-8"
              >
                <Link
                  href="/jak-dzialamy"
                  className="text-[18px] font-normal text-ink border-b border-muted pb-0.5 hover:border-ink transition-colors duration-200"
                >
                  Poznaj szczegóły współpracy →
                </Link>
              </motion.div>
            </div>

            {/* Right — form */}
            <motion.div initial="hidden" whileInView="show" viewport={VP} variants={stagger}>
              <motion.p
                variants={fadeUp}
                className="text-[13px] leading-none uppercase tracking-widest font-normal text-muted mb-4"
              >
                Bezpłatna wycena
              </motion.p>
              <motion.h3
                variants={fadeUp}
                className="text-[20px] md:text-[26px] leading-snug font-medium text-ink mb-10"
              >
                Napisz do nas — wrócimy do Ciebie
                <br className="hidden md:block" />
                w ciągu 24 godzin z wyceną.
              </motion.h3>

              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease }}
                    className="py-20 flex flex-col items-center text-center border border-muted"
                  >
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="mb-6" aria-hidden="true">
                      <circle cx="24" cy="24" r="23" stroke="#14151a" strokeWidth="1" />
                      <path d="M14 25l7 7 13-16" stroke="#14151a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <h3 className="text-[20px] md:text-[26px] leading-snug font-medium text-ink mb-3">
                      Dziękujemy!
                    </h3>
                    <p className="text-[18px] font-light text-muted mb-8">
                      Odezwiemy się do Ciebie w ciągu 24 godzin.
                    </p>
                    <Link href="/" className="text-[15px] font-normal text-muted hover:text-ink transition-colors duration-200">
                      ← Wróć na stronę główną
                    </Link>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -12 }}
                    onSubmit={handleSubmit}
                    noValidate
                  >
                    {/* Name */}
                    <div id="field-name" className={fieldCls}>
                      <label htmlFor="name" className={labelCls}>
                        Imię i nazwisko <span className="text-sage">*</span>
                      </label>
                      <input id="name" name="name" type="text" value={form.name} onChange={handleChange}
                        className={inputCls} placeholder="Jan Kowalski" />
                    </div>

                    {/* Email */}
                    <div id="field-email" className={fieldCls}>
                      <label htmlFor="email" className={labelCls}>
                        Adres e-mail <span className="text-sage">*</span>
                      </label>
                      <input id="email" name="email" type="email" value={form.email} onChange={handleChange}
                        className={inputCls} placeholder="jan@example.com" />
                    </div>

                    {/* Phone */}
                    <div id="field-phone" className={fieldCls}>
                      <label htmlFor="phone" className={labelCls}>
                        Numer telefonu <span className="text-sage">*</span>
                      </label>
                      <input id="phone" name="phone" type="tel" value={form.phone} onChange={handleChange}
                        className={inputCls} placeholder="+48 000 000 000" />
                    </div>

                    {/* Address */}
                    <div id="field-address" className={fieldCls}>
                      <label htmlFor="address" className={labelCls}>
                        Adres nieruchomości
                      </label>
                      <input id="address" name="address" type="text" value={form.address} onChange={handleChange}
                        className={inputCls} placeholder="ul. Floriańska 12, Kraków" />
                    </div>

                    {/* Size */}
                    <div id="field-size" className={fieldCls}>
                      <label htmlFor="size" className={labelCls}>Metraż</label>
                      <div className="relative">
                        <select id="size" name="size" value={form.size} onChange={handleChange}
                          className={`${inputCls} pr-6 cursor-pointer`}>
                          <option value="">Wybierz metraż</option>
                          <option value="do30">do 30 m²</option>
                          <option value="30-50">30–50 m²</option>
                          <option value="50-80">50–80 m²</option>
                          <option value="80+">powyżej 80 m²</option>
                        </select>
                        <SelectArrow />
                      </div>
                    </div>

                    {/* Standard */}
                    <div id="field-standard" className={fieldCls}>
                      <label htmlFor="standard" className={labelCls}>Standard</label>
                      <div className="relative">
                        <select id="standard" name="standard" value={form.standard} onChange={handleChange}
                          className={`${inputCls} pr-6 cursor-pointer`}>
                          <option value="">Wybierz standard</option>
                          <option value="refresh">Do odświeżenia</option>
                          <option value="good">Dobry</option>
                          <option value="very-good">Bardzo dobry</option>
                          <option value="premium">Premium</option>
                        </select>
                        <SelectArrow />
                      </div>
                    </div>

                    {/* Message */}
                    <div id="field-message" className={fieldCls}>
                      <label htmlFor="message" className={labelCls}>Wiadomość</label>
                      <textarea id="message" name="message" rows={3} value={form.message} onChange={handleChange}
                        className={`${inputCls} resize-none`}
                        placeholder="Opcjonalnie — coś co chcesz nam powiedzieć" />
                    </div>

                    {/* Submit */}
                    <div className="pt-8">
                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.01 }}
                        transition={{ duration: 0.2 }}
                        className="w-full h-[56px] bg-ink text-bg text-[15px] font-normal uppercase tracking-widest hover:bg-sage transition-colors duration-300"
                      >
                        Wyślij zapytanie
                      </motion.button>
                      <p className="mt-4 text-[13px] font-normal text-muted text-center leading-relaxed">
                        Odpowiadamy w ciągu 24 godzin.
                        <br />
                        Wycena jest bezpłatna i niezobowiązująca.
                      </p>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SOCIAL PROOF ─────────────────────────────────────────── */}
      <section>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VP}
          transition={{ duration: 0.8, ease }}
          className="bg-ink"
        >
          <div className={`${SITE_CONTAINER} py-[80px]`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-20 items-center">

              {/* Quote */}
              <div>
                <p
                  className="font-light leading-[1.55] max-w-[480px]"
                  style={{ fontSize: "clamp(20px, 2.2vw, 28px)", color: "#ffffff" }}
                >
                  &ldquo;Oddałem mieszkanie Squarestate 3 lata temu.
                  Od tamtej pory nie kiwnąłem palcem —
                  a co miesiąc wpływa przelew.&rdquo;
                </p>
                <p
                  className="mt-6 text-[15px] font-normal leading-snug"
                  style={{ color: "rgba(255,255,255,0.5)" }}
                >
                  — Piotr M., właściciel z Krakowa
                </p>
              </div>

              {/* Stats */}
              <div>
                {[
                  { num: "45 000+", label: "opinii na Airbnb" },
                  { num: "4,77", star: true, label: "średnia ocena" },
                  { num: "Superhost", label: "status od 10 lat" },
                ].map(({ num, label, star }: { num: string; label: string; star?: boolean }, i) => (
                  <div
                    key={label}
                    className="py-8 border-b first:border-t"
                    style={{ borderColor: "rgba(255,255,255,0.1)" }}
                  >
                    <p
                      className="font-display font-normal leading-none text-white mb-2"
                      style={{ fontSize: i === 2 ? "clamp(22px, 2.2vw, 32px)" : "clamp(26px, 2.8vw, 40px)" }}
                    >
                      {num}{star && <span style={{ fontSize: "0.7em" }}>★</span>}
                    </p>
                    <p
                      className="text-[11px] font-normal uppercase tracking-widest leading-none"
                      style={{ color: "rgba(255,255,255,0.4)" }}
                    >
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── DIRECT CONTACT ───────────────────────────────────────── */}
      <section className="border-t border-muted">
        <div className={`${SITE_CONTAINER} py-[64px]`}>
          <motion.div initial="hidden" whileInView="show" viewport={VP} variants={stagger}>
            <motion.p
              variants={fadeUp}
              className="text-[13px] leading-none uppercase tracking-widest font-normal text-muted mb-10"
            >
              Wolisz porozmawiać?
            </motion.p>
            <motion.div
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
              initial="hidden"
              whileInView="show"
              viewport={VP}
              className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16"
            >
              {directContacts.map(({ name, role, phone, email }) => (
                <motion.div key={name} variants={fadeUp}>
                  <p className="text-[13px] leading-none uppercase tracking-widest font-normal text-muted mb-3">
                    {role}
                  </p>
                  <p className="text-[18px] font-normal leading-none text-ink mb-4">
                    {name}
                  </p>
                  <a
                    href={`tel:${phone.replace(/\s/g, "")}`}
                    className="block text-[18px] font-light leading-snug text-ink hover:underline decoration-muted underline-offset-2 mb-1"
                  >
                    {phone}
                  </a>
                  <a
                    href={`mailto:${email}`}
                    className="block text-[18px] font-light leading-snug text-ink hover:underline decoration-muted underline-offset-2 break-all"
                  >
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
