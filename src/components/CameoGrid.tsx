'use client';

import { useState, useEffect } from 'react';
import { CardAppearance } from '@/data/cards';
import { SharedPokemonSprite } from './SharedPokemonSprite';
import { CardModal } from './CardModal';

const DIAGONAL_LINES_SVG = `url("data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 6L6 0' stroke='%23ffffff' stroke-width='0.5' fill='none'/%3E%3C/svg%3E")`;
const DIAGONAL_LINES_HOVER_SVG = `url("data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 6L6 0' stroke='%23ffffff' stroke-width='0.5' fill='none'/%3E%3C/svg%3E")`;

interface CameoGridProps {
  cameos: CardAppearance[];
}

export function CameoGrid({ cameos }: CameoGridProps) {
  const [selectedCard, setSelectedCard] = useState<CardAppearance | null>(null);

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedCard) {
        setSelectedCard(null);
      }
    };
    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, [selectedCard]);

  useEffect(() => {
    if (selectedCard) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [selectedCard]);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
        {cameos.map((appearance, i) => (
          <button
            key={`${appearance.card}-${appearance.set}-${i}`}
            type="button"
            onClick={() => setSelectedCard(appearance)}
            className="group relative bg-[#14161a] rounded-lg border border-[#2a2f38] border-b-2 hover:border-[#4a4f58] transition-colors duration-150 [box-shadow:inset_0_-2px_0_0_rgba(255,255,255,0.02)] animate-fade-in text-left cursor-pointer"
            style={{ animationDelay: `${i * 30}ms` }}
          >
            <div className="p-2.5 relative border-b border-[#2a2f38] group-hover:border-[#4a4f58] transition-colors">
              <div
                className="absolute inset-0 opacity-[0.08] group-hover:opacity-0 transition-opacity pointer-events-none rounded-t-lg"
                style={{ backgroundImage: DIAGONAL_LINES_SVG }}
              />
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-[0.10] transition-opacity pointer-events-none rounded-t-lg"
                style={{ backgroundImage: DIAGONAL_LINES_HOVER_SVG }}
              />

              <div className="relative rounded-lg overflow-hidden aspect-[245/342] bg-[#1a1d24]">
                {appearance.image ? (
                  <img
                    src={appearance.image}
                    alt={appearance.card}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full" />
                )}
              </div>
            </div>

            <div className="p-3 pt-2.5">
              <h3 className="text-[#ebebef] text-[15px] truncate leading-snug" style={{ fontFamily: 'Lora, serif' }}>{appearance.card}</h3>
              <p className="text-[#767a84] text-[12px] truncate mt-1">{appearance.set}</p>
              {(appearance.number && appearance.number !== '-') || appearance.notes ? (
                <div className="mt-2.5 pt-2.5 border-t border-[#2a2f38] flex items-center gap-2">
                  {appearance.number && appearance.number !== '-' && (
                    <span className="inline-flex items-center h-[18px] px-1.5 rounded border border-[#3a3f4a]/40 bg-[#0a0c0f]/50 text-[#a2a6ac] font-mono text-[10px]">
                      #{appearance.number}
                    </span>
                  )}
                  {appearance.notes && (
                    <span className="text-[#6b7280] text-[10px] italic truncate">{appearance.notes}</span>
                  )}
                </div>
              ) : null}
              {appearance.sharedWith && appearance.sharedWith.length > 0 && (
                <div className="mt-2.5 pt-2.5 border-t border-[#2a2f38] flex items-center gap-1 flex-wrap">
                  {appearance.sharedWith.map((name) => (
                    <SharedPokemonSprite key={name} name={name} />
                  ))}
                </div>
              )}
            </div>
          </button>
        ))}
      </div>

      {selectedCard && (
        <CardModal card={selectedCard} onClose={() => setSelectedCard(null)} />
      )}
    </>
  );
}
