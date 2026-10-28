import React, { useEffect, useId, useRef } from 'react';
import { X } from '@phosphor-icons/react';
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock';

interface DialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  maxWidthClass?: string;
  fullScreenMobile?: boolean;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export const Dialog: React.FC<DialogProps> = ({
  open,
  onClose,
  title,
  subtitle,
  maxWidthClass = 'max-w-5xl',
  fullScreenMobile = false,
  children,
  footer,
}) => {
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const previousActiveRef = useRef<HTMLElement | null>(null);

  useBodyScrollLock(open);

  useEffect(() => {
    if (!open) return;

    previousActiveRef.current = document.activeElement as HTMLElement | null;

    const focusTimer = window.setTimeout(() => {
      const focusable = dialogRef.current?.querySelector<HTMLElement>(
        'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      focusable?.focus();
    }, 30);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === 'Tab' && dialogRef.current) {
        const elements = Array.from(
          dialogRef.current.querySelectorAll<HTMLElement>(
            'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
          )
        );
        if (elements.length === 0) return;

        const first = elements[0];
        const last = elements[elements.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener('keydown', handleKeyDown);
      // Only restore focus if another modal dialog is not taking over immediately
      window.requestAnimationFrame(() => {
        if (!document.querySelector('[role="dialog"]')) {
          previousActiveRef.current?.focus?.();
        }
      });
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-ink/60 backdrop-blur-sm sm:items-center sm:p-4 md:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      {/* Backdrop click */}
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      <div
        ref={dialogRef}
        className={`dialog-surface relative z-10 flex w-full flex-col overflow-hidden animate-dialog-in ${maxWidthClass} ${
          fullScreenMobile
            ? 'h-[94dvh] rounded-t-3xl sm:h-auto sm:max-h-[88dvh] sm:rounded-3xl'
            : 'max-h-[88dvh] rounded-t-3xl sm:rounded-3xl'
        }`}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between gap-4 border-b-2 border-ink px-5 py-4 sm:px-7">
          <div>
            {subtitle && (
              <p className="font-mono text-[11px] font-semibold uppercase tracking-widest text-coral-deep">
                {subtitle}
              </p>
            )}
            <h2
              id={titleId}
              className="font-display text-lg font-bold text-ink sm:text-xl"
            >
              {title}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border-2 border-ink bg-paper text-ink transition-colors hover:bg-coral hover:text-white"
            aria-label="Fechar janela"
          >
            <X className="h-5 w-5" weight="bold" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-7 sm:py-6">
          {children}
        </div>

        {/* Optional Footer */}
        {footer && (
          <div className="border-t-2 border-ink bg-paper px-5 py-4 sm:px-7">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};
