import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {authMeApi} from "../api/api";

export const login = createAsyncThunk('auth/login', async({email, password, rememberMe = false}, { dispatch }) => {
    try {
        return await authMeApi.login({email, password, rememberMe})
            .then(() => dispatch(fetchLoginInfo()))
    } catch (e) {
        console.log(e.message)
    }
})

export const logout = createAsyncThunk('auth/logout', async () => {
    try {
        const response = await authMeApi.logout()
        return response.data
    }
    catch (err) {
        console.log(err)
    }
})

export const fetchLoginInfo = createAsyncThunk('login/getloginInfo', async () => {
    try {
        const response = await authMeApi.authUser();
        return response.data;
    } catch (err) {
        console.log(err)
    }
})

const initialState = {
    isAuth: false,
    userId: null,
    loading: false,
    error: '',
    initialized: false,
    userInfo: {
        id: null,
        email: '',
        login: '',
    }
}


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(login.pending, state => {
            state.loading = true
        })
        builder.addCase(login.fulfilled, (state, action) => {
            state.loading = false
            // if (action.payload?.resultCode === 0) {
            //     state.isAuth = true
            //     state.userId = action.payload.data.userId
            // }
            // state.error = action.payload?.messages
        })
        builder.addCase(login.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })
        builder.addCase(logout.fulfilled, (state, action) => {
            state.isAuth = false
            state.userId = null
            state.userInfo = {}
            state.loading = false
        })
        builder.addCase(logout.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })
        builder.addCase(logout.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchLoginInfo.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(fetchLoginInfo.fulfilled, (state, action) => {
            state.loading = false
            console.log(action.payload)
            if (action.payload?.resultCode === 0) {
                state.isAuth = true
                state.userInfo = action.payload?.data
                state.userId = action.payload.data.id
                state.error = ''
            }
            state.initialized = true
        })
        builder.addCase(fetchLoginInfo.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload?.resultCode
        })
    }
})
export default authSlice.reducer;