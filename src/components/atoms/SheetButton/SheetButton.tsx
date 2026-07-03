// src/components/atoms/SheetButton/SheetButton.tsx

import type { CSSProperties } from 'react';
import { ChevronDown } from 'lucide-react';
import type { PokemonTypeName } from '../../../types/pokemon';
import { TYPE_COLORS, getTypeTextColor } from '../../../utils/typeMeta';
import './SheetButton.css';

type SheetButtonProps = Readonly<{
  children: string;
  onClick: () => void;
  ariaLabel?: string;
  selectedTypes?: readonly string[];
}>;

type SheetButtonStyle = CSSProperties & {
  '--sheet-button-bg'?: string;
  '--sheet-button-color'?: string;
};

function isPokemonTypeName(typeName: string): typeName is PokemonTypeName {
  return typeName in TYPE_COLORS;
}

function getSelectedTypeStyle(typeName: string | undefined): SheetButtonStyle {
  if (!typeName || !isPokemonTypeName(typeName)) {
    return {};
  }

  return {
    '--sheet-button-bg': TYPE_COLORS[typeName],
    '--sheet-button-color': getTypeTextColor(typeName),
  };
}

export function SheetButton({
  children,
  onClick,
  ariaLabel,
  selectedTypes = [],
}: SheetButtonProps) {
  const selectedType = selectedTypes[0];
  const buttonStyle = getSelectedTypeStyle(selectedType);

  return (
    <button
      className="sheet-button"
      type="button"
      onClick={onClick}
      aria-label={ariaLabel ?? children}
      style={buttonStyle}
    >
      <span>{children}</span>
      <ChevronDown size={8} strokeWidth={3} aria-hidden="true" />
    </button>
  );
}