import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthProvider } from "./providers/AuthProvider.jsx";
import { ProductProvider } from "./providers/ProductProvider.jsx";
import { UsersProvider } from "./providers/UsersProvider.jsx";
import { Provider } from 'react-redux/es/exports.js'
import { store } from './store/store.js'

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <UsersProvider>
        <ProductProvider>
          <Provider store={store}>
            <App />
          </Provider>
        </ProductProvider>
      </UsersProvider>
    </AuthProvider>
  </React.StrictMode>
);
