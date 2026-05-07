// app/candidates/[slug]/page.tsx
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getCandidate, getMetafieldValue } from '@/lib/cosmic';

export default async function CandidatePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const candidate = await getCandidate(slug);
  if (!candidate) notFound();

  const m = candidate.metadata;
  const photo = m.profile_photo;
  const seniority = getMetafieldValue(m.seniority_level);

  return (
    <article className="pt-16 pb-24">
      <div className="mx-auto max-w-5xl px-6">
        <Link href="/candidates" className="text-xs uppercase tracking-[0.25em] text-neutral-500 hover:text-gold transition-colors">
          ← All candidates
        </Link>

        <div className="mt-10 grid md:grid-cols-3 gap-10">
          <div className="md:col-span-1">
            {photo ? (
              <div className="glass-card rounded-lg overflow-hidden">
                <img
                  src={`${photo.imgix_url}?w=900&h=1200&fit=crop&auto=format,compress`}
                  alt={m.display_name || candidate.title}
                  className="w-full aspect-[3/4] object-cover"
                  width={450}
                  height={600}
                />
              </div>
            ) : (
              <div className="glass-card rounded-lg aspect-[3/4] flex items-center justify-center font-serif text-8xl text-gold/20">◆</div>
            )}

            {m.anonymized_hash && (
              <div className="mt-6 glass-card rounded-lg p-5">
                <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-500">GDPR Hash</p>
                <p className="mt-2 font-mono text-xs text-gold/70 break-all">{m.anonymized_hash}</p>
              </div>
            )}
          </div>

          <div className="md:col-span-2">
            {seniority && (
              <p className="text-xs uppercase tracking-[0.3em] text-gold/80 mb-3">{seniority}</p>
            )}
            <h1 className="font-serif text-4xl md:text-5xl gold-text">{m.display_name || candidate.title}</h1>
            <p className="mt-4 text-lg text-neutral-300">{m.current_title || '—'}</p>

            <div className="gold-divider my-8" />

            <dl className="grid grid-cols-2 gap-y-6 gap-x-8 text-sm">
              <div>
                <dt className="text-[10px] uppercase tracking-[0.25em] text-neutral-500 mb-1">Experience</dt>
                <dd className="text-neutral-200">{m.years_experience ? `${m.years_experience} years` : '—'}</dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-[0.25em] text-neutral-500 mb-1">GDPR Consent</dt>
                <dd className="text-neutral-200">{m.gdpr_consent ? 'Granted' : 'Pending'}</dd>
              </div>
            </dl>

            {Array.isArray(m.target_sectors) && m.target_sectors.length > 0 && (
              <div className="mt-8">
                <p className="text-[10px] uppercase tracking-[0.25em] text-neutral-500 mb-3">Target Sectors</p>
                <div className="flex flex-wrap gap-2">
                  {m.target_sectors.map(s => (
                    <span key={s} className="px-3 py-1.5 text-xs border border-gold/20 bg-anthracite-300/50 text-neutral-300">{s}</span>
                  ))}
                </div>
              </div>
            )}

            {m.core_expertise && (
              <section className="mt-10">
                <h2 className="font-serif text-xl text-neutral-100 mb-3">Core Expertise</h2>
                <p className="text-neutral-400 leading-relaxed whitespace-pre-line">{m.core_expertise}</p>
              </section>
            )}

            {m.business_impact && (
              <section className="mt-8">
                <h2 className="font-serif text-xl text-neutral-100 mb-3">Business Impact</h2>
                <p className="text-neutral-400 leading-relaxed whitespace-pre-line">{m.business_impact}</p>
              </section>
            )}

            {m.cv_document && (
              <a
                href={m.cv_document.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-10 inline-flex items-center px-6 py-3 border border-gold/40 text-gold hover:bg-gold/5 transition-all text-xs uppercase tracking-[0.25em]"
              >
                Download CV →
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}