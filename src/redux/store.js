import { configureStore } from "@reduxjs/toolkit"
import cartSlice from "./cartSlice"
import checkoutSlice from './checkoutSlice'
import authReducer from './authSlice'
import orderReducer from './orderSlice'

const store = configureStore({
  reducer: {
    cart: cartSlice,
    checkout: checkoutSlice,
    auth: authReducer,
    orders: orderReducer
  }
})

export default store