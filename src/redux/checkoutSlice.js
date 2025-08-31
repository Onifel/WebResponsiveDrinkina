import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    checkout: [],
    tip: 0,
}

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    setTip: (state, action)  => {
        state.tip = action.payload
    }
  }
})

export const selectTip = (state) => state.checkout.tip

export const {setTip} = checkoutSlice.actions
export default checkoutSlice.reducer