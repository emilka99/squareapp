const services = [
  "Własna pralnia",
  "Własne ekipy remontowe",
  "Własne biuro projektowe",
  "Zespół techniczny 24/7",
  "Autorskie oprogramowanie",
];

export default function DodatkoweUslugi() {
  return (
    <div className="border-t border-muted">
      {services.map((name) => (
        <div
          key={name}
          className="group border-b border-muted cursor-default"
        >
          <div className="max-w-layout mx-auto px-8 md:px-16 py-5 md:py-7 flex items-center justify-between gap-8">
            <span
              className="relative font-serif tracking-tight text-ink"
              style={{ fontSize: "clamp(26px, 3.5vw, 48px)" }}
            >
              {name}
              <span className="absolute bottom-0 left-0 h-px bg-ink w-0 group-hover:w-full transition-all duration-350" />
            </span>
            <span className="text-xl text-muted group-hover:translate-x-2 transition-transform duration-300 inline-block shrink-0">
              →
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
