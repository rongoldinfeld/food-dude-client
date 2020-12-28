import { useEffect, useState } from 'react';

export function useFetch<T>({ request, initialData }: { request: any; initialData: T }) {
  const [data, setData] = useState<T>(initialData);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    let active = true;
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);
      if (active) {
        try {
          const result = await request();
          setData(result);
        } catch (error) {
          setIsError(true);
        }
      }

      setIsLoading(false);
    };

    fetchData();
    return () => {
      active = false;
    };
  }, [request]);

  return [{ data, isLoading, isError, setData }];
}
