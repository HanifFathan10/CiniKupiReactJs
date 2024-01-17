import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
const ConfirmLogout = ({ cancelRef, onClose, isOpen, handleLogout }) => {
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

        <AlertDialogContent>
          <AlertDialogHeader>Yakin mau Logout?</AlertDialogHeader>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Gajadi
            </Button>
            <Button colorScheme="red" ml={3} onClick={handleLogout}>
              Logout
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ConfirmLogout;
