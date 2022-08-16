export interface calendarState {
  events: Event[];
  activeEvent: null | Event;
}

export interface Event {
  _id: number;
  title: string;
  notes: string;
  start: Date;
  end: Date;
  bgColor: string;
  user: User;
}

export interface EventDTOCreate extends Omit<Event, "_id"> {}

export interface User {
  _id: string;
  name: string;
}