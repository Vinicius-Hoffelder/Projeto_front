import { useEffect, useState } from "react";
import { errorMessage, getProduct, getProducts } from "../services/api";

export default function useApi(kind, value) {
  const [result, setResult] = useState({ key: "", data: null, error: "" });
  const [attempt, setAttempt] = useState(0);
  const key = JSON.stringify([kind, value, attempt]);

  useEffect(() => {
    const controller = new AbortController();
    const request = kind === "product" ? getProduct(value, controller.signal) : getProducts(value, controller.signal);
    request.then((data) => {
      if (!controller.signal.aborted) setResult({ key, data, error: "" });
    }).catch((reason) => {
      if (!controller.signal.aborted) setResult({ key, data: null, error: errorMessage(reason) });
    });
    return () => controller.abort();
  }, [kind, value, key]);

  const loading = result.key !== key;
  return { data: loading ? null : result.data, loading, error: loading ? "" : result.error, retry: () => setAttempt((current) => current + 1) };
}
