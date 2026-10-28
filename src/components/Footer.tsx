import React from 'react';
import { COMMERCIAL_EMAIL } from '../lib/contact';
import { CartoonLogo } from './CartoonLogo';

interface FooterProps {
  onOpenTerms: () => void;
  onOpenPrivacy: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenTerms, onOpenPrivacy }) => {
  return (
    <footer className="relative overflow-hidden border-t border-ink/15 pt-12 pb-6">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div className="flex flex-wrap items-center gap-5">
            <CartoonLogo size="sm" />
            <span className="text-sm font-medium text-ink-soft">
              © {new Date().getFullYear()} CAR TOON. Todos os direitos reservados.
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-sm font-semibold text-ink">
            <button
              type="button"
              onClick={onOpenTerms}
              className="transition-colors hover:text-coral-deep"
            >
              Termos de uso
            </button>
            <button
              type="button"
              onClick={onOpenPrivacy}
              className="transition-colors hover:text-coral-deep"
            >
              Privacidade
            </button>
            <a
              href={`mailto:${COMMERCIAL_EMAIL}`}
              className="font-mono text-xs font-bold text-ink-soft transition-colors hover:text-coral-deep"
            >
              {COMMERCIAL_EMAIL}
            </a>
          </div>
        </div>

        {/* Giant Outlined Ink Signature Wordmark */}
        <div className="mt-10 select-none overflow-hidden" aria-hidden="true">
          <svg
            viewBox="0 0 1200 170"
            className="w-full h-auto"
          >
            <text
              x="50%"
              y="152"
              textAnchor="middle"
              fill="none"
              stroke="#1B2A4A"
              strokeWidth="2.5"
              strokeOpacity="0.16"
              fontFamily="'Bricolage Grotesque', sans-serif"
              fontWeight="800"
              fontSize="188"
              letterSpacing="-4"
            >
              CAR TOON
            </text>
          </svg>
        </div>
      </div>
    </footer>
  );
};
