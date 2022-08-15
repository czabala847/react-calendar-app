import { useSelector } from "react-redux";
import { RootState } from "../store/store";

export const useCalendarStore = () => {
  const { events } = useSelector((state: RootState) => state.calendar);

  return {
    events,
  };
};
