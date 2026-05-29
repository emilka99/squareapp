"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { asset } from "@/lib/asset";

interface PageHeaderProps {
  imageSrc?: string;
  imageAlt?: string;
  className?: string;
  pageLabel?: string;    // small uppercase label — e.g. "Oferta"
  heading?: string;      // main claim — left column
  description?: string;  // body copy — right column
  ctaLabel?: string;     // optional CTA button label
  ctaHref?: string;      // optional CTA button href
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

export default function PageHeader({
  imageSrc,
  imageAlt = "",
  className = "",
  pageLabel,
  heading,
  description,
  ctaLabel,
  ctaHref,
}: PageHeaderProps) {
  const hasText = !!(pageLabel || heading || description);

  return (
    <div className={className}>
      {/* IMAGE — full bleed with S shape */}
      {imageSrc && <div className="relative w-full overflow-hidden" style={{ aspectRatio: "16/5.1" }}>
        <motion.div
          className="absolute inset-0 w-full h-full"
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        >
          {imageSrc ? (
            <img
              src={imageSrc}
              alt={imageAlt}
              className="w-full h-full object-cover object-center block"
            />
          ) : (
            <div className="w-full h-full bg-[#777d70]" />
          )}
        </motion.div>

        {/* S SHAPE */}
        <motion.div
          className="absolute top-0 right-0 bottom-0 w-[40%] md:w-[32%] lg:w-[28%]"
          style={{ zIndex: 10 }}
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
        >
          <img
            src={asset("/assets/Intersect.svg")}
            alt=""
            aria-hidden="true"
            className="w-full h-full"
            style={{ objectFit: "fill", display: "block", filter: "brightness(0) invert(1)" }}
          />
        </motion.div>
      </div>}

      {/* TEXT — below the image, two columns */}
      {hasText && (
        <motion.div
          className="max-w-[1316px] mx-auto px-6 md:px-[48px] lg:px-[64px] py-10 md:py-14"
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-16 items-end">
            {/* Left: label + heading */}
            <div>
              {pageLabel && (
                <motion.p
                  variants={fadeUp}
                  className="text-[11px] uppercase tracking-widest font-normal mb-4 leading-none"
                  style={{ color: "#6E6E6E" }}
                >
                  {pageLabel}
                </motion.p>
              )}
              {heading && (
                <motion.h1
                  variants={fadeUp}
                  className="text-[36px] md:text-[52px] lg:text-[64px] leading-none tracking-tight uppercase font-medium text-ink"
                >
                  {heading}
                </motion.h1>
              )}
            </div>

            {/* Right: description + optional CTA */}
            {(description || ctaLabel) && (
              <div className="flex flex-col gap-6 md:pb-1">
                {description && (
                  <motion.p
                    variants={fadeUp}
                    className="text-[14px] leading-[1.65] font-normal"
                    style={{ color: "#6E6E6E" }}
                  >
                    {description}
                  </motion.p>
                )}
                {ctaLabel && ctaHref && (
                  <motion.div variants={fadeUp}>
                    <Link
                      href={ctaHref}
                      className="inline-block px-8 py-3.5 bg-ink text-bg text-[13px] leading-none uppercase tracking-widest font-normal hover:bg-sage transition-colors whitespace-nowrap"
                    >
                      {ctaLabel}
                    </Link>
                  </motion.div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
}
