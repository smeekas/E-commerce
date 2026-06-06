import { Outlet } from 'react-router-dom';
import Header from '../components/Header/Header';
import { ErrorBoundary } from '../error/ErrorBoundary';

function Layout() {
  return (
    <>
      <Header />
      <ErrorBoundary>
        <Outlet />
      </ErrorBoundary>
    </>
  );
}

export default Layout;
