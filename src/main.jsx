import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthProvider } from "./providers/AuthProvider.jsx";
import { UsersProvider } from "./providers/UsersProvider.jsx";
import { ProductProvider } from "./providers/ProductProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <UsersProvider>
        <ProductProvider>
          <App />
        </ProductProvider>
      </UsersProvider>
    </AuthProvider>
  </React.StrictMode>
);
