import { useReducer } from "react";
import { ProductContext } from "../contexts/ProductContext";
import { ProductReducer } from "../reducers/ProductReducer";
import { types } from "../types/types";
import { dashAxios } from "../config/dashAxios";

const initialState = {
  products: null,
  errorMessage: "",
  isLoading: true,
};

export const ProductProvider = ({ children }) => {

  const [state, dispatch] = useReducer(ProductReducer, initialState);
  
  
  const addProduct = async (values) => {
    try {
      const response = await api.post("/productos", {
        idCategoria: values.idCategoria,
        nombreProducto: values.nombreProducto,
        precio: values.precio,
        imagenTarjeta: values.imagenTarjeta,
        imagenDetalle: values.imagenDetalle,
        detalle: values.detalle,
        stock: values.stock,
        estado: values.estado,
      });
      if (response.status === 201) {
        dispatch({
          type: types.products.addProduct,
          payload: values,
        });
      }
      alert("Usuario creado correctamente");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ProductContext.Provider
      value={{
        state,
        addProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
