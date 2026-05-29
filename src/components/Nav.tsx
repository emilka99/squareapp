"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";

function useScrollHide() {
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > lastY.current && y > 80);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return hidden;
}

const strefaItems = [
  { href: "/oferta", label: "Oferta" },
  { href: "/jak-dzialamy", label: "Jak działamy" },
  { href: "/dodaj-mieszkanie", label: "Dodaj mieszkanie" },
];

const mainLinks = [
  { href: "/strefa-goscia", label: "Dla gościa" },
  { href: "/realizacje", label: "Realizacje" },
  { href: "/o-nas", label: "O nas" },
  { href: "/kontakt", label: "Kontakt" },
];

export default function Nav() {
  const pathname = usePathname();
  const hidden = useScrollHide();
  const [dropdown, setDropdown] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [lang, setLang] = useState<"PL" | "EN">("PL");

  useEffect(() => {
    setDropdown(false);
    setMobile(false);
  }, [pathname]);

  const strefaActive = strefaItems.some((i) => i.href === pathname);

  return (
    <>
      <motion.header
        variants={{ visible: { y: 0 }, hidden: { y: "-100%" } }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
        className="fixed inset-x-0 top-0 z-50 bg-bg"
      >
        <div className="max-w-layout mx-auto px-6 md:px-[48px] lg:px-[64px] h-[68px] flex items-center gap-8">
          {/* Logo + lang */}
          <div className="flex items-center gap-4 shrink-0">
            <Link href="/" className="flex items-center">
              <img src="/assets/squareblack.png" alt="Squarestate" className="h-[22px] w-auto" />
            </Link>
            <div className="hidden lg:flex items-center gap-1.5 text-[11px] tracking-[0.16em]">
              <button
                onClick={() => setLang("PL")}
                className={clsx("transition-colors", lang === "PL" ? "text-ink font-medium" : "text-muted hover:text-ink")}
              >
                PL
              </button>
              <span className="text-muted">/</span>
              <button
                onClick={() => setLang("EN")}
                className={clsx("transition-colors", lang === "EN" ? "text-ink font-medium" : "text-muted hover:text-ink")}
              >
                EN
              </button>
            </div>
          </div>

          {/* Desktop nav — centered */}
          <nav className="hidden lg:flex items-center gap-7 flex-1 justify-center">
            {/* Dla klienta dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setDropdown(true)}
              onMouseLeave={() => setDropdown(false)}
            >
              <button
                className="relative flex items-center gap-1.5 text-[11px] tracking-[0.16em] uppercase pb-0.5 text-ink transition-colors hover:opacity-70"
              >
                Dla klienta
                <motion.svg
                  animate={{ rotate: dropdown ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  width="9"
                  height="5"
                  viewBox="0 0 9 5"
                  fill="none"
                  className="mt-0.5 shrink-0"
                >
                  <path
                    d="M1 1l3.5 3L8 1"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </motion.svg>
                {strefaActive && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-0 right-0 h-px bg-ink"
                  />
                )}
              </button>

              <AnimatePresence>
                {dropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                    className="absolute top-full left-0 mt-3 bg-bg border border-muted min-w-[200px] py-1.5"
                  >
                    {strefaItems.map(({ href, label }) => (
                      <Link
                        key={href}
                        href={href}
                        className="block px-5 py-2.5 text-[11px] tracking-[0.16em] uppercase text-ink transition-colors hover:opacity-70"
                      >
                        {label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Main links */}
            {mainLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="relative text-[11px] tracking-[0.16em] uppercase pb-0.5 text-ink transition-colors hover:opacity-70"
              >
                {label}
                {pathname === href && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-0 right-0 h-px bg-ink"
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Right: email */}
          <div className="hidden lg:flex items-center shrink-0 ml-auto">
            <a
              href="mailto:hello@squarestate.pl"
              className="text-[11px] tracking-[0.1em] text-ink underline underline-offset-2 hover:text-sage transition-colors"
            >
              hello@squarestate.pl
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden flex flex-col justify-center gap-[5px] w-10 h-10 ml-auto -mr-2 shrink-0"
            onClick={() => setMobile((v) => !v)}
            aria-label="Toggle menu"
          >
            <motion.span
              animate={{ rotate: mobile ? 45 : 0, y: mobile ? 6 : 0 }}
              transition={{ duration: 0.25 }}
              className="block w-6 h-px bg-ink origin-center"
            />
            <motion.span
              animate={{ opacity: mobile ? 0 : 1 }}
              transition={{ duration: 0.2 }}
              className="block w-6 h-px bg-ink"
            />
            <motion.span
              animate={{ rotate: mobile ? -45 : 0, y: mobile ? -6 : 0 }}
              transition={{ duration: 0.25 }}
              className="block w-6 h-px bg-ink origin-center"
            />
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobile && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="overflow-hidden border-t border-muted lg:hidden"
            >
              <div className="px-6 pb-6 flex flex-col">
                <p className="py-3 text-[10px] tracking-[0.2em] uppercase text-muted border-b border-muted">
                  Dla klienta
                </p>
                {strefaItems.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    className={clsx(
                      "py-3 text-[11px] tracking-[0.16em] uppercase border-b border-muted transition-colors pl-3",
                      pathname === href ? "text-ink" : "text-muted"
                    )}
                  >
                    {label}
                  </Link>
                ))}
                {mainLinks.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    className={clsx(
                      "py-3 text-[11px] tracking-[0.16em] uppercase border-b border-muted transition-colors",
                      pathname === href ? "text-ink" : "text-muted"
                    )}
                  >
                    {label}
                  </Link>
                ))}
                <div className="pt-5 flex items-center justify-between">
                  <a
                    href="mailto:hello@squarestate.pl"
                    className="text-[11px] underline underline-offset-2 text-ink"
                  >
                    hello@squarestate.pl
                  </a>
                  <div className="flex gap-2 text-[11px] tracking-[0.16em]">
                    <button
                      onClick={() => setLang("PL")}
                      className={lang === "PL" ? "text-ink" : "text-muted"}
                    >
                      PL
                    </button>
                    <span className="text-muted">/</span>
                    <button
                      onClick={() => setLang("EN")}
                      className={lang === "EN" ? "text-ink" : "text-muted"}
                    >
                      EN
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Spacer so content isn't hidden under the fixed nav */}
      <div className="h-[68px]" aria-hidden="true" />
    </>
  );
}
