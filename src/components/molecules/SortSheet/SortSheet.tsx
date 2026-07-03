import type { PokemonSortMode } from '../../../types/pokemon';
import './SortSheet.css';

type SortSheetProps = Readonly<{
  isOpen: boolean;
  sortMode: PokemonSortMode;
  onClose: () => void;
  onSortChange: (sortMode: PokemonSortMode) => void;
}>;

const SORT_OPTIONS: readonly { value: PokemonSortMode; label: string }[] = [
  { value: 'number-asc', label: 'Menor número' },
  { value: 'number-desc', label: 'Maior número' },
  { value: 'name-asc', label: 'A-Z' },
  { value: 'name-desc', label: 'Z-A' },
] as const;

export function getSortLabel(sortMode: PokemonSortMode): string {
  return SORT_OPTIONS.find((option) => option.value === sortMode)?.label ?? 'Menor número';
}

export function SortSheet({
  isOpen,
  sortMode,
  onClose,
  onSortChange,
}: SortSheetProps) {
  if (!isOpen) return null;

  function handleSortChange(sortOption: PokemonSortMode): void {
    onSortChange(sortOption);
    onClose();
  }

  return (
    <div className="sort-sheet" role="presentation" onClick={onClose}>
      <section
        className="sort-sheet__panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="sort-sheet-title"
        onClick={(event) => event.stopPropagation()}
      >
        <span className="sort-sheet__handle" aria-hidden="true" />

        <h2 className="sort-sheet__title" id="sort-sheet-title">
          Selecione a ordem
        </h2>

        <div className="sort-sheet__options">
          {SORT_OPTIONS.map((option) => {
            const isSelected = sortMode === option.value;

            return (
              <button
                key={option.value}
                className={`sort-sheet__option${isSelected ? ' sort-sheet__option--selected' : ''}`}
                type="button"
                aria-pressed={isSelected}
                onClick={() => handleSortChange(option.value)}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
}