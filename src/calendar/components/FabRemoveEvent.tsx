import React from "react";
import { useCalendarStore } from "../../hooks";

export const FabRemoveEvent: React.FC = () => {
  const { startDeleteEvent, isActiveEvent } = useCalendarStore();

  const onClick = () => {
    if (isActiveEvent) {
      startDeleteEvent();
    }
  };

  return (
    <button onClick={onClick} className="btn btn-danger fab-remove">
      <i className="fas fa-trash"></i>
    </button>
  );
};
