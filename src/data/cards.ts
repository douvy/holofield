// Holofield Pokemon art database

export interface CardAppearance {
  card: string;
  set: string;
  number: string;
  notes?: string;
  image?: string;
}

export interface PokemonData {
  name: string;
  slug: string;
  dexNumber: number;
  cameos: CardAppearance[];
}

// Collectr animated sprites
export function getAnimatedSprite(name: string): string {
  return `https://app.getcollectr.com/characters/${name.toLowerCase()}.gif`;
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
      { card: 'Pokémon Valley', set: 'Miscellaneous Promos', number: '-', notes: 'Jumbo' },
      { card: 'Town Volunteers', set: 'Aquapolis', number: '136' },
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
