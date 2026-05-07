// app/companies/[slug]/page.tsx
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getCompany, getMetafieldValue } from '@/lib/cosmic';

export default async function CompanyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const company = await getCompany(slug);
  if (!company) notFound();

  const m = company.metadata;
  const trajectory = getMetafieldValue(m.growth_trajectory);

  return (
    <article className="pt-16 pb-24">
      <div className="mx-auto max-w-5xl px-6">
        <Link href="/companies" className="text-xs uppercase tracking-[0.25em] text-neutral-500 hover:text-gold transition-colors">
          ← All companies
        </Link>

        <header className="mt-10 flex items-start gap-6">
          {m.company_logo ? (
            <img
              src={`${m.company_logo.imgix_url}?w=240&h=240&fit=crop&auto=format,compress`}
              alt={m.company_name || company.title}
              className="w-20 h-20 md:w-24 md:h-24 rounded border border-gold/20 object-cover"
              width={96}
              height={96}
            />
          ) : (
            <div className="w-20 h-20 md:w-24 md:h-24 rounded border border-gold/20 bg-anthracite-200 flex items-center justify-center font-serif text-4xl text-gold/40">
              {(m.company_name || company.title).charAt(0)}
            </div>
          )}
          <div>
            {trajectory && <p className="text-xs uppercase tracking-[0.3em] text-gold/80 mb-2">{trajectory}</p>}
            <h1 className="font-serif text-4xl md:text-5xl gold-text">{m.company_name || company.title}</h1>
            <p className="mt-2 text-neutral-400 text-sm">{m.headquarters_city || '—'} · SIREN {m.siren || '—'} · NAF {m.naf_code || '—'}</p>
          </div>
        </header>

        <div className="gold-divider my-10" />

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="glass-card rounded-lg p-6">
            <p className="text-[10px] uppercase tracking-[0.25em] text-neutral-500">Relevance Score</p>
            <p className="mt-3 font-serif text-5xl gold-text">{m.relevance_score ?? 0}</p>
          </div>
          <div className="glass-card rounded-lg p-6">
            <p className="text-[10px] uppercase tracking-[0.25em] text-neutral-500">Headcount</p>
            <p className="mt-3 font-serif text-2xl text-neutral-100">{m.headcount_range || '—'}</p>
          </div>
          <div className="glass-card rounded-lg p-6">
            <p className="text-[10px] uppercase tracking-[0.25em] text-neutral-500">Last Sync</p>
            <p className="mt-3 font-serif text-2xl text-neutral-100">
              {m.last_sync ? new Date(m.last_sync).toLocaleDateString('en-GB') : '—'}
            </p>
          </div>
        </div>

        {m.weak_signals && (
          <section>
            <h2 className="font-serif text-2xl text-neutral-100 mb-4">Weak Signals</h2>
            <p className="text-neutral-400 leading-relaxed whitespace-pre-line">{m.weak_signals}</p>
          </section>
        )}
      </div>
    </article>
  );
}