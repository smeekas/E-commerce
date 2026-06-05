import CartCard from '../components/CartCard/CartCard';
import { useCart } from '../context/CartContext';
import { CartDetail } from '../types/cart';
import './Cart.css';

function Cart() {
  const { products } = useCart();
  const cartInfo = products.reduce<CartDetail>(
    (acc, curr) => {
      return {
        totalItems: acc.totalItems + curr.qty,
        price: acc.price + curr.price * curr.qty,
        finalPrice:
          acc.finalPrice +
          (1 - curr.discountPercentage / 100) * (curr.price * curr.qty),
        discount:
          acc.discount +
          (curr.discountPercentage / 100) * (curr.price * curr.qty),
      };
    },
    {
      totalItems: 0,
      price: 0,
      finalPrice: 0,
      discount: 0,
    },
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
