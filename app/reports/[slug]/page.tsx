// app/reports/[slug]/page.tsx
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getReport, getMetafieldValue } from '@/lib/cosmic';
import ScoreOrb from '@/components/ScoreOrb';

export default async function ReportPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const report = await getReport(slug);
  if (!report) notFound();

  const m = report.metadata;
  const status = getMetafieldValue(m.report_status);
  const cover = m.cover_image;

  return (
    <article className="pt-16 pb-24">
      <div className="mx-auto max-w-5xl px-6">
        <Link href="/reports" className="text-xs uppercase tracking-[0.25em] text-neutral-500 hover:text-gold transition-colors">
          ← All reports
        </Link>

        {cover && (
          <div className="mt-8 glass-card rounded-lg overflow-hidden aspect-[21/9]">
            <img
              src={`${cover.imgix_url}?w=2000&h=860&fit=crop&auto=format,compress`}
              alt={m.report_title || report.title}
              className="w-full h-full object-cover opacity-60"
              width={1000}
              height={430}
            />
          </div>
        )}

        <header className="mt-10">
          {status && <p className="text-xs uppercase tracking-[0.3em] text-gold/80 mb-3">{status}</p>}
          <h1 className="font-serif text-4xl md:text-5xl gold-text leading-tight">{m.report_title || report.title}</h1>
        </header>

        <div className="gold-divider my-10" />

        <div className="grid md:grid-cols-3 gap-8 items-start mb-12">
          <div className="md:col-span-1 flex justify-center">
            <ScoreOrb score={m.match_score ?? 0} size="lg" />
          </div>
          <div className="md:col-span-2 grid grid-cols-2 gap-6">
            <div className="glass-card rounded-lg p-5">
              <p className="text-[10px] uppercase tracking-[0.25em] text-neutral-500 mb-2">Candidate</p>
              {m.candidate ? (
                <Link href={`/candidates/${m.candidate.slug}`} className="font-serif text-lg text-neutral-100 hover:text-gold transition-colors">
                  {m.candidate.metadata?.display_name || m.candidate.title}
                </Link>
              ) : (
                <p className="text-neutral-500">—</p>
              )}
            </div>
            <div className="glass-card rounded-lg p-5">
              <p className="text-[10px] uppercase tracking-[0.25em] text-neutral-500 mb-2">Target Company</p>
              {m.target_company ? (
                <Link href={`/companies/${m.target_company.slug}`} className="font-serif text-lg text-neutral-100 hover:text-gold transition-colors">
                  {m.target_company.metadata?.company_name || m.target_company.title}
                </Link>
              ) : (
                <p className="text-neutral-500">—</p>
              )}
            </div>
          </div>
        </div>

        {m.positioning_analysis && (
          <section className="mb-10">
            <h2 className="font-serif text-2xl text-neutral-100 mb-4">Positioning Analysis</h2>
            <div className="text-neutral-400 leading-relaxed whitespace-pre-line">{m.positioning_analysis}</div>
          </section>
        )}

        {m.match_diff && (
          <section className="mb-10">
            <h2 className="font-serif text-2xl text-neutral-100 mb-4">Match Diff</h2>
            <div className="glass-card rounded-lg p-6 font-mono text-sm text-neutral-300 whitespace-pre-wrap leading-relaxed">{m.match_diff}</div>
          </section>
        )}

        {m.recommended_angle && (
          <section className="mb-10">
            <h2 className="font-serif text-2xl text-neutral-100 mb-4">Recommended Angle</h2>
            <div className="glass-card rounded-lg p-6 border-l-2 border-gold/60">
              <p className="text-neutral-300 leading-relaxed italic whitespace-pre-line">{m.recommended_angle}</p>
            </div>
          </section>
        )}
      </div>
    </article>
  );
}