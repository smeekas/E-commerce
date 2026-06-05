import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { Product } from '../dto/product.dto';

export type CartContext = {
  products: (Product & { qty: number })[];
  updateQty: (arg0: Product, arg1: 'inc' | 'dec') => void;
};
const cartContext = createContext<CartContext>({
  products: [],
  updateQty: () => {},
});

type CartContextProviderProps = {
  children: ReactNode;
};
export const CartContextProvider = ({ children }: CartContextProviderProps) => {
  const [cart, setCart] = useState<CartContext['products']>([]);

  const updateQty: CartContext['updateQty'] = useCallback(
    (productItem, mode) => {
      console.log('exec');
      setCart((prev) => {
        const newProducts = structuredClone(prev);
        const itemIndex = newProducts.findIndex(
          (prevItem) => prevItem.id === productItem.id,
        );
        if (itemIndex === -1)
          return [...newProducts, { ...productItem, qty: 1 }];
        if (mode === 'dec') {
          newProducts[itemIndex].qty = Math.max(
            0,
            newProducts[itemIndex].qty - 1,
          );
          if (newProducts[itemIndex].qty === 0) {
            newProducts.splice(itemIndex, 1);
          }
          return newProducts;
        }
        if (mode === 'inc') {
          newProducts[itemIndex].qty = Math.min(
            newProducts[itemIndex].qty + 1,
            newProducts[itemIndex].stock,
          );
        }
        return newProducts;
      });
    },
    [],
  );

  const memoedValue = useMemo<CartContext>(
    () => ({ products: cart, updateQty }),
    [cart, updateQty],
  );
  console.log(memoedValue);
  return (
    <cartContext.Provider value={memoedValue}>{children}</cartContext.Provider>
  );
};

export function useCart() {
  const cart = useContext(cartContext);
  if (!cart) {
    throw new Error('cart context not available');
  }
  return cart;
}
