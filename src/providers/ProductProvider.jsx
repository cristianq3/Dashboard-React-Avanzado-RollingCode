import { useReducer } from "react";
import { ProductContext } from "../contexts/ProductContext";
import { ProductReducer } from "../reducers/ProductReducer";
import { types } from "../types/types";
import { dashAxios } from "../config/dashAxios";

const initialState = {
  products: [],
  categories:[],
  errorMessage: "",
  isLoading: true,
};

export const ProductProvider = ({ children }) => {

  const [state, dispatch] = useReducer(ProductReducer, initialState);
  
  
  const addProduct = async (values) => {
    console.log(values.image)
    const formData = new FormData();
    formData.append('productName', values.productName);
    formData.append('price', values.price);
    formData.append('stock', values.stock);
    formData.append('status', values.status);
    formData.append('category', values.category);
    formData.append('detail', values.detail); 
    formData.append('image', values.image);
console.log(formData);
    try {
      
      const response = await dashAxios.post("/products", formData, {
        headers: {
          'Content-Type': 'multipart/form-data', 
        },
      });
      console.log(response);
      if (response.status === 201) {
        dispatch({
          type: types.products.addProduct,
          payload: {
            products: formData,
            isLoading: false  
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
  const getListProducts = async () => {
    try {
      const response = await dashAxios.get("/products");
      console.log(response.data)
      dispatch({
        type: types.products.listProducts,
        payload: {
          products: response.data,
        }
      })
      
    }catch(error){
      dispatch({
        type: types.products.listProducts,
        payload: {
          errorMessage: error,
        }
      })
    }
  };

  return (
    <ProductContext.Provider
      value={{
        state,
        addProduct,
        getListCategories,
        getListProducts
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
