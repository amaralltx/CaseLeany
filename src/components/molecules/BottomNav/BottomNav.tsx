import { NavLink } from 'react-router-dom';
import { useFavorites } from '../../../context/FavoritesContext';
import './BottomNav.css';

import pokedexIcon from '../../../assets/icons/nav-bar/icon-pokedex.svg?url';
import pokedexActiveIcon from '../../../assets/icons/nav-bar/icon-pokedex-active.svg?url';

import regionsIcon from '../../../assets/icons/nav-bar/icon-regioes.svg?url';
import regionsActiveIcon from '../../../assets/icons/nav-bar/icon-regioes-active.svg?url';

import favoritesIcon from '../../../assets/icons/nav-bar/icon-favoritos.svg?url';
import favoritesActiveIcon from '../../../assets/icons/nav-bar/icon-favoritos-active.svg?url';

import accountIcon from '../../../assets/icons/nav-bar/icon-conta.svg?url';
import accountActiveIcon from '../../../assets/icons/nav-bar/icon-conta-active.svg?url';

type NavItem = Readonly<{
  to: string;
  label: string;
  id: 'pokedex' | 'regions' | 'favorites' | 'profile';
  icon: string;
  activeIcon: string;
}>;

const NAV_ITEMS: readonly NavItem[] = [
  {
    to: '/pokedex',
    label: 'Pokédex',
    id: 'pokedex',
    icon: pokedexIcon,
    activeIcon: pokedexActiveIcon,
  },
  {
    to: '/regions',
    label: 'Regiões',
    id: 'regions',
    icon: regionsIcon,
    activeIcon: regionsActiveIcon,
  },
  {
    to: '/favorites',
    label: 'Favoritos',
    id: 'favorites',
    icon: favoritesIcon,
    activeIcon: favoritesActiveIcon,
  },
  {
    to: '/profile',
    label: 'Conta',
    id: 'profile',
    icon: accountIcon,
    activeIcon: accountActiveIcon,
  },
] as const;

export function BottomNav() {
  const { favoritesCount } = useFavorites();

  return (
    <nav className="bottom-nav" aria-label="Navegação principal">
      <div className="bottom-nav__inner">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.id}
            to={item.to}
            className={({ isActive }) =>
              `bottom-nav__item${isActive ? ' bottom-nav__item--active' : ''}`
            }
          >
            {({ isActive }) => (
              <>
                <span className="bottom-nav__icon">
                  <img
                    className="bottom-nav__icon-image"
                    src={isActive ? item.activeIcon : item.icon}
                    alt=""
                    aria-hidden="true"
                  />

                  {item.id === 'favorites' && favoritesCount > 0 ? (
                    <span className="bottom-nav__badge" aria-label={`${favoritesCount} favoritos`}>
                      {favoritesCount}
                    </span>
                  ) : null}
                </span>

                <span className="bottom-nav__label">{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}