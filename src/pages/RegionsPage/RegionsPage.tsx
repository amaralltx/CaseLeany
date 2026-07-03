import { useNavigate } from 'react-router-dom';
import { RegionsView } from '../../components/organisms/RegionsView/RegionsView';
import type { RegionId } from '../../utils/regionCards';
import './RegionsPage.css';

export function RegionsPage() {
  const navigate = useNavigate();

  function handleRegionSelect(regionId: RegionId): void {
    navigate(`/regions/${regionId}`);
  }

  return (
    <section className="regions-page" aria-labelledby="regions-page-title">
      <header className="regions-page__header">
        <h1 className="regions-page__title" id="regions-page-title">
          Regiões
        </h1>
      </header>

      <RegionsView onRegionSelect={handleRegionSelect} />
    </section>
  );
}