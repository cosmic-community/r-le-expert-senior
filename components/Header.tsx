import Link from 'next/link';

const nav = [
  { href: '/candidates', label: 'Candidates' },
  { href: '/companies', label: 'Companies' },
  { href: '/reports', label: 'Reports' },
  { href: '/messages', label: 'Messages' },
  { href: '/portfolios', label: 'Portfolios' },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-gold/10 bg-anthracite-400/70 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded border border-gold/40 flex items-center justify-center bg-gradient-to-br from-anthracite-50 to-anthracite-300 group-hover:border-gold transition-colors">
            <span className="gold-text font-serif text-xl">H</span>
          </div>
          <div className="leading-tight">
            <div className="font-serif text-lg tracking-wide gold-text">HR Architect</div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-neutral-500">Strategic Positioning</div>
          </div>
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          {nav.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-neutral-400 hover:text-gold transition-colors relative after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-gold hover:after:w-full after:transition-all"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}