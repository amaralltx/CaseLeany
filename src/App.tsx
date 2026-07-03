import { BrowserRouter, useLocation } from 'react-router-dom';
import { AppRoutes } from './routes/AppRoutes';
import { BottomNav } from './components/molecules/BottomNav/BottomNav';
import './App.css';

function AppLayout() {
  const location = useLocation();

  const shouldShowNavigation = !location.pathname.startsWith('/pokemon/');

  return (
    <div className={shouldShowNavigation ? 'app-shell app-shell--with-nav' : 'app-shell'}>
      {shouldShowNavigation ? <BottomNav /> : null}

      <main className="app-shell__content" aria-label="Aplicativo Pokédex">
        <AppRoutes />
      </main>
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