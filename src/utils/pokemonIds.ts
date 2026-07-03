const POKEMON_URL_ID_PATTERN = /\/pokemon\/(\d+)\/?$/;

export function extractPokemonIdFromUrl(url: string): number | null {
  const match = url.match(POKEMON_URL_ID_PATTERN);
  if (!match?.[1]) return null;

  const numericId = Number.parseInt(match[1], 10);
  return Number.isFinite(numericId) ? numericId : null;
}

export function formatPokemonNumber(id: number): string {
  return `Nº${id.toString().padStart(3, '0')}`;
}

export function formatPokemonName(rawName: string): string {
  const [firstNamePart = rawName] = rawName.split('-');
  return firstNamePart.charAt(0).toUpperCase() + firstNamePart.slice(1);
}
