import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './config/query.config';
import { RouterProvider } from 'react-router-dom';
import { router } from './Router/Router';

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
