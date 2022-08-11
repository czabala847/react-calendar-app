import React from "react";
import { Calendar, CalendarProps } from "react-big-calendar";
import { addHours } from "date-fns";
import { Navbar } from "../components";

import { getMessagesEs, localizer } from "../../helpers";
import "react-big-calendar/lib/css/react-big-calendar.css";

const myEventsList = [
  {
    title: "Cumpleaños del jefe",
    notes: "Hay que comprar el pastel",
    start: new Date(),
    end: addHours(new Date(), 2),
    bgColor: "#fafafa",
    user: {
      _id: "123",
      name: "Carlos",
    },
  },
];

export const CalendarPage: React.FC = () => {
  const eventStyleGetter = (
    event: typeof myEventsList[0],
    start: Date,
    end: Date,
    isSelected: boolean
  ) => {
    console.log({ event, start, end, isSelected });

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
      />
    </>
  );
};
