import { useRef, useState } from "react";

type UpdateFn<T> = (prevState: T, optimisticValue: T) => T;

export function useOptimistic<T>(
  initialState: T,
  updateFn: UpdateFn<T>,
): [T, (optimisticValue: T) => void, () => void] {
  const [state, setState] = useState<T>(initialState);
  const optimisticRef = useRef<T | null>(null);

  const addOptimistic = (optimisticValue: T): void => {
    optimisticRef.current = state;
    setState((prevState: T) => updateFn(prevState, optimisticValue));
  };

  const revertOptimistic = (): void => {
    if (optimisticRef.current !== null) {
      setState(optimisticRef.current);
      optimisticRef.current = null;
    }
  };

  return [state, addOptimistic, revertOptimistic];
}
