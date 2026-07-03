export type PokemonSortMode =
  | 'number-asc'
  | 'number-desc'
  | 'name-asc'
  | 'name-desc';

export type PokemonCatalogEntry = Readonly<{
  id: number;
  name: string;
  url: string;
}>;

export type PokemonTypeName =
  | 'normal'
  | 'fire'
  | 'water'
  | 'grass'
  | 'electric'
  | 'ice'
  | 'fighting'
  | 'poison'
  | 'ground'
  | 'flying'
  | 'psychic'
  | 'bug'
  | 'rock'
  | 'ghost'
  | 'dragon'
  | 'dark'
  | 'steel'
  | 'fairy';

export type PokemonType = Readonly<{
  name: PokemonTypeName;
  label: string;
}>;

export type PokemonListItem = Readonly<{
  id: number;
  name: string;
  sprite: string;
  types: PokemonType[];
}>;

export type FavoritePokemon = PokemonListItem;

export type PokemonRegionId =
  | 'kanto'
  | 'johto'
  | 'hoenn'
  | 'sinnoh'
  | 'unova'
  | 'kalos'
  | 'alola'
  | 'galar'
  | 'paldea';

export type PokemonRegion = Readonly<{
  id: PokemonRegionId;
  label: string;
  start: number;
  end: number;
}>;

export type AsyncStatus = 'idle' | 'loading' | 'success' | 'error';
