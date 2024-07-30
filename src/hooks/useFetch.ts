import { useState, useEffect } from "react";

type Props = {
  endpoint: string;
};

export const useFetch = ({ endpoint }: Props) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(endpoint);

        if (!response.ok) {
          throw new Error("Error while getting categories");
        }

        const data = await response.json();
        setData(data);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Unknown error.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint]);

  return {
    data,
    loading,
    error,
  };
};
