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
import calendarApi from "../api/calendarApi";

export const useCalendarStore = () => {
  const { events, activeEvent } = useSelector(
    (state: RootState) => state.calendar
  );
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const handleActiveEvent = (calendarEvent: Event | null) => {
    dispatch(onSetActiveEvent(calendarEvent));
  };

  const startSavingEvent = async (calendarEven: Event | EventDTOCreate) => {
    if ("id" in calendarEven) {
      //Actualizar
      dispatch(onUpdateEvent({ ...calendarEven }));
    } else {
      // crear

      const { data } = await calendarApi.post("/events", calendarEven);
      if (user) {
        dispatch(
          onAddEvent({
            ...calendarEven,
            id: data.event.id,
            user,
          })
        );
      }
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
