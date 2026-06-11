import { ChangeEvent, useMemo, useState } from 'react';
import { debounce } from '../../utils/debounce';
import { useSearchParams } from 'react-router-dom';
import './ProductFilters.css';
import { Filters, sortKeys, SortMode } from '../../constants/filters';
import SortDropdown from '../SortDropdown/SortDropdown';
import { transformPascalCase } from '../../utils/transformPascalCase';
import DemoTooltip from '../DemoTooltip/DemoTooltip';

function ProductFilters() {
  const [searchParams, setSearchParams] = useSearchParams();
  const querySearch = searchParams.get(Filters.Search);
  const sortKey = searchParams.get(Filters.SortBy) || 'title';
  const queryCategory = searchParams.get(Filters.Category);

  const categories = decodeURIComponent(queryCategory || '').split(',');
  const sortOrder = searchParams.get(Filters.Order) || SortMode.Asc;
  const search = querySearch || '';
  const [minPriceLocal, setMinPriceLocal] = useState(
    searchParams.get('minPrice') || '',
  );
  const [maxPriceLocal, setMaxPriceLocal] = useState(
    searchParams.get('maxPrice') || '',
  );
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
  const toggleCategory = (cat: string, checked: boolean) => {
    setSearchParams((prev) => {
      const existing = prev.get(Filters.Category) || '';
      const list = existing ? existing.split(',') : [];
      const next = checked
        ? Array.from(new Set([...list, cat]))
        : list.filter((c) => c !== cat);
      if (next.length) prev.set(Filters.Category, next.join(','));
      else prev.delete(Filters.Category);
      return prev;
    });
  };

  const applyPrice = () => {
    setSearchParams((prev) => {
      if (minPriceLocal) prev.set('minPrice', minPriceLocal.toString());
      else prev.delete('minPrice');
      if (maxPriceLocal) prev.set('maxPrice', maxPriceLocal.toString());
      else prev.delete('maxPrice');
      return prev;
    });
  };

  const clearFilters = () => {
    setSearchParams((prev) => {
      prev.delete(Filters.Category);
      prev.delete('minPrice');
      prev.delete('maxPrice');
      prev.delete('rating');
      prev.delete('inStock');
      return prev;
    });
    setMinPriceLocal('');
    setMaxPriceLocal('');
  };
  return (
    <aside className='filters-panel'>
      <div className='filters-section search-section'>
        <input
          className='search'
          defaultValue={search}
          placeholder='Search products'
          onChange={onSearch}
        />
      </div>

      <div className='filters-section'>
        <h4 className='filters-title'>Sort</h4>
        <SortDropdown
          options={[
            { label: 'asc', value: SortMode.Asc },
            { label: 'desc', value: SortMode.Dsc },
          ]}
          value={sortOrder}
          label='Direction'
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
      {/* category, price, rating filters are for dummy purpose only  */}
      <div className='filters-section'>
        <h4 className='filters-title'>
          Categories <DemoTooltip filterName='categories' />
        </h4>
        <div className='categories-list'>
          {['smartphones', 'laptops', 'fragrances', 'groceries'].map((c) => (
            <label key={c} className='checkbox-row'>
              <input
                type='checkbox'
                checked={categories.includes(c)}
                onChange={(e) => toggleCategory(c, e.target.checked)}
              />
              <span className='checkbox-label'>{transformPascalCase(c)}</span>
            </label>
          ))}
        </div>
      </div>

      <div className='filters-section'>
        <h4 className='filters-title'>
          Price <DemoTooltip filterName='categories' />
        </h4>
        <div className='price-row'>
          <input
            type='number'
            placeholder='Min'
            value={minPriceLocal}
            onChange={(e) => setMinPriceLocal(e.target.value)}
          />
          <input
            type='number'
            placeholder='Max'
            value={maxPriceLocal}
            onChange={(e) => setMaxPriceLocal(e.target.value)}
          />
        </div>
        <div className='price-actions'>
          <button className='btn-small' onClick={applyPrice}>
            Apply
          </button>
          <button
            className='btn-ghost'
            onClick={() => {
              setMinPriceLocal('');
              setMaxPriceLocal('');
            }}
          >
            Clear
          </button>
        </div>
      </div>

      <div className='filters-section'>
        <h4 className='filters-title'>
          Rating <DemoTooltip filterName='categories' />
        </h4>
        <select
          onChange={(e) => onChange('rating', e.target.value)}
          defaultValue={searchParams.get('rating') || ''}
        >
          <option value=''>Any</option>
          {[5, 4, 3, 2, 1].map((r) => (
            <option key={r} value={r}>
              {r}+
            </option>
          ))}
        </select>
      </div>

      <div className='filters-actions'>
        <button className='btn' onClick={clearFilters}>
          Reset filters
        </button>
      </div>
    </aside>
  );
}

export default ProductFilters;
