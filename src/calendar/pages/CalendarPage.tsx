import React, { useState } from "react";
import { Calendar, Views } from "react-big-calendar";
import { addHours } from "date-fns";

import { CalendarEvent, CalendarModal, Navbar } from "../components";

import { useUiStore } from "../../hooks";
import { getMessagesEs, localizer } from "../../helpers";
import { EventList } from "../types";
import "react-big-calendar/lib/css/react-big-calendar.css";

const myEventsList: EventList[] = [
  {
    title: "Evento 1",
    notes: "....",
    start: new Date(),
    end: addHours(new Date(), 2),
    bgColor: "#fafafa",
    user: {
      _id: "123",
      name: "Carlos Zabala",
    },
  },
];

export const CalendarPage: React.FC = () => {
  const [view, setView] = useState(localStorage.getItem("view") || "MONTH");
  const { openDateModal } = useUiStore();

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

  const onSelectEvent = (event: EventList) => {
    // console.log(event);
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
        events={myEventsList}
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
        onSelectEvent={onSelectEvent}
        onDoubleClickEvent={onOpenEvent}
        onView={changeView}
      />

      <CalendarModal />
    </>
  );
};
