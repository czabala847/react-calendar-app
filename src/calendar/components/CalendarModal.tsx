import React, { ChangeEvent, useEffect, useMemo, useState } from "react";
import Modal from "react-modal";
import DatePicker, { registerLocale } from "react-datepicker";
import Swal from "sweetalert2";
import { addHours, differenceInSeconds } from "date-fns";
import es from "date-fns/locale/es";

import { useCalendarStore, useUiStore } from "../../hooks";
import { Event, EventDTOCreate } from "../../store/calendar";
import "react-datepicker/dist/react-datepicker.css";

registerLocale("es", es);

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement("#root");

const initialForm: Event | EventDTOCreate = {
  title: "",
  start: new Date(),
  end: addHours(new Date(), 2),
  notes: "",
  bgColor: "",
  user: {
    _id: "",
    name: "",
  },
};

export const CalendarModal: React.FC = () => {
  const [stateForm, setStateForm] = useState<Event | EventDTOCreate>(
    initialForm
  );
  const [sendForm, setSendForm] = useState<boolean>(false);
  const { isDateOpenModal, closeDateModal } = useUiStore();
  const { activeEvent, startSavingEvent } = useCalendarStore();

  useEffect(() => {
    if (activeEvent !== null) {
      setStateForm({ ...activeEvent });
    } else {
      setStateForm(initialForm);
    }
  }, [activeEvent]);

  const onCloseModal = () => {
    closeDateModal();
  };

  const onChangeInput = ({
    target,
  }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setStateForm({
      ...stateForm,
      [target.name]: target.value,
    });
  };

  const onChangeDate = (date: Date, change: "start" | "end") => {
    setStateForm({
      ...stateForm,
      [change]: date,
    });
  };

  const titleValid = useMemo(() => {
    if (stateForm.title.length === 0 && sendForm) {
      return "is-invalid";
    }

    return "";
  }, [stateForm.title, sendForm]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSendForm(true);

    const difference = differenceInSeconds(stateForm.end, stateForm.start);

    if (isNaN(difference) || difference <= 0) {
      Swal.fire("Error", "Error en las fechas", "error");
      return;
    }

    if (stateForm.title.length === 0) {
      return;
    }

    startSavingEvent(stateForm);
    setSendForm(false);
    onCloseModal();
  };

  return (
    <Modal
      isOpen={isDateOpenModal}
      onRequestClose={onCloseModal}
      style={customStyles}
      contentLabel="Example Modal"
      className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
    >
      <h1> Nuevo evento </h1>
      <hr />
      <form className="container" onSubmit={onSubmit}>
        <div className="form-group mb-2">
          <label>Fecha y hora inicio</label>
          <DatePicker
            selected={stateForm.start}
            className="form-control"
            dateFormat="Pp"
            onChange={(date: Date) => onChangeDate(date, "start")}
            showTimeSelect
            locale="es"
            timeCaption="Hora"
          />
        </div>

        <div className="form-group mb-2">
          <label>Fecha y hora fin</label>
          <DatePicker
            selected={stateForm.end}
            minDate={stateForm.start}
            className="form-control"
            dateFormat="Pp"
            onChange={(date: Date) => onChangeDate(date, "end")}
            showTimeSelect
            locale="es"
            timeCaption="Hora"
          />
        </div>

        <hr />
        <div className="form-group mb-2">
          <label>Titulo y notas</label>
          <input
            type="text"
            className={`form-control ${titleValid}`}
            placeholder="Título del evento"
            name="title"
            value={stateForm.title}
            onChange={onChangeInput}
            autoComplete="off"
          />
          <small id="emailHelp" className="form-text text-muted">
            Una descripción corta
          </small>
        </div>

        <div className="form-group mb-2">
          <textarea
            className="form-control"
            placeholder="Notas"
            rows={5}
            name="notes"
            value={stateForm.notes}
            onChange={onChangeInput}
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">
            Información adicional
          </small>
        </div>

        <button type="submit" className="btn btn-outline-primary btn-block">
          <i className="far fa-save"></i>
          <span> Guardar</span>
        </button>
      </form>
    </Modal>
  );
};
