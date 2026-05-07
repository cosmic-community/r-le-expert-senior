import Link from 'next/link';
import { getReports, getMetafieldValue } from '@/lib/cosmic';
import PageHero from '@/components/PageHero';
import ScoreOrb from '@/components/ScoreOrb';

export default async function ReportsPage() {
  const reports = await getReports();

  return (
    <>
      <PageHero
        eyebrow="03 — Synthesis"
        title="Positioning Reports"
        description="Semantic match scoring with diff visualization and recommended angle for each candidate × company pairing."
      />
      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-6">
          {reports.length === 0 ? (
            <p className="text-neutral-500">No reports generated yet.</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {reports.map(r => {
                const m = r.metadata;
                const status = getMetafieldValue(m.report_status);
                return (
                  <Link
                    key={r.id}
                    href={`/reports/${r.slug}`}
                    className="glass-card rounded-lg p-6 md:p-8 hover:shadow-gold transition-all group flex gap-6 items-center"
                  >
                    <ScoreOrb score={m.match_score ?? 0} size="sm" />
                    <div className="flex-1 min-w-0">
                      {status && <p className="text-[10px] uppercase tracking-[0.25em] text-gold/70 mb-2">{status}</p>}
                      <h3 className="font-serif text-lg text-neutral-100 group-hover:text-gold transition-colors line-clamp-2">
                        {m.report_title || r.title}
                      </h3>
                      <div className="mt-3 text-xs text-neutral-500 space-y-0.5">
                        <p>Candidate: <span className="text-neutral-300">{m.candidate?.metadata?.display_name || '—'}</span></p>
                        <p>Company: <span className="text-neutral-300">{m.target_company?.metadata?.company_name || '—'}</span></p>
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