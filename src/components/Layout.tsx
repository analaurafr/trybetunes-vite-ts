import { NavLink, Outlet } from 'react-router-dom';
import Header from './Header';

function Layout() {
  return (
    <div>
      <Header />
      <nav>
        <NavLink to="/search" data-testid="link-to-search">
          Pesquisar
        </NavLink>
        <NavLink to="/favorites" data-testid="link-to-favorites">
          Favoritos
        </NavLink>
        <NavLink to="/profile" data-testid="link-to-profile">
          Perfil
        </NavLink>
      </nav>
      <Outlet />
    </div>
  );
}

export default Layout;
