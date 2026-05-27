"use client";

import Link from "next/link";
import { motion } from "framer-motion";

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
  return (
    <footer className="border-t border-muted bg-bg">
      <div className="max-w-layout mx-auto px-8 md:px-16">
        {/* Giant email reveal */}
        <div className="py-16 md:py-24 border-b border-muted overflow-hidden">
          <motion.a
            href="mailto:hello@squarestate.pl"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.75, ease: [0.25, 0.1, 0.25, 1] }}
            className="block font-serif tracking-tight text-ink leading-none whitespace-nowrap hover:text-sage transition-colors duration-300"
            style={{ fontSize: "clamp(80px, 8.1vw, 106px)" }}
          >
            HELLO@SQUARESTATE.PL
          </motion.a>
        </div>

        {/* Contact columns */}
        <div className="py-16 border-b border-muted grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {contacts.map(({ role, name, phone, email }) => (
            <div key={name}>
              <p className="text-[10px] uppercase tracking-[0.2em] text-muted mb-5">
                {role}
              </p>
              <p className="text-sm text-ink font-medium mb-3">{name}</p>
              <a
                href={`tel:${phone.replace(/\s/g, "")}`}
                className="block text-sm text-muted hover:text-ink transition-colors mb-1"
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
        </div>

        {/* Bottom bar */}
        <div className="py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3">
            <img src="/assets/squareblack.png" alt="Squarestate" className="h-6 w-auto opacity-40" />
            <span className="text-[10px] tracking-[0.2em] uppercase text-muted">
              ©2026
            </span>
          </Link>

          <nav className="flex items-center flex-wrap gap-x-6 gap-y-2">
            {bottomLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-[10px] uppercase tracking-[0.2em] text-muted hover:text-ink transition-colors"
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
