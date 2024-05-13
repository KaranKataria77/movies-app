import React, { useEffect, useState } from "react";

const useDebounce = (val: string) => {
  const [debouncedValue, setDebouncedValue] = useState<string>("");
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedValue(val);
    }, 2000);
    return () => {
      clearTimeout(timerId);
    };
  }, [val]);
  return { debouncedValue };
};

export default useDebounce;
