import {useEffect, useState} from "react";

export function useFetch<T>(asyncFn: () => Promise<T>, deps: unknown[] = []) {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;
        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                const result = await asyncFn();
                if (isMounted) {
                    setData(result);
                }
            } catch (error) {
                const err = error as Error;
                if (isMounted) {
                    setError(err.message || "Erreur serveur");
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
    }, deps);
    return {data, loading, error};
}
