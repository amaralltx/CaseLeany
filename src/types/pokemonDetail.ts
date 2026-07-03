import type { PokemonListItem, PokemonTypeName } from './pokemon';

export type PokemonWeakness = Readonly<{
  name: PokemonTypeName;
  label: string;
}>;

export type PokemonGenderDistribution = Readonly<{
  malePercentage: number | null;
  femalePercentage: number | null;
}>;

export type PokemonEvolutionStage = Readonly<{
  id: number;
  name: string;
  sprite: string;
  types: PokemonListItem['types'];
  evolutionLabel: string | null;
}>;

export type PokemonDetail = Readonly<{
  id: number;
  name: string;
  sprite: string;
  showdownSprite: string;
  types: PokemonListItem['types'];
  description: string;
  weight: string;
  height: string;
  category: string;
  ability: string;
  gender: PokemonGenderDistribution;
  weaknesses: readonly PokemonWeakness[];
  evolutions: readonly PokemonEvolutionStage[];
}>;