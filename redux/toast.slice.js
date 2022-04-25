import { createSlice } from "@reduxjs/toolkit";
import { toast, ToastContainer } from "react-nextjs-toast";
const toastSlice = createSlice({
  name: "toast",
  initialState: [],
  reducers: {
    showSuccess: () => {
      toast.notify("Transaction complete", {
        duration: 5,
        type: "success",
      });
    },
    showError: () => {
      toast.notify("This is a success toast", {
        duration: 5,
        type: "errorr",
      });
    },
  },
});

export const toastReducer = toastSlice.reducer;

export const { showSuccess, showError } = toastSlice.actions;
