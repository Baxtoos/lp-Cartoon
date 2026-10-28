import React from 'react';
import { useReveal } from '../hooks/useReveal';
import {
  FeatureCatalogSketch,
  FeatureFipeSketch,
  FeatureMechanicSketch,
  FeaturePlateSketch,
} from './illustrations/InkIllustrations';

const FEATURES = [
  {
    number: '01',
    title: 'Orçamento que fecha sozinho',
    description:
      'Peças e mão de obra são somadas na hora, ao lado do valor de Tabela FIPE do veículo para o cliente aprovar com confiança.',
    Sketch: FeatureFipeSketch,
  },
  {
    number: '02',
    title: 'Cada carro com seu mecânico',
    description:
      'Saiba quem está responsável por cada serviço no pátio e acompanhe quantas ordens cada mecânico entregou no mês.',
    Sketch: FeatureMechanicSketch,
  },
  {
    number: '03',
    title: 'Toda a história pela placa',
    description:
      'Digite os sete caracteres da placa e veja na hora tudo o que já foi trocado, a quilometragem da época e quem executou.',
    Sketch: FeaturePlateSketch,
  },
  {
    number: '04',
    title: 'Reajuste sem mexer no passado',
    description:
      'Atualize o preço das peças no catálogo quando quiser: as ordens de serviço antigas guardam o valor exato do dia em que foram abertas.',
    Sketch: FeatureCatalogSketch,
  },
];

export const Features: React.FC = () => {
  const { ref, visible } = useReveal<HTMLDivElement>(0.12);

  return (
    <section id="recursos" className="py-28 lg:py-36 border-t border-ink/15">
      <div
        ref={ref}
        className={`reveal-item mx-auto max-w-7xl px-5 sm:px-8 ${
          visible ? 'is-visible' : ''
        }`}
      >
        {/* Editorial Section Header */}
        <div className="max-w-2xl">
          <p className="font-mono text-xs font-bold uppercase tracking-widest text-coral-deep">
            Recursos essenciais
          </p>
          <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-5xl">
            No nome é cartoon. Na oficina, é ferramenta séria.
          </h2>
        </div>

        {/* Cardless Editorial Zig-Zag List */}
        <div className="mt-16 divide-y divide-ink/15 border-y border-ink/15">
          {FEATURES.map(({ number, title, description, Sketch }, index) => {
            const isEven = index % 2 === 1;
            return (
              <div
                key={number}
                className="grid grid-cols-1 items-center gap-8 py-12 md:grid-cols-12 md:gap-10 lg:py-16"
              >
                {/* Index Number */}
                <div
                  className={`md:col-span-2 ${
                    isEven ? 'md:order-2 md:text-right' : 'md:order-1'
                  }`}
                >
                  <span className="font-display text-5xl font-extrabold tracking-tighter text-coral sm:text-6xl">
                    {number}
                  </span>
                </div>

                {/* Title & Single-Sentence Copy */}
                <div
                  className={`md:col-span-6 ${
                    isEven ? 'md:order-3' : 'md:order-2'
                  }`}
                >
                  <h3 className="font-display text-2xl font-bold text-ink sm:text-3xl">
                    {title}
                  </h3>
                  <p className="mt-3 max-w-[54ch] text-base leading-relaxed text-ink-soft sm:text-lg font-medium">
                    {description}
                  </p>
                </div>

                {/* Hand-Drawn Ink Illustration */}
                <div
                  className={`flex md:col-span-4 ${
                    isEven
                      ? 'md:order-1 md:justify-start'
                      : 'md:order-3 md:justify-end'
                  }`}
                >
                  <Sketch />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

