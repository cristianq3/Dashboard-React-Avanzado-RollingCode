import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
// routes
import Router from "./routes/routes";
//theme
import ThemeProvider from "./theme";
//components
import { StyledChart } from "./components/chart";
import ScrollToTop from "./components/scroll-to-top";
import { Provider } from "react-redux";
import { store } from "./store/store";
import LoginPage from "./pages/LoginPage";
import Page404 from "./pages/Page404";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import DashboardLayout from "./layouts/dashboard/DashboardLayout";

// ----------------------------------------------------------------------

export default function App() {
  return (
    <Provider store={store}>
      <HelmetProvider>
        <BrowserRouter>
          <ThemeProvider>
            <ScrollToTop />
            <StyledChart />
            <Routes>
              <Route exact path='/login' element={<LoginPage></LoginPage>}></Route>
              <Route exact path='/dashboard/*' element={
              <ProtectedRoutes>
               
                <AdminRoutes></AdminRoutes>
                
              </ProtectedRoutes>}></Route>
              <Route exact path='*' element={<Page404></Page404>}></Route>
            </Routes>
          </ThemeProvider>
        </BrowserRouter>
      </HelmetProvider>
    </Provider>
  );
}
