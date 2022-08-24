import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import calendarApi from "../api/calendarApi";

export const useAuthStore = () => {
  const { status, user, errorMessage } = useSelector(
    (state: RootState) => state.auth
  );

  const dispatch = useDispatch();

  const startLogin = async (email: string, password: string) => {
    try {
      const response = await calendarApi.post("/auth", { email, password });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    status,
    user,
    errorMessage,
    startLogin,
  };
};
