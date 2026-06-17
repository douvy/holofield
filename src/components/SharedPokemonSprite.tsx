import { getPokemonSprite } from '@/data/cards';

export function SharedPokemonSprite({ name }: { name: string }) {
  const sprite = getPokemonSprite(name);
  if (!sprite) return null;

  return (
    <img
      src={sprite.fallback}
      alt={name}
      title={name}
      className="w-6 h-6 object-contain opacity-70 hover:opacity-100 transition-opacity"
    />
  );
}
