import React from 'react';
import { Plus } from '@phosphor-icons/react';
import { FAQ_ITEMS } from '../data/cartoonData';
import { useReveal } from '../hooks/useReveal';

export const Faq: React.FC = () => {
  const { ref, visible } = useReveal<HTMLDivElement>(0.12);

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <section id="perguntas" className="py-28 lg:py-36">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div
        ref={ref}
        className={`reveal-item mx-auto max-w-7xl px-5 sm:px-8 ${
          visible ? 'is-visible' : ''
        }`}
      >
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Sticky Title */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <p className="font-mono text-xs font-bold uppercase tracking-widest text-coral-deep">
                Perguntas frequentes
              </p>
              <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-5xl">
                Antes de você perguntar.
              </h2>
              <p className="mt-4 max-w-[38ch] text-base leading-relaxed text-ink-soft font-medium">
                Respostas diretas sobre a rotina da oficina, sem letras miúdas.
              </p>
            </div>
          </div>

          {/* Right Hairline List (Native <details>, Zero Cards) */}
          <div className="lg:col-span-7 divide-y divide-ink/15 border-y border-ink/15">
            {FAQ_ITEMS.map((faq, idx) => (
              <details
                key={faq.question}
                open={idx === 0}
                className="group py-6"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-6 text-left">
                  <h3 className="font-display text-xl font-bold text-ink transition-colors group-hover:text-coral-deep sm:text-2xl">
                    {faq.question}
                  </h3>
                  <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center text-ink transition-transform duration-300 ease-spring group-open:rotate-45 group-open:text-coral">
                    <Plus className="h-5 w-5" />
                  </span>
                </summary>
                <p className="mt-4 max-w-[60ch] text-base leading-relaxed text-ink-soft font-medium">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

