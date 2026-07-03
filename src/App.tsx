import { BrowserRouter, useLocation } from 'react-router-dom';
import { AppRoutes } from './routes/AppRoutes';
import { BottomNav } from './components/molecules/BottomNav/BottomNav';
import './App.css';

function AppLayout() {
  const location = useLocation();
  const shouldShowBottomNav = !location.pathname.startsWith('/pokemon/');

  return (
    <div className="app-shell">
      <main className="app-shell__content" aria-label="Aplicativo Pokédex">
        <AppRoutes />
      </main>

      {shouldShowBottomNav ? <BottomNav /> : null}
    </div>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}