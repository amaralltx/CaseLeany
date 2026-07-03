import type { FavoritePokemon } from '../types/pokemon';

const FAVORITES_STORAGE_KEY = 'pokedex:favorites:v1';

function isFavoritePokemon(value: unknown): value is FavoritePokemon {
  if (typeof value !== 'object' || value === null) return false;
  const candidate = value as Partial<FavoritePokemon>;
  return (
    typeof candidate.id === 'number' &&
    typeof candidate.name === 'string' &&
    typeof candidate.sprite === 'string' &&
    Array.isArray(candidate.types)
  );
}

export function readFavoritesFromStorage(): FavoritePokemon[] {
  try {
    const stored = window.localStorage.getItem(FAVORITES_STORAGE_KEY);
    if (!stored) return [];

    const parsed: unknown = JSON.parse(stored);
    if (!Array.isArray(parsed)) return [];

    return parsed.filter(isFavoritePokemon);
  } catch {
    return [];
  }
}

export function writeFavoritesToStorage(favorites: readonly FavoritePokemon[]): void {
  window.localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
}
