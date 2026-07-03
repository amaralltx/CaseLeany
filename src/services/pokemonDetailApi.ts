import type { PokemonDetail, PokemonEvolutionStage } from '../types/pokemonDetail';
import type { PokemonTypeName } from '../types/pokemon';
import { getTypeLabel, isPokemonTypeName } from '../utils/typeMeta';

const POKEAPI_BASE_URL = 'https://pokeapi.co/api/v2';
const DEFAULT_SPRITE_BASE_URL =
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon';
const SHOWDOWN_SPRITE_BASE_URL =
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown';
const GENERATION_VIII_ICON_BASE_URL =
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-viii/icons';

const PREFERRED_DESCRIPTION_LANGUAGES = ['pt-br', 'pt', 'en'] as const;

type PokeApiPokemonResponse = Readonly<{
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string | null;
    other?: {
      showdown?: {
        front_default?: string | null;
      };
    };
  };
  types: readonly {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }[];
  abilities: readonly {
    slot: number;
    is_hidden: boolean;
    ability: {
      name: string;
    };
  }[];
}>;

type PokeApiSpeciesResponse = Readonly<{
  gender_rate: number;
  flavor_text_entries: readonly {
    flavor_text: string;
    language: {
      name: string;
    };
  }[];
  genera: readonly {
    genus: string;
    language: {
      name: string;
    };
  }[];
  evolution_chain: {
    url: string;
  };
}>;

type PokeApiTypeResponse = Readonly<{
  damage_relations: {
    double_damage_from: readonly { name: string }[];
    half_damage_from: readonly { name: string }[];
    no_damage_from: readonly { name: string }[];
  };
}>;

type EvolutionDetail = Readonly<{
  min_level: number | null;
  trigger: {
    name: string;
  };
  item?: {
    name: string;
  } | null;
}>;

type EvolutionChainNode = Readonly<{
  species: {
    name: string;
    url: string;
  };
  evolves_to: readonly EvolutionChainNode[];
  evolution_details: readonly EvolutionDetail[];
}>;

type PokeApiEvolutionChainResponse = Readonly<{
  chain: EvolutionChainNode;
}>;

async function fetchJson<TResponse>(
  url: string,
  signal?: AbortSignal,
): Promise<TResponse> {
  const response = await fetch(url, {
    signal: signal ?? null,
  });

  if (!response.ok) {
    throw new Error('Não foi possível carregar os dados do Pokémon.');
  }

  return response.json() as Promise<TResponse>;
}

function getDefaultSpriteUrl(pokemonId: number): string {
  return `${DEFAULT_SPRITE_BASE_URL}/${pokemonId}.png`;
}

function getShowdownSpriteUrl(pokemonId: number): string {
  return `${SHOWDOWN_SPRITE_BASE_URL}/${pokemonId}.gif`;
}

function getGenerationViiiIconUrl(pokemonId: number): string {
  return `${GENERATION_VIII_ICON_BASE_URL}/${pokemonId}.png`;
}

function normalizeDescription(description: string): string {
  return description.replace(/\f/g, ' ').replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();
}

function getDescription(species: PokeApiSpeciesResponse): string {
  const preferredEntry = PREFERRED_DESCRIPTION_LANGUAGES
    .map((languageName) =>
      species.flavor_text_entries.find((entry) => entry.language.name === languageName),
    )
    .find((entry) => entry !== undefined);

  return preferredEntry
    ? normalizeDescription(preferredEntry.flavor_text)
    : 'Descrição não disponível para este Pokémon.';
}

function getCategory(species: PokeApiSpeciesResponse): string {
  const preferredGenus = PREFERRED_DESCRIPTION_LANGUAGES
    .map((languageName) =>
      species.genera.find((genus) => genus.language.name === languageName),
    )
    .find((genus) => genus !== undefined);

  return preferredGenus?.genus.replace(' Pokémon', '') ?? 'Pokémon';
}

