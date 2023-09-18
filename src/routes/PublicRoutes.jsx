import { Route, Routes } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import Page404 from "../pages/Page404";


const PublicRoutes = ({}) => {
    return(
        <Routes>
            <Route exact path="/login" element={<LoginPage/>}></Route>
            <Route exact path="*" element={<Page404/>}></Route>
        </Routes>
    )
}

export default PublicRoutes;