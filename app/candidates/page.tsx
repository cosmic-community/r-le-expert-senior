import Link from 'next/link';
import { getCandidates, getMetafieldValue } from '@/lib/cosmic';
import PageHero from '@/components/PageHero';

export default async function CandidatesPage() {
  const candidates = await getCandidates();

  return (
    <>
      <PageHero
        eyebrow="01 — Talent"
        title="Candidate Profiles"
        description="Anonymized senior profiles with explicit business impact, target sectors, and seniority calibration."
      />
      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-6">
          {candidates.length === 0 ? (
            <p className="text-neutral-500">No candidates available.</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {candidates.map(c => {
                const photo = c.metadata.profile_photo;
                const seniority = getMetafieldValue(c.metadata.seniority_level);
                return (
                  <Link
                    key={c.id}
                    href={`/candidates/${c.slug}`}
                    className="glass-card rounded-lg overflow-hidden hover:shadow-gold transition-all group"
                  >
                    <div className="aspect-[4/3] relative overflow-hidden bg-anthracite-100">
                      {photo ? (
                        <img
                          src={`${photo.imgix_url}?w=800&h=600&fit=crop&auto=format,compress`}
                          alt={c.metadata.display_name || c.title}
                          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                          width={400}
                          height={300}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center font-serif text-6xl text-gold/20">◆</div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-anthracite-400 via-transparent to-transparent" />
                      {seniority && (
                        <span className="absolute top-4 right-4 text-[10px] uppercase tracking-[0.2em] bg-anthracite-400/80 backdrop-blur px-3 py-1.5 border border-gold/30 text-gold">
                          {seniority}
                        </span>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="font-serif text-xl text-neutral-100 mb-1 group-hover:text-gold transition-colors">
                        {c.metadata.display_name || c.title}
                      </h3>
                      <p className="text-sm text-neutral-400">{c.metadata.current_title || '—'}</p>
                      <div className="mt-4 flex items-center justify-between text-xs">
                        <span className="text-neutral-500">
                          {c.metadata.years_experience ? `${c.metadata.years_experience} yrs exp.` : '—'}
                        </span>
                        <span className="text-gold/70 uppercase tracking-wider">View profile →</span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}