import { useEffect, useState } from 'react';
import { getPokemonCatalog, getPokemonIdsByTypes } from '../services/pokeApi';
import type { AsyncStatus, PokemonCatalogEntry, PokemonTypeName } from '../types/pokemon';
import { isPokemonTypeName } from '../utils/typeMeta';

const INITIAL_STATE: readonly PokemonCatalogEntry[] = [];

type UsePokemonCatalogResult = Readonly<{
  entries: readonly PokemonCatalogEntry[];
  status: AsyncStatus;
  typeStatus: AsyncStatus;
  typeRestrictedIds: ReadonlySet<number> | null;
  errorMessage: string | null;
}>;

export function usePokemonCatalog(selectedTypes: readonly string[]): UsePokemonCatalogResult {
  const [entries, setEntries] = useState<readonly PokemonCatalogEntry[]>(INITIAL_STATE);
  const [status, setStatus] = useState<AsyncStatus>('idle');
  const [typeStatus, setTypeStatus] = useState<AsyncStatus>('idle');
  const [typeRestrictedIds, setTypeRestrictedIds] = useState<ReadonlySet<number> | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadCatalog(): Promise<void> {
      try {
        setStatus('loading');
        setErrorMessage(null);
        const catalog = await getPokemonCatalog(controller.signal);
        setEntries(catalog);
        setStatus('success');
      } catch (error) {
        if (controller.signal.aborted) return;
        setErrorMessage(error instanceof Error ? error.message : 'Não foi possível carregar a Pokédex.');
        setStatus('error');
      }
    }

    void loadCatalog();
    return () => controller.abort();
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const validTypes: PokemonTypeName[] = selectedTypes.filter(isPokemonTypeName);

    async function loadTypeFilter(): Promise<void> {
      try {
        setTypeStatus(validTypes.length === 0 ? 'idle' : 'loading');
        setErrorMessage(null);
        const ids = await getPokemonIdsByTypes(validTypes, controller.signal);
        if (controller.signal.aborted) return;
        setTypeRestrictedIds(ids);
        setTypeStatus(validTypes.length === 0 ? 'idle' : 'success');
      } catch (error) {
        if (controller.signal.aborted) return;
        setErrorMessage(error instanceof Error ? error.message : 'Não foi possível aplicar o filtro de tipo.');
        setTypeRestrictedIds(null);
        setTypeStatus('error');
      }
    }

    void loadTypeFilter();
    return () => controller.abort();
  }, [selectedTypes]);

  return { entries, status, typeStatus, typeRestrictedIds, errorMessage };
}
