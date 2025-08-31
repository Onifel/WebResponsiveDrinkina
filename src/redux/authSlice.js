import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { requestCode, verifyCode } from "../restApi/authApi"

export const sendRequestCode = createAsyncThunk(
    "auth/sendRequestCode",
    async({name, phone, email}, {rejectWithValue}) => {
        try {
            const res = await requestCode(name, phone, email)
            console.log("📩 Backend response: ", res.data)
            console.log("Your Drinkina code is: ", res.data.otpCode);
            
            return { name, phone, email}
        } catch (err) {
            console.error("❌ Backend error:", err)
            toast.error("Failed to send code");
            return rejectWithValue(err.response?.data || "Error requesting code")
        }
    }
)

export const checkVerifyCode = createAsyncThunk(
    "auth/checkVerifyCode",
    async({phone, code, name, email}, {rejectWithValue}) => {
        try {
            const res = await verifyCode(phone, code, name, email)
            return res.data
        } catch (err) {
            return rejectWithValue(err.response?.data || "Error verifying code")
        }
    }
)

const authSlice = createSlice({
    name: "auth",
    initialState: {
        name: "",
        phone: "",
        email: "",
        step: 1,
        loading: false,
        error: null,
        user: null,
    },
    reducers: {
        resetAuth: (state) => {
            state.name = ""
            state.phone = ""
            state.email = ""
            state.step = 1
            state.loading = false
            state.error = null
            state.user = null
        },
        resetStep: (state) => {
            state.step = 1;
            state.error = null;
        },
        updateUserSuccess: (state, action) => {
            state.user = { ...state.user, ...action.payload }
        }

    },
    extraReducers: (builder) => {
        builder
            // Request code
            .addCase(sendRequestCode.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(sendRequestCode.fulfilled, (state, action) => {
                state.loading = false
                state.step = 2
                state.name = action.meta.arg.name
                state.phone = action.meta.arg.phone
                state.email = action.meta.arg.email
            })
            .addCase(sendRequestCode.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            // Verify code
            .addCase(checkVerifyCode.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(checkVerifyCode.fulfilled, (state, action) => {
                state.loading = false
                state.user = {
                    ...action.payload,
                    id: action.payload.userId,
                    name: state.name || "Guest",
                    phone: state.phone,
                    email: state.email
                }
                state.step = 3; // success
            })
            .addCase(checkVerifyCode.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    }
})

export const { resetAuth, resetStep, updateUserSuccess } = authSlice.actions
export default authSlice.reducer