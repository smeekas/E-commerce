import { Link } from 'react-router-dom';
import CartCard from '../components/CartCard/CartCard';
import { useCart } from '../context/CartContext';
import { CartDetail } from '../types/cart';
import './Cart.css';

function Cart() {
  const { products } = useCart();

  if (products.length === 0) {
    return (
      <div className='cart'>
        <h1 className='cart__title'>Shopping Cart</h1>
        <div className='cart__empty'>
          <div className='cart__empty-icon'>
            <svg
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='1.5'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <path d='M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z' />
              <line x1='3' y1='6' x2='21' y2='6' />
              <path d='M16 10a4 4 0 0 1-8 0' />
            </svg>
          </div>
          <h2 className='cart__empty-heading'>Your cart is empty</h2>
          <p className='cart__empty-text'>
            Looks like you haven't added anything yet.
          </p>
          <Link to='/products' className='cart__empty-btn'>
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  const cartInfo = products.reduce<CartDetail>(
    (acc, curr) => ({
      totalItems: acc.totalItems + curr.qty,
      price: acc.price + curr.price * curr.qty,
      finalPrice:
        acc.finalPrice +
        (1 - curr.discountPercentage / 100) * (curr.price * curr.qty),
      discount:
        acc.discount +
        (curr.discountPercentage / 100) * (curr.price * curr.qty),
    }),
    { totalItems: 0, price: 0, finalPrice: 0, discount: 0 },
  );

  return (
    <div className='cart'>
      <h1 className='cart__title'>Shopping Cart</h1>
      <div className='cart__layout'>
        <ul className='cart__list' role='list'>
          {products.map((product) => (
            <li key={product.id}>
              <CartCard product={product} />
            </li>
          ))}
        </ul>

        <aside className='cart__summary'>
          <h2 className='cart__summary-title'>Order Summary</h2>
          <div className='cart__summary-row'>
            <span>Items ({cartInfo.totalItems})</span>
            <span>${cartInfo.price.toFixed(2)}</span>
          </div>
          <div className='cart__summary-row cart__summary-row--savings'>
            <span>Savings</span>
            <span>-${cartInfo.discount.toFixed(2)}</span>
          </div>
          <div className='cart__summary-divider' />
          <div className='cart__summary-row cart__summary-row--total'>
            <span>Total</span>
            <span>${cartInfo.finalPrice.toFixed(2)}</span>
          </div>
          <button className='cart__checkout-btn'>Proceed to Checkout</button>
        </aside>
      </div>
    </div>
  );
}

export default Cart;
