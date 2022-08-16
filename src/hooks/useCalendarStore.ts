import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import {
  Event,
  EventDTOCreate,
  onAddEvent,
  onDeleteEvent,
  onSetActiveEvent,
  onUpdateEvent,
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
      //Actualizar
      dispatch(onUpdateEvent({ ...calendarEven }));
    } else {
      // crear
      dispatch(onAddEvent({ ...calendarEven, _id: new Date().getTime() }));
    }
  };

  const startDeleteEvent = () => {
    dispatch(onDeleteEvent());
  };

  return {
    events,
    activeEvent,
    isActiveEvent: !!activeEvent,
    handleActiveEvent,
    startDeleteEvent,
    startSavingEvent,
  };
};
