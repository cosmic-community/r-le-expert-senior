export default function PageHero({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return (
    <section className="relative pt-16 pb-12 md:pt-24 md:pb-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.3em] text-gold/80 mb-4">{eyebrow}</p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight">
            <span className="gold-text">{title}</span>
          </h1>
          {description && (
            <p className="mt-6 text-neutral-400 text-base md:text-lg leading-relaxed max-w-2xl">{description}</p>
          )}
          <div className="gold-divider mt-10" />
        </div>
      </div>
    </section>
  );
}