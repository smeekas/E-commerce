import { useState } from 'react';
import { Product } from '../../dto/product.dto';
import './ProductDetails.css';
import Ratings from '../Ratings/Ratings';

interface ProductDetailProps {
  product: Product;
}

function ProductDetails({ product }: ProductDetailProps) {
  const [activeImage, setActiveImage] = useState(product.thumbnail);

  const discountedPrice = (
    product.price *
    (1 - product.discountPercentage / 100)
  ).toFixed(2);

  const isInStock = product.availabilityStatus === 'In Stock';

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
            <span className='product-detail__price'>${discountedPrice}</span>
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
          <button className='product-detail__add-btn'>Add to Cart</button>
        </div>
      </div>
      <Ratings rating={product.reviews} />
    </>
  );
}

export default ProductDetails;
