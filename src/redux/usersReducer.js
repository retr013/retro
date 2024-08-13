import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import avatar from "../assets/img/avatar.png";
import {followUserApi} from "../api/api";

export const fetchUsers = createAsyncThunk('users/getUsers', async (count) => {
    try {
        const response = await followUserApi.fetchUsers(count)
        return response.data
    }
    catch (err) {
        console.log(err.message)
    }
    // return followUserApi.fetchUsers(count)
    //     .then(res => res.data)
})

export const followUser = createAsyncThunk('users/followUser', async (userId) => {
    try {
        const response = await followUserApi.followUser(userId)
        return response.data
        // return followUserApi.followUser(userId)
        //     .then(res => res.data)
    }
    catch (e) {
        alert(e.message)
    }
})

export const unfollowUser = createAsyncThunk('users/unfollowUser', async (userId) => {
    try {
        const response = await followUserApi.unfollowUser(userId)
        return response.data
    }
    catch (err) {
        console.log(err.message)
    }
    // return followUserApi.unfollowUser(userId)
    //     .then(res => res.data)
})

let initialState = {
    users: [],
    loading: false,
    error: '',
    count: 20,
    totalCount: 20,
}

const userSlice = createSlice({
        name: 'users',
        initialState,
        reducers: {
            changeFollow: (state, action) => {
                state.users.filter(user => {
                    if (user.id === action.payload) {
                        user.followed = !user.followed
                    }
                })
            },
            loadMoreUsers: (state) => {
                state.count += 20
                if (state.count > state.totalCount) {
                    state.count = state.totalCount
                }
            }
        },
        extraReducers: builder => {
            builder.addCase(fetchUsers.pending, (state) => {
                state.loading = true
            })
            builder.addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false
                console.log(action.payload)
                state.users = action.payload.items
                state.error = ''
                state.totalCount = action.payload.totalCount
            })
            builder.addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false
                state.users = []
                state.error = action.error.message
                console.log(action)
                alert(state.error)
            })
            builder.addCase(followUser.fulfilled, (state, action) => {
                state.followLoading = false
                state.users.filter(user => {
                    if (user.id === action.meta.arg) {
                        user.loading = false
                    }
                })
                state.error = ''
                console.log(action.payload)
            })
            builder.addCase(followUser.pending, (state, action) => {
                state.users.filter(user => {
                    if (user.id === action.meta.arg) {
                        user.loading = true
                    }
                })
                state.followLoading = true
            })
            builder.addCase(followUser.rejected, (state, action) => {
                state.followLoading = false
                state.error = action.error.message
                console.log(action.error)
                alert(state.error)
            })
            builder.addCase(unfollowUser.fulfilled, (state, action) => {
                state.followLoading = false
                state.users.filter(user => {
                    if (user.id === action.meta.arg) {
                        user.loading = false
                    }
                })
                state.error = ''
                console.log(action.payload)
            })
            builder.addCase(unfollowUser.pending, (state, action) => {
                state.users.filter(user => {
                    if (user.id === action.meta.arg) {
                        user.loading = true
                    }
                })
                state.followLoading = true
            })
            builder.addCase(unfollowUser.rejected, (state, action) => {
                state.followLoading = false
                state.error = action.error.message
                console.log(action.error)
                alert(state.error)
            })
        }
    }
)

export const {changeFollow, loadMoreUsers} = userSlice.actions;

export default userSlice.reducer;

