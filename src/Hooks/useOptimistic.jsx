import React, { useState, useRef } from "react";

export function useOptimistic(initialState, updateFn) {
  const [state, setState] = useState(initialState);
  const optimisticRef = useRef(null);

  const addOptimistic = (optimisticValue) => {
    optimisticRef.current = state;
    setState((prevState) => updateFn(prevState, optimisticValue));
  };

  const revertOptimistic = () => {
    if (optimisticRef.current) {
      setState(optimisticRef.current);
      optimisticRef.current = null;
    }
  };

  return [state, addOptimistic, revertOptimistic];
}
