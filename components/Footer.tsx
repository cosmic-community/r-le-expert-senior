export default function Footer() {
  return (
    <footer className="mt-24 border-t border-gold/10 bg-anthracite-400/50 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="gold-divider mb-8" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <div className="font-serif text-lg gold-text">HR Architect</div>
            <p className="text-xs text-neutral-500 mt-1 tracking-wider uppercase">Éminence Grise · Strategic Positioning</p>
          </div>
          <p className="text-xs text-neutral-600">
            © {new Date().getFullYear()} HR Architect. All positioning rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}