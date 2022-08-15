import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { onCloseDateModal, onOpenDateModal } from "../store/ui";

export const useUiStore = () => {
  const { isDateOpenModal } = useSelector((state: RootState) => state.ui);
  const dispatch = useDispatch();

  const openDateModal = () => {
    dispatch(onOpenDateModal());
  };

  const closeDateModal = () => {
    dispatch(onCloseDateModal());
  };

  return {
    isDateOpenModal,
    openDateModal,
    closeDateModal,
  };
};
