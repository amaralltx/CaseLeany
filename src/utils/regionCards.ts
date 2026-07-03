// src/utils/regionCards.ts

import kantoBg from '../assets/images/regions-bg/kanto.png';
import johtoBg from '../assets/images/regions-bg/johto.png';
import hoennBg from '../assets/images/regions-bg/hoenn.jpg';
import sinnohBg from '../assets/images/regions-bg/sinnoh.jpg';
import unovaBg from '../assets/images/regions-bg/unova.jpg';
import kalosBg from '../assets/images/regions-bg/kalos.jpg';
import alolaBg from '../assets/images/regions-bg/alola.png';
import galarBg from '../assets/images/regions-bg/galar.jpg';

const GENERATION_VIII_ICON_BASE_URL =
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-viii/icons';

export type RegionId =
  | 'kanto'
  | 'johto'
  | 'hoenn'
  | 'sinnoh'
  | 'unova'
  | 'kalos'
  | 'alola'
  | 'galar';

type RegionStarter = Readonly<{
  id: number;
  name: string;
}>;

export type RegionCardData = Readonly<{
  id: RegionId;
  name: string;
  generation: string;
  backgroundImage: string;
  starters: readonly RegionStarter[];
}>;

export function getGenerationViiiIconUrl(pokemonId: number): string {
  return `${GENERATION_VIII_ICON_BASE_URL}/${pokemonId}.png`;
}

export const REGION_CARDS: readonly RegionCardData[] = [
  {
    id: 'kanto',
    name: 'Kanto',
    generation: '1ª GERAÇÃO',
    backgroundImage: kantoBg,
    starters: [
      { id: 1, name: 'Bulbasaur' },
      { id: 4, name: 'Charmander' },
      { id: 7, name: 'Squirtle' },
    ],
  },
  {
    id: 'johto',
    name: 'Johto',
    generation: '2ª GERAÇÃO',
    backgroundImage: johtoBg,
    starters: [
      { id: 152, name: 'Chikorita' },
      { id: 155, name: 'Cyndaquil' },
      { id: 158, name: 'Totodile' },
    ],
  },
  {
    id: 'hoenn',
    name: 'Hoenn',
    generation: '3ª GERAÇÃO',
    backgroundImage: hoennBg,
    starters: [
      { id: 252, name: 'Treecko' },
      { id: 255, name: 'Torchic' },
      { id: 258, name: 'Mudkip' },
    ],
  },
  {
    id: 'sinnoh',
    name: 'Sinnoh',
    generation: '4ª GERAÇÃO',
    backgroundImage: sinnohBg,
    starters: [
      { id: 387, name: 'Turtwig' },
      { id: 390, name: 'Chimchar' },
      { id: 393, name: 'Piplup' },
    ],
  },
  {
    id: 'unova',
    name: 'Unova',
    generation: '5ª GERAÇÃO',
    backgroundImage: unovaBg,
    starters: [
      { id: 495, name: 'Snivy' },
      { id: 498, name: 'Tepig' },
      { id: 501, name: 'Oshawott' },
    ],
  },
  {
    id: 'kalos',
    name: 'Kalos',
    generation: '6ª GERAÇÃO',
    backgroundImage: kalosBg,
    starters: [
      { id: 650, name: 'Chespin' },
      { id: 653, name: 'Fennekin' },
      { id: 656, name: 'Froakie' },
    ],
  },
  {
    id: 'alola',
    name: 'Alola',
    generation: '7ª GERAÇÃO',
    backgroundImage: alolaBg,
    starters: [
      { id: 722, name: 'Rowlet' },
      { id: 725, name: 'Litten' },
      { id: 728, name: 'Popplio' },
    ],
  },
  {
    id: 'galar',
    name: 'Galar',
    generation: '8ª GERAÇÃO',
    backgroundImage: galarBg,
    starters: [
      { id: 810, name: 'Grookey' },
      { id: 813, name: 'Scorbunny' },
      { id: 816, name: 'Sobble' },
    ],
  },
] as const;

export function getRegionCardById(regionId: string): RegionCardData | undefined {
  return REGION_CARDS.find((region) => region.id === regionId);
}