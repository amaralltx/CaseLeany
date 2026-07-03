import { useMemo, useState } from 'react';
import { DynamicHeader } from '../../components/organisms/DynamicHeader/DynamicHeader';
import { PokedexControls } from '../../components/organisms/PokedexControls/PokedexControls';
import { PokemonList } from '../../components/organisms/PokemonList/PokemonList';
import { usePokemonCatalog } from '../../hooks/usePokemonCatalog';
import type { PokemonSortMode } from '../../types/pokemon';
import { applyPokemonFilters } from '../../utils/filterPokemon';
import './PokedexPage.css';

export function PokedexPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortMode, setSortMode] = useState<PokemonSortMode>('number-asc');
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const catalog = usePokemonCatalog(selectedTypes);

  const filteredEntries = useMemo(() => {
    return applyPokemonFilters({
      entries: catalog.entries,
      searchTerm,
      sortMode,
      selectedRegions: [],
      typeRestrictedIds: catalog.typeRestrictedIds,
    });
  }, [
    catalog.entries,
    catalog.typeRestrictedIds,
    searchTerm,
    sortMode,
  ]);

  const listKey = [
    searchTerm,
    sortMode,
    selectedTypes.join(','),
  ].join('|');

  return (
    <section className="pokedex-page" aria-label="Pokédex">
      <DynamicHeader searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      <PokedexControls
        selectedTypes={selectedTypes}
        sortMode={sortMode}
        onSelectedTypesChange={setSelectedTypes}
        onSortChange={setSortMode}
      />

      <PokemonList
        key={listKey}
        entries={filteredEntries}
        isCatalogLoading={catalog.status === 'loading'}
        isTypeFilterLoading={catalog.typeStatus === 'loading'}
        errorMessage={catalog.errorMessage}
      />
    </section>
  );
}