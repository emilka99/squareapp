"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const services = [
  {
    name: "Własna pralnia",
    detail:
      "Świeże ręczniki i pościel na każdy pobyt — bez outsourcingu, bez opóźnień.",
  },
  {
    name: "Własne ekipy remontowe",
    detail:
      "Szybka reakcja na usterki w ciągu 24 godzin. Drobne naprawy bez angażowania właściciela.",
  },
  {
    name: "Własne biuro projektowe",
    detail:
      "Homestaging i aranżacja wnętrz, które podnoszą oceny gości i zwiększają obłożenie.",
  },
  {
    name: "Zespół techniczny 24/7",
    detail:
      "Całodobowa gotowość na zgłoszenia techniczne od gości i właścicieli nieruchomości.",
  },
  {
    name: "Autorskie oprogramowanie",
    detail:
      "Własny system zarządzania rezerwacjami — pełna kontrola, transparentność i dane w czasie rzeczywistym.",
  },
];

interface Props {
  compact?: boolean; // true = no internal container/padding; parent handles layout
}

function Item({
  name,
  detail,
  isOpen,
  onToggle,
  padded,
}: {
  name: string;
  detail: string;
  isOpen: boolean;
  onToggle: () => void;
  padded: boolean;
}) {
  const inner = (
    <>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-8 py-5 md:py-6 text-left group"
      >
        <span className="text-[16px] md:text-[20px] font-light tracking-tight text-ink group-hover:text-sage transition-colors leading-snug">
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
            <p className="pb-5 text-[15px] leading-[1.6] font-normal text-ink/60 max-w-sm">
              {detail}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );

  return (
    <div className="border-b border-muted">
      {padded ? (
        <div className="max-w-[1316px] mx-auto px-6 md:px-[48px] lg:px-[64px]">
          {inner}
        </div>
      ) : (
        inner
      )}
    </div>
  );
}

export default function DodatkoweUslugi({ compact = false }: Props) {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <div className="border-t border-muted">
      {services.map(({ name, detail }) => (
        <Item
          key={name}
          name={name}
          detail={detail}
          isOpen={open === name}
          onToggle={() => setOpen(open === name ? null : name)}
          padded={!compact}
        />
      ))}
    </div>
  );
}
