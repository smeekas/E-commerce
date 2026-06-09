import { useNavigate } from 'react-router-dom';
import { Product } from '../../dto/product.dto';
import './ProductCard.css';
import { renderStars } from '../../utils/renderStars';
import { navigationPaths } from '../../constants/navigationPaths';
import { useCart } from '../../context/CartContext';

interface Props {
  product: Product;
}

function ProductCard({ product }: Props) {
  const navigate = useNavigate();
  const { updateQty, products } = useCart();
  const inCart = products.some((p) => p.id === product.id);
  const discountedPrice = (
    product.price *
    (1 - product.discountPercentage / 100)
  ).toFixed(2);

  return (
    <div
      className='product-card'
      role='listitem'
      onClick={() => navigate(navigationPaths.productDetail(product.id))}
    >
      <div className='product-card__image-wrapper'>
        <img
          src={product.thumbnail}
          alt={product.title}
          className='product-card__image'
        />
        {product.discountPercentage > 0 && (
          <span className='product-card__badge'>
            -{Math.round(product.discountPercentage)}%
          </span>
        )}
      </div>

      <div className='product-card__body'>
        <span className='product-card__category'>{product.category}</span>
        <h3 className='product-card__title'>{product.title}</h3>
        <div className='product-card__rating'>
          <span className='product-card__stars'>
            {renderStars(product.rating)}
          </span>
          <span>{product.rating.toFixed(1)}</span>
        </div>
      </div>

      <div className='product-card__footer'>
        <div className='product-card__price-group'>
          <span className='product-card__price'>${discountedPrice}</span>
          <span className='product-card__original-price'>
            ${product.price.toFixed(2)}
          </span>
        </div>
        <button
          className={`product-card__add-btn${inCart ? ' product-card__add-btn--in-cart' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            updateQty(product, 'inc');
          }}
        >
          {inCart ? 'In Cart' : 'Add'}
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
