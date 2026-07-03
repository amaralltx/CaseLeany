import type { CSSProperties } from 'react';
import { POKEMON_TYPES, TYPE_COLORS, getTypeTextColor } from '../../../utils/typeMeta';
import './FilterSheet.css';

type FilterSheetProps = Readonly<{
  isOpen: boolean;
  selectedTypes: readonly string[];
  onClose: () => void;
  onChange: (selectedTypes: string[]) => void;
}>;

type FilterOptionStyle = CSSProperties & {
  '--filter-type-color': string;
  '--filter-type-text-color': string;
};

export function FilterSheet({ isOpen, selectedTypes, onClose, onChange }: FilterSheetProps) {
  if (!isOpen) return null;

  function toggleType(typeName: string): void {
    const alreadySelected = selectedTypes.includes(typeName);

    onChange(alreadySelected ? [] : [typeName]);
  }

  return (
    <div className="filter-sheet" role="presentation" onClick={onClose}>
      <section
        className="filter-sheet__panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="filter-sheet-title"
        onClick={(event) => event.stopPropagation()}
      >
        <span className="filter-sheet__handle" aria-hidden="true" />

        <h2 className="filter-sheet__title" id="filter-sheet-title">
          Selecione o tipo
        </h2>

        <div className="filter-sheet__list">
          <button
            className={`filter-sheet__option filter-sheet__option--all${
              selectedTypes.length === 0 ? ' filter-sheet__option--selected' : ''
            }`}
            type="button"
            onClick={() => onChange([])}
          >
            Todos os tipos
          </button>

          {POKEMON_TYPES.map((type) => {
            const isSelected = selectedTypes.includes(type.name);

            const optionStyle: FilterOptionStyle = {
              '--filter-type-color': TYPE_COLORS[type.name],
              '--filter-type-text-color': getTypeTextColor(type.name),
            };

            return (
              <button
                key={type.name}
                className={`filter-sheet__option${isSelected ? ' filter-sheet__option--selected' : ''}`}
                type="button"
                onClick={() => toggleType(type.name)}
                style={optionStyle}
              >
                {type.label}
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
}