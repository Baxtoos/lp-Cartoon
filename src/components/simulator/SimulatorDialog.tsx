import React from 'react';
import {
  ArrowRight,
  ArrowsClockwise,
  ClockCounterClockwise,
  LockSimple,
  Plus,
  Trash,
  Wrench,
  X,
} from '@phosphor-icons/react';
import type { StatusServico } from '../../types/cartoon';
import { formatCurrencyBRL } from '../../lib/contact';
import { Dialog } from '../ui/Dialog';
import { useOrderSimulation } from './useOrderSimulation';

interface SimulatorDialogProps {
  open: boolean;
  onClose: () => void;
  onGoToContact: () => void;
}

const STATUS_STEPS: { key: StatusServico; label: string }[] = [
  { key: 'ACEITO', label: 'Aceita' },
  { key: 'EM_ANDAMENTO', label: 'Em andamento' },
  { key: 'FINALIZADO', label: 'Finalizada' },
  { key: 'REJEITADO', label: 'Rejeitada' },
];

export const SimulatorDialog: React.FC<SimulatorDialogProps> = ({
  open,
  onClose,
  onGoToContact,
}) => {
  const sim = useOrderSimulation();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      subtitle="Simulador interativo"
      title="Experimente uma Ordem de Serviço ao vivo"
      maxWidthClass="max-w-5xl"
      fullScreenMobile
      footer={
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <p className="text-sm font-semibold text-ink">
            Quer usar esse fluxo com as placas e os mecânicos da sua oficina?
          </p>
          <button
            type="button"
            onClick={onGoToContact}
            className="btn-ink px-5 py-2.5 text-sm"
          >
            <span>Quero na minha oficina</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      }
    >
      {/* Top Bar: Vehicle License Plate Selector */}
      <div className="flex flex-col justify-between gap-4 border-b border-ink/15 pb-5 sm:flex-row sm:items-center">
        <div>
          <p className="font-mono text-xs font-bold uppercase tracking-wider text-ink-soft">
            Selecione a placa no pátio
          </p>
          <div className="mt-2 flex flex-wrap gap-2.5">
            {sim.vehicles.map((v, idx) => {
              const active = idx === sim.selectedVehicleIdx;
              return (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => sim.selectVehicle(idx)}
                  className={`flex items-center gap-2.5 rounded-xl border-2 px-3.5 py-2 text-left transition-all ${
                    active
                      ? 'border-ink bg-ink text-white shadow-ink-sm'
                      : 'border-ink/30 bg-paper text-ink hover:border-ink'
                  }`}
                >
                  <span
                    className={`font-mono text-xs font-bold tracking-wider ${
                      active ? 'text-coral' : 'text-coral-deep'
                    }`}
                  >
                    {v.placa}
                  </span>
                  <span className="text-xs font-semibold">{v.modelo}</span>
                </button>
              );
            })}
          </div>
        </div>

        <button
          type="button"
          onClick={() => sim.setHistoryOpen((prev) => !prev)}
          className="btn-ink-outline self-start px-3.5 py-2 text-xs sm:self-auto"
        >
          <ClockCounterClockwise className="h-4 w-4 text-coral-deep" />
          <span>
            {sim.historyOpen
              ? 'Voltar para a OS atual'
              : `Histórico da placa (${sim.currentVehicle.historicoPlaca.length})`}
          </span>
        </button>
      </div>

      {/* Inline Feedback Notice */}
      {sim.notice && (
        <div
          role="status"
          className="mt-4 flex items-center justify-between gap-3 border-l-4 border-coral bg-paper px-4 py-2.5 text-xs font-semibold text-ink"
        >
          <span>{sim.notice}</span>
          <button
            type="button"
            onClick={() => sim.setNotice(null)}
            className="text-ink-soft hover:text-ink"
            aria-label="Fechar aviso"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* VIEW A: History Drawer View */}
      {sim.historyOpen ? (
        <div className="mt-6">
          <div className="flex items-baseline justify-between border-b border-ink/15 pb-3">
            <div>
              <h3 className="font-display text-xl font-bold text-ink">
                Histórico da placa {sim.currentVehicle.placa}
              </h3>
              <p className="text-xs font-medium text-ink-soft">
                {sim.currentVehicle.montadora} {sim.currentVehicle.modelo} · Proprietário:{' '}
                {sim.currentVehicle.proprietario}
              </p>
            </div>
            <button
              type="button"
              onClick={() => sim.setHistoryOpen(false)}
              className="font-display text-xs font-bold text-coral-deep underline underline-offset-4 hover:text-ink"
            >
              Voltar para a Ordem de Serviço
            </button>
          </div>

          <div className="divide-y divide-ink/15 border-b border-ink/15">
            {sim.currentVehicle.historicoPlaca.map((h) => (
              <div
                key={h.osNumero}
                className="flex flex-col justify-between gap-2 py-4 sm:flex-row sm:items-center"
              >
                <div>
                  <div className="flex items-center gap-3 font-mono text-xs font-bold text-ink">
                    <span className="text-coral-deep">OS #{h.osNumero}</span>
                    <span>·</span>
                    <span>{h.data}</span>
                    <span>·</span>
                    <span>{h.quilometragem}</span>
                  </div>
                  <p className="mt-1 font-display text-base font-bold text-ink">
                    {h.resumoServicos}
                  </p>
                  <p className="text-xs font-medium text-ink-soft">
                    Mecânico responsável: {h.mecanicoResponsavel}
                  </p>
                </div>

                <div className="font-mono text-base font-bold text-ink tabular-nums">
                  {formatCurrencyBRL(h.valorTotal)}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* VIEW B: Active Service Order + FIPE Summary */
        <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Left 7 Columns: Status Stepper, Items & Catalog */}
          <div className="lg:col-span-7">
            {/* Order Header & Status Stepper */}
            <div className="flex flex-col justify-between gap-3 border-b border-ink/15 pb-4 sm:flex-row sm:items-center">
              <div>
                <span className="font-mono text-xs font-bold text-coral-deep">
                  Ordem de Serviço #{sim.currentVehicle.osAtiva.id} ·{' '}
                  {sim.currentVehicle.osAtiva.abertura}
                </span>
                <h3 className="font-display text-xl font-bold text-ink">
                  {sim.currentVehicle.montadora} {sim.currentVehicle.modelo} (
                  {sim.currentVehicle.ano})
                </h3>
              </div>

              {/* Status Stepper */}
              <div className="flex flex-wrap items-center gap-1.5">
                {STATUS_STEPS.map((st) => {
                  const isCurrent = sim.currentStatus === st.key;
                  const activeColor =
                    st.key === 'FINALIZADO'
                      ? 'border-ok bg-ok text-white'
                      : st.key === 'REJEITADO'
                      ? 'border-stop bg-stop text-white'
                      : 'border-ink bg-coral text-white';

                  return (
                    <button
                      key={st.key}
                      type="button"
                      onClick={() => sim.changeStatus(st.key)}
                      className={`rounded-lg border px-2.5 py-1 font-mono text-xs font-bold transition-colors ${
                        isCurrent
                          ? activeColor
                          : 'border-ink/25 bg-paper text-ink hover:border-ink'
                      }`}
                    >
                      {st.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Locked State Notice */}
            {sim.isLocked && (
              <div className="mt-4 flex items-center gap-2 rounded-lg border border-ok/40 bg-ok-tint px-3.5 py-2.5 text-xs font-bold text-ok">
                <LockSimple weight="fill" className="h-4 w-4 shrink-0" />
                <span>
                  OS finalizada. Os itens estão travados para proteger o fechamento do
                  caixa.
                </span>
              </div>
            )}

            {/* Order Items List */}
            <div className="mt-4 divide-y divide-ink/15 border-b border-ink/15">
              {sim.currentItems.length === 0 ? (
                <p className="py-8 text-center text-sm font-medium text-ink-soft">
                  Nenhum item lançado nesta ordem. Adicione peças ou serviços abaixo.
                </p>
              ) : (
                sim.currentItems.map((item) => (
                  <div
                    key={item.itemId}
                    className="flex items-center justify-between gap-4 py-3.5 text-sm"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[11px] font-bold uppercase text-coral-deep">
                          {item.categoria === 'PECA' ? 'Peça' : 'Serviço'}
                        </span>
                        <span className="font-bold text-ink">{item.nome}</span>
                      </div>
                      <p className="mt-0.5 font-mono text-xs text-ink-soft tabular-nums">
                        {item.quantidade}x {formatCurrencyBRL(item.valorUnitarioCongelado)}{' '}
                        (valor congelado na OS)
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="font-mono text-sm font-bold text-ink tabular-nums">
                        {formatCurrencyBRL(
                          item.valorUnitarioCongelado * item.quantidade
                        )}
                      </span>
                      {!sim.isLocked && (
                        <button
                          type="button"
                          onClick={() => sim.removeOrderItem(item.itemId)}
                          className="rounded-lg p-1.5 text-ink-soft transition-colors hover:bg-stop-tint hover:text-stop"
                          aria-label={`Remover ${item.nome}`}
                        >
                          <Trash className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Catalog Picker Drawer */}
            <div className="mt-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => sim.setCatalogOpen((prev) => !prev)}
                  disabled={sim.isLocked}
                  className={`inline-flex items-center gap-2 font-display text-sm font-bold ${
                    sim.isLocked
                      ? 'cursor-not-allowed text-ink-soft/50'
                      : 'text-coral-deep hover:text-ink'
                  }`}
                >
                  <Plus className="h-4 w-4" />
                  <span>
                    {sim.catalogOpen
                      ? 'Fechar catálogo de peças e serviços'
                      : 'Adicionar peça ou serviço do catálogo'}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={sim.toggleCatalogInflation}
                  className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-ink-soft underline decoration-ink/30 underline-offset-4 hover:text-ink"
                >
                  <ArrowsClockwise className="h-3.5 w-3.5" />
                  <span>
                    {sim.catalogMultiplier === 1
                      ? 'Simular reajuste +15% no catálogo'
                      : 'Restaurar preços do catálogo'}
                  </span>
                </button>
              </div>

              {sim.catalogOpen && !sim.isLocked && (
                <div className="mt-3 grid grid-cols-1 gap-2 border-t border-ink/15 pt-3 sm:grid-cols-2">
                  {sim.catalog.map((cat) => {
                    const price = Math.round(cat.precoCatalogo * sim.catalogMultiplier);
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => sim.addCatalogItem(cat.id)}
                        className="flex items-center justify-between rounded-xl border border-ink/20 bg-paper px-3.5 py-2.5 text-left text-xs transition-colors hover:border-ink hover:bg-coral-tint"
                      >
                        <div className="pr-2">
                          <p className="font-bold text-ink">{cat.nome}</p>
                          <p className="font-mono text-[11px] text-ink-soft">
                            {cat.detalhe}
                          </p>
                        </div>
                        <span className="shrink-0 font-mono font-bold text-coral-deep tabular-nums">
                          + {formatCurrencyBRL(price)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Right 5 Columns: Total, FIPE Reference & Mechanic */}
          <div className="lg:col-span-5 flex flex-col justify-between border-t border-ink/15 pt-6 lg:border-t-0 lg:border-l lg:pl-8 lg:pt-0">
            <div className="space-y-6">
              <div>
                <p className="font-mono text-xs font-bold uppercase tracking-wider text-ink-soft">
                  Fechamento e referência FIPE
                </p>

                <div className="mt-4 space-y-2.5 text-sm">
                  <div className="flex justify-between text-ink-soft">
                    <span>Peças</span>
                    <span className="font-mono font-semibold text-ink tabular-nums">
                      {formatCurrencyBRL(sim.totalPecas)}
                    </span>
                  </div>
                  <div className="flex justify-between text-ink-soft">
                    <span>Mão de obra</span>
                    <span className="font-mono font-semibold text-ink tabular-nums">
                      {formatCurrencyBRL(sim.totalServicos)}
                    </span>
                  </div>
                  <div className="flex items-baseline justify-between border-t border-ink/20 pt-3">
                    <span className="font-display text-base font-bold text-ink">
                      Total da Ordem
                    </span>
                    <span className="font-display text-2xl font-extrabold text-ink tabular-nums">
                      {formatCurrencyBRL(sim.totalOS)}
                    </span>
                  </div>
                </div>
              </div>

              {/* FIPE Proportion Bar */}
              <div className="border-t border-ink/15 pt-5">
                <div className="flex items-baseline justify-between text-xs font-bold">
                  <span className="font-mono uppercase text-ink-soft">
                    Tabela FIPE ({sim.currentVehicle.codigoFipe})
                  </span>
                  <span className="font-mono text-sm text-ink tabular-nums">
                    {formatCurrencyBRL(sim.currentVehicle.valorFipe)}
                  </span>
                </div>

                <div className="mt-2.5 h-2.5 w-full overflow-hidden rounded-sm bg-paper-deep border border-ink/30">
                  <div
                    className="h-full bg-coral transition-all duration-300"
                    style={{ width: `${sim.fipeBarWidth}%` }}
                  />
                </div>

                <p className="mt-2 text-xs font-semibold text-ink">
                  Este orçamento equivale a{' '}
                  <strong className="font-mono text-coral-deep tabular-nums">
                    {sim.fipePercentage}%
                  </strong>{' '}
                  do valor de tabela do veículo.
                </p>
              </div>
            </div>

            {/* Assigned Mechanic */}
            <div className="mt-6 border-t border-ink/15 pt-5">
              <div className="flex items-start gap-3">
                <Wrench className="mt-0.5 h-5 w-5 shrink-0 text-coral-deep" />
                <div>
                  <p className="font-mono text-[11px] font-bold uppercase tracking-wider text-ink-soft">
                    Mecânico responsável · {sim.currentVehicle.mecanicoAlocado.box}
                  </p>
                  <p className="mt-0.5 font-display text-base font-bold text-ink">
                    {sim.currentVehicle.mecanicoAlocado.nome}
                  </p>
                  <p className="text-xs font-medium text-ink-soft">
                    {sim.currentVehicle.mecanicoAlocado.especialidade} ·{' '}
                    {sim.currentVehicle.mecanicoAlocado.entregasMes}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Dialog>
  );
};

