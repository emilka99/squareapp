'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const LABELS: Record<string, string> = {
  'oferta': 'Oferta',
  'jak-dzialamy': 'Jak działamy',
  'o-nas': 'O nas',
  'realizacje': 'Realizacje',
  'kontakt': 'Kontakt',
  'strefa-goscia': 'Dla gościa',
  'strefa-klienta': 'Dla klienta',
  'blog': 'Blog',
  'kariera': 'Kariera',
  'dodaj-mieszkanie': 'Dodaj mieszkanie',
}

export default function Breadcrumb() {
  const pathname = usePathname()

  if (pathname === '/') return null

  const segments = pathname.split('/').filter(Boolean)

  const crumbs = [
    { label: 'Start', href: '/' },
    ...segments.map((seg, i) => ({
      label: LABELS[seg] ?? seg,
      href: '/' + segments.slice(0, i + 1).join('/'),
    })),
  ]

  return (
    <nav
      aria-label="Breadcrumb"
      className="w-full border-b border-[#b3bbbd]"
    >
      <ol className="max-w-[1316px] mx-auto px-6 md:px-[48px] lg:px-[64px] py-3 flex items-center gap-2 flex-wrap">
        {crumbs.map((crumb, i) => {
          const isLast = i === crumbs.length - 1
          return (
            <li key={crumb.href} className="flex items-center gap-2">
              {i > 0 && (
                <span
                  className="text-[#b3bbbd] text-[12px] font-normal select-none"
                  aria-hidden="true"
                >
                  /
                </span>
              )}
              {isLast ? (
                <span className="text-[13px] font-normal text-[#14151a] uppercase tracking-widest leading-none">
                  {crumb.label}
                </span>
              ) : (
                <Link
                  href={crumb.href}
                  className="text-[13px] font-normal text-[#b3bbbd] uppercase tracking-widest leading-none hover:text-[#14151a] transition-colors duration-200"
                >
                  {crumb.label}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
