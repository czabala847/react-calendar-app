import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface UIState {
  isDateOpenModal: boolean;
}

const initialState: UIState = {
  isDateOpenModal: false,
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    onOpenDateModal: (state) => {
      state.isDateOpenModal = true;
    },
    onCloseDateModal: (state) => {
      state.isDateOpenModal = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { onOpenDateModal, onCloseDateModal } = uiSlice.actions;
