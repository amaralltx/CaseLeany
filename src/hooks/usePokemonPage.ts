import { useEffect, useMemo, useState } from 'react';
import { getPokemonDetailsBatch } from '../services/pokeApi';
import type { AsyncStatus, PokemonCatalogEntry, PokemonListItem } from '../types/pokemon';

const PAGE_SIZE = 20;
const FIRST_PAGE = 1;

type UsePokemonPageResult = Readonly<{
  visibleEntries: readonly PokemonCatalogEntry[];
  visiblePokemon: readonly PokemonListItem[];
  status: AsyncStatus;
  errorMessage: string | null;
  page: number;
  hasMore: boolean;
  loadMore: () => void;
}>;

export function usePokemonPage(entries: readonly PokemonCatalogEntry[]): UsePokemonPageResult {
  const [page, setPage] = useState(FIRST_PAGE);
  const [visiblePokemon, setVisiblePokemon] = useState<readonly PokemonListItem[]>([]);
  const [status, setStatus] = useState<AsyncStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const visibleEntries = useMemo(() => entries.slice(0, page * PAGE_SIZE), [entries, page]);


  useEffect(() => {
    const controller = new AbortController();

    async function loadDetails(): Promise<void> {
      if (visibleEntries.length === 0) {
        setVisiblePokemon([]);
        setStatus('idle');
        return;
      }

      try {
        setStatus('loading');
        setErrorMessage(null);
        const details = await getPokemonDetailsBatch(
          visibleEntries.map((entry) => entry.id),
          controller.signal,
        );

        if (controller.signal.aborted) return;
        const orderedDetails = visibleEntries
          .map((entry) => details.find((detail) => detail.id === entry.id))
          .filter((pokemon): pokemon is PokemonListItem => pokemon !== undefined);

        setVisiblePokemon(orderedDetails);
        setStatus('success');
      } catch (error) {
        if (controller.signal.aborted) return;
        setStatus('error');
        setErrorMessage(error instanceof Error ? error.message : 'Não foi possível carregar os Pokémon.');
      }
    }

    void loadDetails();
    return () => controller.abort();
  }, [visibleEntries]);

  const hasMore = visibleEntries.length < entries.length;

  return {
    visibleEntries,
    visiblePokemon,
    status,
    errorMessage,
    page,
    hasMore,
    loadMore: () => setPage((currentPage) => currentPage + 1),
  };
}
