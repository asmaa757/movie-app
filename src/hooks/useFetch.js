import { useEffect, useState } from "react";

function useFetch(
  fetchFunction,
  dependencies = [],
  enabled = true
) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(enabled);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!enabled) {
      setLoading(false);
      setData(null);
      return;
    }

    let isMounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");

        const result = await fetchFunction();

        if (isMounted) {
          setData(result);
        }
      } catch (err) {
        console.error(err);

        if (isMounted) {
          setError("Failed to load data.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [...dependencies, enabled]);

  return { data, loading, error };
}

export default useFetch;