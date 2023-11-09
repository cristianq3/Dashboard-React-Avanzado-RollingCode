import { types } from '../types/types';

export const ProductReducer = (state = {}, action) => {
  switch (action.type) {
    case types.products.listProducts:
      return {
        ...state,
        products: action.payload.products,
        errorMessage: action.payload.errorMessage,
        isLoading: false,
      };

    case types.products.addProduct:
      return {
        ...state,
        products: action.payload.products,
        errorMessage: action.payload.errorMessage,
        isLoading: 'false',
      };

    case types.products.deleteProduct:
      return {
        ...state,
        products: action.payload.products,
        errorMessage: action.payload.errorMessage,
        isLoading: false,
        productDeleted: true,
      };
    case types.products.editProduct:
      return {
        ...state,
        products: action.payload.products,
        errorMessage: '',
        isLoading: false,
      };
    case types.products.getCategories:
      return {
        ...state,
        categories: action.payload.categories,
        errorMessage: '',
        isLoading: false,
      };
    case types.products.getProduct:
      return {
        ...state,
        categories: action.payload.categories,
        errorMessage: '',
        productSelected: action.payload.productSelected,
        isLoading: false,
      };

    default:
      return state;
  }
};
