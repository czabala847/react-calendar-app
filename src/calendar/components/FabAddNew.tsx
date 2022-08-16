import React from "react";
import { addHours } from "date-fns";
import { useCalendarStore, useUiStore } from "../../hooks";

export const FabAddNew: React.FC = () => {
  const { handleActiveEvent } = useCalendarStore();
  const { openDateModal } = useUiStore();

  const onClick = () => {
    handleActiveEvent(null);
    openDateModal();
  };

  return (
    <button onClick={onClick} className="btn btn-primary fab">
      <i className="fas fa-plus"></i>
    </button>
  );
};
