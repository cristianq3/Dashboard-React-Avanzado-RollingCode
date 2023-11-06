import useSWR from "swr";
import { dashAxios } from "../config/dashAxios";

const useSalesFilter = (url) => {
  const fetcher = () => dashAxios.get(url).then((res) => res.data);

  const { data, error, isLoading } = useSWR(
    `${import.meta.env.VITE_API_BACKEND}` + url,
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

export default useSalesFilter;
