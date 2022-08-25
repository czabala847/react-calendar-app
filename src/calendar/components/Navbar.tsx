import React from "react";
import { useAuthStore } from "../../hooks";
export const Navbar: React.FC = () => {
  const { user, startLogout } = useAuthStore();

  return (
    <div className="navbar navbar-dark bg-dark mb-4 px-4">
      <div className="navbar-brand">
        <i className="fas fa-calendar-alt"></i>
        <span className="ms-2">{user?.name}</span>
      </div>

      <button className="btn btn-outline-danger" onClick={startLogout}>
        <i className="fas fa-sign-out-alt"></i>
        <span>Salir</span>
      </button>
    </div>
  );
};
