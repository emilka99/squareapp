"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { type Apartment } from "@/lib/realizacje";
import PageHeader from "@/components/PageHeader";
import ApartmentMap from "@/components/ApartmentMap";
import { SITE_CONTAINER } from "@/lib/layout";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const VP = { once: true, margin: "-80px" } as const;

export default function ApartmentPageClient({ apartment }: { apartment: Apartment }) {
  const { name, address, district, description, coords, images } = apartment;
  const hasImages = images.length > 0;

  return (
    <>
      {/* PAGE HEADER */}
      <PageHeader
        imageSrc={hasImages ? images[0] : undefined}
        imageAlt={name}
        className="border-b border-muted"
      />

      {/* APARTMENT HEADER */}
      <section className="border-b border-muted">
        <motion.div
          initial="hidden"
          animate="show"
          variants={stagger}
          className={`${SITE_CONTAINER} py-[60px] md:py-[80px]`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-end">
            <div>
              <motion.p
                variants={fadeUp}
                className="text-[13px] leading-none uppercase tracking-widest font-normal mb-4"
                style={{ color: "#b3bbbd" }}
              >
                {district}
              </motion.p>
              <motion.h1
                variants={fadeUp}
                className="text-[36px] md:text-[52px] lg:text-[64px] leading-none tracking-tight uppercase font-normal text-ink mb-4"
              >
                {name}
              </motion.h1>
              <motion.p
                variants={fadeUp}
                className="text-[18px] font-normal leading-snug"
                style={{ color: "#6e7780" }}
              >
                {address}
              </motion.p>
            </div>
            <motion.p
              variants={fadeUp}
              className="text-[18px] md:text-[20px] font-light leading-[1.6] max-w-[480px]"
              style={{ color: "#6e7780" }}
            >
              {description}
            </motion.p>
          </div>
        </motion.div>
      </section>

      {/* PHOTO GRID */}
      <section className="border-b border-muted">
        {hasImages ? (
          <>
            <div style={{ aspectRatio: "16/7" }} className="overflow-hidden">
              <img
                src={images[0]}
                alt={name}
                className="w-full h-full object-cover"
              />
            </div>
            {images.length > 1 ? (
              <div className="grid grid-cols-3 gap-1 mt-1">
                {images.slice(1).map((src, i) => (
                  <div key={i} className="overflow-hidden" style={{ aspectRatio: "1/1" }}>
                    <img src={src} alt={`${name} — zdjęcie ${i + 2}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-1 mt-1">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="flex items-center justify-center bg-[#e8e8e5]" style={{ aspectRatio: "1/1" }}>
                    <span className="text-[13px] uppercase tracking-widest font-normal" style={{ color: "#b3bbbd" }}>
                      Zdjęcie wkrótce
                    </span>
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          <>
            <div className="w-full flex items-center justify-center bg-[#e8e8e5]" style={{ aspectRatio: "16/7" }}>
              <span className="text-[13px] uppercase tracking-widest font-normal" style={{ color: "#b3bbbd" }}>
                {name}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-1 mt-1">
              {[0, 1, 2].map((i) => (
                <div key={i} className="flex items-center justify-center bg-[#e8e8e5]" style={{ aspectRatio: "1/1" }}>
                  <span className="text-[13px] uppercase tracking-widest font-normal" style={{ color: "#b3bbbd" }}>
                    Zdjęcie wkrótce
                  </span>
                </div>
              ))}
            </div>
          </>
        )}
      </section>

      {/* MAP */}
      <section className="border-b border-muted">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={VP}
          variants={stagger}
          className={`${SITE_CONTAINER} py-[60px] md:py-[80px]`}
        >
          <motion.p
            variants={fadeUp}
            className="text-[13px] leading-none uppercase tracking-widest font-normal mb-8"
            style={{ color: "#b3bbbd" }}
          >
            Lokalizacja
          </motion.p>
          <motion.div variants={fadeUp}>
            <ApartmentMap coords={coords} name={name} address={address} />
          </motion.div>
          <motion.div variants={fadeUp} className="mt-6">
            <p className="text-[18px] font-normal leading-snug text-ink">{address}</p>
            <p className="text-[13px] uppercase tracking-widest font-normal mt-2 leading-none" style={{ color: "#b3bbbd" }}>
              {district}
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* BACK + CTA */}
      <section>
        <div
          className={`${SITE_CONTAINER} py-[56px] flex flex-col md:flex-row items-start md:items-center justify-between gap-6`}
        >
          <Link
            href="/realizacje"
            className="text-[18px] font-normal text-ink border-b border-transparent hover:border-[#b3bbbd] transition-colors duration-200 pb-0.5"
          >
            ← Wszystkie realizacje
          </Link>
          <Link
            href="/kontakt"
            className="text-[18px] font-normal text-ink border-b border-transparent hover:border-[#b3bbbd] transition-colors duration-200 pb-0.5"
          >
            Zarządzamy tym mieszkaniem — zarządzimy Twoim. →
          </Link>
        </div>
      </section>
    </>
  );
}
