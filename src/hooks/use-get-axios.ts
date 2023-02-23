import axios from "axios";
import { useState } from "react";

export default function useGetAxios<T>() {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<unknown>(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async (url: string, params: Record<string, string | number> = {}) => {
    setLoading(true);
    try {
      const { data } = await axios.get(url, { params });
      setData(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  return { data, error, loading, fetchData }
}
