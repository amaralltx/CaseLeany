// src/components/molecules/RegionCard/RegionCard.tsx

import type { CSSProperties } from 'react';
import type { RegionCardData, RegionId } from '../../../utils/regionCards';
import { getGenerationViiiIconUrl } from '../../../utils/regionCards';
import './RegionCard.css';

type RegionCardProps = Readonly<{
  region: RegionCardData;
  onSelect: (regionId: RegionId) => void;
}>;

type RegionCardStyle = CSSProperties & {
  '--region-bg-image': string;
};

export function RegionCard({ region, onSelect }: RegionCardProps) {
  const cardStyle: RegionCardStyle = {
    '--region-bg-image': `url("${region.backgroundImage}")`,
  };

  return (
    <button
      className="region-card"
      type="button"
      style={cardStyle}
      onClick={() => onSelect(region.id)}
      aria-label={`Ver Pokémon da região ${region.name}`}
    >
      <span className="region-card__overlay" aria-hidden="true" />

      <span className="region-card__content">
        <span className="region-card__text">
          <strong className="region-card__title">{region.name}</strong>
          <span className="region-card__generation">{region.generation}</span>
        </span>

        <span className="region-card__starters" aria-hidden="true">
          {region.starters.map((starter) => (
            <img
              key={starter.id}
              className="region-card__starter"
              src={getGenerationViiiIconUrl(starter.id)}
              alt=""
              loading="lazy"
              width="54"
              height="54"
            />
          ))}
        </span>
      </span>
    </button>
  );
}