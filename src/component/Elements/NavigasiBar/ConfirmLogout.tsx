import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import React from "react";

interface ConfirmLogoutProps {
  cancelRef: React.RefObject<HTMLButtonElement>;
  onClose: () => void;
  isOpen: boolean;
  handleLogout: React.MouseEventHandler<HTMLButtonElement>;
}

const ConfirmLogout = ({
  cancelRef,
  onClose,
  isOpen,
  handleLogout,
}: ConfirmLogoutProps) => {
  return (
    <>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent borderRadius="xl" backgroundColor="#1f3933">
          <AlertDialogHeader color="white">Yakin mau Logout?</AlertDialogHeader>
          <AlertDialogFooter>
            <Button
              ref={cancelRef}
              onClick={onClose}
              className="hover:scale-110"
            >
              Cancel
            </Button>
            <Button
              colorScheme="red"
              ml={3}
              onClick={handleLogout}
              className="hover:scale-110"
            >
              Logout
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ConfirmLogout;
