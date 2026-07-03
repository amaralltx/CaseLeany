import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes/AppRoutes';
import { BottomNav } from './components/molecules/BottomNav/BottomNav';
import './App.css';

export function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <main className="app-shell__content" aria-label="Aplicativo Pokédex">
          <AppRoutes />
        </main>

        <BottomNav />
      </div>
    </BrowserRouter>
  );
}