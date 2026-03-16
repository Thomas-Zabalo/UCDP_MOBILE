import { useEffect, useState } from "react";
import axios from "axios";

export function useFetch(url: string) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setData(null);
    setError(null);
    axios
      .get(url)
      .then((res) => {
        setLoading(false);
        setData(res.data);
      })
      .catch((err) => {
        setLoading(false);
        setError(err.message || "Erreur serveur");
      })
      .finally(() => setLoading(false));
  });

  return { data, loading, error };
}
