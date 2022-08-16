import React, { useState } from "react";
import { Calendar, Views } from "react-big-calendar";

import {
  CalendarEvent,
  CalendarModal,
  FabAddNew,
  FabRemoveEvent,
  Navbar,
} from "../components";

import { useCalendarStore, useUiStore } from "../../hooks";
import { getMessagesEs, localizer } from "../../helpers";
import { Event } from "../../store/calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

export const CalendarPage: React.FC = () => {
  const [view, setView] = useState(localStorage.getItem("view") || "MONTH");
  const { openDateModal } = useUiStore();
  const { events, isActiveEvent, handleActiveEvent } = useCalendarStore();

  const eventStyleGetter = (
    event: Event,
    start: Date,
    end: Date,
    isSelected: boolean
  ) => {
    const style = {
      backgroundColor: "#347CF7",
      borderRadius: "0px",
      opacity: 0.8,
      color: "white",
    };

    return { style };
  };

  const onSelectEvent = (event: Event) => {
    handleActiveEvent(event);
  };

  const onOpenEvent = () => {
    openDateModal();
  };

  const changeView = (event: string) => {
    localStorage.setItem("view", event.toUpperCase());
  };

  return (
    <>
      <Navbar />

      <Calendar
        localizer={localizer}
        events={events}
        defaultView={Views[view as keyof typeof Views]}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "calc(100vh - 80px)" }}
        culture="es"
        messages={getMessagesEs()}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEvent,
        }}
        onSelectEvent={(event) => onSelectEvent(event as Event)}
        onDoubleClickEvent={onOpenEvent}
        onView={changeView}
      />

      <CalendarModal />

      <FabAddNew />
      {isActiveEvent && <FabRemoveEvent />}
    </>
  );
};
