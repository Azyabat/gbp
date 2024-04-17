import { useCallback } from "react";
import { AddModal } from "../AddModal";
import { useUnit } from "effector-react";
import { setVisibleEditModal } from "../../store";

export const EditModal = () => {
  const setVisible = useUnit(setVisibleEditModal);

  const handleClose = useCallback(() => {
    setVisible(false);
  }, [setVisible]);
  return <AddModal isUpdate onClose={handleClose} />;
};
