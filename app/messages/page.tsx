import Link from 'next/link';
import { getMessages, getMetafieldValue } from '@/lib/cosmic';
import PageHero from '@/components/PageHero';

export default async function MessagesPage() {
  const messages = await getMessages();

  return (
    <>
      <PageHero
        eyebrow="04 — Outreach"
        title="Approach Messages"
        description="Curated business approach messages — under 120 words, business-first, never solicitations."
      />
      <section className="pb-24">
        <div className="mx-auto max-w-5xl px-6">
          {messages.length === 0 ? (
            <p className="text-neutral-500">No messages drafted yet.</p>
          ) : (
            <div className="space-y-5">
              {messages.map(msg => {
                const m = msg.metadata;
                const tone = getMetafieldValue(m.tone);
                const channel = getMetafieldValue(m.channel);
                const status = getMetafieldValue(m.status_flag);
                return (
                  <Link
                    key={msg.id}
                    href={`/messages/${msg.slug}`}
                    className="block glass-card rounded-lg p-6 md:p-7 hover:shadow-gold transition-all group"
                  >
                    <div className="flex items-start justify-between gap-4 mb-3 flex-wrap">
                      <h3 className="font-serif text-xl text-neutral-100 group-hover:text-gold transition-colors flex-1 min-w-0">
                        {m.message_title || msg.title}
                      </h3>
                      <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider">
                        {channel && <span className="px-2.5 py-1 border border-gold/20 text-gold/80">{channel}</span>}
                        {tone && <span className="px-2.5 py-1 border border-neutral-700 text-neutral-400">{tone}</span>}
                        {status && <span className="px-2.5 py-1 bg-gold/10 text-gold">{status}</span>}
                      </div>
                    </div>
                    {m.recipient_role && (
                      <p className="text-xs text-neutral-500 mb-3">To: {m.recipient_role}</p>
                    )}
                    {m.message_body && (
                      <p className="text-sm text-neutral-400 line-clamp-3 leading-relaxed">{m.message_body}</p>
                    )}
                    <div className="mt-4 flex items-center justify-between text-xs">
                      <span className="text-neutral-600">{m.word_count ? `${m.word_count} words` : ''}</span>
                      <span className="text-gold/70 uppercase tracking-wider">Read full →</span>
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