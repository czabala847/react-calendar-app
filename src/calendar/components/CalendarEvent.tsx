import React from "react";
import { EventProps } from "react-big-calendar";
import { EventList } from "../types";

export const CalendarEvent: React.FC<EventProps<EventList>> = ({ event }) => {
  const { title, user } = event;
  return (
    <>
      <strong>{title}</strong>
      <br />
      <span> - {user.name}</span>
    </>
  );
};
