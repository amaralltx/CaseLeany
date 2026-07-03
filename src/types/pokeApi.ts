import type { PokemonTypeName } from './pokemon';

export type NamedApiResource = Readonly<{
  name: string;
  url: string;
}>;

export type ApiListResponse<TResource extends NamedApiResource> = Readonly<{
  count: number;
  next: string | null;
  previous: string | null;
  results: TResource[];
}>;

export type PokeApiPokemonDetail = Readonly<{
  id: number;
  name: string;
  sprites: Readonly<{
    front_default: string | null;
  }>;
  types: ReadonlyArray<{
    slot: number;
    type: Readonly<{
      name: PokemonTypeName;
      url: string;
    }>;
  }>;
}>;

export type PokeApiTypeResponse = Readonly<{
  id: number;
  name: PokemonTypeName;
  pokemon: ReadonlyArray<{
    slot: number;
    pokemon: NamedApiResource;
  }>;
}>;
