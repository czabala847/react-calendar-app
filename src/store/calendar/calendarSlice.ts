import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { calendarState, Event, EventDTOCreate } from ".";

import { addHours } from "date-fns";

const tempEvent: Event = {
  id: new Date().getTime(),
  title: "Cumpleaños del jefe",
  notes: "Comprar pastel",
  start: new Date(),
  end: addHours(new Date(), 2),
  bgColor: "#fafafa",
  user: {
    uid: "",
    name: "",
  },
};

const initialState: calendarState = {
  events: [tempEvent],
  activeEvent: null,
};

export const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    onSetActiveEvent: (state, action: PayloadAction<Event | null>) => {
      state.activeEvent = action.payload;
    },

    onAddEvent: (state, action: PayloadAction<Event>) => {
      state.events.push(action.payload);
      state.activeEvent = null;
    },

    onUpdateEvent: (state, action: PayloadAction<Event>) => {
      state.events = state.events.map((event) => {
        if (event.id === action.payload.id) {
          return action.payload;
        }

        return event;
      });
    },

    onDeleteEvent: (state) => {
      if (state.activeEvent) {
        state.events = state.events.filter(
          (event) => event.id !== state.activeEvent?.id
        );

        state.activeEvent = null;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { onAddEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } =
  calendarSlice.actions;
