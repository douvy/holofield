'use client';

import { X } from 'lucide-react';
import { CardAppearance } from '@/data/cards';
import { SharedPokemonSprite } from './SharedPokemonSprite';

const DIAGONAL_LINES_SVG = `url("data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 6L6 0' stroke='%23ffffff' stroke-width='0.5' fill='none'/%3E%3C/svg%3E")`;

interface CardModalProps {
  card: CardAppearance;
  onClose: () => void;
}

export function CardModal({ card, onClose }: CardModalProps) {
  return (
    <div
      className="fixed inset-0 bg-black/70 z-50 overflow-y-auto backdrop-blur-[2px]"
      onClick={onClose}
    >
      <div className="min-h-screen flex items-start justify-center px-3 py-10">
        <div
          className="w-full max-w-[380px] sm:max-w-xl cursor-default"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="bg-[#111216] rounded-lg border border-[#1d1f26] overflow-hidden relative">
            <button
              type="button"
              onPointerDown={(e) => { e.stopPropagation(); onClose(); }}
              className="absolute top-3 right-3 z-20 w-8 h-8 flex items-center justify-center rounded-sm bg-transparent border border-[#2a2f38]/60 hover:border-[#4a4f58] hover:bg-[#ffffff]/5 transition-colors touch-none cursor-pointer"
            >
              <X className="w-4 h-4 text-[#6b7280]" />
            </button>

            {/* Card Image */}
            <div className="p-5 pb-4 flex justify-center">
              <div className="relative">
                <div
                  className="absolute -inset-2 rounded-lg border border-[#2a2f38]/50 opacity-[0.15] pointer-events-none"
                  style={{ backgroundImage: DIAGONAL_LINES_SVG }}
                />
                <div className="absolute -inset-2 rounded-lg border border-[#2a2f38] pointer-events-none" />
                <div className="relative w-[260px] sm:w-[280px] aspect-[245/342] rounded-lg overflow-hidden bg-[#1a1d24]">
                  {card.image ? (
                    <img
                      src={card.image}
                      alt={card.card}
                      className="w-full h-full object-cover scale-[1.02] relative z-10"
                    />
                  ) : (
                    <div className="w-full h-full" />
                  )}
                </div>
              </div>
            </div>

            {/* Card Info */}
            <div className="px-5 py-4 text-center">
              <h1 className="text-[17px] font-medium text-[#ebebef]" style={{ fontFamily: 'Lora, serif' }}>
                {card.card}
              </h1>
              <p className="text-[#6b7280] text-[14px] mt-1">{card.set}</p>
            </div>

            {/* Details Section */}
            {((card.number && card.number !== '-') || card.notes || card.artist || card.rarity) && (
              <div className="px-5 py-4 border-t border-[#1d1f26] space-y-2">
                {card.artist && (
                  <div className="flex justify-between text-[13px]">
                    <span className="text-[#6b7280]">Artist</span>
                    <span className="text-[#ebebef]">{card.artist}</span>
                  </div>
                )}
                {card.rarity && (
                  <div className="flex justify-between text-[13px]">
                    <span className="text-[#6b7280]">Rarity</span>
                    <span className="text-[#ebebef]">{card.rarity}</span>
                  </div>
                )}
                {card.number && card.number !== '-' && (
                  <div className="flex justify-between text-[13px]">
                    <span className="text-[#6b7280]">Number</span>
                    <span className="text-[#ebebef]">#{card.number}</span>
                  </div>
                )}
                {card.notes && (
                  <div className="flex justify-between text-[13px]">
                    <span className="text-[#6b7280]">Notes</span>
                    <span className="text-[#ebebef]">{card.notes}</span>
                  </div>
                )}
              </div>
            )}

            {/* Shared Pokemon */}
            {card.sharedWith && card.sharedWith.length > 0 && (
              <div className="px-5 py-4 border-t border-[#1d1f26]">
                <p className="text-[#6b7280] text-[13px] mb-3">Also appears</p>
                <div className="flex items-center gap-2 flex-wrap">
                  {card.sharedWith.map((name) => (
                    <SharedPokemonSprite key={name} name={name} />
                  ))}
                </div>
              </div>
            )}

            {/* Footer hint */}
            <div className="hidden sm:flex px-5 py-3 border-t border-[#1d1f26] justify-end">
              <span className="text-[11px] text-[#6b7280]">
                <kbd className="px-1.5 py-0.5 rounded bg-[#2a2f38]/80 text-[#a2a6ac] font-mono text-[10px]">esc</kbd>
                <span className="ml-1.5">to close</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
