export interface EventList {
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
