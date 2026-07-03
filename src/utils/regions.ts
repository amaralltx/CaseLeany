import type { PokemonRegion } from '../types/pokemon';

export const POKEMON_REGIONS: readonly PokemonRegion[] = [
  { id: 'kanto', label: 'Kanto', start: 1, end: 151 },
  { id: 'johto', label: 'Johto', start: 152, end: 251 },
  { id: 'hoenn', label: 'Hoenn', start: 252, end: 386 },
  { id: 'sinnoh', label: 'Sinnoh', start: 387, end: 493 },
  { id: 'unova', label: 'Unova', start: 494, end: 649 },
  { id: 'kalos', label: 'Kalos', start: 650, end: 721 },
  { id: 'alola', label: 'Alola', start: 722, end: 809 },
  { id: 'galar', label: 'Galar', start: 810, end: 905 },
  { id: 'paldea', label: 'Paldea', start: 906, end: 1025 },
] as const;

export function isPokemonInsideSelectedRegions(id: number, selectedRegions: string[]): boolean {
  if (selectedRegions.length === 0) return true;

  return selectedRegions.some((regionId) => {
    const region = POKEMON_REGIONS.find((item) => item.id === regionId);
    return Boolean(region && id >= region.start && id <= region.end);
  });
}
