import { Product } from '../dto/product.dto';

export enum Filters {
  Page = 'page',
  Search = 'search',
  SortBy = 'sortBy',
  Order = 'order',
}
export enum SortMode {
  Asc = 'asc',
  Dsc = 'desc',
}
export const sortKeys: (keyof Pick<
  Product,
  | 'title'
  | 'description'
  | 'category'
  | 'price'
  | 'rating'
  | 'stock'
  | 'weight'
  | 'discountPercentage'
>)[] = [
  'title',
  'description',
  'category',
  'price',
  'rating',
  'stock',
  'weight',
  'discountPercentage',
];
