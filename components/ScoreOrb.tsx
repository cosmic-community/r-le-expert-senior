export default function ScoreOrb({ score, size = 'md' }: { score: number; size?: 'sm' | 'md' | 'lg' }) {
  const safe = Math.max(0, Math.min(100, score));
  const dimensions = {
    sm: 'w-20 h-20 text-xl',
    md: 'w-32 h-32 text-3xl',
    lg: 'w-44 h-44 text-5xl',
  }[size];

  const stroke = 4;
  const radius = 46;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (safe / 100) * circumference;

  return (
    <div className={`relative ${dimensions} score-3d rounded-full bg-gradient-to-br from-anthracite-100 to-anthracite-400 border border-gold/20 flex items-center justify-center`}>
      <svg className="absolute inset-0 -rotate-90" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r={radius} fill="none" stroke="rgba(212,175,55,0.08)" strokeWidth={stroke} />
        <circle
          cx="50" cy="50" r={radius}
          fill="none"
          stroke="url(#goldGrad)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
        <defs>
          <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E5C158" />
            <stop offset="100%" stopColor="#A8861F" />
          </linearGradient>
        </defs>
      </svg>
      <div className="relative flex flex-col items-center">
        <span className="font-serif gold-text font-semibold leading-none">{safe}</span>
        <span className="text-[9px] uppercase tracking-[0.25em] text-neutral-500 mt-1">Match</span>
      </div>
    </div>
  );
}