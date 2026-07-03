import type { PokemonType, PokemonTypeName } from '../types/pokemon';

export const POKEMON_TYPES: readonly PokemonType[] = [
  { name: 'water', label: 'Água' },
  { name: 'dragon', label: 'Dragão' },
  { name: 'electric', label: 'Elétrico' },
  { name: 'fairy', label: 'Fada' },
  { name: 'ghost', label: 'Fantasma' },
  { name: 'fire', label: 'Fogo' },
  { name: 'ice', label: 'Gelo' },
  { name: 'grass', label: 'Grama' },
  { name: 'bug', label: 'Inseto' },
  { name: 'fighting', label: 'Lutador' },
  { name: 'normal', label: 'Normal' },
  { name: 'dark', label: 'Noturno' },
  { name: 'steel', label: 'Metal' },
  { name: 'rock', label: 'Pedra' },
  { name: 'psychic', label: 'Psíquico' },
  { name: 'ground', label: 'Terrestre' },
  { name: 'poison', label: 'Venenoso' },
  { name: 'flying', label: 'Voador' },
] as const;

export const TYPE_TRANSLATIONS = POKEMON_TYPES.reduce<Record<PokemonTypeName, string>>(
  (accumulator, type) => ({ ...accumulator, [type.name]: type.label }),
  {} as Record<PokemonTypeName, string>,
);

export const TYPE_COLORS: Record<PokemonTypeName, string> = {
  normal: '#919AA2',
  fire: '#FF9D55',
  water: '#5090D6',
  grass: '#63bc5a',
  electric: '#F4D23C',
  ice: '#73CEC0',
  fighting: '#CE416B',
  poison: '#B567CE',
  ground: '#D97845',
  flying: '#89AAE3',
  psychic: '#FA7179',
  bug: '#91C12F',
  rock: '#C5B78C',
  ghost: '#5269AD',
  dragon: '#0B6DC3',
  dark: '#5A5465',
  steel: '#5A8EA2',
  fairy: '#EC8FE6',
};

export const TYPE_SOFT_COLORS: Record<PokemonTypeName, string> = {
  normal: '#F1F2F3',
  fire: '#FCF3EB',
  water: '#EBF1F8',
  grass: '#edf6ec',
  electric: '#FBF8E9',
  ice: '#F1FBF9',
  fighting: '#F8E9EE',
  poison: '#F5EDF8',
  ground: '#F9EFEA',
  flying: '#F1F4FA',
  psychic: '#FCEEEF',
  bug: '#F1F6E8',
  rock: '#F7F5F1',
  ghost: '#EBEDF4',
  dragon: '#E4EEF6',
  dark: '#ECEBED',
  steel: '#ECF1F3',
  fairy: '#FBF1FA',
};

export function isPokemonTypeName(value: string): value is PokemonTypeName {
  return POKEMON_TYPES.some((type) => type.name === value);
}

export function getTypeLabel(typeName: PokemonTypeName): string {
  return POKEMON_TYPES.find((type) => type.name === typeName)?.label ?? typeName;
}


const BLACK_TEXT_TYPES = new Set<PokemonTypeName>([
  'flying',
  'poison',
  'ground',
  'psychic',
  'rock',
  'steel',
  'normal',
  'bug',
  'grass',
  'ice',
  'fire',
  'fairy',
  'electric',
  'water',
]);

export function getTypeTextColor(typeName: PokemonTypeName): '#17171b' | '#ffffff' {
  return BLACK_TEXT_TYPES.has(typeName) ? '#17171b' : '#ffffff';
}