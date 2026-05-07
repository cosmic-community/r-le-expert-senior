import Link from 'next/link';
import { getCompanies, getMetafieldValue } from '@/lib/cosmic';
import PageHero from '@/components/PageHero';

export default async function CompaniesPage() {
  const companies = await getCompanies();

  return (
    <>
      <PageHero
        eyebrow="02 — Intelligence"
        title="Target Companies"
        description="SIRENE-anchored profiles cross-referenced with weak-signal detection. Cold data, refined."
      />
      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-6">
          {companies.length === 0 ? (
            <p className="text-neutral-500">No companies tracked yet.</p>
          ) : (
            <div className="space-y-4">
              {companies.map(c => {
                const m = c.metadata;
                const trajectory = getMetafieldValue(m.growth_trajectory);
                const score = m.relevance_score ?? 0;
                return (
                  <Link
                    key={c.id}
                    href={`/companies/${c.slug}`}
                    className="glass-card rounded-lg p-6 md:p-8 grid md:grid-cols-12 gap-6 items-center hover:shadow-gold transition-all group"
                  >
                    <div className="md:col-span-1 flex justify-start">
                      {m.company_logo ? (
                        <img
                          src={`${m.company_logo.imgix_url}?w=160&h=160&fit=crop&auto=format,compress`}
                          alt={m.company_name || c.title}
                          className="w-14 h-14 object-cover rounded border border-gold/20"
                          width={56}
                          height={56}
                        />
                      ) : (
                        <div className="w-14 h-14 rounded border border-gold/20 bg-anthracite-200 flex items-center justify-center font-serif text-2xl text-gold/40">
                          {(m.company_name || c.title).charAt(0)}
                        </div>
                      )}
                    </div>
                    <div className="md:col-span-5">
                      <h3 className="font-serif text-xl text-neutral-100 group-hover:text-gold transition-colors">
                        {m.company_name || c.title}
                      </h3>
                      <p className="text-sm text-neutral-500 mt-1">
                        {m.headquarters_city || '—'} · SIREN {m.siren || '—'}
                      </p>
                    </div>
                    <div className="md:col-span-3">
                      <p className="text-[10px] uppercase tracking-[0.25em] text-neutral-500 mb-1">Trajectory</p>
                      <p className="text-sm text-gold/90">{trajectory || '—'}</p>
                    </div>
                    <div className="md:col-span-2">
                      <p className="text-[10px] uppercase tracking-[0.25em] text-neutral-500 mb-1">Headcount</p>
                      <p className="text-sm text-neutral-300">{m.headcount_range || '—'}</p>
                    </div>
                    <div className="md:col-span-1 text-right">
                      <span className="font-serif text-2xl gold-text">{score}</span>
                      <p className="text-[10px] uppercase tracking-wider text-neutral-500">Score</p>
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