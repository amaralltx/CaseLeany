// src/utils/typeIcons.ts

import type { PokemonTypeName } from '../types/pokemon';

import bugIcon from '../assets/icons/pokemon-types/bug.svg?url';
import darkIcon from '../assets/icons/pokemon-types/dark.svg?url';
import dragonIcon from '../assets/icons/pokemon-types/dragon.svg?url';
import electricIcon from '../assets/icons/pokemon-types/electric.svg?url';
import fairyIcon from '../assets/icons/pokemon-types/fairy.svg?url';
import fightingIcon from '../assets/icons/pokemon-types/fighting.svg?url';
import fireIcon from '../assets/icons/pokemon-types/fire.svg?url';
import flyingIcon from '../assets/icons/pokemon-types/flying.svg?url';
import ghostIcon from '../assets/icons/pokemon-types/ghost.svg?url';
import grassIcon from '../assets/icons/pokemon-types/grass.svg?url';
import groundIcon from '../assets/icons/pokemon-types/ground.svg?url';
import iceIcon from '../assets/icons/pokemon-types/ice.svg?url';
import normalIcon from '../assets/icons/pokemon-types/normal.svg?url';
import poisonIcon from '../assets/icons/pokemon-types/poison.svg?url';
import psychicIcon from '../assets/icons/pokemon-types/psychic.svg?url';
import rockIcon from '../assets/icons/pokemon-types/rock.svg?url';
import steelIcon from '../assets/icons/pokemon-types/steel.svg?url';
import waterIcon from '../assets/icons/pokemon-types/water.svg?url';

export const TYPE_ICONS: Record<PokemonTypeName, string> = {
  bug: bugIcon,
  dark: darkIcon,
  dragon: dragonIcon,
  electric: electricIcon,
  fairy: fairyIcon,
  fighting: fightingIcon,
  fire: fireIcon,
  flying: flyingIcon,
  ghost: ghostIcon,
  grass: grassIcon,
  ground: groundIcon,
  ice: iceIcon,
  normal: normalIcon,
  poison: poisonIcon,
  psychic: psychicIcon,
  rock: rockIcon,
  steel: steelIcon,
  water: waterIcon,
};

export function getTypeIcon(typeName: PokemonTypeName): string {
  return TYPE_ICONS[typeName];
}