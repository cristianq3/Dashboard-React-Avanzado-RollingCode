import { types } from "../types/types";

const SalesReducer = (state = {}, action) => {
  switch (action.type) {
    case types.sales.listSales:
      return {
        ...state,
        sales: action.payload.sales,
        errorMessage: action.payload.errorMessage,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default SalesReducer;
