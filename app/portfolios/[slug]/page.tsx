// app/portfolios/[slug]/page.tsx
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getPortfolio, getMetafieldValue } from '@/lib/cosmic';

export default async function PortfolioPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const portfolio = await getPortfolio(slug);
  if (!portfolio) notFound();

  const m = portfolio.metadata;
  const tier = getMetafieldValue(m.subscription_tier);
  const brandColor = m.brand_color || '#D4AF37';

  return (
    <article className="pt-16 pb-24">
      <div className="mx-auto max-w-5xl px-6">
        <Link href="/portfolios" className="text-xs uppercase tracking-[0.25em] text-neutral-500 hover:text-gold transition-colors">
          ← All portfolios
        </Link>

        <header className="mt-10 flex items-start gap-6 flex-wrap">
          {m.white_label_logo ? (
            <img
              src={`${m.white_label_logo.imgix_url}?w=240&h=240&fit=crop&auto=format,compress`}
              alt={m.consultancy_name || portfolio.title}
              className="w-20 h-20 md:w-24 md:h-24 rounded border border-gold/20 object-cover"
              width={96}
              height={96}
            />
          ) : (
            <div
              className="w-20 h-20 md:w-24 md:h-24 rounded border border-gold/20 flex items-center justify-center font-serif text-4xl"
              style={{ color: brandColor }}
            >
              {(m.consultancy_name || portfolio.title).charAt(0)}
            </div>
          )}
          <div className="flex-1 min-w-0">
            {tier && <p className="text-xs uppercase tracking-[0.3em] text-gold/80 mb-2">{tier} tier</p>}
            <h1 className="font-serif text-4xl md:text-5xl gold-text">{m.consultancy_name || portfolio.title}</h1>
            <p className="mt-3 text-neutral-400 text-sm">
              Lead: {m.lead_consultant || '—'} {m.contact_email && <>· <a href={`mailto:${m.contact_email}`} className="text-gold hover:text-gold-light transition-colors">{m.contact_email}</a></>}
            </p>
          </div>
        </header>

        <div className="gold-divider my-10" />

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="glass-card rounded-lg p-6">
            <p className="text-[10px] uppercase tracking-[0.25em] text-neutral-500">Tenant ID</p>
            <p className="mt-2 font-mono text-sm text-gold/80 break-all">{m.tenant_id || '—'}</p>
          </div>
          <div className="glass-card rounded-lg p-6">
            <p className="text-[10px] uppercase tracking-[0.25em] text-neutral-500">Brand Color</p>
            <div className="mt-3 flex items-center gap-3">
              <span className="w-8 h-8 rounded border border-gold/20" style={{ backgroundColor: brandColor }} />
              <span className="font-mono text-sm text-neutral-300">{brandColor}</span>
            </div>
          </div>
          <div className="glass-card rounded-lg p-6">
            <p className="text-[10px] uppercase tracking-[0.25em] text-neutral-500">Status</p>
            <p className={`mt-2 font-serif text-2xl ${m.active ? 'text-gold' : 'text-neutral-500'}`}>
              {m.active ? 'Active' : 'Inactive'}
            </p>
          </div>
        </div>

        {Array.isArray(m.managed_candidates) && m.managed_candidates.length > 0 && (
          <section>
            <h2 className="font-serif text-2xl text-neutral-100 mb-6">Managed Candidates</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {m.managed_candidates.map(c => (
                <Link
                  key={c.id}
                  href={`/candidates/${c.slug}`}
                  className="glass-card rounded-lg p-5 hover:shadow-gold transition-all group"
                >
                  <div className="flex items-center gap-3">
                    {c.metadata?.profile_photo ? (
                      <img
                        src={`${c.metadata.profile_photo.imgix_url}?w=160&h=160&fit=crop&auto=format,compress`}
                        alt={c.metadata.display_name || c.title}
                        className="w-12 h-12 rounded-full object-cover border border-gold/20"
                        width={48}
                        height={48}
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-anthracite-200 border border-gold/20 flex items-center justify-center font-serif text-gold/60">
                        {(c.metadata?.display_name || c.title).charAt(0)}
                      </div>
                    )}
                    <div className="min-w-0">
                      <p className="font-serif text-sm text-neutral-100 group-hover:text-gold transition-colors truncate">
                        {c.metadata?.display_name || c.title}
                      </p>
                      <p className="text-xs text-neutral-500 truncate">{c.metadata?.current_title || '—'}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}