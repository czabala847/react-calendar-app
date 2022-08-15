export interface calendarState {
  events: Event[];
  activeEvent: null | Event;
}

export interface Event {
  title: string;
  notes: string;
  start: Date;
  end: Date;
  bgColor: string;
  user: User;
}

export interface User {
  _id: string;
  name: string;
}
