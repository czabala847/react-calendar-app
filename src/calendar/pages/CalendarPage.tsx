import React, { useState } from "react";
import { Calendar, Views } from "react-big-calendar";

import { CalendarEvent, CalendarModal, FabAddNew, Navbar } from "../components";

import { useCalendarStore, useUiStore } from "../../hooks";
import { getMessagesEs, localizer } from "../../helpers";
import { EventList } from "../types";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Event, EventDTOCreate } from "../../store/calendar";
export const CalendarPage: React.FC = () => {
  const [view, setView] = useState(localStorage.getItem("view") || "MONTH");
  const { openDateModal } = useUiStore();
  const { events, handleActiveEvent } = useCalendarStore();

  const eventStyleGetter = (
    event: EventList,
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

  const onOpenEvent = (event: EventList) => {
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
    </>
  );
};
