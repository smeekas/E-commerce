import { Link } from 'react-router-dom';
import { CartContext, useCart } from '../../context/CartContext';
import { getDiscountedValue } from '../../utils/discount';
import './CartCard.css';
import { navigationPaths } from '../../constants/navigationPaths';

interface CartCardProps {
  product: CartContext['products'][number];
}

function CartCard({ product }: CartCardProps) {
  const { updateQty } = useCart();
  return (
    <div className='cart-card'>
      <div className='cart-card__image-wrapper'>
        <img
          src={product.thumbnail}
          alt={product.title}
          className='cart-card__image'
        />
        {product.discountPercentage > 0 && (
          <span className='cart-card__badge'>
            -{Math.round(product.discountPercentage)}%
          </span>
        )}
      </div>

      <div className='cart-card__body'>
        <Link className='cart-card__title' to={navigationPaths.productDetail(product.id)}>{product.title}</Link>
        <div className='cart-card__price-row'>
          <span className='cart-card__price'>
            ${getDiscountedValue(product.price, product.discountPercentage)}
          </span>
          <span className='cart-card__original-price'>${product.price}</span>
        </div>
      </div>

      <div className='cart-card__qty'>
        <span className='cart-card__qty-label'>Qty</span>
        <span className='cart-card__qty-value'>{product.qty}</span>
      </div>
      <div className='cart-card__action'>
        <button onClick={() => updateQty(product, 'inc')}>+</button>
        <button onClick={() => updateQty(product, 'dec')}>-</button>
      </div>
    </div>
  );
}

export default CartCard;
