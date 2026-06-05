import { useQuery } from '@tanstack/react-query';
import { API } from '../../config/axios.config';
import { paths } from '../../constants/api';
import { QueryKey } from '../../constants/QueryKey';
import { ProductsResponse } from '../../dto/product.dto';
import ProductCard from '../ProductCard/ProductCard';
import './ProductsList.css';

import { useSearchParams } from 'react-router-dom';
import { PER_PAGE } from '../../constants/global';
import { ChangeEvent, useMemo } from 'react';
import { debounce } from '../../utils/debounce';
import Spin from '../Spin/Spin';

function ProductsList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryPage = searchParams.get('page');
  const querySearch = searchParams.get('search');
  const page = queryPage !== null && !Number.isNaN(queryPage) ? +queryPage : 1;
  const search = querySearch || '';
  const { data, isLoading } = useQuery({
    queryKey: [QueryKey.AllProducts, search, page],
    queryFn: () =>
      API.get<ProductsResponse>(paths.products, {
        params: {
          q: search,
          limit: PER_PAGE,
          skip: PER_PAGE * (page - 1),
        },
      }),
  });
  const hasMore = (page + 1) * PER_PAGE < (data?.data?.total || 0);
  const hasLess = page > 1;
  const nextPage = () => {
    setSearchParams((prev) => {
      prev.set('page', (page + 1).toString());
      return prev;
    });
  };
  const prevPage = () => {
    setSearchParams((prev) => {
      prev.set('page', (page - 1).toString());
      return prev;
    });
  };
  const onSearch = useMemo(
    () =>
      debounce((e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.trim().length === 0) return;
        setSearchParams((prev) => {
          prev.set('page', '1');
          prev.set('search', e.target.value.trim());
          return prev;
        });
      }, 400),
    [setSearchParams],
  );
  return (
    <div className='list-container'>
      <div className='search-container'>
        <input
          className='search'
          defaultValue={search}
          placeholder='search...'
          onChange={onSearch}
        />
      </div>
      <Spin spin={isLoading}>
        <div className='product-list' role='list'>
          {data?.data?.products?.map((prodItem) => {
            return <ProductCard key={prodItem.id} product={prodItem} />;
          })}
        </div>
      </Spin>
      <div className='pagination'>
        <button disabled={!hasLess} onClick={prevPage}>
          Prev
        </button>

        <button disabled={!hasMore} onClick={nextPage}>
          Next
        </button>
      </div>
    </div>
  );
}

export default ProductsList;
