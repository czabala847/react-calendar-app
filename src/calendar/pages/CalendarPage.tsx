import React from "react";
import { Calendar, CalendarProps } from "react-big-calendar";
import { addHours } from "date-fns";
import { CalendarEvent, Navbar } from "../components";

import { getMessagesEs, localizer } from "../../helpers";
import { EventList } from "../types";
import "react-big-calendar/lib/css/react-big-calendar.css";

const myEventsList: EventList[] = [
  {
    title: "Cumpleaños del jefe",
    notes: "Hay que comprar el pastel",
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

  return (
    <>
      <Navbar />

      <Calendar
        localizer={localizer}
        events={myEventsList}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "calc(100vh - 80px)" }}
        culture="es"
        messages={getMessagesEs()}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEvent,
        }}
      />
    </>
  );
};
