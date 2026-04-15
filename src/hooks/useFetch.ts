import { useEffect, useState, useCallback } from "react";

export function useFetch<T>(asyncFn: () => Promise<T>, deps: unknown[] = []) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await asyncFn();
      setData(result);
    } catch (error) {
      const errorObject = error as Error;
      setError(errorObject.message || "Une erreur est survenue");
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps]);

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      void execute();
    }

    return () => {
      isMounted = false;
    };
  }, [execute]);

  return { data, loading, error, refetch: execute };
}
