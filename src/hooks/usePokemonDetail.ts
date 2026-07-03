import { useEffect, useState } from 'react';
import type { PokemonDetail } from '../types/pokemonDetail';
import { getPokemonDetail } from '../services/pokemonDetailApi';

type PokemonDetailStatus = 'idle' | 'loading' | 'success' | 'error';

type PokemonDetailState = Readonly<{
  status: PokemonDetailStatus;
  pokemon: PokemonDetail | null;
  errorMessage: string | null;
}>;

export function usePokemonDetail(pokemonId: number | null): PokemonDetailState {
  const [state, setState] = useState<PokemonDetailState>({
    status: 'idle',
    pokemon: null,
    errorMessage: null,
  });

  useEffect(() => {
    if (!pokemonId) {
      return;
    }

    const controller = new AbortController();

    setState({
      status: 'loading',
      pokemon: null,
      errorMessage: null,
    });

    getPokemonDetail(pokemonId, controller.signal)
      .then((pokemon) => {
        setState({
          status: 'success',
          pokemon,
          errorMessage: null,
        });
      })
      .catch((error: unknown) => {
        if (controller.signal.aborted) {
          return;
        }

        setState({
          status: 'error',
          pokemon: null,
          errorMessage:
            error instanceof Error
              ? error.message
              : 'Não foi possível carregar este Pokémon.',
        });
      });

    return () => controller.abort();
  }, [pokemonId]);

  return state;
}