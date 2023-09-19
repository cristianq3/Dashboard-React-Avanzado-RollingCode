import { useSelector } from 'react-redux';
import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from '../layouts/dashboard';
import SimpleLayout from '../layouts/simple';
//
import BlogPage from '../pages/BlogPage';
import UserPage from '../pages/UserPage';
import LoginPage from '../pages/LoginPage';
import Page404 from '../pages/Page404';
import ProductsPage from '../pages/ProductsPage';
import DashboardAppPage from '../pages/DashboardAppPage';
import  RegisterPage  from '../pages/RegisterPage';
import AuthLayout from '../layouts/authuser/AuthLayout';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';


// ----------------------------------------------------------------------

export default function Router() {
  const {state } = useContext(AuthContext)
  // const { userInfo, isLogged } = useSelector((state) => state.auth);
  // console.log(isLogged);
  const routes = useRoutes([
    {
      path: '/dashboard',
      element:
        state.isLogged ? (
          <DashboardLayout />
        ) : (
          <Navigate to="/auth/login" />
        ),
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'user', element: <UserPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
      ],
    },

    {
      path: '/auth',
      element: <AuthLayout />,
      children: [
        { element: <Navigate to="/auth/login" />, index: true },
        { path: 'login', element: <LoginPage /> },
        { path: 'register', element: <RegisterPage /> },
        // { path: 'products', element: <ProductsPage /> },
        // { path: 'blog', element: <BlogPage /> },
      ],
    },
    // {
    //   path: 'login',
    //   element: <LoginPage />,
    // },
    // {
    //   path: 'register',
    //   element: <RegisterPage />,
    // },

    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
