import Link from 'next/link';
import { getAllPokemon, getAnimatedSprite } from '@/data/cards';

const DIAGONAL_LINES_SVG = `url("data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 6L6 0' stroke='%23ffffff' stroke-width='0.5' fill='none'/%3E%3C/svg%3E")`;
const DIAGONAL_LINES_BLUE_SVG = `url("data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 6L6 0' stroke='%23F54E00' stroke-width='0.5' fill='none'/%3E%3C/svg%3E")`;

export const metadata = {
  title: 'Holofield',
  description: 'Pokémon card art database.',
};

export default function Home() {
  const pokemon = getAllPokemon();

  return (
    <div className="min-h-screen bg-[#0a0c0f] relative">
      {/* Side borders */}
      <div className="hidden lg:block fixed left-0 top-0 bottom-0 w-8 bg-[#08090c]" />
      <div className="hidden lg:block fixed right-0 top-0 bottom-0 w-8 bg-[#08090c]" />
      <div className="hidden lg:block fixed left-8 top-0 bottom-0 w-px border-l border-dashed border-[#252a33] z-[60]" />
      <div className="hidden lg:block fixed right-8 top-0 bottom-0 w-px border-r border-dashed border-[#252a33] z-[60]" />

      <header className="border-b border-[#1a1d24] bg-[#0a0c0f]/90 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <span className="text-[#ebebef] text-xl font-semibold tracking-tight" style={{ fontFamily: 'Lora, serif' }}>Holofield</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
          {pokemon.map((p, index) => (
            <Link
              key={p.slug}
              href={`/pokemon/${p.slug}`}
              className="group relative bg-[#14161a] rounded-lg border border-[#2a2f38] border-b-2 hover:border-[#FF8A65]/20 transition-colors duration-150 [box-shadow:inset_0_-2px_0_0_rgba(255,255,255,0.02)] animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="p-4 relative border-b border-[#2a2f38] group-hover:border-[#FF8A65]/20 transition-colors">
                <div
                  className="absolute inset-0 opacity-[0.08] group-hover:opacity-0 transition-opacity pointer-events-none rounded-t-lg"
                  style={{ backgroundImage: DIAGONAL_LINES_SVG }}
                />
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-[0.25] transition-opacity pointer-events-none rounded-t-lg"
                  style={{ backgroundImage: DIAGONAL_LINES_BLUE_SVG }}
                />
                <div className="relative w-20 h-20 mx-auto">
                  <img
                    src={getAnimatedSprite(p.name)}
                    alt={p.name}
                    className="w-full h-full object-contain opacity-90 group-hover:opacity-100 transition-opacity drop-shadow-[0_4px_12px_rgba(0,0,0,0.4)]"
                  />
                </div>
              </div>

              <div className="p-4 pt-3">
                <h3 className="text-[#ebebef] text-[18px] tracking-[-0.01em] mb-2" style={{ fontFamily: 'Lora, serif' }}>{p.name}</h3>
                <span className="inline-flex items-center h-[18px] px-1.5 rounded border border-[#F54E00]/20 bg-[#F54E00]/10 text-[#F54E00] font-mono text-[10px]">
                  #{p.dexNumber.toString().padStart(3, '0')}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
