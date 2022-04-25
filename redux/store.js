import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "./cart.slice";
import { toastReducer } from "./toast.slice";
const reducer = {
  cart: cartReducer,
  toast: toastReducer,
};

const store = configureStore({
  reducer,
});

export default store;
