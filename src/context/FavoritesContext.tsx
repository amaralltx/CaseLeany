import { createContext, type ReactNode, useContext, useEffect, useMemo, useReducer } from 'react';
import type { FavoritePokemon } from '../types/pokemon';
import { readFavoritesFromStorage, writeFavoritesToStorage } from '../utils/favoriteStorage';

type FavoritesState = Readonly<{
  items: FavoritePokemon[];
}>;

type FavoritesAction =
  | Readonly<{ type: 'toggle'; payload: FavoritePokemon }>
  | Readonly<{ type: 'remove'; payload: { id: number } }>
  | Readonly<{ type: 'clear' }>;

type FavoritesContextValue = Readonly<{
  favorites: readonly FavoritePokemon[];
  favoritesCount: number;
  isFavorite: (id: number) => boolean;
  toggleFavorite: (pokemon: FavoritePokemon) => void;
  removeFavorite: (id: number) => void;
  clearFavorites: () => void;
}>;

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

function favoritesReducer(state: FavoritesState, action: FavoritesAction): FavoritesState {
  switch (action.type) {
    case 'toggle': {
      const alreadyFavorite = state.items.some((item) => item.id === action.payload.id);
      return {
        items: alreadyFavorite
          ? state.items.filter((item) => item.id !== action.payload.id)
          : [...state.items, action.payload].sort((first, second) => first.id - second.id),
      };
    }
    case 'remove':
      return { items: state.items.filter((item) => item.id !== action.payload.id) };
    case 'clear':
      return { items: [] };
    default:
      return state;
  }
}

export function FavoritesProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [state, dispatch] = useReducer(favoritesReducer, undefined, () => ({ items: readFavoritesFromStorage() }));

  useEffect(() => {
    writeFavoritesToStorage(state.items);
  }, [state.items]);

  const value = useMemo<FavoritesContextValue>(() => {
    return {
      favorites: state.items,
      favoritesCount: state.items.length,
      isFavorite: (id) => state.items.some((item) => item.id === id),
      toggleFavorite: (pokemon) => dispatch({ type: 'toggle', payload: pokemon }),
      removeFavorite: (id) => dispatch({ type: 'remove', payload: { id } }),
      clearFavorites: () => dispatch({ type: 'clear' }),
    };
  }, [state.items]);

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites(): FavoritesContextValue {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error('useFavorites precisa ser usado dentro de FavoritesProvider.');
  }

  return context;
}
