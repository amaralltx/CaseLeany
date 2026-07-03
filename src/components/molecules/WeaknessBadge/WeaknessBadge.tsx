import type { CSSProperties } from 'react';
import type { PokemonTypeName } from '../../../types/pokemon';
import { getTypeIcon } from '../../../utils/typeIcons';
import { TYPE_COLORS, getTypeTextColor } from '../../../utils/typeMeta';
import './WeaknessBadge.css';

type WeaknessBadgeProps = Readonly<{
  label: string;
  typeName: PokemonTypeName;
}>;

type WeaknessBadgeStyle = CSSProperties & {
  '--weakness-color': string;
  '--weakness-text-color': string;
  '--weakness-icon-url': string;
};

export function WeaknessBadge({ label, typeName }: WeaknessBadgeProps) {
  const style: WeaknessBadgeStyle = {
    '--weakness-color': TYPE_COLORS[typeName],
    '--weakness-text-color': getTypeTextColor(typeName),
    '--weakness-icon-url': `url("${getTypeIcon(typeName)}")`,
  };

  return (
    <span className="weakness-badge" style={style}>
      <span className="weakness-badge__icon" aria-hidden="true" />
      <span className="weakness-badge__text">{label}</span>
    </span>
  );
}