function formatAbilityName(abilityName: string): string {
  return abilityName
    .split('-')
    .map((word) => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
    .join(' ');
}

function getPrimaryAbility(pokemon: PokeApiPokemonResponse): string {
  const ability = pokemon.abilities.find((item) => !item.is_hidden) ?? pokemon.abilities[0];

  return ability ? formatAbilityName(ability.ability.name) : 'Não informada';
}

function formatWeight(weightInHectograms: number): string {
  const weightInKg = weightInHectograms / 10;

  return `${new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(weightInKg)} kg`;
}

function formatHeight(heightInDecimeters: number): string {
  const heightInMeters = heightInDecimeters / 10;

  return `${new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(heightInMeters)} m`;
}

function getPokemonTypes(pokemon: PokeApiPokemonResponse): PokemonDetail['types'] {
  const types = pokemon.types
    .slice()
    .sort((firstType, secondType) => firstType.slot - secondType.slot)
    .map(({ type }) => {
      if (!isPokemonTypeName(type.name)) {
        return null;
      }

      return {
        name: type.name,
        label: getTypeLabel(type.name),
      };
    })
    .filter((type): type is { name: PokemonTypeName; label: string } => type !== null);

  return types.length > 0
    ? types
    : [{ name: 'normal', label: getTypeLabel('normal') }];
}

function getGenderDistribution(genderRate: number): PokemonDetail['gender'] {
  if (genderRate < 0) {
    return {
      malePercentage: null,
      femalePercentage: null,
    };
  }

  const femalePercentage = genderRate * 12.5;
  const malePercentage = 100 - femalePercentage;

  return {
    malePercentage,
    femalePercentage,
  };
}

function getWeaknesses(
  pokemonTypes: PokemonDetail['types'],
  typeResponses: readonly PokeApiTypeResponse[],
): PokemonDetail['weaknesses'] {
  const multipliers = new Map<PokemonTypeName, number>();

  pokemonTypes.forEach(() => {
    // noop
  });

  const allKnownTypes: PokemonTypeName[] = [
    'bug',
    'dark',
    'dragon',
    'electric',
    'fairy',
    'fighting',
    'fire',
    'flying',
    'ghost',
    'grass',
    'ground',
    'ice',
    'normal',
    'poison',
    'psychic',
    'rock',
    'steel',
    'water',
  ];

  allKnownTypes.forEach((typeName) => {
    multipliers.set(typeName, 1);
  });

  typeResponses.forEach((typeResponse) => {
    typeResponse.damage_relations.double_damage_from.forEach((type) => {
      if (isPokemonTypeName(type.name)) {
        multipliers.set(type.name, (multipliers.get(type.name) ?? 1) * 2);
      }
    });

    typeResponse.damage_relations.half_damage_from.forEach((type) => {
      if (isPokemonTypeName(type.name)) {
        multipliers.set(type.name, (multipliers.get(type.name) ?? 1) * 0.5);
      }
    });

    typeResponse.damage_relations.no_damage_from.forEach((type) => {
      if (isPokemonTypeName(type.name)) {
        multipliers.set(type.name, 0);
      }
    });
  });

  return Array.from(multipliers.entries())
    .filter(([, multiplier]) => multiplier > 1)
    .sort((firstEntry, secondEntry) => secondEntry[1] - firstEntry[1])
    .map(([typeName]) => ({
      name: typeName,
      label: getTypeLabel(typeName),
    }));
}

function extractIdFromResourceUrl(resourceUrl: string): number {
  const matches = resourceUrl.match(/\/(\d+)\/?$/);

  return matches ? Number(matches[1]) : 0;
}

function containsPokemonInEvolutionBranch(node: EvolutionChainNode, targetName: string): boolean {
  if (node.species.name === targetName) {
    return true;
  }

  return node.evolves_to.some((childNode) => containsPokemonInEvolutionBranch(childNode, targetName));
}

function flattenEvolutionLine(
  node: EvolutionChainNode,
  targetName: string,
): EvolutionChainNode[] {
  const firstChild = node.evolves_to[0];

  if (!firstChild) {
    return [node];
  }

  const childContainingTarget = node.evolves_to.find((childNode) =>
    containsPokemonInEvolutionBranch(childNode, targetName),
  );

  const nextNode = childContainingTarget ?? firstChild;

  return [node, ...flattenEvolutionLine(nextNode, targetName)];
}

function getEvolutionLabel(details: readonly EvolutionDetail[]): string | null {
  const detail = details[0];

  if (!detail) {
    return null;
  }

  if (detail.min_level !== null) {
    return `Nível ${detail.min_level}`;
  }

  if (detail.item?.name) {
    return detail.item.name
      .split('-')
      .map((word) => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
      .join(' ');
  }

  return 'Evolui';
}

async function getEvolutionStages(
  evolutionChainUrl: string,
  targetPokemonName: string,
  signal?: AbortSignal,
): Promise<readonly PokemonEvolutionStage[]> {
  const evolutionChain = await fetchJson<PokeApiEvolutionChainResponse>(
    evolutionChainUrl,
    signal,
  );

  const line = flattenEvolutionLine(evolutionChain.chain, targetPokemonName);

  const stages = await Promise.all(
    line.map(async (node, index) => {
      const pokemonResponse = await fetchJson<PokeApiPokemonResponse>(
        `${POKEAPI_BASE_URL}/pokemon/${node.species.name}`,
        signal,
      );

      return {
        id: pokemonResponse.id,
        name: pokemonResponse.name,
        sprite: getGenerationViiiIconUrl(pokemonResponse.id),
        types: getPokemonTypes(pokemonResponse),
        evolutionLabel:
          index === 0 ? null : getEvolutionLabel(node.evolution_details),
      };
    }),
  );

  return stages;
}

export async function getPokemonDetail(
  pokemonId: number,
  signal?: AbortSignal,
): Promise<PokemonDetail> {
  const pokemon = await fetchJson<PokeApiPokemonResponse>(
    `${POKEAPI_BASE_URL}/pokemon/${pokemonId}`,
    signal,
  );

  const species = await fetchJson<PokeApiSpeciesResponse>(
    `${POKEAPI_BASE_URL}/pokemon-species/${pokemonId}`,
    signal,
  );

  const pokemonTypes = getPokemonTypes(pokemon);

  const typeResponses = await Promise.all(
    pokemon.types.map(({ type }) => fetchJson<PokeApiTypeResponse>(type.url, signal)),
  );

  const evolutions = await getEvolutionStages(
    species.evolution_chain.url,
    pokemon.name,
    signal,
  );

  return {
    id: pokemon.id,
    name: pokemon.name,
    sprite: pokemon.sprites.front_default ?? getDefaultSpriteUrl(pokemon.id),
    showdownSprite:
      pokemon.sprites.other?.showdown?.front_default ?? getShowdownSpriteUrl(pokemon.id),
    types: pokemonTypes,
    description: getDescription(species),
    weight: formatWeight(pokemon.weight),
    height: formatHeight(pokemon.height),
    category: getCategory(species),
    ability: getPrimaryAbility(pokemon),
    gender: getGenderDistribution(species.gender_rate),
    weaknesses: getWeaknesses(pokemonTypes, typeResponses),
    evolutions,
  };
}