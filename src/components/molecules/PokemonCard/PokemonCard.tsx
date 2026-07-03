import type { CSSProperties } from 'react';
import { Heart } from 'lucide-react';
import { Badge } from '../../atoms/Badge/Badge';
import { IconButton } from '../../atoms/IconButton/IconButton';
import { useFavorites } from '../../../context/FavoritesContext';
import type { PokemonListItem } from '../../../types/pokemon';
import { formatPokemonName, formatPokemonNumber } from '../../../utils/pokemonIds';
import { TYPE_COLORS, TYPE_SOFT_COLORS } from '../../../utils/typeMeta';
import { getTypeIcon } from '../../../utils/typeIcons';
import './PokemonCard.css';
import { Link } from 'react-router-dom';

type PokemonCardProps = Readonly<{
  pokemon: PokemonListItem;
}>;

type PokemonCardStyle = CSSProperties & {
  '--pokemon-main-color': string;
  '--pokemon-soft-color': string;
  '--pokemon-type-icon-url': string;
};

export function PokemonCard({ pokemon }: PokemonCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites();

  const mainType = pokemon.types[0]?.name ?? 'normal';
  const isCurrentFavorite = isFavorite(pokemon.id);
  const mainTypeIcon = getTypeIcon(mainType);

  const cardStyle: PokemonCardStyle = {
    '--pokemon-main-color': TYPE_COLORS[mainType],
    '--pokemon-soft-color': TYPE_SOFT_COLORS[mainType],
    '--pokemon-type-icon-url': `url("${mainTypeIcon}")`,
  };

  return (
    <article className="pokemon-card" style={cardStyle} aria-label={formatPokemonName(pokemon.name)}>
      <Link
        className="pokemon-card__detail-link"
        to={`/pokemon/${pokemon.id}`}
        aria-label={`Ver detalhes de ${formatPokemonName(pokemon.name)}`}
      />
      <section className="pokemon-card__info" aria-labelledby={`pokemon-${pokemon.id}`}>
        <span className="pokemon-card__number">{formatPokemonNumber(pokemon.id)}</span>

        <h2 className="pokemon-card__name" id={`pokemon-${pokemon.id}`}>
          {formatPokemonName(pokemon.name)}
        </h2>

        <div className="pokemon-card__badges" aria-label="Tipos do Pokémon">
          {pokemon.types.map((type) => (
            <Badge key={`${pokemon.id}-${type.name}`} label={type.label} typeName={type.name} />
          ))}
        </div>
      </section>

      <section className="pokemon-card__visual" aria-label={`Imagem de ${formatPokemonName(pokemon.name)}`}>
        <div className="pokemon-card__aura" aria-hidden="true" />

        <img
          className="pokemon-card__image"
          src={pokemon.sprite}
          alt=""
          loading="lazy"
          width="108"
          height="108"
        />

        <div className="pokemon-card__favorite">
          <IconButton
            ariaLabel={isCurrentFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
            isActive={isCurrentFavorite}
            variant="floating"
            onClick={() => toggleFavorite(pokemon)}
          >
            <Heart size={17.5} fill={isCurrentFavorite ? 'currentColor' : 'none'} />
          </IconButton>
        </div>
      </section>
    </article>
  );
}