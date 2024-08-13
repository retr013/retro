import {createSlice} from "@reduxjs/toolkit";
import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {profileApi} from "../api/api";
export const fetchProfile = createAsyncThunk('profile/getProfile', async (userId) => {
    try {
        const response = await profileApi.fetchProfile(userId)
        return response.data
    }
    catch (err) {
        console.log(err.message)
    }

    // return profileApi.fetchProfile(userId)
    //     .then(res => res.data)
})

export const updateStatus = createAsyncThunk('profile/updateStatus', async (body) => {
    try {
        const response = await profileApi.updateStatus(body)
        return response.data
    }
    catch (err) {
        console.log(err.message)
    }
    // return profileApi.updateStatus(body)
    //     .then(res => res.data)
})

export const fetchStatus = createAsyncThunk('profile/getStatus', async (id) => {
    try {
        const response = await profileApi.getStatus(id)
        return response.data
    }
    catch (err) {
        console.log(err.message)
    }

    // return profileApi.getStatus(id).then(res => res.data)
})

const initialState = {
    user: [],
    userStatus: '',
    loading: false,
    error: ''
}

const userProfileSlice = createSlice({
    name: 'userProfile',
    initialState,
    reducers: {
        updatePageStatus: (state, action) => {
            state.userStatus = action.payload
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchProfile.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchProfile.fulfilled, (state, action) => {
            state.loading = false
            state.user = action.payload
            state.error = ''
        })
        builder.addCase(fetchProfile.rejected, (state, action) => {
            state.loading = false
            state.user = []
            state.error = action.error.message
        })
        builder.addCase(updateStatus.pending, state => {
            state.loading = true
        })
        builder.addCase(updateStatus.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })
        builder.addCase(updateStatus.fulfilled, state => {
            state.loading = false
        })
        builder.addCase(fetchStatus.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchStatus.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })
        builder.addCase(fetchStatus.fulfilled, (state, action) => {
            state.loading = false
            state.userStatus = action.payload
        })
    }
})

export const { updatePageStatus } = userProfileSlice.actions;

export default userProfileSlice.reducer;


