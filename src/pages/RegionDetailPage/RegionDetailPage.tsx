import { useMemo, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { SearchInput } from '../../components/atoms/SearchInput/SearchInput';
import { PokedexControls } from '../../components/organisms/PokedexControls/PokedexControls';
import { PokemonList } from '../../components/organisms/PokemonList/PokemonList';
import { usePokemonCatalog } from '../../hooks/usePokemonCatalog';
import type { PokemonSortMode } from '../../types/pokemon';
import { applyPokemonFilters } from '../../utils/filterPokemon';
import { getRegionCardById } from '../../utils/regionCards';
import './RegionDetailPage.css';

export function RegionDetailPage() {
  const navigate = useNavigate();
  const { regionId } = useParams<{ regionId: string }>();

  const [searchTerm, setSearchTerm] = useState('');
  const [sortMode, setSortMode] = useState<PokemonSortMode>('number-asc');
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const region = regionId ? getRegionCardById(regionId) : undefined;
  const catalog = usePokemonCatalog(selectedTypes);

  const filteredEntries = useMemo(() => {
    if (!region) return [];

    return applyPokemonFilters({
      entries: catalog.entries,
      searchTerm,
      sortMode,
      selectedRegions: [region.id],
      typeRestrictedIds: catalog.typeRestrictedIds,
    });
  }, [
    catalog.entries,
    catalog.typeRestrictedIds,
    region,
    searchTerm,
    sortMode,
  ]);

  const listKey = [
    region?.id ?? 'unknown-region',
    searchTerm,
    sortMode,
    selectedTypes.join(','),
  ].join('|');

  if (!region) {
    return <Navigate to="/regions" replace />;
  }

  return (
    <section className="region-detail-page" aria-labelledby="region-detail-title">
      <header className="region-detail-page__header">
        <div className="region-detail-page__top">
          <button
            className="region-detail-page__back-button"
            type="button"
            onClick={() => navigate('/regions')}
            aria-label="Voltar para regiões"
          >
            <ArrowLeft size={22} strokeWidth={2.4} aria-hidden="true" />
          </button>

          <h1 className="region-detail-page__title" id="region-detail-title">
            {region.name}
          </h1>
        </div>

        <SearchInput value={searchTerm} onChange={setSearchTerm} />
      </header>

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