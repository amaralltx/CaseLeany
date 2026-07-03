import magikarpJumpPattern from '../../../assets/images/Magikarp_Jump_Pattern.png';
import { useFavorites } from '../../../context/FavoritesContext';
import { PokemonCard } from '../../molecules/PokemonCard/PokemonCard';
import './FavoritesView.css';

export function FavoritesView() {
  const { favorites, favoritesCount } = useFavorites();

  return (
    <section className="favorites-view" aria-labelledby="favorites-title">
      {favoritesCount === 0 ? (
        <div className="favorites-view__empty" role="status">
          <img
            className="favorites-view__empty-image"
            src={magikarpJumpPattern}
            alt=""
            aria-hidden="true"
          />

          <strong>Você não favoritou nenhum Pokémon :(</strong>

          <p>
            Clique no ícone de coração dos seus pokémons favoritos e eles
            aparecerão aqui.
          </p>

        </div>
      ) : (
        <div className="favorites-view__grid">
          {favorites.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))}
        </div>
      )}
    </section>
  );
}