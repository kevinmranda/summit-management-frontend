import { useState, useCallback } from 'react';

export const useApi = <T>(apiCall: (...args: any[]) => Promise<{ data: T }>) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(async (...args: any[]): Promise<T> => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiCall(...args);
      setData(response.data);
      return response.data;
    } catch (err: any) {
      const message =
        err?.response?.data?.message ||
        err?.response?.data ||
        err?.message ||
        'An unknown error occurred';

      setError(typeof message === 'string' ? message : JSON.stringify(message));
      throw err;
    } finally {
      setLoading(false);
    }
  }, [apiCall]);

  return { data, loading, error, execute };
};
