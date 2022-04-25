import { createSlice } from "@reduxjs/toolkit";
const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      const itemExists = state.find((item) => item.id === action.payload.id);
      if (itemExists) {
        itemExists.quantity++;
        let itemsLocal = JSON.parse(localStorage.getItem("items"));
        const elem = itemsLocal.find((item) => item.id === action.payload.id);
        elem.quantity++;
        const index = state.findIndex((item) => item.id === action.payload);
        itemsLocal.splice(index, 1, elem);
        localStorage.setItem("items", JSON.stringify(itemsLocal));
      } else {
        state.push({ ...action.payload, quantity: 1 });
        localStorage.setItem("items", JSON.stringify(state));
      }
    },
    fillCart: (state, action) => {
      const itemExists = state.find((item) => item.id === action.payload.id);
      if (itemExists) {
        itemExists.quantity++;
      } else {
        state.push({ ...action.payload });
      }
    },
    incrementQuantity: (state, action) => {
      const item = state.find((item) => item.id === action.payload);
      item.quantity++;
      let itemsLocal = JSON.parse(localStorage.getItem("items"));
      const elem = itemsLocal.find((item) => item.id === action.payload);
      elem.quantity++;
      const index = state.findIndex((item) => item.id === action.payload);
      itemsLocal.splice(index, 1, elem);
      localStorage.setItem("items", JSON.stringify(itemsLocal));
    },
    decrementQuantity: (state, action) => {
      const item = state.find((item) => item.id === action.payload);
      if (item.quantity === 1) {
        const index = state.findIndex((item) => item.id === action.payload);
        state.splice(index, 1);
        let itemsLocal = JSON.parse(localStorage.getItem("items"));
        itemsLocal.splice(index, 1);
        localStorage.setItem("items", JSON.stringify(itemsLocal));
      } else {
        item.quantity--;
        let itemsLocal = JSON.parse(localStorage.getItem("items"));
        const elem = itemsLocal.find((item) => item.id === action.payload);
        elem.quantity--;
        const index = state.findIndex((item) => item.id === action.payload);
        itemsLocal.splice(index, 1, elem);
        localStorage.setItem("items", JSON.stringify(itemsLocal));
      }
    },
    removeFromCart: (state, action) => {
      const index = state.findIndex((item) => item.id === action.payload);
      state.splice(index, 1);
      let itemsLocal = JSON.parse(localStorage.getItem("items"));
      itemsLocal.splice(index, 1);
      localStorage.setItem("items", JSON.stringify(itemsLocal));
    },
    clearCart: (state, action) => {
      const index = state.findIndex((item) => item.id === action.payload);
      state.length = 0;
    },
  },
});

export const cartReducer = cartSlice.reducer;

export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
  clearCart,
  fillCart,
} = cartSlice.actions;
