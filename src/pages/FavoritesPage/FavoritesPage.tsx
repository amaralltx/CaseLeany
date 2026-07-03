import { DynamicHeader } from '../../components/organisms/DynamicHeader/DynamicHeader';
import { FavoritesView } from '../../components/organisms/FavoritesView/FavoritesView';
import './FavoritesPage.css';

export function FavoritesPage() {
  return (
    <section className="favorites-page" aria-labelledby="favorites-page-title">
      <DynamicHeader title="Favoritos" />

      <FavoritesView />
    </section>
  );
}