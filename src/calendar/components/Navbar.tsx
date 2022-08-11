import React from "react";

export const Navbar: React.FC = () => {
  return (
    <div className="navbar navbar-dark bg-dark mb-4 px-4">
      <div className="navbar-brand">
        <i className="fas fa-calendar-alt"></i>
        <span className="ms-2">Carlos Zabala</span>
      </div>

      <button className="btn btn-outline-danger">
        <i className="fas fa-sign-out-alt"></i>
        <span>Salir</span>
      </button>
    </div>
  );
};
