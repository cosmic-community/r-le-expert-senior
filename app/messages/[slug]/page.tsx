// app/messages/[slug]/page.tsx
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getMessage, getMetafieldValue } from '@/lib/cosmic';

export default async function MessagePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const message = await getMessage(slug);
  if (!message) notFound();

  const m = message.metadata;
  const tone = getMetafieldValue(m.tone);
  const channel = getMetafieldValue(m.channel);
  const status = getMetafieldValue(m.status_flag);

  return (
    <article className="pt-16 pb-24">
      <div className="mx-auto max-w-3xl px-6">
        <Link href="/messages" className="text-xs uppercase tracking-[0.25em] text-neutral-500 hover:text-gold transition-colors">
          ← All messages
        </Link>

        <header className="mt-10">
          <div className="flex flex-wrap gap-2 mb-4 text-[10px] uppercase tracking-wider">
            {channel && <span className="px-3 py-1.5 border border-gold/30 text-gold">{channel}</span>}
            {tone && <span className="px-3 py-1.5 border border-neutral-700 text-neutral-400">{tone}</span>}
            {status && <span className="px-3 py-1.5 bg-gold/10 text-gold">{status}</span>}
          </div>
          <h1 className="font-serif text-3xl md:text-4xl gold-text leading-tight">{m.message_title || message.title}</h1>
          {m.recipient_role && (
            <p className="mt-4 text-sm text-neutral-500">Intended recipient: <span className="text-neutral-300">{m.recipient_role}</span></p>
          )}
        </header>

        <div className="gold-divider my-10" />

        {m.message_body && (
          <div className="glass-card rounded-lg p-8 md:p-10">
            <p className="text-neutral-300 leading-relaxed whitespace-pre-line text-base">{m.message_body}</p>
            {m.word_count && (
              <p className="mt-6 text-xs uppercase tracking-[0.25em] text-neutral-600">
                {m.word_count} words · {m.word_count <= 120 ? 'Within target' : 'Above target'}
              </p>
            )}
          </div>
        )}

        {m.related_report && (
          <div className="mt-8">
            <p className="text-[10px] uppercase tracking-[0.25em] text-neutral-500 mb-2">Linked Report</p>
            <Link
              href={`/reports/${m.related_report.slug}`}
              className="text-gold hover:text-gold-light transition-colors font-serif text-lg"
            >
              {m.related_report.metadata?.report_title || m.related_report.title} →
            </Link>
          </div>
        )}
      </div>
    </article>
  );
}