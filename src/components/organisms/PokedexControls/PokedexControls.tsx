import { useState } from 'react';
import { SheetButton } from '../../atoms/SheetButton/SheetButton';
import { FilterSheet } from '../../molecules/FilterSheet/FilterSheet';
import { SortSheet, getSortLabel } from '../../molecules/SortSheet/SortSheet';
import type { PokemonSortMode } from '../../../types/pokemon';
import { POKEMON_TYPES } from '../../../utils/typeMeta';
import './PokedexControls.css';

type PokedexControlsProps = Readonly<{
  selectedTypes: readonly string[];
  sortMode: PokemonSortMode;
  onSelectedTypesChange: (types: string[]) => void;
  onSortChange: (sortMode: PokemonSortMode) => void;
}>;

function getTypeFilterLabel(selectedTypes: readonly string[]): string {
  const selectedTypeName = selectedTypes[0];

  if (!selectedTypeName) return 'Todos os tipos';

  const selectedType = POKEMON_TYPES.find((type) => type.name === selectedTypeName);

  return selectedType?.label ?? 'Todos os tipos';
}

export function PokedexControls({
  selectedTypes,
  sortMode,
  onSelectedTypesChange,
  onSortChange,
}: PokedexControlsProps) {
  const [isTypeSheetOpen, setIsTypeSheetOpen] = useState(false);
  const [isSortSheetOpen, setIsSortSheetOpen] = useState(false);

  return (
    <section className="pokedex-controls" aria-label="Filtros e ordenação da Pokédex">
      <div className="pokedex-controls__actions">
        <SheetButton
          onClick={() => setIsTypeSheetOpen(true)}
          ariaLabel="Abrir filtro por tipo"
          selectedTypes={selectedTypes}
        >
          {getTypeFilterLabel(selectedTypes)}
        </SheetButton>

        <SheetButton
          onClick={() => setIsSortSheetOpen(true)}
          ariaLabel="Abrir opções de ordenação"
        >
          {getSortLabel(sortMode)}
        </SheetButton>
      </div>

      <FilterSheet
        isOpen={isTypeSheetOpen}
        selectedTypes={selectedTypes}
        onClose={() => setIsTypeSheetOpen(false)}
        onChange={onSelectedTypesChange}
      />

      <SortSheet
        isOpen={isSortSheetOpen}
        sortMode={sortMode}
        onClose={() => setIsSortSheetOpen(false)}
        onSortChange={onSortChange}
      />
    </section>
  );
}