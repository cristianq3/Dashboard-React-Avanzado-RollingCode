import useSWR from "swr";
import { dashAxios } from "../config/dashAxios";

const fetcher = () => dashAxios.get("/sales").then((res) => res.data);

const useSales = () => {
  const { data, error, isLoading } = useSWR(
    import.meta.env.VITE_API_BACKEND,
    fetcher,
    {
      refreshInterval: 1000,
    }
  );
  return {
    sales: data,
    isLoading,
    error,
  };
};

export default useSales;
