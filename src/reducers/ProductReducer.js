import { types } from "../types/types";

export const ProductReducer = (state = {}, action) => {
  switch (action.type) {
    case types.products.listProducts:
      return {
        ...state,
        products: action.payload.products,
        errorMessage: "",
        isLoading: false,
      };

    case types.products.addProduct:
      return {
        ...state,
        products: action.payload.products,
        errorMessage: "",
        isLoading: false,
      };

    case types.products.deleteProduct:
      return {
        ...state,
        products: action.payload.products,
        errorMessage: "",
        isLoading: false,
      };
    case types.products.editProduct:
      return {
        ...state,
        products: action.payload.products,
        errorMessage: "",
        isLoading: false,
      };

    default:
      return state;
  }
};
