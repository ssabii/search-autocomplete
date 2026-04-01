import { useEffect, useState } from "react";

interface UseDebouncedValueProps<T> {
  value: T;
  delay?: number;
}

function useDebouncedValue<T>({
  value: valueProp,
  delay = 300,
}: UseDebouncedValueProps<T>) {
  const [value, setValue] = useState<T | undefined>(undefined);

  useEffect(() => {
    const timer = setTimeout(() => setValue(valueProp), delay);

    return () => clearTimeout(timer);
  }, [valueProp]);

  return value;
}

export default useDebouncedValue;
