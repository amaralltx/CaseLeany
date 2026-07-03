import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { FavoritesProvider } from './context/FavoritesContext';
import { App } from './App';
import './styles.css';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <FavoritesProvider>
      <App />
    </FavoritesProvider>
  </StrictMode>,
);
