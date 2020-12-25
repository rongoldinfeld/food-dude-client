import { useEffect, useState } from 'react';

export function useFetch<T>({
  request,
  initialData,
}: {
  request: () => Promise<T>;
  initialData: T;
}) {
  const [data, setData] = useState<T>(initialData);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await request();
        setData(result);
      } catch (error) {
        setIsError(true);
      }

      setIsLoading(false);
    };

    fetchData();
  }, []);

  return [{ data, isLoading, isError, setData }];
}
