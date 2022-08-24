import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Status, AuthState, AuthUser } from "./authTypes";

const initialState: AuthState = {
  status: Status.CHECKING,
  user: null,
  errorMessage: undefined,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    onChecking: (state) => {
      return (state = { ...initialState });
    },

    onLogin: (state, action: PayloadAction<AuthUser>) => {
      (state.status = Status.AUTHENTICATED),
        (state.user = action.payload),
        (state.errorMessage = undefined);
    },

    onLogout: (state, action: PayloadAction<string | undefined>) => {
      state.status = Status.NO_AUTHENTICATED;
      state.user = null;
      state.errorMessage = action.payload;
    },

    onCleanError: (state) => {
      state.errorMessage = undefined;
    },
  },
});

// Action creators are generated for each case reducer function
export const { onChecking, onCleanError, onLogin, onLogout } =
  authSlice.actions;
