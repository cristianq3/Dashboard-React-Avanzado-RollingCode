import { Route, Routes } from "react-router-dom";
import Dashboard from "../layouts/dashboard";
import DashboardAppPage from "../pages/DashboardAppPage";
import DashboardLayout from "../layouts/dashboard/DashboardLayout";
import UserPage from "../pages/UserPage";
import ProductsPage from "../pages/ProductsPage";
import BlogPage from "../pages/BlogPage";
import Page404 from "../pages/Page404";



const AdminRoutes = ({}) => {
    return(
        <Routes>
            <Route exact path="/" element={<DashboardLayout/>}> </Route>
            <Route exact path="/app" element={<DashboardAppPage/>}></Route>
            <Route exact path="/user" element={<UserPage/>}></Route>
            <Route exact path="/products" element={<ProductsPage/>}></Route>
            <Route exact path="/blog" element={<BlogPage/>}></Route>
            <Route exact path="*" element={<Page404/>}></Route>
        </Routes>
    )
}

export default AdminRoutes;