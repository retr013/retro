// import {createSlice} from "@reduxjs/toolkit";
// import {createAsyncThunk} from "@reduxjs/toolkit";
// import axios from "axios";
// import {profileApi} from "../api/api";
//
// export const fetchPosts = createAsyncThunk('posts/getPosts', async () => {
//     const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
//     return response.data
// })
//
// type PostType = {
//     body: string
//     userId: string
//     id: number
// }
//
// type InitialStateType = {
//     posts: Array<PostType>
//     loading: boolean
//     error: string
//     newPostText: string
// }
//
//
// const initialState: InitialStateType = {
//     posts: [],
//     loading: false,
//     error: '',
//     newPostText: ''
// }
//
// const profileSlice = createSlice({
//     name: 'profile',
//     initialState,
//     reducers: {
//         addPost: (state) => {
//             let newPost = {id: 5, body: state.newPostText, likes: 2};
//             state.posts.unshift(newPost)
//             state.newPostText = ''
//         },
//         updatePost: (state, action) => {
//             state.newPostText = action.payload;
//         },
//         getPosts: (state) => {
//             state.posts = [
//                 {id: 1, message: 'My first post', likes: 14},
//                 {id: 2, message: 'My second post', likes: 88},
//                 {id: 3, message: 'My third post', likes: 228}
//             ]
//         },
//     },
//     extraReducers: builder => {
//         builder.addCase(fetchPosts.pending, state => {
//             state.loading = true
//         })
//         builder.addCase(fetchPosts.fulfilled, (state, action) => {
//             state.loading = false
//             state.posts = action.payload
//             state.error = ''
//         })
//         builder.addCase(fetchPosts.rejected, (state, action) => {
//             state.loading = false
//             state.posts = []
//             state.error = action.error.message
//         })
//     }
// })
//
// export const {addPost, updatePost, getPosts} = profileSlice.actions;
//
// export default profileSlice.reducer;
//
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {profileApi} from "../api/api";

type PostType = {
    body: string | null
    title: string | null
    userId: number
    id: number
}
export const fetchPosts = createAsyncThunk<PostType[], void, {
    rejectValue: string
}>('posts/getPosts', async (_, {rejectWithValue}) => {
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
        return response.data
    } catch (err: any) {
        if (err.message) {
            return rejectWithValue(err.message)
        } else {
            return rejectWithValue('Failed to fetch posts. Please try again')
        }
    }
})

type InitialStateType = {
    posts: Array<PostType>
    loading: boolean
    error: string | null
    newPostText: string
}


const initialState: InitialStateType = {
    posts: [],
    loading: false,
    error: '',
    newPostText: ''
}

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        addPost: (state) => {
            let newPost: PostType = {body: state.newPostText, userId: 2, id: 5, title: 'New post'};
            state.posts.unshift(newPost)
            state.newPostText = ''
        },
        updatePost: (state, action: PayloadAction<string>) => {
            state.newPostText = action.payload;
        },
    },
    extraReducers: builder => {
        builder.addCase(fetchPosts.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchPosts.fulfilled, (state, action) => {
            state.loading = false
            state.posts = action.payload
            state.error = ''
        })
        builder.addCase(fetchPosts.rejected, (state, action) => {
            state.loading = false
            state.posts = []
            state.error = action.error?.message || 'Failed to fetch posts'
        })
    }
})

export const {addPost, updatePost} = profileSlice.actions;

export default profileSlice.reducer;

