import { useEffect } from "react";

export const useScrollTop = () => {
  const scrollTop = () => {
    scrollTo({ top: 0, behavior: "smooth" });
  };
  useEffect(() => {
    scrollTop();
  }, [scrollTop]);
};
