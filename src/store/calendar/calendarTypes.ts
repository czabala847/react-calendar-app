export interface calendarState {
  events: Event[];
  activeEvent: null | Event;
}

export interface Event {
  id: number;
  title: string;
  notes: string;
  start: Date;
  end: Date;
  bgColor: string;
  user: User;
}

export interface EventDTOCreate extends Omit<Event, "id"> {}

export interface User {
  uid: string;
  name: string;
}
