"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { asset } from "@/lib/asset";

const contacts = [
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
    role: "Marketing & PR",
    name: "Aleksandra Plewa",
    phone: "+48 601 971 483",
    email: "aleksandra.plewa@squarestate.pl",
  },
];

const bottomLinks = [
  { href: "/oferta", label: "Oferta" },
  { href: "/realizacje", label: "Realizacje" },
  { href: "/o-nas", label: "O nas" },
  { href: "/blog", label: "Blog" },
  { href: "/kontakt", label: "Kontakt" },
];

export default function Footer() {
  const emailRef = useRef<HTMLAnchorElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fit = () => {
      const el = emailRef.current;
      const wrap = wrapperRef.current;
      if (!el || !wrap) return;
      el.style.fontSize = "100px";
      const natural = el.scrollWidth;
      const available = wrap.offsetWidth;
      // 0.7 = scaled down 30% from the original full-bleed fit
      if (natural > 0) el.style.fontSize = `${(available / natural) * 100 * 0.7}px`;
    };
    fit();
    const ro = new ResizeObserver(fit);
    if (wrapperRef.current) ro.observe(wrapperRef.current);
    return () => ro.disconnect();
  }, []);

  return (
    <footer className="border-t border-muted bg-bg">
      <div className="max-w-layout mx-auto px-6 md:px-[48px] lg:px-[64px]">
        {/* Giant email reveal */}
        <div className="py-16 md:py-24 border-b border-muted" ref={wrapperRef}>
          <motion.a
            ref={emailRef}
            href="mailto:hello@squarestate.pl"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.75, ease: [0.25, 0.1, 0.25, 1] }}
            className="font-display block text-center font-medium tracking-tight text-ink leading-none uppercase whitespace-nowrap hover:text-sage transition-colors duration-300"
          >
            HELLO@SQUARESTATE.PL
          </motion.a>
        </div>

        {/* Contact columns */}
        <div className="py-16 border-b border-muted grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {contacts.map(({ role, name, phone, email }) => (
            <div key={name}>
              <p className="text-[13px] leading-none uppercase tracking-widest font-normal text-ink/50 mb-5">
                {role}
              </p>
              <p className="text-[18px] leading-[1.55] font-medium text-ink mb-3">{name}</p>
              <a
                href={`tel:${phone.replace(/\s/g, "")}`}
                className="block text-[15px] leading-snug font-normal text-ink/60 hover:text-ink transition-colors mb-1"
              >
                {phone}
              </a>
              <a
                href={`mailto:${email}`}
                className="block text-[15px] leading-snug font-normal text-ink/60 hover:text-ink transition-colors break-all"
              >
                {email}
              </a>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3">
            <img src={asset("/assets/squareblack.png")} alt="Squarestate" className="h-6 w-auto opacity-40" />
            <span className="text-[13px] leading-none uppercase tracking-widest font-normal text-ink/50">
              ©2026
            </span>
          </Link>

          <nav className="flex items-center flex-wrap gap-x-6 gap-y-2">
            {bottomLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-[13px] leading-none uppercase tracking-widest font-normal text-ink/60 hover:text-ink transition-colors"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
