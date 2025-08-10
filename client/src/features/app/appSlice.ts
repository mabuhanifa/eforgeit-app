import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface AppState {
  isApiReady: boolean;
}

const initialState: AppState = {
  isApiReady: false,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setApiReady: (state, action: PayloadAction<boolean>) => {
      state.isApiReady = action.payload;
    },
  },
});

export const { setApiReady } = appSlice.actions;
export default appSlice.reducer;
