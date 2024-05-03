export type TConfirmLogout = {
  isOpen: boolean;
  onClose: () => void;
  handleLogout: () => void;
  cancelRef: React.RefObject<HTMLButtonElement>;
};
