import Layout from '../layout/Layout';
import Home from '../pages/Home';
import Products from '../pages/Products';
import Cart from '../pages/Cart';
import { createBrowserRouter, RouteObject } from 'react-router-dom';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/products',
        element: <Products />,
      },
      {
        path: '/cart',
        element: <Cart />,
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
