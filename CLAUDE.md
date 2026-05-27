# SQUARESTATE — GLOBALNE ZASADY PROJEKTU

## ⚠️ KRYTYCZNE — CZYTAJ PRZED KAŻDĄ ZMIANĄ

### FONT
- Jedyny dozwolony font w całym projekcie: **Lato** (Google Fonts)
- Weights: 100, 300, 400, 700, 900
- Import w layout.tsx przez next/font/google
- NIGDY nie używaj: TheinhardtSquare, EB Garamond, Georgia, Inter, serif, ani żadnego innego fonta
- Jeśli znajdziesz jakikolwiek inny font w kodzie — zamień go na Lato natychmiast

### ASSETS
- Wszystkie pliki graficzne pochodzą z ~/Desktop/square/
- Są skopiowane do /public/assets/
- Referencja zawsze przez: src="/assets/nazwa_pliku"
- Logo: /public/assets/squareblack.png — używaj wszędzie gdzie jest logo
- Logo w nawigacji: height 32px, width auto

### KOLORY (design tokens)
- Tło: #fcfcfa
- Tekst: #14151a
- Border: #b3bbbd
- Sage/akcent: #777d70

### TAILWIND CONFIG
fontFamily.sans musi być: ['Lato', 'var(--font-lato)', 'sans-serif']

### ARCHITEKTURA
- Framework: Next.js 14 App Router
- Animacje: Framer Motion
- Styling: Tailwind CSS

## ZAKAZ
❌ Nie zmieniaj fontów
❌ Nie dodawaj nowych fontów
❌ Nie używaj inline font-family innych niż Lato
❌ Nie modyfikuj tailwind.config fontFamily bez wyraźnej instrukcji
