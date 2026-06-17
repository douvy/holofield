// Holofield Pokemon art database

export interface CardAppearance {
  card: string;
  set: string;
  number: string;
  notes?: string;
  image?: string;
  sharedWith?: string[]; // Other Pokemon appearing on this card
  artist?: string;
  rarity?: string;
}

export interface PokemonData {
  name: string;
  slug: string;
  dexNumber: number;
  cameos: CardAppearance[];
}

// Dex number lookup
const POKEDEX_NUMBERS: Record<string, number> = {
  bulbasaur: 1, ivysaur: 2, venusaur: 3, charmander: 4, charmeleon: 5, charizard: 6,
  squirtle: 7, wartortle: 8, blastoise: 9, pikachu: 25, raichu: 26,
  venonat: 48, venomoth: 49, psyduck: 54, golduck: 55,
  togepi: 175, togetic: 176, marill: 183, azumarill: 184, wooper: 194, quagsire: 195,
  hoothoot: 163, noctowl: 164, elekid: 239, electabuzz: 125, electivire: 466,
};

// Collectr animated sprites
export function getAnimatedSprite(name: string): string {
  return `https://app.getcollectr.com/characters/${name.toLowerCase()}.gif`;
}

// Pokemon sprite with fallback
export function getPokemonSprite(name: string): { gif: string; fallback: string } | null {
  const key = name.toLowerCase();
  const dexNum = POKEDEX_NUMBERS[key];
  if (!dexNum) return null;

  const fallback = dexNum <= 493
    ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${dexNum}.svg`
    : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${dexNum}.png`;

  return {
    gif: `https://app.getcollectr.com/characters/${key}.gif`,
    fallback,
  };
}

// Fallback static sprite
export function getSprite(dexNumber: number): string {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${dexNumber}.png`;
}

// Pokemon database
export const POKEMON_DATABASE: PokemonData[] = [
  {
    name: 'Bulbasaur',
    slug: 'bulbasaur',
    dexNumber: 1,
    cameos: [
      { card: 'Pokemon Valley', set: 'CoroCoro 1999', number: '-', notes: 'Jumbo', image: '/cards/pokemon-valley.jpg', sharedWith: ['Venonat', 'Togepi', 'Elekid', 'Squirtle', 'Marill', 'Psyduck'], artist: 'Naoyo Kimura', rarity: 'Promo' },
      { card: 'Town Volunteers', set: 'Aquapolis', number: '136', image: '/cards/town-volunteers.jpg', sharedWith: ['Squirtle', 'Wooper', 'Hoothoot'] },
      { card: 'Venture Bomb', set: 'Team Rocket Returns', number: '93' },
      { card: 'Rattata', set: 'Pokémon Rumble', number: '15' },
      { card: 'Champions Festival', set: 'XY Promos', number: '176' },
      { card: 'Pikachu', set: 'XY-P Promos', number: '279' },
      { card: 'M Sachiko-EX', set: 'XY-P Promos', number: '298' },
      { card: "Red's Challenge", set: 'Tag All Stars', number: '201' },
      { card: "Rescue Team DX's Pikachu", set: 'S-P Promos', number: '36' },
      { card: "Poké-lun TV's Pikachu and Friends", set: 'S-P Promos', number: '-', notes: 'Jumbo' },
      { card: 'Ditto', set: 'Delta Species', number: '36', notes: "Ditto's disguise" },
      { card: "Team Rocket's Meowth", set: 'Wizards Promos', number: '18', notes: 'silhouette' },
      { card: 'Pokémon Communication', set: 'Team Up', number: '152b' },
      { card: 'Champions Festival', set: 'SM Promos', number: '231', notes: 'picture' },
    ],
  },
];

export function getPokemonBySlug(slug: string): PokemonData | undefined {
  return POKEMON_DATABASE.find(p => p.slug === slug);
}

export function getTotalCameos(): number {
  return POKEMON_DATABASE.reduce((sum, p) => sum + p.cameos.length, 0);
}

export function getAllPokemon(): PokemonData[] {
  return POKEMON_DATABASE.sort((a, b) => a.dexNumber - b.dexNumber);
}
