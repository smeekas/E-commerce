import Layout from '../layout/Layout';
import Home from '../pages/Home';
import Products from '../pages/Products';
import Cart from '../pages/Cart';
import { createBrowserRouter, RouteObject } from 'react-router-dom';
import ProductDetail from '../pages/ProductDetail';
import ShippingForm from '../components/ShippingForm/ShippingForm';

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
        path: '/products/:id',
        element: <ProductDetail />,
      },
      {
        path: '/cart',
        children: [
          {
            path: '',
            element: <Cart />,
          },
          {
            path: '/cart/shipping',
            element: <ShippingForm />,
          },
        ],
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
