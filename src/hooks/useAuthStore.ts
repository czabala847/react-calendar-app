import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import calendarApi from "../api/calendarApi";
import { onChecking, onCleanError, onLogin, onLogout } from "../store/auth";
import { AxiosError } from "axios";

interface ErrorResponse {
  ok: boolean;
  msg: string;
}

export const useAuthStore = () => {
  const { status, user, errorMessage } = useSelector(
    (state: RootState) => state.auth
  );

  const dispatch = useDispatch();

  const startLogin = async (email: string, password: string) => {
    try {
      dispatch(onChecking());
      const { data } = await calendarApi.post("/auth", { email, password });

      localStorage.setItem("token", data.token);

      dispatch(onLogin({ name: data.name, uid: data.uid }));
    } catch (error) {
      console.log(error);
      dispatch(onLogout("Credenciales incorrectas"));

      setTimeout(() => {
        dispatch(onCleanError());
      }, 1000);
    }
  };

  const startRegister = async (
    name: string,
    email: string,
    password: string
  ) => {
    try {
      dispatch(onChecking());

      const { data } = await calendarApi.post("/auth/new", {
        name,
        email,
        password,
      });

      localStorage.setItem("token", data.token);
      dispatch(onLogin({ name: data.name, uid: data.uid }));
    } catch (error) {
      const { response } = error as AxiosError;

      const { msg } = response?.data as ErrorResponse;
      dispatch(onLogout(msg));
    }
  };

  return {
    status,
    user,
    errorMessage,
    startLogin,
    startRegister,
  };
};
