import type { CSSProperties } from 'react';
import type { PokemonTypeName } from '../../../types/pokemon';
import { getTypeIcon } from '../../../utils/typeIcons';
import { TYPE_COLORS, getTypeTextColor } from '../../../utils/typeMeta';
import './Badge.css';

type BadgeProps = Readonly<{
  label: string;
  typeName: PokemonTypeName;
}>;

type BadgeStyle = CSSProperties & {
  '--badge-color': string;
  '--badge-text-color': string;
  '--type-icon-url': string;
};

export function Badge({ label, typeName }: BadgeProps) {
  const color = TYPE_COLORS[typeName];
  const iconUrl = getTypeIcon(typeName);

  const badgeStyle: BadgeStyle = {
    '--badge-color': color,
    '--badge-text-color': getTypeTextColor(typeName),
    '--type-icon-url': `url("${iconUrl}")`,
  };

  return (
    <span className="type-badge" style={badgeStyle}>
      <span className="type-badge__icon" aria-hidden="true" />
      <span className="type-badge__text">{label}</span>
    </span>
  );
}