import { useEffect, useRef, useState } from 'react';
import './SortDropdown.css';

export interface SortOption {
  label: string;
  value: string;
}

interface SortDropdownProps {
  options: SortOption[];
  value: string;
  onChange: (value: string) => void;
  label?: string;
}

function SortDropdown({
  options,
  value,
  onChange,
  label = 'Sort by',
}: SortDropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selected = options.find((o) => o.value === value);
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function handleSelect(optionValue: string) {
    onChange(optionValue);
    setOpen(false);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Escape') setOpen(false);
    if (e.key === 'Enter' || e.key === ' ') setOpen((prev) => !prev);
  }

  return (
    <div className='sort-dropdown' ref={ref}>
      {label && <span className='sort-dropdown__label'>{label}</span>}
      <button
        type='button'
        className={`sort-dropdown__trigger${open ? ' sort-dropdown__trigger--open' : ''}`}
        onClick={() => setOpen((prev) => !prev)}
        onKeyDown={handleKeyDown}
        aria-haspopup='listbox'
        aria-expanded={open}
      >
        <span className='sort-dropdown__selected'>
          {selected ? selected.label : 'Select…'}
        </span>
        <svg
          className='sort-dropdown__chevron'
          width='14'
          height='14'
          viewBox='0 0 14 14'
          fill='none'
          aria-hidden='true'
        >
          <path
            d='M3 5l4 4 4-4'
            stroke='currentColor'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      </button>

      {open && (
        <ul className='sort-dropdown__menu' role='listbox' aria-label={label}>
          {options.map((option) => (
            <li
              key={option.value}
              role='option'
              aria-selected={option.value === value}
              className={`sort-dropdown__option${option.value === value ? ' sort-dropdown__option--active' : ''}`}
              onClick={() => handleSelect(option.value)}
            >
              {option.value === value && (
                <svg
                  className='sort-dropdown__check'
                  width='12'
                  height='12'
                  viewBox='0 0 12 12'
                  fill='none'
                  aria-hidden='true'
                >
                  <path
                    d='M2 6l3 3 5-5'
                    stroke='currentColor'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              )}
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SortDropdown;
