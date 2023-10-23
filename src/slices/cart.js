import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const { id, name, price, image } = action.payload;
      const existingProduct = state.products.find((item) => item.id === id);

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.products.push({ id, name, price, image, quantity: 1 });
      }
    },
    removeFromCart(state, action) {
      const { id } = action.payload;
      const existingProduct = state.products.find((item) => item.id === id);

      if (existingProduct) {
        if (existingProduct.quantity === 1) {
          state.products = state.products.filter(
            (product) => product.id !== id
          );
        } else {
          existingProduct.quantity -= 1;
        }
      }
    },
    emptyCart(state) {
      state.products = [];
    },
  },
});

export const { addToCart, removeFromCart, emptyCart } = cartSlice.actions;

export default cartSlice.reducer;
