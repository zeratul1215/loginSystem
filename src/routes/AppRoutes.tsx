import { lazy, Suspense } from 'react';
import { Route, Routes, useRouteError } from 'react-router';
import { BaseLayout } from '@/layouts';
import SignIn from '@/views/SignIn';
import PrivateRoute from './PrivateRoute';

const Home = lazy(() => import('@/views/Home'));
const NotFound = lazy(() => import('@/views/NotFound'));

function RootErrorBoundary() {
  const error = useRouteError() as Error;
  if (error.message.includes('Failed to fetch dynamically imported module')) {
    location.reload();
  }
  return null;
}

const lazyView = (view: JSX.Element) => {
  return <Suspense fallback="Loading...">{view}</Suspense>;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<BaseLayout />}
        errorElement={<RootErrorBoundary />}
      >
        {/* 公开路由 - 不需要登录 */}
        <Route path="/login" element={lazyView(<SignIn />)} />

        {/* 受保护的路由 - 需要登录 */}
        <Route element={<PrivateRoute />}>
          <Route index element={lazyView(<Home />)} />
        </Route>

        {/* 404 页面 */}
        <Route path="*" element={lazyView(<NotFound />)} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
