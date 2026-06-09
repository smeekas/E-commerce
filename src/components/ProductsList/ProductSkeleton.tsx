function ProductSkeleton() {
  return (
    <div className='product-skeleton'>
      <div className='product-skeleton__img' />
      <div className='product-skeleton__body'>
        <div className='product-skeleton__line product-skeleton__line--short' />
        <div className='product-skeleton__line product-skeleton__line--title' />
        <div className='product-skeleton__line product-skeleton__line--sub' />
      </div>
      <div className='product-skeleton__footer'>
        <div className='product-skeleton__price' />
        <div className='product-skeleton__btn' />
      </div>
    </div>
  );
}

export default ProductSkeleton;
