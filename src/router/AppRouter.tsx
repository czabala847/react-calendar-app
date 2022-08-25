import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { Login } from "../auth/pages";
import { CalendarPage } from "../calendar/pages";
import { useAuthStore } from "../hooks";

export const AppRouter: React.FC = () => {
  // const authStatus: string = "no-authenticated";

  const { checkAuthToken, status } = useAuthStore();

  useEffect(() => {
    checkAuthToken();
  }, []);

  if (status === "CHECKING") {
    return <h3>Cargando...</h3>;
  }

  return (
    <Routes>
      {status === "NO_AUTHENTICATED" ? (
        <>
          <Route path="/auth/*" element={<Login />} />
          <Route path="/*" element={<Navigate to="/auth/" />} />
        </>
      ) : (
        <>
          <Route path="/" element={<CalendarPage />} />
          <Route path="/*" element={<Navigate to="/" />} />
        </>
      )}
      <Route path="/*" element={<Navigate to="/auth/login" />} />
    </Routes>
  );
};
