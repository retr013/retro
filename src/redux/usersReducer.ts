// import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
// import {followUserApi} from "../api/api";
//
// export const fetchUsers = createAsyncThunk('users/getUsers', async (count) => {
//     try {
//         const response = await followUserApi.fetchUsers(count)
//         return response.data
//     }
//     catch (err) {
//         console.log(err.message)
//     }
// })
//
// export const followUser = createAsyncThunk('users/followUser', async (userId) => {
//     try {
//         const response = await followUserApi.followUser(userId)
//         return response.data
//     }
//     catch (e) {
//         alert(e.message)
//     }
// })
//
// export const unfollowUser = createAsyncThunk('users/unfollowUser', async (userId) => {
//     try {
//         const response = await followUserApi.unfollowUser(userId)
//         return response.data
//     }
//     catch (err) {
//         console.log(err.message)
//     }
// })
//
// let initialState = {
//     users: [],
//     loading: false,
//     error: '',
//     count: 20,
//     totalCount: 20,
// }
//
// const userSlice = createSlice({
//         name: 'users',
//         initialState,
//         reducers: {
//             changeFollow: (state, action) => {
//                 state.users.filter(user => {
//                     if (user.id === action.payload) {
//                         user.followed = !user.followed
//                     }
//                 })
//             },
//             loadMoreUsers: (state) => {
//                 state.count += 20
//                 if (state.count > state.totalCount) {
//                     state.count = state.totalCount
//                 }
//             }
//         },
//         extraReducers: builder => {
//             builder.addCase(fetchUsers.pending, (state) => {
//                 state.loading = true
//             })
//             builder.addCase(fetchUsers.fulfilled, (state, action) => {
//                 state.loading = false
//                 console.log(action.payload)
//                 state.users = action.payload.items
//                 state.error = ''
//                 state.totalCount = action.payload.totalCount
//             })
//             builder.addCase(fetchUsers.rejected, (state, action) => {
//                 state.loading = false
//                 state.users = []
//                 state.error = action.error.message
//                 console.log(action)
//                 alert(state.error)
//             })
//             builder.addCase(followUser.fulfilled, (state, action) => {
//                 state.followLoading = false
//                 state.users.filter(user => {
//                     if (user.id === action.meta.arg) {
//                         user.loading = false
//                     }
//                 })
//                 state.error = ''
//                 console.log(action.payload)
//             })
//             builder.addCase(followUser.pending, (state, action) => {
//                 state.users.filter(user => {
//                     if (user.id === action.meta.arg) {
//                         user.loading = true
//                     }
//                 })
//                 state.followLoading = true
//             })
//             builder.addCase(followUser.rejected, (state, action) => {
//                 state.followLoading = false
//                 state.error = action.error.message
//                 console.log(action.error)
//                 alert(state.error)
//             })
//             builder.addCase(unfollowUser.fulfilled, (state, action) => {
//                 state.followLoading = false
//                 state.users.filter(user => {
//                     if (user.id === action.meta.arg) {
//                         user.loading = false
//                     }
//                 })
//                 state.error = ''
//                 console.log(action.payload)
//             })
//             builder.addCase(unfollowUser.pending, (state, action) => {
//                 state.users.filter(user => {
//                     if (user.id === action.meta.arg) {
//                         user.loading = true
//                     }
//                 })
//                 state.followLoading = true
//             })
//             builder.addCase(unfollowUser.rejected, (state, action) => {
//                 state.followLoading = false
//                 state.error = action.error.message
//                 console.log(action.error)
//                 alert(state.error)
//             })
//         }
//     }
// )
//
// export const {changeFollow, loadMoreUsers} = userSlice.actions;
//
// export default userSlice.reducer;
//
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {followUserApi} from "../api/api";

type FetchUsersResponseType = {
    error: string | null,
    items: Array<UserType>,
    totalCount: number,
}

type FollowUserResponseType = {
    data: {},
    fieldsErrors: [],
    messages: [],
    resultCode: number,
}

