import { createSlice } from '@reduxjs/toolkit'

const initialState = [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCart: (state, action) => {
      const existing = state.find(i => i.name === action.payload.name)
      if (existing) {
        existing.quantity +=1
      } else {
        state.push(action.payload)
      }
    },
    updateCartQuantity: (state, action) => {
      const { name, quantity } = action.payload
      const itemIndex = state.findIndex(i => i.name === name)
      if (itemIndex !== -1) {
        state[itemIndex].quantity += quantity;

        if (state[itemIndex].quantity <= 0) {
          state.splice(itemIndex, 1);
        }
      }
    },
    removeCart: (state, action) => {
        state.splice(action.payload, 1)
    },
    clearCart: () => [],
  }
})

export const selectSubtotal = (state) => {
  return state.cart.reduce((total, item) => total + item.price * item.quantity, 0);
}

export const {addCart, removeCart, clearCart, updateCartQuantity} = cartSlice.actions;

export default cartSlice.reducer;