import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import {
  Event,
  EventDTOCreate,
  onAddEvent,
  onSetActiveEvent,
} from "../store/calendar";

export const useCalendarStore = () => {
  const { events, activeEvent } = useSelector(
    (state: RootState) => state.calendar
  );
  const dispatch = useDispatch();

  const handleActiveEvent = (calendarEvent: Event | null) => {
    dispatch(onSetActiveEvent(calendarEvent));
  };

  const startSavingEvent = (calendarEven: Event | EventDTOCreate) => {
    if ("_id" in calendarEven) {
      // guardar
    } else {
      // crear
      dispatch(onAddEvent({ ...calendarEven, _id: new Date().getTime() }));
    }
  };

  return {
    events,
    activeEvent,
    handleActiveEvent,
    startSavingEvent,
  };
};
