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
      console.log(values)
      // const response = await dashAxios.post("/products", {
      //   productName: values.productName,
      //   price: "",
      //   stock: "",
      //   status: "activo",
      //   category: "",
      //   detail: "",
      // });
      // if (response.status === 201) {
      //   dispatch({
      //     type: types.products.addProduct,
      //     payload: values,
      //   });
      // }
      // alert("Usuario creado correctamente");
    } catch (error) {
      console.log(error);
    }
  };
  const getListCategories = async () => {
    try {
      const response = await dashAxios.get("/categories");
      // console.log(response.data);
      return response.data
    }catch(error){
      console.log(error);
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
