import Link from 'next/link';
import { getCandidates, getCompanies, getReports, getMessages, getPortfolios } from '@/lib/cosmic';
import ScoreOrb from '@/components/ScoreOrb';
import { getMetafieldValue } from '@/lib/cosmic';

export default async function HomePage() {
  const [candidates, companies, reports, messages, portfolios] = await Promise.all([
    getCandidates(),
    getCompanies(),
    getReports(),
    getMessages(),
    getPortfolios(),
  ]);

  const featuredReport = reports[0];

  const stats = [
    { label: 'Candidates', value: candidates.length, href: '/candidates' },
    { label: 'Companies', value: companies.length, href: '/companies' },
    { label: 'Reports', value: reports.length, href: '/reports' },
    { label: 'Messages', value: messages.length, href: '/messages' },
    { label: 'Portfolios', value: portfolios.length, href: '/portfolios' },
  ];

  return (
    <>
      {/* HERO */}
      <section className="relative pt-20 md:pt-32 pb-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <p className="text-xs uppercase tracking-[0.3em] text-gold/80 mb-6">Strategic HR Positioning · Luxury SaaS</p>
              <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.05]">
                The <span className="gold-text">Éminence Grise</span> of executive positioning.
              </h1>
              <p className="mt-8 text-lg text-neutral-400 leading-relaxed max-w-xl">
                Anonymized candidate profiles, SIRENE-grade company intelligence, and AI-driven positioning reports — wrapped in a calm, analytical interface designed for senior consultants.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="/reports"
                  className="px-7 py-3.5 bg-gold-gradient text-anthracite-400 font-medium tracking-wide rounded-sm hover:shadow-gold-lg transition-all"
                >
                  View Reports
                </Link>
                <Link
                  href="/candidates"
                  className="px-7 py-3.5 border border-gold/30 text-gold hover:bg-gold/5 hover:border-gold transition-all rounded-sm tracking-wide"
                >
                  Browse Candidates
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="glass-card rounded-lg p-8 md:p-10 shadow-depth">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-xs uppercase tracking-[0.25em] text-neutral-500">Featured Report</p>
                    <p className="font-serif text-xl mt-1 text-neutral-100">
                      {featuredReport ? (featuredReport.metadata.report_title || featuredReport.title) : 'No report yet'}
                    </p>
                  </div>
                </div>
                {featuredReport && (
                  <div className="flex items-center gap-6">
                    <ScoreOrb score={featuredReport.metadata.match_score ?? 0} size="md" />
                    <div className="flex-1 space-y-3 text-sm">
                      <div>
                        <span className="text-neutral-500 text-xs uppercase tracking-wider">Candidate</span>
                        <p className="text-neutral-200">{featuredReport.metadata.candidate?.metadata?.display_name || '—'}</p>
                      </div>
                      <div>
                        <span className="text-neutral-500 text-xs uppercase tracking-wider">Company</span>
                        <p className="text-neutral-200">{featuredReport.metadata.target_company?.metadata?.company_name || '—'}</p>
                      </div>
                      <div>
                        <span className="text-neutral-500 text-xs uppercase tracking-wider">Status</span>
                        <p className="text-gold text-xs uppercase tracking-wider">{getMetafieldValue(featuredReport.metadata.report_status) || '—'}</p>
                      </div>
                    </div>
                  </div>
                )}
                {featuredReport && (
                  <Link
                    href={`/reports/${featuredReport.slug}`}
                    className="mt-6 inline-flex items-center text-xs uppercase tracking-[0.25em] text-gold hover:text-gold-light transition-colors"
                  >
                    Read full analysis →
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="gold-divider mb-12" />
          <div className="grid grid-cols-2 md:grid-cols-5 gap-px bg-gold/10 border border-gold/10 rounded-lg overflow-hidden">
            {stats.map(stat => (
              <Link
                key={stat.label}
                href={stat.href}
                className="bg-anthracite-300 hover:bg-anthracite-200 transition-colors p-8 group"
              >
                <p className="font-serif text-4xl md:text-5xl gold-text group-hover:scale-105 transition-transform origin-left inline-block">
                  {stat.value}
                </p>
                <p className="mt-3 text-xs uppercase tracking-[0.25em] text-neutral-500 group-hover:text-gold/70 transition-colors">{stat.label}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* PILLARS */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'Anonymized Profiles', desc: 'GDPR-compliant hashing for sensitive candidate data, with controlled disclosure for vetted contexts.', tag: '01 / Security' },
              { title: 'Market Intelligence', desc: 'SIRENE cross-referenced with weak-signal detection. Cold data made warm, structured, actionable.', tag: '02 / Data' },
              { title: 'Positioning Engine', desc: 'Semantic match scoring with visual diff and recommended angles. <120-word approach messages, never solicitations.', tag: '03 / Strategy' },
            ].map(pillar => (
              <article key={pillar.title} className="glass-card rounded-lg p-8 hover:shadow-gold transition-shadow">
                <p className="text-[10px] uppercase tracking-[0.3em] text-gold/70 mb-4">{pillar.tag}</p>
                <h3 className="font-serif text-2xl text-neutral-100 mb-3">{pillar.title}</h3>
                <p className="text-sm text-neutral-400 leading-relaxed">{pillar.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}