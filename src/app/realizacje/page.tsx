"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { apartments } from "@/lib/realizacje";
import { SITE_CONTAINER } from "@/lib/layout";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};
const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const VP = { once: true, margin: "-80px" } as const;

function ApartmentCell({
  slug,
  name,
  address,
  district,
  images,
  rowIndex,
}: {
  slug: string;
  name: string;
  address: string;
  district: string;
  images: string[];
  rowIndex: number;
}) {
  const hasImage = images.length > 0;
  const isEvenRow = rowIndex % 2 !== 0;

  return (
    <motion.div variants={fadeUp}>
      <Link
        href={`/realizacje/${slug}`}
        className="group block overflow-hidden"
        style={{
          borderTop: isEvenRow ? "1px solid #b3bbbd" : undefined,
        }}
      >
        <div className="p-8">
          {/* Image */}
          <div
            className="overflow-hidden bg-[#e8e8e5]"
            style={{ aspectRatio: "1/1" }}
          >
            {hasImage ? (
              <img
                src={images[0]}
                alt={name}
                className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span
                  className="text-[13px] uppercase tracking-widest font-normal"
                  style={{ color: "#b3bbbd" }}
                >
                  {name}
                </span>
              </div>
            )}
          </div>

          {/* Bottom bar */}
          <div className="pt-4 flex items-end justify-between gap-4">
            <div>
              <p className="text-[18px] font-normal leading-snug text-ink mb-1">
                {name}
              </p>
              <p className="text-[14px] font-normal leading-none" style={{ color: "#b3bbbd" }}>
                {address}
              </p>
            </div>
            <div className="shrink-0 flex items-center gap-2">
              <span
                className="text-[13px] uppercase tracking-widest font-normal"
                style={{ color: "#b3bbbd" }}
              >
                {district}
              </span>
              <span className="text-[16px] font-normal text-ink transition-transform duration-300 group-hover:translate-x-1 inline-block">
                →
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function Realizacje() {
  return (
    <>
      {/* PAGE HEADER — text only */}
      <section>
        <motion.div
          initial="hidden"
          animate="show"
          variants={stagger}
          className={`${SITE_CONTAINER} py-[60px] md:py-[80px]`}
        >
          <motion.p
            variants={fadeUp}
            className="text-[13px] leading-none uppercase tracking-widest font-normal mb-4"
            style={{ color: "#b3bbbd" }}
          >
            Realizacje
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-end">
            <motion.h1
              variants={fadeUp}
              className="text-[36px] md:text-[52px] lg:text-[64px] leading-none tracking-tight uppercase font-medium text-ink"
            >
              Nasze apartamenty
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="text-[18px] md:text-[20px] font-light leading-[1.6] max-w-[480px]"
              style={{ color: "#6e7780" }}
            >
              Ponad 200 mieszkań przekształconych w dochodowe apartamenty krótkoterminowe. Każdy z nich zarządzamy z taką samą starannością — od homestagingu po comiesięczny przelew.
            </motion.p>
          </div>
        </motion.div>
      </section>

      {/* APARTMENT GRID */}
      <section style={{ borderBottom: "1px solid #b3bbbd" }}>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={VP}
          variants={stagger}
          className="max-w-[1316px] mx-auto grid grid-cols-1 md:grid-cols-2"
        >
          {apartments.map((apt, i) => (
            <ApartmentCell
              key={apt.slug}
              {...apt}
              rowIndex={Math.floor(i / 2)}
            />
          ))}
        </motion.div>
      </section>

      {/* INTERSTITIAL CTA */}
      <section>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={VP}
          variants={stagger}
          className={`${SITE_CONTAINER} py-[80px] md:py-[100px]`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {/* Left */}
            <motion.div
              variants={fadeUp}
              className="pb-12 md:pb-0 md:pr-16"
            >
              <p
                className="font-display font-normal leading-none tracking-tight uppercase"
                style={{ fontSize: "clamp(32px, 3.5vw, 48px)" }}
              >
                Twoje mieszkanie
                <br />
                może być następne.
              </p>
            </motion.div>

            {/* Right */}
            <motion.div
              variants={fadeUp}
              className="md:pl-16 pt-12 md:pt-0 flex flex-col justify-center gap-8"
            >
              <p
                className="text-[18px] md:text-[20px] font-light leading-[1.6] max-w-[480px]"
                style={{ color: "#6e7780" }}
              >
                Zarządzamy ponad 200 apartamentami w Krakowie.
                Wiemy, co działa — i możemy zadbać o Twój lokal tak samo.
              </p>
              <Link
                href="/kontakt"
                className="self-start text-[20px] md:text-[24px] leading-none font-normal text-ink border-b border-[#b3bbbd] pb-1 hover:border-ink transition-colors duration-200"
              >
                Dodaj swoje mieszkanie →
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </>
  );
}
