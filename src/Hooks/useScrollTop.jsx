import React, { useEffect } from "react";

export const useScrollTop = () => {
  useEffect(() => {
    const scrollTop = () => {
      scrollTo({ top: 0, behavior: "smooth" });
    };
    scrollTop();
  }, []);
};