export type UserType = {
    name: string | null,
    id: number,
    uniqueUrlName: string | null,
    photos: {
        small: string | null,
        large: string | null,
    },
    status: string | null,
    followed: boolean,
    loading?: boolean,
}

type InitialStateType = {
    users: Array<UserType>,
    loading: boolean,
    followLoading: boolean,
    error: string | null,
    count: number,
    totalCount: number,
}

function findUserById(state: InitialStateType, id: number): UserType | undefined {
    return state.users.find((user: UserType) => user.id === id)
}

export const fetchUsers = createAsyncThunk<FetchUsersResponseType, number, {
    rejectValue: string
}>('users/getUsers', async (count, {rejectWithValue}) => {
    try {
        const response = await followUserApi.fetchUsers(count)
        if (response.data) {
            return response.data
        } else {
            return rejectWithValue(response.data.messages)
        }
    } catch (err: any) {
        return rejectWithValue(err.message)
    }
})

export const followUser = createAsyncThunk<FollowUserResponseType, number, {
    rejectValue: string
}>('users/followUser', async (userId, {rejectWithValue}) => {
    try {
        const response = await followUserApi.followUser(userId)
        if (response.data.resultCode === 0) {
            return response.data
        } else {
            return rejectWithValue(response.data.messages)
        }
    } catch (err: any) {
        return rejectWithValue(err.message)
    }
})

export const unfollowUser = createAsyncThunk<FollowUserResponseType, number, {
    rejectValue: string
}>('users/unfollowUser', async (userId, { rejectWithValue }) => {
    try {
        const response = await followUserApi.unfollowUser(userId)
        if (response.data.resultCode === 0) {
            return response.data
        } else {
            return rejectWithValue(response.data.messages)
        }
    } catch (err: any) {
        return rejectWithValue(err.message)
    }
})

let initialState: InitialStateType = {
    users: [],
    loading: false,
    followLoading: false,
    error: '',
    count: 20,
    totalCount: 20,
}

const userSlice = createSlice({
        name: 'users',
        initialState,
        reducers: {
            changeFollow: (state, action) => {
                const user = state.users.find((user: UserType) => user.id === action.payload)
                if (user) {user.followed = !user.followed}
            },
            loadMoreUsers: (state) => {
                state.count = Math.min(state.count + 20, state.totalCount);
            }
        },
        extraReducers: builder => {
            builder.addCase(fetchUsers.pending, (state) => {
                state.loading = true
            })
            builder.addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false
                state.users = action.payload.items
                state.error = ''
                state.totalCount = action.payload.totalCount
            })
            builder.addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false
                state.users = []
                state.error = action.error?.message || 'Unable to fetch users. Please try again'
                alert(state.error)
            })
            builder.addCase(followUser.fulfilled, (state, action) => {
                state.followLoading = false
                const user = findUserById(state, action.meta.arg)
                if (user) {user.loading = false}
                state.error = ''
            })
            builder.addCase(followUser.pending, (state, action) => {
                const user = findUserById(state, action.meta.arg)
                if (user) {user.loading = true}
                state.followLoading = true
            })
            builder.addCase(followUser.rejected, (state, action) => {
                state.followLoading = false
                state.error = action.error?.message || 'Failed to follow user. Please try again'
                alert(state.error)
            })
            builder.addCase(unfollowUser.fulfilled, (state, action) => {
                state.followLoading = false
                state.error = ''
                const user = findUserById(state, action.meta.arg)
                if (user) {user.loading = false}
            })
            builder.addCase(unfollowUser.pending, (state, action) => {
                const user = findUserById(state, action.meta.arg)
                if (user) {user.loading = true}
                state.followLoading = true
            })
            builder.addCase(unfollowUser.rejected, (state, action) => {
                state.followLoading = false
                state.error = action.error?.message || 'Failed to unfollow user. Please try again'
                alert(state.error)
            })
        }
    }
)

export const {changeFollow, loadMoreUsers} = userSlice.actions;

export default userSlice.reducer;

