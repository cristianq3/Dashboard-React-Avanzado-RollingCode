import { useReducer } from "react";
import { SalesContext } from "../contexts/SalesContext";
import SalesReducer from "../reducers/SalesReducer";
import { types } from "../types/types";
import { dashAxios } from "../config/dashAxios";

const initialSalesState = {
  sales: [],
  errorMessage: "",
  isLoading: true,
};

const SalesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(SalesReducer, initialSalesState);

  const getSales = async () => {
    try {
      const response = await dashAxios.get("/sales");
      console.log(response.data);
      dispatch({
        type: types.sales.listSales,
        payload: {
          sales: response.data,
        },
      });
    } catch (error) {
      dispatch({
        type: types.sales.listSales,
        payload: {
          errorMessage: error,
        },
      });
    }
  };

  return (
    <SalesContext.Provider value={{ state, getSales }}>
      {children}
    </SalesContext.Provider>
  );
};

export default SalesProvider;
