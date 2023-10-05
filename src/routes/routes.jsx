import { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Navigate, useRoutes } from "react-router-dom";
// layouts
import DashboardLayout from "../layouts/dashboard";
import SimpleLayout from "../layouts/simple";
//
import BlogPage from "../pages/BlogPage";
import UserPage from "../pages/UserPage";
import LoginPage from "../pages/LoginPage";
import Page404 from "../pages/Page404";
import ProductsPage from "../pages/ProductsPage";
import DashboardAppPage from "../pages/DashboardAppPage";
import RegisterPage from "../pages/RegisterPage";
import AuthLayout from "../layouts/authuser/AuthLayout";
import { Loading } from "../components/loading/Loading";
// import ContainerUserForm from "../sections/@dashboard/user/ContainerUserForm";
import ProductAdd from "../sections/@dashboard/products/ProductAdd";
import CreateUserForm from "../sections/@dashboard/user/CreateUserForm";
import EditUserForm from "../sections/@dashboard/user/EditUserForm";

// ----------------------------------------------------------------------

export default function Router() {
  const { checkAuthToken, state } = useContext(AuthContext);
  
   useEffect(() =>{
    checkAuthToken()
   }, [])

  const routes = useRoutes([
    {
      path: "/dashboard",
      element: state.isLogged ? (
        <DashboardLayout />
      ) : (
        <Navigate to="/auth/login"/>
        ),
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: "app", element: <DashboardAppPage /> },
        { path: "user", element: <UserPage /> },
        { path: "user/new", element: <CreateUserForm /> },
        { path: 'user/edit', element: <EditUserForm/>},
        { path: "products", element: <ProductsPage /> },
        { path: "addproduct", element: <ProductAdd /> },
        { path: "blog", element: <BlogPage /> },
      ],
    },
    {
      path: "/auth",
      element: !state.isLogged ? (<AuthLayout />) : (<Navigate to="/dashboard"/>),
      children: [
        { element: <Navigate to="/auth/login" />, index: true },
        { path: "login", element: <LoginPage /> },
        { path: "register", element: <RegisterPage /> },
      ],
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        // { path: "404", element: <Page404 /> },
        // { path: "*", element: <Navigate to="/404" /> },
      ],
    },
    {
      // path: "*",
      // element: <Navigate to="/404" replace />,
    },
  ]);

  if (state.isLoading) {
    return <Loading></Loading>;
  }

  return routes;
}
