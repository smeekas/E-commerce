import { ChangeEvent, useMemo } from 'react';
import { debounce } from '../../utils/debounce';
import { useSearchParams } from 'react-router-dom';
import './ProductFilters.css';
import { Filters, sortKeys, SortMode } from '../../constants/filters';
import SortDropdown from '../SortDropdown/SortDropdown';
import { transformPascalCase } from '../../utils/transformPascalCase';

function ProductFilters() {
  const [searchParams, setSearchParams] = useSearchParams();
  const querySearch = searchParams.get(Filters.Search);
  const sortKey = searchParams.get(Filters.SortBy) || 'title';
  const sortOrder = searchParams.get(Filters.Order) || SortMode.Asc;

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

  const onChange = (key: string, value: string) => {
    setSearchParams((prev) => {
      prev.set(key, value);
      return prev;
    });
  };
  return (
    <div className='search-container'>
      <input
        className='search'
        defaultValue={search}
        placeholder='Search products'
        onChange={onSearch}
      />
      <SortDropdown
        options={[
          { label: 'asc', value: SortMode.Asc },
          { label: 'desc', value: SortMode.Dsc },
        ]}
        value={sortOrder}
        label='Sort direction'
        onChange={(value) => onChange(Filters.Order, value)}
      />
      <SortDropdown
        options={sortKeys.map((item) => ({
          label: transformPascalCase(item),
          value: item,
        }))}
        value={sortKey}
        label='Sort by'
        onChange={(value) => onChange(Filters.SortBy, value)}
      />
    </div>
  );
}

export default ProductFilters;
