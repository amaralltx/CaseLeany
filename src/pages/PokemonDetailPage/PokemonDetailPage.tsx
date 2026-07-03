import type { CSSProperties } from 'react';
import { Fragment } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { ArrowDown, ArrowLeft, Heart } from 'lucide-react';
import { Badge } from '../../components/atoms/Badge/Badge';
import { WeaknessBadge } from '../../components/molecules/WeaknessBadge/WeaknessBadge';
import { useFavorites } from '../../context/FavoritesContext';
import { usePokemonDetail } from '../../hooks/usePokemonDetail';
import type { PokemonListItem } from '../../types/pokemon';
import { formatPokemonName, formatPokemonNumber } from '../../utils/pokemonIds';
import { TYPE_COLORS } from '../../utils/typeMeta';
import { getTypeIcon } from '../../utils/typeIcons';
import './PokemonDetailPage.css';

import weightIcon from '../../assets/icons/pokemon-detail/icon-weight.svg?url';
import heightIcon from '../../assets/icons/pokemon-detail/icon-height.svg?url';
import categoryIcon from '../../assets/icons/pokemon-detail/icon-category.svg?url';
import abilityIcon from '../../assets/icons/pokemon-detail/icon-ability.svg?url';
import maleIcon from '../../assets/icons/pokemon-detail/icon-male.svg?url';
import femaleIcon from '../../assets/icons/pokemon-detail/icon-female.svg?url';

type PokemonDetailPageStyle = CSSProperties & {
  '--pokemon-main-color': string;
  '--pokemon-type-icon-url': string;
};

type EvolutionTypeStyle = CSSProperties & {
  '--evolution-type-color': string;
  '--evolution-type-icon-url': string;
};

