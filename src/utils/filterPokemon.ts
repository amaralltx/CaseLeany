import type { PokemonCatalogEntry, PokemonSortMode } from '../types/pokemon';
import { isPokemonInsideSelectedRegions } from './regions';

type ApplyPokemonFiltersInput = Readonly<{
  entries: readonly PokemonCatalogEntry[];
  searchTerm: string;
  sortMode: PokemonSortMode;
  selectedRegions: string[];
  typeRestrictedIds: ReadonlySet<number> | null;
}>;

const NORMALIZE_DIACRITICS_PATTERN = /[\u0300-\u036f]/g;

function normalizeSearchText(value: string): string {
  return value
    .normalize('NFD')
    .replace(NORMALIZE_DIACRITICS_PATTERN, '')
    .trim()
    .toLowerCase();
}

function sortCatalogEntries(entries: PokemonCatalogEntry[], sortMode: PokemonSortMode): PokemonCatalogEntry[] {
  return [...entries].sort((first, second) => {
    switch (sortMode) {
      case 'number-desc':
        return second.id - first.id;
      case 'name-asc':
        return first.name.localeCompare(second.name, 'pt-BR');
      case 'name-desc':
        return second.name.localeCompare(first.name, 'pt-BR');
      case 'number-asc':
      default:
        return first.id - second.id;
    }
  });
}

export function applyPokemonFilters(input: ApplyPokemonFiltersInput): PokemonCatalogEntry[] {
  const normalizedSearch = normalizeSearchText(input.searchTerm);

  const filtered = input.entries.filter((entry) => {
    const matchesSearch = normalizedSearch.length === 0 || normalizeSearchText(entry.name).includes(normalizedSearch);
    const matchesRegion = isPokemonInsideSelectedRegions(entry.id, input.selectedRegions);
    const matchesType = input.typeRestrictedIds === null || input.typeRestrictedIds.has(entry.id);

    return matchesSearch && matchesRegion && matchesType;
  });

  return sortCatalogEntries(filtered, input.sortMode);
}
