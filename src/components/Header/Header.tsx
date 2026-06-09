import { NavLink } from 'react-router-dom';
import './Header.css';
import { useCart } from '../../context/CartContext';
import ThemeToggle from '../ThemeToggle/ThemeToggle';

function Header() {
  const { products } = useCart();
  const totalQty = products.reduce((acc, curr) => acc + curr.qty, 0);
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
            <NavLink to='/cart'>
              Cart
              {totalQty > 0 && (
                <span className='header__cart-badge'>{totalQty}</span>
              )}
            </NavLink>
          </li>
          <li>
            <ThemeToggle />
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
