# SQUARESTATE — DESIGN SYSTEM
# ⚠️ PRZECZYTAJ PRZED KAŻDĄ ZMIANĄ. NIE MODYFIKUJ BEZ WYRAŹNEJ INSTRUKCJI.

## FONT
- Jedyny font: **Lato** (Google Fonts)
- Weights dozwolone: 100 (Thin), 300 (Light), 400 (Regular), **500 (Medium) — MAX GRUBOŚĆ**
- Weight 700 (Bold) i 900 (Black): ZAKAZ UŻYCIA
- Import w layout.tsx:
```ts
  import { Lato } from 'next/font/google'
  const lato = Lato({
    subsets: ['latin', 'latin-ext'],
    weight: ['100', '300', '400', '500'],
    variable: '--font-lato',
    display: 'swap',
  })
```
- tailwind.config.ts: fontFamily.sans: ['var(--font-lato)', 'sans-serif']

## TYPOGRAFIA — HIERARCHIA (NIENARUSZALNA)

### DISPLAY / H1 — "Wielka typografia"
- Użycie: hero headings, główne hasła stron
- Font-size: 64px (desktop) / 40px (mobile)
- Line-height: 1.0
- Font-weight: 500 (Medium)
- Text-transform: UPPERCASE
- Letter-spacing: -0.02em
- Tailwind: `text-[64px] leading-none tracking-tight uppercase font-medium`

### H2 — Section headers
- Użycie: tytuły sekcji na stronach (Co zyskujesz?, Realizacje, Jak działamy)
- Font-size: 48px (desktop) / 32px (mobile)
- Line-height: 1.0
- Font-weight: 500 (Medium)
- Text-transform: UPPERCASE
- Letter-spacing: -0.02em
- Tailwind: `text-[48px] leading-none tracking-tight uppercase font-medium`

### H3 — Subsection titles
- Użycie: podtytuły kart, nazwy usług, numery kroków
- Font-size: 26px (desktop) / 20px (mobile)
- Line-height: 1.25
- Font-weight: 500 (Medium)
- Text-transform: NORMAL (nie uppercase)
- Letter-spacing: 0
- Tailwind: `text-[26px] leading-snug font-medium`

### H4 — Small labels / kategorie
- Użycie: etykiety sekcji, breadcrumbs, tagi
- Font-size: 13px
- Line-height: 1.0
- Font-weight: 400 (Regular)
- Text-transform: UPPERCASE
- Letter-spacing: 0.08em
- Tailwind: `text-[13px] leading-none uppercase tracking-widest font-normal`

### BODY LARGE
- Użycie: główny tekst paragrafów, opisy
- Font-size: 20px (desktop) / 16px (mobile)
- Line-height: 1.6 (28px)
- Font-weight: 300 (Light)
- Tailwind: `text-[20px] leading-[1.6] font-light`

### BODY DEFAULT
- Użycie: secondary text, opisy kart
- Font-size: 18px
- Line-height: 1.55 (28px)
- Font-weight: 300 (Light)
- Tailwind: `text-[18px] leading-[1.55] font-light`

### BODY SMALL
- Użycie: footery, meta info, kontakty
- Font-size: 15px
- Line-height: 1.4
- Font-weight: 400 (Regular)
- Tailwind: `text-[15px] leading-snug font-normal`

### LINK / CTA TEXT
- Użycie: "Bezpłatna wycena", "Więcej o procesie", "Wszystkie realizacje"
- Font-size: 24px
- Line-height: 1.0
- Font-weight: 400 (Regular)
- Text-decoration: underline (kolor: #b3bbbd)
- Tailwind: `text-[24px] leading-none font-normal underline decoration-[#b3bbbd]`

### DISPLAY FOOTER — "Giant email"
- Użycie: TYLKO w footerze — HELLO@SQUARESTATE.PL
- Font-size: clamp(48px, 7.5vw, 106px)
- Line-height: 1.0
- Font-weight: 500 (Medium)
- Text-transform: UPPERCASE
- Tailwind: `text-[clamp(48px,7.5vw,106px)] leading-none uppercase font-medium`

## KOLORY (design tokens)
- `--color-ink`: #14151a — główny tekst, ikony, granice
- `--color-bg`: #fcfcfa — tło strony (ciepła biel)
- `--color-muted`: #b3bbbd — bordery, dividers, subtext
- `--color-sage`: #777d70 — akcenty, overlay na zdjęciach
- `--color-secondary-text`: #6e7780 — secondary body text

## SPACING (sekcje)
- Padding sekcji: py-[120px] (desktop) / py-[64px] (mobile)
- Max-width contentu: max-w-[1316px] mx-auto
- Padding poziomy: px-[64px] (desktop) / px-[24px] (mobile)
- Gap między sekcjami: gap-[110px]

## BORDERS
- Divider między sekcjami: `border-t border-[rgba(0,0,0,0.1)]`
- Divider między itemami: `border-b border-[#b3bbbd]`
- Grubość: zawsze 1px (nigdy 2px ani więcej)

## LOGO
- Plik: /public/assets/squareblack.png
- W nav: height 32px, width auto
- Zawsze img tag: `<img src="/assets/squareblack.png" alt="Squarestate" className="h-8 w-auto" />`

## ASSETS
- Wszystkie pliki graficzne: /public/assets/
- Referencja zawsze przez: src="/assets/nazwa_pliku"

## ARCHITEKTURA
- Framework: Next.js 14 App Router
- Animacje: Framer Motion
- Styling: Tailwind CSS

## ZAKAZY
❌ font-weight 700 (bold) — NIGDY
❌ font-weight 900 (black) — NIGDY
❌ Żaden inny font poza Lato
❌ Uppercase na H3 i niżej
❌ Uppercase na body text
❌ border grubszy niż 1px
❌ Modyfikacja font-size bez zachowania tej hierarchii
