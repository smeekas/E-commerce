import { NavLink } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <header>
      <NavLink to='/' className='header-logo'>
        ShopZone
      </NavLink>
      <nav>
        <ul className='header-nav'>
          <li>
            <NavLink to='/'>Home</NavLink>
          </li>
          <li>
            <NavLink to='/products'>Products</NavLink>
          </li>
          <li>
            <NavLink to='/cart'>Cart</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
