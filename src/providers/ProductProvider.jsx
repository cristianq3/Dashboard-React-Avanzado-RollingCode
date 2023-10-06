import { useReducer } from "react";
import { ProductContext } from "../contexts/ProductContext";
import { ProductReducer } from "../reducers/ProductReducer";
import { types } from "../types/types";
import { dashAxios } from "../config/dashAxios";

const initialState = {
  products: null,
  categories:[],
  errorMessage: "",
  isLoading: true,
};

export const ProductProvider = ({ children }) => {

  const [state, dispatch] = useReducer(ProductReducer, initialState);
  
  
  const addProduct = async (values) => {
    try {
      console.log(values)
      const response = await dashAxios.post("/products", {
        productName: values.productName,
        price: values.price,
        stock: values.stock,
        status: values.status,
        category: values.category,
        detail: values.detail,
        Image: values.image
      });
      if (response.status === 201) {
        dispatch({
          type: types.products.addProduct,
          payload: {
            products:values
          }
        });
      }
      alert("Producto creado correctamente");
    } catch (error) {
      console.log(error);
      dispatch({
        type: types.products.addProduct,
        payload: {
          errorMessage: error
        }
      });
    }
  };
  const getListCategories = async () => {
    try {
      const response = await dashAxios.get("/categories");
      dispatch({
        type: types.products.getCategories,
        payload: {
          categories: response.data,
        }
      })
      
    }catch(error){
      dispatch({
        type: types.products.getCategories,
        payload: {
          errorMessage: error,
        }
      })
    }}

  return (
    <ProductContext.Provider
      value={{
        state,
        addProduct,
        getListCategories
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
