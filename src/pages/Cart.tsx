import { Link, useNavigate } from 'react-router-dom';
import CartCard from '../components/CartCard/CartCard';
import { useCart } from '../context/CartContext';
import { CartDetail } from '../types/cart';
import './Cart.css';
import { useMemo, useRef } from 'react';
import { DUMMY_COUPON } from '../constants/coupons';
import toast from 'react-hot-toast';
import { Messages } from '../constants/messages';
import { navigationPaths } from '../constants/navigationPaths';

function Cart() {
  const { products, setDiscount, discount } = useCart();
  const navigate = useNavigate();
  const ref = useRef<HTMLInputElement | null>(null);

  const cartInfo = useMemo(
    () =>
      products.reduce<CartDetail>(
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
      ),
    [products],
  );

  const couponDiscount = useMemo(
    () => (discount === null ? 0 : cartInfo.price * (discount.discount / 100)),
    [cartInfo, discount],
  );
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
  const onApply = () => {
    if (!ref.current) return;
    const inputValue = ref.current.value.trim();
    const coupon = DUMMY_COUPON.find(
      (couponItem) => couponItem.coupon === inputValue,
    );
    if (coupon) {
      setDiscount(coupon);
      ref.current.value = '';
    } else {
      toast.error(Messages.ToastMessages.InvalidCoupon);
    }
  };

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
          {couponDiscount > 0 && (
            <div className='cart__summary-row cart__summary-row--savings'>
              <span>Coupon discount</span>
              <span>-${couponDiscount.toFixed(2)}</span>
            </div>
          )}
          <div className='coupon-container'>
            <input
              placeholder='coupon code (NEW10)'
              className='coupon'
              ref={ref}
            />
            <button onClick={onApply}>Apply</button>
          </div>
          <div className='cart__summary-divider' />
          <div className='coupon-list'>
            {discount && (
              <button onClick={() => setDiscount(null)}>
                {discount.coupon} X
              </button>
            )}
          </div>
          <div className='cart__summary-row cart__summary-row--total'>
            <span>Total</span>
            <span>${(cartInfo.finalPrice - couponDiscount).toFixed(2)}</span>
          </div>
          <button
            className='cart__checkout-btn'
            onClick={() => navigate(navigationPaths.shippingAddress)}
          >
            Proceed to Checkout
          </button>
        </aside>
      </div>
    </div>
  );
}

export default Cart;
