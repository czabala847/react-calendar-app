import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { calendarState, Event } from ".";

import { addHours } from "date-fns";

const tempEvent: Event = {
  title: "Evento 1",
  notes: "....",
  start: new Date(),
  end: addHours(new Date(), 2),
  bgColor: "#fafafa",
  user: {
    _id: "123",
    name: "Carlos Zabala",
  },
};

const initialState: calendarState = {
  events: [tempEvent],
  activeEvent: null,
};

export const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {},
});

// Action creators are generated for each case reducer function
export const {} = calendarSlice.actions;
