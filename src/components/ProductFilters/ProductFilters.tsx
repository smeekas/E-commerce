import { ChangeEvent, useMemo } from 'react';
import { debounce } from '../../utils/debounce';
import { useSearchParams } from 'react-router-dom';
import './ProductFilters.css';
import { Filters } from '../../constants/filters';

function ProductFilters() {
  const [searchParams, setSearchParams] = useSearchParams();
  const querySearch = searchParams.get(Filters.Search);
  const search = querySearch || '';
  const onSearch = useMemo(
    () =>
      debounce((e: ChangeEvent<HTMLInputElement>) => {
        setSearchParams((prev) => {
          prev.set(Filters.Page, '1');
          prev.set(Filters.Search, e.target.value.trim());
          return prev;
        });
      }, 400),
    [setSearchParams],
  );
  return (
    <div className='search-container'>
      <input
        className='search'
        defaultValue={search}
        placeholder='Search products'
        onChange={onSearch}
      />
    </div>
  );
}

export default ProductFilters;
