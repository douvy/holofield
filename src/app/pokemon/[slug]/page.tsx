import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import { getPokemonBySlug, getAllPokemon, getAnimatedSprite } from '@/data/cards';

const DIAGONAL_LINES_SVG = `url("data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 6L6 0' stroke='%23ffffff' stroke-width='0.5' fill='none'/%3E%3C/svg%3E")`;
const DIAGONAL_LINES_BLUE_SVG = `url("data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 6L6 0' stroke='%235d8edd' stroke-width='0.5' fill='none'/%3E%3C/svg%3E")`;

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

      <main className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-[#6b7280] hover:text-[#ebebef] text-[13px] mb-8 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Back
        </Link>

        {/* Pokemon header */}
        <div className="flex items-center gap-6 mb-12">
          <div className="relative w-28 h-28 sm:w-36 sm:h-36 shrink-0">
            <img
              src={getAnimatedSprite(pokemon.name)}
              alt={pokemon.name}
              className="w-full h-full object-contain drop-shadow-[0_8px_24px_rgba(0,0,0,0.5)]"
            />
          </div>
          <div>
            <h1 className="text-[#ebebef] text-3xl sm:text-4xl font-semibold tracking-tight" style={{ fontFamily: 'Lora, serif' }}>{pokemon.name}</h1>
            <p className="text-[#6b7280] text-[14px] font-mono mt-1">#{pokemon.dexNumber.toString().padStart(3, '0')}</p>
          </div>
        </div>

        {/* Cameos section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[#ebebef] text-lg font-medium" style={{ fontFamily: 'Lora, serif' }}>Cameos</h2>
            <span className="text-[#6b7280] text-[13px]">{pokemon.cameos.length}</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
            {pokemon.cameos.map((appearance, i) => (
              <div
                key={`${appearance.card}-${appearance.set}-${i}`}
                className="group relative bg-[#14161a] rounded-lg border border-[#2a2f38] border-b-2 hover:border-[#5d8edd]/50 transition-colors duration-150 [box-shadow:inset_0_-2px_0_0_rgba(255,255,255,0.02)] animate-fade-in"
                style={{ animationDelay: `${i * 30}ms` }}
              >
                <div className="p-2.5 relative border-b border-[#2a2f38] group-hover:border-[#5d8edd]/40 transition-colors">
                  <div
                    className="absolute inset-0 opacity-[0.08] group-hover:opacity-0 transition-opacity pointer-events-none rounded-t-lg"
                    style={{ backgroundImage: DIAGONAL_LINES_SVG }}
                  />
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-[0.25] transition-opacity pointer-events-none rounded-t-lg"
                    style={{ backgroundImage: DIAGONAL_LINES_BLUE_SVG }}
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
                  <div className="mt-2.5 pt-2.5 border-t border-[#2a2f38] flex items-center gap-2">
                    <span className="inline-flex items-center h-[18px] px-1.5 rounded border border-[#3a3f4a]/40 bg-[#0a0c0f]/50 text-[#a2a6ac] font-mono text-[10px]">
                      #{appearance.number}
                    </span>
                    {appearance.notes && (
                      <span className="text-[#6b7280] text-[10px] italic truncate">{appearance.notes}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
