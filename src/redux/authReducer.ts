import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {authMeApi} from "../api/api";

type LoginResponseType = {
    resultCode: number
    messages: Array<string>
    data: {
        userId: number
    }
}

type LogoutResponseType = {
    resultCode: number
    messages: Array<string>
    data: {}
}

type FetchLoginInfoResponseType = {
    resultCode: number
    fieldsErrors: Array<string>
    messages: string | null
    data: {
        id: number | null
        email: string | null
        login: string | null
    }
}

export const login = createAsyncThunk<LoginResponseType, { email: string, password: string, rememberMe: boolean }, {
    rejectValue: string
}>('auth/login',
    async ({email, password, rememberMe = true},
           {dispatch, rejectWithValue}) => {
        try {
            const response = await authMeApi.login({email, password, rememberMe})
            if (response.data.resultCode === 0) {
                dispatch(fetchLoginInfo())
                return response.data
            } else {
                return rejectWithValue(response.data.messages)
            }
        } catch (err: any) {
            return rejectWithValue(err.message || 'Failed to log in. Please try again')
        }
    })

export const logout = createAsyncThunk<LogoutResponseType, void, {
    rejectValue: string
}>('auth/logout', async (_, {rejectWithValue}) => {
    try {
        const response = await authMeApi.logout()
        if (response.data.resultCode === 0) {
            return response.data
        }
        else {
            return rejectWithValue(response.data.messages)
        }
    } catch (err: any) {
        return rejectWithValue(err.message || 'Failed to log out. Please try again')
    }
})

export const fetchLoginInfo = createAsyncThunk<FetchLoginInfoResponseType, void, {
    rejectValue: string
}>('login/getloginInfo',
    async (_, {rejectWithValue}) => {
    try {
        const response = await authMeApi.authUser();
        if (response.data.resultCode === 0) {
            return response.data
        } else {
            return rejectWithValue(response.data.messages)
        }
    } catch (err:any) {
        return rejectWithValue(err.message || 'Failed to fetch login info')
    }
})


type InitialStateType = {
    isAuth: boolean
    userId: number | null
    loading: boolean
    error: {
        loginError: string | null
        fetchError: string | null
    },
    initialized: boolean
    userInfo: {
        id: number | null
        email: string | null
        login: string | null
    }
}

const initialState: InitialStateType = {
    isAuth: false,
    userId: null,
    loading: false,
    error: {
        loginError: '',
        fetchError: ''
    },
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
        builder.addCase(login.fulfilled, (state) => {
            state.loading = false
            state.error.loginError = ''
            state.initialized = true
        })
        builder.addCase(login.rejected, (state, action) => {
            state.loading = false
            state.error.loginError = action.error?.message || 'Failed to log in. Please try again'
            state.initialized = true
        })
        builder.addCase(logout.fulfilled, (state, action) => {
            state.isAuth = false
            state.userId = null
            state.userInfo = {id: null, email: '', login: ''}
            state.loading = false
            state.error.loginError = ''
        })
        builder.addCase(logout.rejected, (state, action) => {
            state.loading = false
            state.error.loginError = action.error?.message || 'Failed to log out. Please try again'
            state.initialized = true
        })
        builder.addCase(logout.pending, state => {
            state.loading = true
            state.initialized = false
        })
        builder.addCase(fetchLoginInfo.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(fetchLoginInfo.fulfilled, (state, action) => {
            state.loading = false
            if (action.payload?.resultCode === 0) {
                state.isAuth = true
                state.userInfo = action.payload?.data
                state.userId = action.payload.data.id
                state.error.fetchError = ''
            }
            state.initialized = true
        })
        builder.addCase(fetchLoginInfo.rejected, (state, action) => {
            state.loading = false
            state.error.fetchError = action.error?.message || 'Failed to fetch login info'
            state.initialized = true
        })
    }
})


export default authSlice.reducer;