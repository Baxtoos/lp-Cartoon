import React, { useEffect, useState } from 'react';
import { ArrowUpRight, List, X } from '@phosphor-icons/react';
import { useBodyScrollLock } from '../hooks/useBodyScrollLock';
import { navigateToSection } from '../lib/navigation';
import { APP_URL } from '../lib/contact';
import { CartoonLogo } from './CartoonLogo';

interface NavbarProps {
  onOpenSimulator: () => void;
  onOpenContact: () => void;
}

const NAV_LINKS = [
  { label: 'Recursos', href: '#recursos' },
  { label: 'Como funciona', href: '#como-funciona' },
  { label: 'Perguntas', href: '#perguntas' },
];

export const Navbar: React.FC<NavbarProps> = ({
  onOpenSimulator,
  onOpenContact,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useBodyScrollLock(mobileMenuOpen);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [mobileMenuOpen]);

  const closeMenu = () => {
    setMobileMenuOpen(false);
  };

  const handleMobileNav = (href: string) => {
    closeMenu();
    window.setTimeout(() => {
      navigateToSection(href);
    }, 60);
  };

  const handleLoginClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!APP_URL) {
      e.preventDefault();
      onOpenContact();
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 ${
          scrolled ? 'navbar-surface-scrolled py-3' : 'navbar-surface py-4'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8">
          <a
            href="#inicio"
            onClick={(e) => {
              closeMenu();
              navigateToSection('#inicio', e);
            }}
            className="group inline-flex items-center focus:outline-none"
            aria-label="CAR TOON — Voltar ao início"
          >
            <CartoonLogo size="md" />
          </a>

          {/* Plain Editorial Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Navegação principal">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => navigateToSection(link.href, e)}
                className="relative py-1 text-sm font-semibold text-ink transition-colors hover:text-coral-deep after:absolute after:bottom-0 after:left-0 after:h-[2.5px] after:w-0 after:bg-coral after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.label}
              </a>
            ))}
            <button
              type="button"
              onClick={onOpenContact}
              className="relative py-1 text-sm font-semibold text-ink transition-colors hover:text-coral-deep after:absolute after:bottom-0 after:left-0 after:h-[2.5px] after:w-0 after:bg-coral after:transition-all after:duration-300 hover:after:w-full"
            >
              Contato
            </button>
          </nav>

          {/* Right Actions: Login Link + Primary Simulator CTA (Desktop) */}
          <div className="hidden md:flex items-center gap-6">
            <a
              href={APP_URL || '#contato'}
              onClick={handleLoginClick}
              className="text-sm font-semibold text-ink transition-colors hover:text-coral-deep"
            >
              Entrar
            </a>

            <button
              type="button"
              onClick={onOpenSimulator}
              className="btn-ink px-5 py-2.5 text-sm"
            >
              <span>Testar o sistema</span>
              <ArrowUpRight className="h-4 w-4" weight="bold" />
            </button>
          </div>

          {/* Mobile Menu Trigger — always visible ink button with 44px+ touch target */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="btn-ink-outline h-11 px-3.5 text-sm md:hidden"
            aria-label={mobileMenuOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-drawer"
          >
            {mobileMenuOpen ? (
              <>
                <X className="h-5 w-5" weight="bold" />
                <span>Fechar</span>
              </>
            ) : (
              <>
                <List className="h-5 w-5" weight="bold" />
                <span>Menu</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* Mobile Full-Screen Editorial Overlay (z-50 sits above header and hero) */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Menu de navegação"
          className="mobile-menu-surface fixed inset-0 z-50 flex min-h-[100dvh] flex-col justify-between overflow-y-auto px-5 pb-8 pt-4 sm:px-8 md:hidden"
        >
          {/* Drawer Top Bar */}
          <div>
            <div className="flex items-center justify-between border-b-2 border-ink pb-4">
              <a
                href="#inicio"
                onClick={(e) => {
                  closeMenu();
                  navigateToSection('#inicio', e);
                }}
                className="inline-flex items-center focus:outline-none"
                aria-label="CAR TOON — Voltar ao início"
              >
                <CartoonLogo size="md" />
              </a>

              <button
                type="button"
                onClick={closeMenu}
                className="btn-ink-outline h-11 px-3.5 text-sm"
                aria-label="Fechar menu de navegação"
              >
                <X className="h-5 w-5" weight="bold" />
                <span>Fechar</span>
              </button>
            </div>

            {/* Navigation Items */}
            <nav
              className="mt-4 flex flex-col divide-y divide-ink/15 border-b border-ink/15"
              aria-label="Menu mobile"
            >
              {NAV_LINKS.map((link) => (
                <button
                  key={link.href}
                  type="button"
                  onClick={() => handleMobileNav(link.href)}
                  className="flex w-full items-center justify-between py-5 text-left font-display text-2xl font-bold text-ink transition-colors hover:text-coral"
                >
                  <span>{link.label}</span>
                  <ArrowUpRight className="h-6 w-6 text-coral" weight="bold" />
                </button>
              ))}
              <button
                type="button"
                onClick={() => {
                  closeMenu();
                  onOpenContact();
                }}
                className="flex w-full items-center justify-between py-5 text-left font-display text-2xl font-bold text-ink transition-colors hover:text-coral"
              >
                <span>Contato</span>
                <ArrowUpRight className="h-6 w-6 text-coral" weight="bold" />
              </button>
            </nav>
          </div>

          {/* Drawer Bottom CTAs (Thumb Zone) */}
          <div className="mt-8 flex flex-col gap-3 pt-4">
            <button
              type="button"
              onClick={() => {
                closeMenu();
                onOpenSimulator();
              }}
              className="btn-ink w-full py-4 text-base"
            >
              <span>Testar o sistema</span>
              <ArrowUpRight className="h-5 w-5" weight="bold" />
            </button>

            <button
              type="button"
              onClick={() => {
                closeMenu();
                onOpenContact();
              }}
              className="btn-ink-outline w-full py-3.5 text-base"
            >
              <span>Falar com a gente</span>
              <ArrowUpRight className="h-5 w-5" weight="bold" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
