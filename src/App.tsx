import { useCallback, useEffect, useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { HowItWorks } from './components/HowItWorks';
import { Faq } from './components/Faq';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { SimulatorDialog } from './components/simulator/SimulatorDialog';
import { ContactDialog } from './components/ContactDialog';
import { LegalDialog } from './components/LegalDialog';

export function App() {
  const [simulatorOpen, setSimulatorOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [legalMode, setLegalMode] = useState<'terms' | 'privacy' | null>(null);

  const openSimulator = useCallback(() => {
    setContactOpen(false);
    setSimulatorOpen(true);
    if (window.location.hash !== '#simulador') {
      window.history.replaceState(null, '', '#simulador');
    }
  }, []);

  const closeSimulator = useCallback(() => {
    setSimulatorOpen(false);
    if (window.location.hash === '#simulador') {
      window.history.replaceState(null, '', window.location.pathname);
    }
  }, []);

  const openContact = useCallback(() => {
    setSimulatorOpen(false);
    setContactOpen(true);
    if (window.location.hash !== '#contato') {
      window.history.replaceState(null, '', '#contato');
    }
  }, []);

  const closeContact = useCallback(() => {
    setContactOpen(false);
    if (window.location.hash === '#contato') {
      window.history.replaceState(null, '', window.location.pathname);
    }
  }, []);

  useEffect(() => {
    const syncHash = () => {
      if (window.location.hash === '#simulador') {
        setContactOpen(false);
        setSimulatorOpen(true);
      } else if (window.location.hash === '#contato') {
        setSimulatorOpen(false);
        setContactOpen(true);
      } else {
        setSimulatorOpen(false);
        setContactOpen(false);
      }
    };
    syncHash();
    window.addEventListener('hashchange', syncHash);
    return () => window.removeEventListener('hashchange', syncHash);
  }, []);

  return (
    <div className="min-h-screen bg-paper text-ink flex flex-col">
      {/* Subtle Fixed Paper Grain Texture Overlay (GPU-safe, pointer-events-none) */}
      <svg
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-40 h-full w-full opacity-[0.03]"
      >
        <filter id="cartoon-paper-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="3"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#cartoon-paper-grain)" />
      </svg>

      {/* Navigation Header */}
      <Navbar onOpenSimulator={openSimulator} onOpenContact={openContact} />

      {/* Main Content */}
      <main id="conteudo-principal" className="flex-1">
        {/* 1. Hero (Único local na página com os botões de Testar o sistema e Falar com a gente, junto ao topo/Navbar) */}
        <Hero onOpenSimulator={openSimulator} onOpenContact={openContact} />

        {/* 2. Recursos (4 Core Differentiators in Editorial Zig-Zag) */}
        <Features />

        {/* 3. Como Funciona (4-Stop Ink Road) */}
        <HowItWorks />

        {/* 4. Perguntas Frequentes (2-Column Native Details) */}
        <Faq />
      </main>

      {/* 5. Rodapé Enxuto + Assinatura em Contorno de Tinta */}
      <Footer
        onOpenTerms={() => setLegalMode('terms')}
        onOpenPrivacy={() => setLegalMode('privacy')}
      />

      {/* Floating WhatsApp Icon (hides when any Dialog is open) */}
      <FloatingWhatsApp
        hidden={simulatorOpen || contactOpen || Boolean(legalMode)}
      />

      {/* Dedicated Pop-up Window: Interactive Service Order Simulator */}
      <SimulatorDialog
        open={simulatorOpen}
        onClose={closeSimulator}
        onGoToContact={openContact}
      />

      {/* Dedicated Pop-up Window: Contact Form & Direct Channels */}
      <ContactDialog open={contactOpen} onClose={closeContact} />

      {/* Legal Dialog (Terms & Privacy/LGPD) */}
      <LegalDialog mode={legalMode} onClose={() => setLegalMode(null)} />
    </div>
  );
}

export default App;
