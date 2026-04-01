import { useEffect, useState } from "react";
import { Product, searchProducts } from "../../api/products";

function useSearchProducts(query?: string) {
  const [data, setData] = useState<Product[] | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!query) {
      setData(undefined);
      return;
    }

    const getProducts = async (q: string) => {
      setIsLoading(true);

      const res = await searchProducts(q);

      setData(res);
      setIsLoading(false);
    };

    getProducts(query);
  }, [query]);

  return {
    data,
    isLoading,
  };
}

export default useSearchProducts;
