import type { ApiListResponse, NamedApiResource, PokeApiPokemonDetail, PokeApiTypeResponse } from '../types/pokeApi';
import type { PokemonCatalogEntry, PokemonListItem, PokemonTypeName } from '../types/pokemon';
import { extractPokemonIdFromUrl } from '../utils/pokemonIds';
import { getFallbackSpriteUrl } from '../utils/pokemonImages';
import { getTypeLabel } from '../utils/typeMeta';

const API_BASE_URL = 'https://pokeapi.co/api/v2';
export const MAX_DEX_ID = 1025;

async function fetchJson<TResponse>(url: string, signal?: AbortSignal): Promise<TResponse> {
  const response = await fetch(url, signal ? { signal } : undefined);

  if (!response.ok) {
    throw new Error(`Falha na requisição ${response.status}: ${url}`);
  }

  return (await response.json()) as TResponse;
}

export async function getPokemonCatalog(signal?: AbortSignal): Promise<PokemonCatalogEntry[]> {
  const url = `${API_BASE_URL}/pokemon?limit=${MAX_DEX_ID}&offset=0`;
  const data = await fetchJson<ApiListResponse<NamedApiResource>>(url, signal);

  return data.results
    .map((resource) => {
      const id = extractPokemonIdFromUrl(resource.url);
      return id === null ? null : { id, name: resource.name, url: resource.url } satisfies PokemonCatalogEntry;
    })
    .filter((entry): entry is PokemonCatalogEntry => entry !== null && entry.id <= MAX_DEX_ID);
}

export async function getPokemonDetails(id: number, signal?: AbortSignal): Promise<PokemonListItem> {
  const data = await fetchJson<PokeApiPokemonDetail>(`${API_BASE_URL}/pokemon/${id}`, signal);

  return {
    id: data.id,
    name: data.name,
    sprite: data.sprites.front_default ?? getFallbackSpriteUrl(data.id),
    types: data.types
      .slice()
      .sort((first, second) => first.slot - second.slot)
      .map(({ type }) => ({ name: type.name, label: getTypeLabel(type.name) })),
  };
}

export async function getPokemonDetailsBatch(ids: readonly number[], signal?: AbortSignal): Promise<PokemonListItem[]> {
  const settledResults = await Promise.allSettled(ids.map((id) => getPokemonDetails(id, signal)));

  return settledResults
    .map((result) => (result.status === 'fulfilled' ? result.value : null))
    .filter((pokemon): pokemon is PokemonListItem => pokemon !== null);
}

export async function getPokemonIdsByTypes(
  selectedTypes: readonly PokemonTypeName[],
  signal?: AbortSignal,
): Promise<ReadonlySet<number> | null> {
  if (selectedTypes.length === 0) return null;

  const responses = await Promise.all(
    selectedTypes.map((typeName) => fetchJson<PokeApiTypeResponse>(`${API_BASE_URL}/type/${typeName}`, signal)),
  );

  const ids = responses.flatMap((response) =>
    response.pokemon
      .map((item) => extractPokemonIdFromUrl(item.pokemon.url))
      .filter((id): id is number => id !== null && id <= MAX_DEX_ID),
  );

  return new Set(ids);
}
