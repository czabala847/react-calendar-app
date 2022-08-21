import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Status, AuthState } from "./authTypes";

const initialState: AuthState = {
  status: Status.CHECKING,
  user: {},
  errorMessage: undefined,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    onChecking: (state) => {
      return (state = { ...initialState });
    },

    onLogin: (state, action: PayloadAction<{}>) => {
      (state.status = Status.AUTHENTICATED),
        (state.user = action.payload),
        (state.errorMessage = undefined);
    },
  },
});

// Action creators are generated for each case reducer function
export const { onChecking, onLogin } = authSlice.actions;
