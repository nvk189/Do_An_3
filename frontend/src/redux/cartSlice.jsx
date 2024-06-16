import { createSlice } from "@reduxjs/toolkit";

const getInitialCart = () => {
  const storedCart = localStorage.getItem("carts");
  return storedCart ? JSON.parse(storedCart) : [];
};

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: getInitialCart(),
  },
  reducers: {
    addtoCart: (state, action) => {
      const { id, name, image, price, quantity } = action.payload;
      const existingItem = state.cart.find((item) => item.id === id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cart.push({ id, name, image, price, quantity });
      }
      localStorage.setItem("carts", JSON.stringify(state.cart));
    },
    removeFromCart: (state, action) => {
      const itemId = action.payload;
      state.cart = state.cart.filter((item) => item.id !== itemId);
      localStorage.setItem("carts", JSON.stringify(state.cart));
    },
  },
});

export default cartSlice.reducer;
export const { addtoCart, removeFromCart } = cartSlice.actions;
