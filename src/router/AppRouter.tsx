import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { Login } from "../auth/pages";
import { CalendarPage } from "../calendar/pages";

export const AppRouter: React.FC = () => {
  const authStatus: string = "no-authenticated";

  return (
    <Routes>
      {authStatus === "no-authenticated" ? (
        <Route path="/auth/*" element={<Login />} />
      ) : (
        <Route path="/*" element={<CalendarPage />} />
      )}
      <Route path="/*" element={<Navigate to="/auth/login" />} />
    </Routes>
  );
};
