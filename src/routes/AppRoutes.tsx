import { Navigate, Route, Routes } from 'react-router-dom';
import { PokedexPage } from '../pages/PokedexPage/PokedexPage';
import { RegionsPage } from '../pages/RegionsPage/RegionsPage';
import { RegionDetailPage } from '../pages/RegionDetailPage/RegionDetailPage';
import { PokemonDetailPage } from '../pages/PokemonDetailPage/PokemonDetailPage';
import { FavoritesPage } from '../pages/FavoritesPage/FavoritesPage';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/pokedex" replace />} />
      <Route path="/pokedex" element={<PokedexPage />} />
      <Route path="/regions" element={<RegionsPage />} />
      <Route path="/regions/:regionId" element={<RegionDetailPage />} />
      <Route path="/pokemon/:pokemonId" element={<PokemonDetailPage />} />
      <Route path="/favorites" element={<FavoritesPage />} />
      <Route path="*" element={<Navigate to="/pokedex" replace />} />
    </Routes>
  );
}