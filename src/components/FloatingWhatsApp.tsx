import React from 'react';
import { WhatsappLogo } from '@phosphor-icons/react';
import { buildWhatsAppUrl } from '../lib/contact';

interface FloatingWhatsAppProps {
  hidden?: boolean;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({
  hidden = false,
}) => {
  if (hidden) return null;

  const url = buildWhatsAppUrl(
    'Olá! Vim pelo site do CAR TOON e gostaria de conversar sobre o sistema para minha oficina.'
  );

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar pelo WhatsApp"
      className="fixed bottom-6 right-6 z-30 flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-ink bg-coral text-white shadow-ink transition-transform duration-200 ease-bounce-soft hover:-translate-y-1 hover:bg-coral-deep active:translate-y-0.5"
    >
      <WhatsappLogo weight="fill" className="h-7 w-7" />
    </a>
  );
};
