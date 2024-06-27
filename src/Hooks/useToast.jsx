import React from "react";
import { useToast } from "@chakra-ui/react";

export const useCustomToast = () => {
  const toast = useToast();

  const showToast = (options) => {
    const defaultOptions = {
      status: "success", // Set default status to success
      position: "top",
      duration: 1500,
      isClosable: true,
      containerStyle: {
        marginTop: "80px",
        fontSize: "12px",
      },
    };

    const mergedOptions = { ...defaultOptions, ...options };

    toast({ ...mergedOptions });
  };

  const SuccessToast = (props) => {
    showToast({ ...props, status: "success" });
  };

  const ErrorToast = (props) => {
    showToast({ ...props, status: "error", fontSize: "12px" }); // Set error specific styles here
  };

  const InfoToast = (props) => {
    showToast({ ...props, status: "info" });
  };

  const WarningToast = (props) => {
    showToast({ ...props, status: "warning" });
  };

  return {
    SuccessToast,
    ErrorToast,
    InfoToast,
    WarningToast,
  };
};
