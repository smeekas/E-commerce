import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './config/query.config';
import { RouterProvider } from 'react-router-dom';
import { router } from './Router/Router';
import './App.css';
import { CartContextProvider } from './context/CartContext';

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CartContextProvider>
        <RouterProvider router={router} />
      </CartContextProvider>
    </QueryClientProvider>
  );
}
