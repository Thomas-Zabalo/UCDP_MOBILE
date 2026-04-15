import { useEffect, useState, useCallback } from "react";

export function useFetch<T>(asyncFn: () => Promise<T>, deps: never[] = []) {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const execute = useCallback(async () => {
        let isMounted = true;

        setLoading(true);
        setError(null);

        try {
            const result = await asyncFn();
            if (isMounted) {
                setData(result);
            }
        } catch (err) {
            if (isMounted) {
                setError(err.response?.data?.message || err.message || "Une erreur est survenue");
            }
        } finally {
            if (isMounted) {
                setLoading(false);
            }
        }

        return () => {
            isMounted = false;
        };
    }, deps);

    useEffect(() => {
        execute();
    }, [execute]);

    return { data, loading, error, refetch: execute };
}