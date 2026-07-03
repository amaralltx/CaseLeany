import { usePokemonPage } from '../../../hooks/usePokemonPage';
import type { PokemonCatalogEntry } from '../../../types/pokemon';
import { PokemonCard } from '../../molecules/PokemonCard/PokemonCard';
import './PokemonList.css';

type PokemonListProps = Readonly<{
  entries: readonly PokemonCatalogEntry[];
  isCatalogLoading: boolean;
  isTypeFilterLoading: boolean;
  errorMessage: string | null;
}>;

function LoadingSkeleton() {
  return (
    <div className="pokemon-list__grid" aria-label="Carregando Pokémon">
      {Array.from({ length: 8 }, (_, index) => (
        <div className="pokemon-list__skeleton" key={index}>
          <span className="pokemon-list__skeleton-line pokemon-list__skeleton-line--small" />
          <span className="pokemon-list__skeleton-line pokemon-list__skeleton-line--large" />
          <span className="pokemon-list__skeleton-pill" />
          <span className="pokemon-list__skeleton-image" />
        </div>
      ))}
    </div>
  );
}

export function PokemonList({ entries, isCatalogLoading, isTypeFilterLoading, errorMessage }: PokemonListProps) {
  const pokemonPage = usePokemonPage(entries);
  const isLoading = isCatalogLoading || isTypeFilterLoading || pokemonPage.status === 'loading';
  const mergedError = errorMessage ?? pokemonPage.errorMessage;

  if (mergedError) {
    return (
      <section className="pokemon-list__state" role="status">
        <strong>Ops, algo saiu do caminho.</strong>
        <span>{mergedError}</span>
      </section>
    );
  }

  if (isCatalogLoading && entries.length === 0) {
    return <LoadingSkeleton />;
  }

  if (!isLoading && pokemonPage.visiblePokemon.length === 0) {
    return (
      <section className="pokemon-list__state" role="status">
        <strong>Nenhum Pokémon encontrado.</strong>
        <span>Tente ajustar a busca, o tipo ou a região selecionada.</span>
      </section>
    );
  }

  return (
    <section className="pokemon-list" aria-live="polite">
      <div className="pokemon-list__grid">
        {pokemonPage.visiblePokemon.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>

      {isLoading ? <LoadingSkeleton /> : null}

      {pokemonPage.hasMore ? (
        <button className="pokemon-list__load-more" type="button" onClick={pokemonPage.loadMore} disabled={isLoading}>
          Carregar mais
        </button>
      ) : null}
    </section>
  );
}
