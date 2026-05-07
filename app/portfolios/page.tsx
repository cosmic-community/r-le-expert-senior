import Link from 'next/link';
import { getPortfolios, getMetafieldValue } from '@/lib/cosmic';
import PageHero from '@/components/PageHero';

export default async function PortfoliosPage() {
  const portfolios = await getPortfolios();

  return (
    <>
      <PageHero
        eyebrow="05 — Consultancy"
        title="Consultant Portfolios"
        description="Multi-tenant management for HR consultancies. White-label reports, managed candidates, subscription tiers."
      />
      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-6">
          {portfolios.length === 0 ? (
            <p className="text-neutral-500">No portfolios yet.</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {portfolios.map(p => {
                const m = p.metadata;
                const tier = getMetafieldValue(m.subscription_tier);
                const brandColor = m.brand_color || '#D4AF37';
                return (
                  <Link
                    key={p.id}
                    href={`/portfolios/${p.slug}`}
                    className="glass-card rounded-lg p-7 hover:shadow-gold transition-all group relative overflow-hidden"
                  >
                    <div
                      className="absolute top-0 left-0 right-0 h-1"
                      style={{ background: `linear-gradient(90deg, ${brandColor}, transparent)` }}
                    />
                    <div className="flex items-center gap-4 mb-5">
                      {m.white_label_logo ? (
                        <img
                          src={`${m.white_label_logo.imgix_url}?w=160&h=160&fit=crop&auto=format,compress`}
                          alt={m.consultancy_name || p.title}
                          className="w-12 h-12 rounded border border-gold/20 object-cover"
                          width={48}
                          height={48}
                        />
                      ) : (
                        <div
                          className="w-12 h-12 rounded border border-gold/20 flex items-center justify-center font-serif text-xl"
                          style={{ color: brandColor }}
                        >
                          {(m.consultancy_name || p.title).charAt(0)}
                        </div>
                      )}
                      <div>
                        <h3 className="font-serif text-lg text-neutral-100 group-hover:text-gold transition-colors">
                          {m.consultancy_name || p.title}
                        </h3>
                        <p className="text-xs text-neutral-500">{m.lead_consultant || '—'}</p>
                      </div>
                    </div>

                    <div className="space-y-2.5 text-xs">
                      <div className="flex justify-between items-center">
                        <span className="text-neutral-500 uppercase tracking-wider">Tier</span>
                        <span className="text-gold">{tier || '—'}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-neutral-500 uppercase tracking-wider">Tenant ID</span>
                        <span className="text-neutral-400 font-mono">{m.tenant_id || '—'}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-neutral-500 uppercase tracking-wider">Status</span>
                        <span className={m.active ? 'text-gold' : 'text-neutral-500'}>
                          {m.active ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-neutral-500 uppercase tracking-wider">Candidates</span>
                        <span className="text-neutral-300">{m.managed_candidates?.length ?? 0}</span>
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