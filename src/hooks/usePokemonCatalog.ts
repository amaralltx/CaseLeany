import { useEffect, useState } from 'react';
import { getPokemonCatalog, getPokemonIdsByTypes } from '../services/pokeApi';
import type { AsyncStatus, PokemonCatalogEntry, PokemonTypeName } from '../types/pokemon';
import { isPokemonTypeName } from '../utils/typeMeta';

const INITIAL_STATE: readonly PokemonCatalogEntry[] = [];

let pokemonCatalogCache: readonly PokemonCatalogEntry[] | null = null;

const pokemonTypeIdsCache = new Map<string, ReadonlySet<number>>();

type UsePokemonCatalogResult = Readonly<{
  entries: readonly PokemonCatalogEntry[];
  status: AsyncStatus;
  typeStatus: AsyncStatus;
  typeRestrictedIds: ReadonlySet<number> | null;
  errorMessage: string | null;
}>;

function getTypeCacheKey(selectedTypes: readonly string[]): string {
  return selectedTypes
    .filter(isPokemonTypeName)
    .slice()
    .sort()
    .join('|');
}

function getTypesFromCacheKey(typeCacheKey: string): PokemonTypeName[] {
  if (!typeCacheKey) {
    return [];
  }

  return typeCacheKey.split('|').filter(isPokemonTypeName);
}

export function usePokemonCatalog(selectedTypes: readonly string[]): UsePokemonCatalogResult {
  const [entries, setEntries] = useState<readonly PokemonCatalogEntry[]>(INITIAL_STATE);
  const [status, setStatus] = useState<AsyncStatus>('idle');
  const [typeStatus, setTypeStatus] = useState<AsyncStatus>('idle');
  const [typeRestrictedIds, setTypeRestrictedIds] = useState<ReadonlySet<number> | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const typeCacheKey = getTypeCacheKey(selectedTypes);

  useEffect(() => {
    const controller = new AbortController();

    async function loadCatalog(): Promise<void> {
      try {
        setErrorMessage(null);

        if (pokemonCatalogCache) {
          setEntries(pokemonCatalogCache);
          setStatus('success');
          return;
        }

        setStatus('loading');

        const catalog = await getPokemonCatalog(controller.signal);

        if (controller.signal.aborted) {
          return;
        }

        pokemonCatalogCache = catalog;

        setEntries(catalog);
        setStatus('success');
      } catch (error) {
        if (controller.signal.aborted) return;

        setErrorMessage(
          error instanceof Error
            ? error.message
            : 'Não foi possível carregar a Pokédex.',
        );

        setStatus('error');
      }
    }

    void loadCatalog();

    return () => controller.abort();
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    async function loadTypeFilter(): Promise<void> {
      try {
        setErrorMessage(null);

        const validTypes = getTypesFromCacheKey(typeCacheKey);

        if (validTypes.length === 0) {
          setTypeRestrictedIds(null);
          setTypeStatus('idle');
          return;
        }

        const cachedIds = pokemonTypeIdsCache.get(typeCacheKey);

        if (cachedIds) {
          setTypeRestrictedIds(cachedIds);
          setTypeStatus('success');
          return;
        }

        setTypeStatus('loading');

        const ids = await getPokemonIdsByTypes(validTypes, controller.signal);

        if (controller.signal.aborted) {
          return;
        }

        if (!ids) {
          setTypeRestrictedIds(null);
          setTypeStatus('idle');
          return;
        }

        pokemonTypeIdsCache.set(typeCacheKey, ids);

        setTypeRestrictedIds(ids);
        setTypeStatus('success');
      } catch (error) {
        if (controller.signal.aborted) return;

        setErrorMessage(
          error instanceof Error
            ? error.message
            : 'Não foi possível aplicar o filtro de tipo.',
        );

        setTypeRestrictedIds(null);
        setTypeStatus('error');
      }
    }

    void loadTypeFilter();

    return () => controller.abort();
  }, [typeCacheKey]);

  return {
    entries,
    status,
    typeStatus,
    typeRestrictedIds,
    errorMessage,
  };
}