export function PokemonDetailPage() {
  const navigate = useNavigate();
  const { pokemonId } = useParams<{ pokemonId: string }>();

  const numericPokemonId = Number(pokemonId);
  const isValidPokemonId = Number.isInteger(numericPokemonId) && numericPokemonId > 0;

  const { pokemon, status, errorMessage } = usePokemonDetail(
    isValidPokemonId ? numericPokemonId : null,
  );

  const { isFavorite, toggleFavorite } = useFavorites();

  if (!isValidPokemonId) {
    return <Navigate to="/pokedex" replace />;
  }

  if (status === 'loading' || status === 'idle') {
    return (
      <section className="pokemon-detail-page pokemon-detail-page--feedback">
        Carregando Pokémon...
      </section>
    );
  }

  if (status === 'error' || !pokemon) {
    return (
      <section className="pokemon-detail-page pokemon-detail-page--feedback">
        {errorMessage ?? 'Não foi possível carregar este Pokémon.'}
      </section>
    );
  }

  const mainType = pokemon.types[0]?.name ?? 'normal';
  const isCurrentFavorite = isFavorite(pokemon.id);

  const pageStyle: PokemonDetailPageStyle = {
    '--pokemon-main-color': TYPE_COLORS[mainType],
    '--pokemon-type-icon-url': `url("${getTypeIcon(mainType)}")`,
  };

  const favoritePokemon: PokemonListItem = {
    id: pokemon.id,
    name: pokemon.name,
    sprite: pokemon.sprite,
    types: pokemon.types,
  };

  const maleWidth = pokemon.gender.malePercentage ?? 0;
  const femaleWidth = pokemon.gender.femalePercentage ?? 0;

  return (
    <section
      className="pokemon-detail-page"
      style={pageStyle}
      aria-labelledby="pokemon-detail-title"
    >
      <header className="pokemon-detail-hero">
        <button
          className="pokemon-detail-hero__action pokemon-detail-hero__action--back"
          type="button"
          onClick={() => navigate(-1)}
          aria-label="Voltar"
        >
          <ArrowLeft size={22} strokeWidth={2.5} aria-hidden="true" />
        </button>

        <button
          className={[
            'pokemon-detail-hero__action',
            'pokemon-detail-hero__action--favorite',
            isCurrentFavorite ? 'pokemon-detail-hero__action--active' : '',
          ]
            .filter(Boolean)
            .join(' ')}
          type="button"
          onClick={() => toggleFavorite(favoritePokemon)}
          aria-label={isCurrentFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
          aria-pressed={isCurrentFavorite}
        >
          <Heart
            size={23}
            fill={isCurrentFavorite ? 'currentColor' : 'none'}
            aria-hidden="true"
          />
        </button>

        <div className="pokemon-detail-hero__type-icon" aria-hidden="true" />

        <img
          className="pokemon-detail-hero__image"
          src={pokemon.showdownSprite}
          alt=""
          width="156"
          height="156"
        />
      </header>

      <div className="pokemon-detail-page__content">
        <h1 className="pokemon-detail-page__name" id="pokemon-detail-title">
          {formatPokemonName(pokemon.name)}
        </h1>

        <span className="pokemon-detail-page__number">
          {formatPokemonNumber(pokemon.id)}
        </span>

        <div className="pokemon-detail-page__badges" aria-label="Tipos do Pokémon">
          {pokemon.types.map((type) => (
            <Badge
              key={`${pokemon.id}-${type.name}`}
              label={type.label}
              typeName={type.name}
            />
          ))}
        </div>

        <p className="pokemon-detail-page__description">
          {pokemon.description}
        </p>

        <dl className="pokemon-detail-stats">
          <div className="pokemon-detail-stats__item">
            <dt className="pokemon-detail-stats__label">
              <img src={weightIcon} alt="" aria-hidden="true" />
              PESO
            </dt>
            <dd className="pokemon-detail-stats__value">{pokemon.weight}</dd>
          </div>

          <div className="pokemon-detail-stats__item">
            <dt className="pokemon-detail-stats__label">
              <img src={heightIcon} alt="" aria-hidden="true" />
              ALTURA
            </dt>
            <dd className="pokemon-detail-stats__value">{pokemon.height}</dd>
          </div>

          <div className="pokemon-detail-stats__item">
            <dt className="pokemon-detail-stats__label">
              <img src={categoryIcon} alt="" aria-hidden="true" />
              CATEGORIA
            </dt>
            <dd className="pokemon-detail-stats__value">{pokemon.category}</dd>
          </div>

          <div className="pokemon-detail-stats__item">
            <dt className="pokemon-detail-stats__label">
              <img src={abilityIcon} alt="" aria-hidden="true" />
              HABILIDADE
            </dt>
            <dd className="pokemon-detail-stats__value">{pokemon.ability}</dd>
          </div>
        </dl>

        <section className="pokemon-detail-section" aria-labelledby="pokemon-gender-title">
          <h2 className="pokemon-detail-section__subtitle" id="pokemon-gender-title">
            GÊNERO
          </h2>

          {pokemon.gender.malePercentage === null || pokemon.gender.femalePercentage === null ? (
            <p className="pokemon-detail-section__empty">Sem gênero</p>
          ) : (
            <>
              <div className="pokemon-detail-gender__bar" aria-hidden="true">
                <span
                  className="pokemon-detail-gender__bar-male"
                  style={{ width: `${maleWidth}%` }}
                />
                <span
                  className="pokemon-detail-gender__bar-female"
                  style={{ width: `${femaleWidth}%` }}
                />
              </div>

              <div className="pokemon-detail-gender__legend">
                <span className="pokemon-detail-gender__legend-item">
                  <img src={maleIcon} alt="" aria-hidden="true" />
                  {maleWidth.toLocaleString('pt-BR', { maximumFractionDigits: 1 })}%
                </span>

                <span className="pokemon-detail-gender__legend-item pokemon-detail-gender__legend-item--female">
                  <img src={femaleIcon} alt="" aria-hidden="true" />
                  {femaleWidth.toLocaleString('pt-BR', { maximumFractionDigits: 1 })}%
                </span>
              </div>
            </>
          )}
        </section>

        <section className="pokemon-detail-section" aria-labelledby="pokemon-weaknesses-title">
          <h2 className="pokemon-detail-section__title" id="pokemon-weaknesses-title">
            Fraquezas
          </h2>

          <div className="pokemon-detail-weaknesses">
            {pokemon.weaknesses.map((type) => (
              <WeaknessBadge
                key={`weakness-${type.name}`}
                label={type.label}
                typeName={type.name}
              />
            ))}
          </div>
        </section>

        <section className="pokemon-detail-section" aria-labelledby="pokemon-evolutions-title">
          <h2 className="pokemon-detail-section__title" id="pokemon-evolutions-title">
            Evoluções
          </h2>

          <div className="pokemon-detail-evolutions">
            {pokemon.evolutions.map((stage, index) => {
              const stageMainType = stage.types[0]?.name ?? 'normal';

              return (
                <Fragment key={stage.id}>
                  {index > 0 ? (
                    <div className="pokemon-detail-evolutions__step">
                      <ArrowDown size={28} strokeWidth={3} aria-hidden="true" />
                      <span>{stage.evolutionLabel ?? 'Evolui'}</span>
                    </div>
                  ) : null}

                  <article className="pokemon-evolution-card">
                    <div
                      className="pokemon-evolution-card__visual"
                      style={
                        {
                          '--pokemon-evolution-main-color': TYPE_COLORS[stageMainType],
                          '--pokemon-evolution-main-icon-url': `url("${getTypeIcon(stageMainType)}")`,
                        } as CSSProperties
                      }
                    >
                      <span className="pokemon-evolution-card__visual-icon" aria-hidden="true" />
                      <img
                        className="pokemon-evolution-card__image"
                        src={stage.sprite}
                        alt=""
                        width="84"
                        height="84"
                      />
                    </div>

                    <div className="pokemon-evolution-card__content">
                      <strong className="pokemon-evolution-card__name">
                        {formatPokemonName(stage.name)}
                      </strong>

                      <span className="pokemon-evolution-card__number">
                        {formatPokemonNumber(stage.id)}
                      </span>

                      <div className="pokemon-evolution-card__types" aria-label="Tipos da evolução">
                        {stage.types.slice(0, 2).map((type) => (
                          <span
                            key={`${stage.id}-${type.name}`}
                            className="pokemon-evolution-card__type"
                            style={
                              {
                                '--evolution-type-color': TYPE_COLORS[type.name],
                                '--evolution-type-icon-url': `url("${getTypeIcon(type.name)}")`,
                              } as EvolutionTypeStyle
                            }
                          />
                        ))}
                      </div>
                    </div>
                  </article>
                </Fragment>
              );
            })}
          </div>
        </section>
      </div>
    </section>
  );
}