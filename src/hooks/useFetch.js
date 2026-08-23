import { useEffect, useRef, useState } from "react";

function useFetch(
  fetchFunction,
  dependencies = [],
  enabled = true,
  keepPreviousData = false
) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(enabled);
  const [error, setError] = useState("");
  const hasData = useRef(false);

  useEffect(() => {
    if (!enabled) {
      setLoading(false);
      setData(null);
      hasData.current = false;
      return;
    }

    let isMounted = true;

    const fetchData = async () => {
      try {
        if (!keepPreviousData || !hasData.current) {
          setLoading(true);
        }

        setError("");

        const result = await fetchFunction();

        if (isMounted) {
          setData(result);
          hasData.current = true;
          setLoading(false);
        }
      } catch (err) {
        console.error(err);

        if (isMounted) {
          setError("Failed to load data.");
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [...dependencies, enabled]);

  return {
    data,
    loading,
    error,
  };
}

export default useFetch;