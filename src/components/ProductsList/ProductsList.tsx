import { useQuery } from '@tanstack/react-query';
import { API } from '../../config/axios.config';
import { paths } from '../../constants/api';
import { QueryKey } from '../../constants/QueryKey';
import { ProductsResponse } from '../../dto/product.dto';
import ProductCard from '../ProductCard/ProductCard';
import './ProductsList.css';

import { useSearchParams } from 'react-router-dom';
import { PER_PAGE } from '../../constants/global';
import ProductFilters from '../ProductFilters/ProductFilters';
import { Filters } from '../../constants/filters';
import ProductSkeleton from './ProductSkeleton';
import PromotedProducts from '../PromotedProducts/PromotedProducts';

const SKELETON_COUNT = 8;

function ProductsList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryPage = searchParams.get(Filters.Page);
  const querySearch = searchParams.get(Filters.Search);
  const sortBy = searchParams.get(Filters.SortBy);

  const order = searchParams.get(Filters.Order);
  const page = queryPage !== null && !Number.isNaN(queryPage) ? +queryPage : 1;
  const search = querySearch || '';
  const { data, isLoading } = useQuery({
    queryKey: [QueryKey.AllProducts, search, page, sortBy, order],
    queryFn: () =>
      API.get<ProductsResponse>(paths.products, {
        params: {
          q: search,
          limit: PER_PAGE,
          skip: PER_PAGE * (page - 1),
          sortBy,
          order,
        },
      }),
  });
  const hasMore = (page + 1) * PER_PAGE < (data?.data?.total || 0);
  const hasLess = page > 1;
  const nextPage = () => {
    setSearchParams((prev) => {
      prev.set(Filters.Page, (page + 1).toString());
      return prev;
    });
  };
  const prevPage = () => {
    setSearchParams((prev) => {
      prev.set(Filters.Page, (page - 1).toString());
      return prev;
    });
  };
  const hasProducts =
    !isLoading && data?.data && data?.data.products.length > 0;
  return (
    <div className='list-container'>
      <aside className='filters-column'>
        <ProductFilters />
      </aside>

      <main className='content-column'>
        {/* <PromotedProducts /> */}
        {!hasProducts ? (
          <div className='error'>not found</div>
        ) : (
          <>
            <div className='product-list' role='list' aria-busy={isLoading}>
              {isLoading
                ? Array.from({ length: SKELETON_COUNT }).map((_, i) => (
                    <ProductSkeleton key={i} />
                  ))
                : data?.data?.products?.map((prodItem) => (
                    <ProductCard key={prodItem.id} product={prodItem} />
                  ))}
            </div>
          </>
        )}

        {hasProducts && (
          <div className='pagination'>
            <button disabled={!hasLess} onClick={prevPage}>
              Prev
            </button>
            <button disabled={!hasMore} onClick={nextPage}>
              Next
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export default ProductsList;
