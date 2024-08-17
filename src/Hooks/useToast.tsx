import { useToast, UseToastOptions } from "@chakra-ui/react";

export const useCustomToast = () => {
  const toast = useToast();

  const SuccessToast = (props: UseToastOptions) => {
    toast({
      ...props,
      status: "success",
      position: "top",
      duration: 1500,
      isClosable: true,
      containerStyle: {
        marginTop: "80px",
        fontSize: "12px",
      },
    });
  };

  const ErrorToast = (props: UseToastOptions) => {
    toast({
      ...props,
      status: "error",
      position: "top",
      duration: 1500,
      isClosable: true,
      containerStyle: {
        marginTop: "80px",
        fontSize: "12px",
      },
    });
  };

  const InfoToast = (props: UseToastOptions) => {
    toast({
      ...props,
      status: "info",
      position: "top",
      duration: 1500,
      isClosable: true,
      containerStyle: {
        marginTop: "80px",
        fontSize: "12px",
      },
    });
  };

  const WarningToast = (props: UseToastOptions) => {
    toast({
      ...props,
      status: "warning",
      position: "top",
      duration: 1500,
      isClosable: true,
      containerStyle: {
        marginTop: "80px",
        fontSize: "12px",
      },
    });
  };

  return {
    SuccessToast,
    ErrorToast,
    InfoToast,
    WarningToast,
  };
};
