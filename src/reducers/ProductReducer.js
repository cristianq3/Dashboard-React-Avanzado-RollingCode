import { types } from "../types/types";

export const ProductReducer = (state = {}, action) => {
  switch (action.type) {
    case types.products.listProducts:
      return {
        ...state,
        products: action.payload,
        errorMessage: "",
        isLoading: false,
      };

    case types.products.addProduct:
      return {
        ...state,
        products: action.payload.products,
        errorMessage: action.payload.errorMessage,
        isLoading: false,
      };

    case types.products.deleteProduct:
      return {
        ...state,
        products: action.payload,
        errorMessage: "",
        isLoading: false,
      };
    case types.products.editProduct:
      return {
        ...state,
        products: action.payload,
        errorMessage: "",
        isLoading: false,
      };
      case types.products.getCategories:
        return {
          ...state,
          categories: action.payload.categories,
          isLoading: false,
        }

    default:
      return state;
  }
};
