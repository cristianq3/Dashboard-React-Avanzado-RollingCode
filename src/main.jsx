import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthProvider } from "./providers/AuthProvider.jsx";
import { ProductProvider } from "./providers/ProductProvider.jsx";
import SalesProvider from "./providers/SalesProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <ProductProvider>
        <SalesProvider>
          <App />
        </SalesProvider>
      </ProductProvider>
    </AuthProvider>
  </React.StrictMode>
);
