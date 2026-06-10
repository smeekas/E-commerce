import { useState } from 'react';
import { Product } from '../../dto/product.dto';
import './ProductDetails.css';
import '../../common.css';
import Ratings from '../Ratings/Ratings';
import { useCart } from '../../context/CartContext';
import { getDiscountedValue } from '../../utils/discount';
import toast from 'react-hot-toast';
import { Messages } from '../../constants/messages';

interface ProductDetailsProps {
  product: Product;
}

function ProductDetails({ product }: ProductDetailsProps) {
  const [activeImage, setActiveImage] = useState(product.thumbnail);
  const [addedToCart, setAddedToCart] = useState(false);
  const { updateQty, products } = useCart();
  const inCart = products.some((p) => p.id === product.id);
  const isInStock = product.availabilityStatus === 'In Stock';
  const addToCart = () => {
    updateQty(product, 'inc');
    setAddedToCart(true);
    toast.success(Messages.ToastMessages.AddToCart(product.title));
    setTimeout(() => {
      setAddedToCart(false);
    }, 3000);
  };
  return (
    <>
      <div className='product-detail'>
        <div className='product-detail__gallery'>
          <img
            src={activeImage}
            alt={product.title}
            className='product-detail__main-image'
          />
          <div className='product-detail__thumbnails'>
            {product.images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`${product.title} ${i + 1}`}
                className={`product-detail__thumb${activeImage === img ? ' product-detail__thumb--active' : ''}`}
                onClick={() => setActiveImage(img)}
              />
            ))}
          </div>
        </div>

        <div className='product-detail__info'>
          <span className='product-detail__category'>{product.category}</span>
          <h1 className='product-detail__title'>{product.title}</h1>
          <p className='product-detail__brand'>
            Brand: <span>{product.brand}</span>
          </p>

          <div className='product-detail__price-row'>
            <span className='product-detail__price'>
              ${getDiscountedValue(product.price, product.discountPercentage)}
            </span>
            <span className='product-detail__original-price'>
              ${product.price.toFixed(2)}
            </span>
            {product.discountPercentage > 0 && (
              <span className='product-detail__discount-badge'>
                -{Math.round(product.discountPercentage)}%
              </span>
            )}
          </div>

          <p className='product-detail__description'>{product.description}</p>

          <div className='product-detail__meta'>
            <div className='product-detail__meta-row'>
              <span className='product-detail__meta-label'>Availability</span>
              <span
                className={`product-detail__availability${!isInStock ? ' product-detail__availability--out' : ''}`}
              >
                {product.availabilityStatus}
              </span>
            </div>
            <div className='product-detail__meta-row'>
              <span className='product-detail__meta-label'>SKU</span>
              <span>{product.sku}</span>
            </div>
            <div className='product-detail__meta-row'>
              <span className='product-detail__meta-label'>Shipping</span>
              <span>{product.shippingInformation}</span>
            </div>
            <div className='product-detail__meta-row'>
              <span className='product-detail__meta-label'>Warranty</span>
              <span>{product.warrantyInformation}</span>
            </div>
            <div className='product-detail__meta-row'>
              <span className='product-detail__meta-label'>Return Policy</span>
              <span>{product.returnPolicy}</span>
            </div>
          </div>
          {product.stock > 0 && (
            <button
              className={`product-detail__add-btn ${inCart ? 'product-card__add-btn--in-cart' : ''}`}
              title={inCart ? 'Add more' : 'add to cart'}
              onClick={addToCart}
            >
              {addedToCart ? 'Added!' : inCart ? 'In Cart' : 'Add'}
            </button>
          )}
        </div>
      </div>
      <Ratings rating={product.reviews} />
    </>
  );
}

export default ProductDetails;
