// src/components/organisms/RegionsView/RegionsView.tsx

import { RegionCard } from '../../molecules/RegionCard/RegionCard';
import { REGION_CARDS, type RegionId } from '../../../utils/regionCards';
import './RegionsView.css';

type RegionsViewProps = Readonly<{
  onRegionSelect: (regionId: RegionId) => void;
}>;

export function RegionsView({ onRegionSelect }: RegionsViewProps) {
  return (
    <section className="regions-view" aria-label="Regiões">
      <div className="regions-view__list">
        {REGION_CARDS.map((region) => (
          <RegionCard key={region.id} region={region} onSelect={onRegionSelect} />
        ))}
      </div>
    </section>
  );
}