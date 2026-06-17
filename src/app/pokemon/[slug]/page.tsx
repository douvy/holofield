import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import { getPokemonBySlug, getAllPokemon, getAnimatedSprite } from '@/data/cards';
import { CameoGrid } from '@/components/CameoGrid';

const DIAGONAL_LINES_SVG = `url("data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 6L6 0' stroke='%23ffffff' stroke-width='0.5' fill='none'/%3E%3C/svg%3E")`;
const GRID_SVG = `url("data:image/svg+xml,%3Csvg width='12' height='12' viewBox='0 0 12 12' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12 0H0V12' stroke='%23ffffff' stroke-width='0.5' fill='none'/%3E%3C/svg%3E")`;

export async function generateStaticParams() {
  return getAllPokemon().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const pokemon = getPokemonBySlug(slug);
  if (!pokemon) return { title: 'Not Found' };

  return {
    title: `${pokemon.name} - Holofield`,
    description: `${pokemon.name} card art appearances.`,
  };
}

export default async function PokemonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const pokemon = getPokemonBySlug(slug);

  if (!pokemon) {
    notFound();
  }

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
            <Link href="/" className="text-[#ebebef] text-xl font-semibold tracking-tight" style={{ fontFamily: 'Lora, serif' }}>
              Holofield
            </Link>
          </div>
        </div>
      </header>

      {/* Hero background */}
      <div className="absolute inset-x-0 top-14 h-64 overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{ backgroundImage: GRID_SVG, backgroundSize: '12px 12px' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0c0f]" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1d24]/20 via-transparent to-transparent" />
      </div>

      <main className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pt-4 pb-8 relative">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-[#6b7280] hover:text-[#ebebef] text-[13px] mb-2 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Back
        </Link>

        {/* Pokemon header */}
        <div className="flex flex-col items-center sm:flex-row sm:items-center gap-6 sm:gap-8 mb-8">
          <div className="text-center sm:text-left sm:flex-1 order-1 sm:order-none">
            <h1 className="text-[#ebebef] text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight leading-none" style={{ fontFamily: 'Lora, serif' }}>{pokemon.name}</h1>
            <p className="text-[#6b7280] text-[15px] font-mono mt-3">#{pokemon.dexNumber.toString().padStart(3, '0')}</p>
          </div>
          <div className="relative w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 shrink-0 order-2 sm:order-none">
            <img
              src={getAnimatedSprite(pokemon.name)}
              alt={pokemon.name}
              className="w-full h-full object-contain drop-shadow-[0_8px_24px_rgba(0,0,0,0.5)] sm:-mt-3"
            />
          </div>
        </div>

        {/* Diagonal separator */}
        <div className="h-[13px] mb-6 border-t border-b border-[#1a1d24] relative left-1/2 -translate-x-1/2 w-screen lg:w-[calc(100vw-69px)]">
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{ backgroundImage: DIAGONAL_LINES_SVG, backgroundSize: '6px 6px' }}
          />
        </div>

        {/* Cameos section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[#ebebef] text-lg font-medium" style={{ fontFamily: 'Lora, serif' }}>Cameos</h2>
            <span className="inline-flex items-center h-[18px] px-1.5 rounded border border-[#3a3f4a]/40 bg-[#0a0c0f]/50 text-[#a2a6ac] font-mono text-[10px]">{pokemon.cameos.length}</span>
          </div>

          <CameoGrid cameos={pokemon.cameos} />
        </section>
      </main>
    </div>
  );
}
